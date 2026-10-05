// Readers and songbook, carried over from Manico 4.0.0 with their original cases.
const assert = require('assert');
const path = require('path');
const Songs = require(path.join(__dirname, '..', 'public', 'songs.js'));

// A stand-in for the app's chord parser: the readers only need to tell chords from words.
const isChord = (s) =>
  /^[A-G][#b]?(maj|min|dim|aug|sus|add|alt|m|M|[0-9^\-oh+#b()])*(\/[A-G][#b]?)?$/.test(s);
const grid = (bars) => bars.map((bar) => bar.chords.join(',') || 'nc').join(' ');
const form = (body) => grid(Songs.unroll(Songs.readBody(body)));

// --- form: one synthetic case for each token learned from the bench
assert.equal(form('{C^7|D7 }Z'), 'C^7 D7 C^7 D7', 'plain repeat');
assert.equal(form('{C^7|N1F7 }N2G7 Z'), 'C^7 F7 C^7 G7', 'two endings');
assert.equal(form('C7XyQKcl LZ x Z'), 'C7 C7 C7', 'Kcl and x repeat the bar');
assert.equal(form('C7|D7|r Z'), 'C7 D7 C7 D7', 'r repeats two bars');
assert.equal(form('C^7|pD7|ppW/E Z'), 'C^7 C^7,D7 D7,D7/E', 'p restrikes, W changes the bass');
assert.equal(form('C7|n|D7 Z'), 'C7 nc D7', 'n keeps the bar alive without harmony');
// Text on an open bar travels to the next chord, so Fine lands on D7.
assert.equal(form('C7<Fine>|D7|E7<D.C. al Fine> Z'), 'C7 D7 E7 C7 D7', 'D.C. al Fine');
assert.equal(
  form('{C7|N1D7 }N2E7 LZ[F7<D.C. al 2nd ending>|G7 Z'),
  'C7 D7 C7 E7 F7 G7 C7 E7 F7 G7',
  'D.C. al 2nd ending',
);
assert.equal(
  form('{C7|N1D7 }N2E7]F7|G7<D.C. al 3rd end.>LZA7 ]N3B7 Z'),
  'C7 D7 C7 E7 F7 G7 A7 C7 B7',
  'three endings, the third beyond the section',
);
// The final Z attaches the D.S. to the F7 bar (learned from Butterfly).
assert.equal(
  form('{SC7|D7 }QE7XyQ|F7<D.S. al Coda> Z{QG7 LZ x }Z'),
  'C7 D7 C7 D7 E7 F7 C7 D7 E7 G7 G7 G7 G7',
  'D.S. al Coda',
);
assert.equal(form('{C7|D7<3x> }Z'), 'C7 D7 C7 D7 C7 D7', 'vamp with a 3x count');
assert.deepEqual(
  Songs.unroll(Songs.readBody('T44C7|D7|T24E7 Z')).map((bar) => bar.meter),
  ['4/4', '4/4', '2/4'],
  'the meter travels bar by bar',
);

// --- MusicXML
{
  const xml = `<score-partwise><work><work-title>Prova</work-title></work>
    <part><measure number="1"><attributes><time><beats>4</beats><beat-type>4</beat-type></time></attributes>
      <barline location="left"><repeat direction="forward"/></barline>
      <harmony><root><root-step>D</root-step></root><kind text="m7">minor-seventh</kind></harmony></measure>
    <measure number="2">
      <harmony><root><root-step>G</root-step></root><kind text="7">dominant</kind></harmony>
      <barline location="right"><repeat direction="backward"/></barline></measure></part></score-partwise>`;
  const songs = Songs.readMusicXML(xml);
  assert.equal(songs[0].title, 'Prova');
  assert.equal(grid(songs[0].bars), 'Dm7 G7 Dm7 G7');
  assert.equal(songs[0].bars[0].meter, '4/4');
  assert.equal(Songs.read(xml, isChord).kind, 'musicxml');
}

// --- text with chords above the words, ChordPro, Latin notation
{
  const t = ['Titolo Prova', 'Autore Prova', '', '[Intro]', '| Am | G |', '', 'Am        G', 'parole della strofa', 'F         E7', 'altre parole'].join('\n');
  const song = Songs.readText(t, isChord)[0];
  assert.equal(song.title, 'Titolo Prova');
  assert.equal(song.composer, 'Autore Prova');
  assert.equal(grid(song.bars), 'Am G Am G F E7');
}
{
  const t = ['{title: Pezzo Moderno}', '{artist: Chi Scrive}', '{tempo: 96}', '[Am]la [G]riga [F]cantata [E]qui'].join('\n');
  const result = Songs.read(t, isChord);
  assert.equal(result.kind, 'text');
  assert.equal(result.songs[0].title, 'Pezzo Moderno');
  assert.equal(result.songs[0].composer, 'Chi Scrive');
  assert.equal(result.songs[0].bpm, 96);
  assert.equal(result.songs[0].bars.length, 4);
}
{
  const t = ['Titolo', 'Autore', 'LAm MI7 LAm', 'parole della strofa', 'LA7 REm SOL7 DO', 'altre parole', 'DO7+ SIb'].join('\n');
  assert.equal(grid(Songs.readText(t, isChord)[0].bars), 'Am E7 Am A7 Dm G7 C Cmaj7 Bb');
  // Capitalised, as on Italian chord sites: Fa, Sib, Solm7/Do, Fa7+, Fa2
  const d = ['Diamante', 'Zucchero', 'Intro: Solm Fa', 'Fa7+ Fa6 Fa', 'parole vere della strofa', 'Fa2 Solm7/Do'].join('\n');
  assert.equal(grid(Songs.readText(d, isChord)[0].bars), 'Gm F Fmaj7 F6 F Fsus2 Gm7/C');
  // Lower-case "mi si la" are words, not chords.
  assert.equal(Songs.readText('X\nY\nmi si la do\nre mi fa sol', isChord).length, 0);
  assert.equal(Songs.readText('solo parole\nsenza nessun accordo\nqui dentro', isChord).length, 0);
}
// A file name titles a song that does not declare one.
assert.equal(Songs.read('| Am | G |\n| F | E7 |', isChord, 'la mia canzone.txt').songs[0].title, 'la mia canzone');

// --- iReal: playlist, and a real link (regression on the unscrambling)
{
  const one = 'Uno=A=Swing=C=n=T44C^7 |F7 Z';
  const two = 'Due=B=Bossa=F=n=T44F^7 |Bb7 Z';
  const three = 'Tre=C=Blues=G=n=T44G7 |C7 Z';
  const songs = Songs.readIReal('irealbook://' + [one, two, three].join('==='));
  assert.deepEqual(songs.map((song) => song.title), ['Uno', 'Due', 'Tre']);
  assert.equal(grid(songs[1].bars), 'F^7 Bb7');
  assert.equal(songs[1].style, 'Bossa');
}
const AUTUMN_LEAVES =
  'irealb://Autumn%20Leaves=Kosma%20Joseph==Medium%20Swing=G%2D==1r34LbKcu7QyX314C%2D7XyX7hA%7CQyX7%5EbE%7CyQX7%5EbB%7CQyX7F%7CQyQ%7CD7b4T%7BA%2AQyX7%2DyQKclcKQyX6%2DG%7CQyX317bD%7CQyX7hA%5BB%2A%7D%20%20l%20LZCX6%2DG%7CL7bG%20Q%7CBb%5EyX31b7D%7CQyX7hAC%5B%2A%5DQyX7%5EbE%7CQyX7Q%7CG%2D7yX7F%7CZF%2D7%20E7LZAh7XyQ%7CD7b13XyQ%7CG%2D6XyQKcl%20%20Z=Jazz%2DMedium%20Swing=85=0';
{
  // Found inside a page too, as in iReal's HTML playlist exports.
  const result = Songs.read(`<a href="${AUTUMN_LEAVES}">Autumn Leaves</a>`, isChord);
  assert.equal(result.kind, 'ireal');
  const song = result.songs[0];
  assert.equal(song.title, 'Autumn Leaves');
  assert.equal(song.key, 'G-');
  assert.equal(song.style, 'Jazz-Medium Swing');
  assert.equal(song.bpm, 85);
  assert.equal(song.bars.length, 32, 'AABC unrolled is 32 bars');
  assert.match(grid(song.bars), /^C-7 F7 Bb\^7 Eb\^7 Ah7 D7b13 G-6 G-6 C-7/);
}

// --- songbook: save, find, filter, backup and back (in memory, as when IndexedDB is missing)
(async () => {
  const song = Songs.readIReal(AUTUMN_LEAVES)[0];
  const saved = await Songs.save(song);
  assert.equal(saved.id, 'autumn leaves|kosma joseph');
  await Songs.save({title: 'Blues', composer: '', style: 'Shuffle', bars: [{chords: ['F7']}, {chords: ['Bb7']}]});
  assert.equal(await Songs.save({title: '', bars: []}), null, 'an empty song is not saved');
  let list = await Songs.all();
  assert.deepEqual(list.map((s) => s.title), ['Autumn Leaves', 'Blues']);
  assert.deepEqual(Songs.search(list, 'kosma').map((s) => s.title), ['Autumn Leaves']);
  assert.deepEqual(Songs.search(list, 'shuffle').map((s) => s.title), ['Blues']);
  assert.equal(Songs.search(list, '').length, 2);
  const text = await Songs.backup();
  await Songs.remove(saved.id);
  assert.equal((await Songs.all()).length, 1);
  const back = Songs.read(text, isChord);
  assert.equal(back.kind, 'backup');
  assert.equal(back.songs.length, 2);
  for (const s of back.songs) await Songs.save(s);
  list = await Songs.all();
  assert.equal(list.length, 2);
  assert.equal(list[0].bars.length, 32);
  // A Manico 4 songbook backup, with its Italian field names, is understood too.
  const manico = JSON.stringify({manico: 'canzoniere', versione: 1, brani: [{title: 'Vecchio', composer: 'X', stile: 'Bossa', bpm: 120, bars: [{accordi: ['C-7'], metro: '4/4'}, {accordi: ['F7'], metro: ''}]}]});
  const old = Songs.read(manico, isChord).songs[0];
  assert.equal(old.style, 'Bossa');
  assert.equal(grid(old.bars), 'C-7 F7');
  assert.equal(old.bars[0].meter, '4/4');
  // The built-in forms.
  const forms = Songs.library('it');
  assert.ok(forms.length >= 20 && forms.every((f) => f.builtin && f.bars.length >= 4 && f.bpm > 0));
  assert.equal(Songs.library('en')[0].title, 'Major blues, 12 bars (F)');
  assert.equal(grid(forms[1].bars).split(' ')[3], 'F-7,Bb7', 'two chords in a bar');
  console.log('PASS: form unrolling (12 cases), MusicXML, text, ChordPro, Latin notation, iReal playlist and real link, songbook and backups, library.');
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
