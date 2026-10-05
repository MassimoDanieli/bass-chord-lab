'use strict';
const $ = (id) => document.getElementById(id);
let language = 'en';
const translations = {
  en: {
    s0: 'See the chords. Find the notes.',
    s1: 'Compare chords on your bass fretboard.',
    s3: 'Chords separated by spaces · with barlines | each stretch is one bar, shared by the chords in it',
    s4: 'Show',
    s5: 'II–V–I in C',
    s6: 'Blues in C · 12 bars',
    s7: 'Turnaround · 8 chords',
    s8: 'Bass / tuning',
    s9: '4 strings · E A D G',
    s10: '5 strings · B E A D G',
    s11: '4 strings · Drop D',
    s12: 'Frets',
    s13: 'Dot labels',
    s14: 'Note name',
    s15: 'Chord degree',
    s16: 'Notes to show',
    s17: 'All chord tones',
    s18: 'Root, 3rd and 5th',
    s19: 'Roots only',
    s20: '3rd and 7th · guide tones',
    s21: 'Common tones only',
    s22: 'All other notes',
    s23: '−1 semitone',
    s24: '+1 semitone',
    s25: 'Compare all',
    s26: 'Clear selection',
    s27: '← Previous',
    s28: 'Next →',
    s29: 'Click a chord to study it on its own. ⇧ Shift + click to add it to or remove it from the comparison.',
    s30: '▶ Start backing',
    s31: 'Beats per chord',
    s32: 'Backing · ready',
    s33: 'Groove · 4/4',
    s34: 'Straight · pop / rock',
    s60: 'Shuffle · blues',
    s61: 'Ballad · slow',
    s65: 'Jazz waltz · 3/4',
    s35: 'First instrument volume',
    s36: 'Drums',
    s37: 'Drum volume',
    s38: 'Press Start backing: one or two instruments of your choice play the chords and drums keep time. You can mute chords or drums. Nothing is played below E3: the bass register is yours. Recorded instruments; without a connection the backing falls back to synthesized sounds.',
    s39: 'Fretboard',
    s40: 'Highest string at the top · fret 0 = open string',
    s41: 'Click a dot to see its degrees in each chord.',
    s42: 'Split dot = a tone shared by several chords. Light ring = the root of at least one chord. Dashed yellow ring = the bass note of a slash chord. Hover over dots for details.',
    s43: 'Supported chords and how to use it',
    s44: 'International notation: C, D, E, F, G, A, B. Sharps # and flats b, including ♯ and ♭. Examples: F7, Bbmaj7, F#m7.',
    s45: 'Major, minor (m / min / −), 5, 6, 69, 7, maj7 (M7 / Δ7 / ^7), m7, mMaj7, dim (° / o), dim7, m7b5 (ø7 / h7), aug (+), sus2, sus4, add9, 9, 11, 13 and their maj and m forms, with alterations in any combination: b5, #5, b9, #9, #11, b13, alt. Slash chords (C/E, Dm7/G) show the bass note with a dashed ring.',
    s48: 'Enter a progression of any length and press Show. Without barlines each chord lasts the selected number of beats. With barlines | you write a chart: each stretch is one bar, two chords in a bar share it, N.C. is a bar with no harmony, % repeats the bar before, and a time signature such as 3/4 at the start of a bar changes the bars from there on (3/4 plays as a jazz waltz, other meters as a plain pulse). Songs… opens your songbook: paste an iReal Pro link, lyrics with chords or ChordPro, or choose MusicXML and ChordPro files; repeats, endings, D.S. and codas are unrolled as played, and tempo and groove are taken from the song. Loop bars repeats a section. Select two or three chords with Shift + click for a clear comparison, or compare them all. The common tones filter shows notes present in at least two distinct selected chords. The backing is in 4/4 with six grooves: Straight, Swing, Shuffle, Bossa nova, Funk and Ballad. It does not loop identically: drums and chords change from bar to bar, the drummer plays a short fill every four bars and a bigger one, followed by a crash, before the progression starts again. The chord instrument (grand piano, electric piano, acoustic or electric guitar) plays the notes that define each chord. A second instrument can play along, with its own figures and in a different register. The instrument samples (about 1.5 MB) are downloaded the first time you start the backing. Changing BPM, beats or groove restarts from the current chord. Audio starts only after pressing Start backing and stops when you switch tabs. No installation required; without a connection the backing uses synthesized sounds. Your last settings are remembered in the browser when available.',
    s46: 'Explore the fretboard, one note at a time.',
    s47: 'Reset F7 / C7',
    s49: 'Backing track settings',
    s50: 'Examples',
    s51: 'Manico: transcribe and study bass lines',
    s53: 'Samples: Salamander Grand Piano by Alexander Holm (CC BY 3.0); Virtuosity Drums by Versilian Studios (CC0); acoustic guitar from the University of Iowa Musical Instrument Samples; electric guitar by Karoryfer Samples (CC0).',
    s54: 'First instrument',
    s62: 'Second instrument',
    s63: 'None',
    s64: 'Second instrument volume',
    s55: 'Grand piano',
    s56: 'Electric piano',
    s57: 'Acoustic guitar',
    s58: 'Electric guitar',
    s59: 'Chords',
    s52: 'Source on GitHub',
    a0: 'Configuration',
    a1: 'Previous chord',
    a2: 'Next chord',
    a3: 'Progression chords',
    audioUnsupported: 'This browser does not support audio. Try a current Safari or Chrome.',
    audioUnavailable: 'Audio unavailable: try Start backing again.',
    audioFailed: 'Unable to start audio.',
    empty: 'Enter at least one chord.',
    unknown: 'Unrecognized chord: {raw}',
    unsupported: 'Unsupported chord type: {raw}. See the list below the fretboard.',
    play: '▶ Start backing',
    stop: '■ Stop backing',
    ready: 'Backing · ready',
    loadingSamples: 'Loading the instruments…',
    synthFallback: 'synthesized sounds (samples unavailable)',
    paused: 'Playback stopped: press Start to resume.',
    playing: '{chord} · chord {index}/{total} · beat {beat}/{beats}',
    playingBar: '{chord} · bar {bar}/{bars} · beat {beat}/{beats}',
    tooMany: 'Too many chords in bar {bar}: {max} at most.',
    songs: 'Songs…',
    songsTitle: 'Songs',
    songSearch: 'Search by title, author or style',
    songMine: 'Your songbook',
    songLibrary: 'Forms and loops',
    songEmpty: 'No saved songs yet: add one below.',
    songNoMatch: 'No saved song matches the search.',
    songAddTitle: 'Add songs',
    songPastePh: 'Paste an iReal Pro link, lyrics with the chords above them, or ChordPro',
    songAdd: 'Add',
    songFiles: 'Choose files…',
    songBackup: 'Download backup',
    songClose: 'Close',
    songDelete: 'Delete {title}',
    songDeleteConfirm: 'Delete “{title}” from your songbook?',
    songAdded: '{n} songs added to your songbook.',
    songNone: 'No chords found in that text.',
    songLost: '{n} chords could not be kept and are shown as N.C. or left out.',
    songBars: '{n} bars',
    untitled: 'Untitled',
    songAddHint:
      'Files: MusicXML, ChordPro (.cho, .crd, .pro), text, iReal Pro playlists exported as HTML, songbook backups. Songs stay in this browser; nothing is uploaded.',
    loopLabel: 'Loop bars',
    loopFrom: 'From bar',
    loopTo: 'To bar',
    loopClear: 'Whole song',
    noPrevious: 'The % sign in bar {bar} has no bar before it to repeat.',
    selection:
      '{total} chords in sequence · {selected} selected · {distinct} distinct chords on the fretboard',
    common: 'Common tones (at least two chords): ',
    none: 'none',
    commonHint: 'Select more than one chord to see common tones.',
    detailHint: 'Click a dot to see its degrees in each chord.',
    boardAria: 'Notes of {chords} on {strings} strings, frets 0–{frets}',
    fret: 'fret {fret}',
    position: 'String {string}, fret {fret}: ',
    comparison: '{total} chords compared',
    select: 'Select a chord',
    frets: '{frets} frets',
  },
  it: {
    s0: 'Vedi gli accordi. Trova le note.',
    s1: 'Confronta gli accordi sulla tastiera del tuo basso.',
    s3: 'Accordi separati da spazi · con le stanghette | ogni tratto è una battuta, divisa tra gli accordi che contiene',
    s4: 'Mostra',
    s5: 'II–V–I in Do',
    s6: 'Blues in Do · 12 battute',
    s7: 'Turnaround · 8 accordi',
    s8: 'Basso / accordatura',
    s9: '4 corde · E A D G',
    s10: '5 corde · B E A D G',
    s11: '4 corde · Drop D',
    s12: 'Tasti',
    s13: 'Nei pallini',
    s14: 'Nome della nota',
    s15: 'Grado nell’accordo',
    s16: 'Note da mostrare',
    s17: 'Tutte le note dell’accordo',
    s18: 'Fondamentale, 3ª e 5ª',
    s19: 'Solo fondamentali',
    s20: '3ª e 7ª · guide tones',
    s21: 'Solo note comuni',
    s22: 'Tutte le altre note',
    s23: '−1 semitono',
    s24: '+1 semitono',
    s25: 'Confronta tutti',
    s26: 'Deseleziona',
    s27: '← Precedente',
    s28: 'Successivo →',
    s29: 'Clic su un accordo per studiarlo da solo. ⇧ Shift + clic per aggiungerlo o toglierlo dal confronto.',
    s30: '▶ Avvia base',
    s31: 'Beat per accordo',
    s32: 'Base · pronta',
    s33: 'Ritmo · 4/4',
    s34: 'Dritto · pop / rock',
    s60: 'Shuffle · blues',
    s61: 'Ballad · lenta',
    s65: 'Valzer jazz · 3/4',
    s35: 'Volume primo strumento',
    s36: 'Batteria',
    s37: 'Volume batteria',
    s38: 'Premi Avvia base: uno o due strumenti a tua scelta suonano gli accordi, la batteria tiene il tempo. Puoi spegnere accordi o batteria. Niente suona sotto il Mi3: il registro del basso è tuo. Strumenti reali campionati; senza connessione la base usa suoni sintetizzati.',
    s39: 'Tastiera',
    s40: 'Corda più acuta in alto · tasto 0 = corda a vuoto',
    s41: 'Clicca un pallino per leggere i suoi gradi nei diversi accordi.',
    s42: 'Pallino diviso = nota comune a più accordi. Anello chiaro = fondamentale di almeno un accordo. Anello giallo tratteggiato = nota di basso di uno slash chord. Passa sui pallini per i dettagli.',
    s43: 'Accordi supportati e come usarlo',
    s44: 'Notazione internazionale: C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si. Diesis # e bemolle b, anche ♯ e ♭. Esempi: F7, Bbmaj7, F#m7.',
    s45: 'Maggiori, minori (m / min / −), 5, 6, 69, 7, maj7 (M7 / Δ7 / ^7), m7, mMaj7, dim (° / o), dim7, m7b5 (ø7 / h7), aug (+), sus2, sus4, add9, 9, 11, 13 e le loro forme maj e m, con alterazioni in qualsiasi combinazione: b5, #5, b9, #9, #11, b13, alt. Gli accordi con basso indicato (C/E, Dm7/G) mostrano la nota di basso con un anello tratteggiato.',
    s48: 'Inserisci una progressione di qualsiasi lunghezza e premi “Mostra”. Senza stanghette ogni accordo dura il numero di beat impostato. Con le stanghette | scrivi una griglia: ogni tratto è una battuta, due accordi nella stessa battuta la dividono, N.C. è una battuta senza armonia, % ripete la battuta precedente, e un metro come 3/4 all’inizio di una battuta cambia le battute da lì in poi (il 3/4 suona come valzer jazz, gli altri metri con una pulsazione semplice). “Brani…” apre il canzoniere: incolla un link iReal Pro, un testo con gli accordi o ChordPro, oppure scegli file MusicXML e ChordPro; ritornelli, finali, D.S. e code vengono srotolati come si suonano, e tempo e ritmo sono presi dal brano. “Loop battute” ripete una sezione. Per un confronto pulito seleziona due o tre accordi con Shift + clic; in alternativa confrontali tutti. Il filtro “note comuni” mostra le note presenti in almeno due accordi distinti selezionati. La base è in 4/4 con sei ritmi: Dritto, Swing, Shuffle, Bossa nova, Funk e Ballad. Non si ripete identica: batteria e accordi cambiano da una battuta all’altra, il batterista fa un breve fill ogni quattro battute e uno più grande, seguito da un piatto, prima che il giro ricominci. Lo strumento per gli accordi (pianoforte, piano elettrico, chitarra acustica o elettrica) suona le note che definiscono ogni accordo. Un secondo strumento può suonare insieme al primo, con figure sue e in un registro diverso. I campioni degli strumenti (circa 1,5 MB) si scaricano la prima volta che avvii la base. Cambiare BPM, beat o ritmo riavvia dall’accordo corrente. L’audio parte solo dopo il clic su Avvia base; si ferma se passi a un’altra scheda. Nessuna installazione; senza connessione la base usa suoni sintetizzati. Le tue ultime impostazioni vengono ricordate nel browser, quando disponibile.',
    s46: 'Fatto per esplorare la tastiera, una nota alla volta.',
    s47: 'Ripristina F7 / C7',
    s49: 'Impostazioni della base',
    s50: 'Esempi',
    s51: 'Manico: trascrivi e studia le linee di basso',
    s53: 'Campioni: Salamander Grand Piano di Alexander Holm (CC BY 3.0); Virtuosity Drums di Versilian Studios (CC0); chitarra acustica dai Musical Instrument Samples dell’Università dell’Iowa; chitarra elettrica di Karoryfer Samples (CC0).',
    s54: 'Primo strumento',
    s62: 'Secondo strumento',
    s63: 'Nessuno',
    s64: 'Volume secondo strumento',
    s55: 'Pianoforte',
    s56: 'Piano elettrico',
    s57: 'Chitarra acustica',
    s58: 'Chitarra elettrica',
    s59: 'Accordi',
    s52: 'Codice su GitHub',
    a0: 'Configurazione',
    a1: 'Accordo precedente',
    a2: 'Accordo successivo',
    a3: 'Accordi della progressione',
    audioUnsupported: 'Questo browser non supporta l’audio. Prova Safari o Chrome aggiornato.',
    audioUnavailable: 'Audio non disponibile: riprova con Avvia base.',
    audioFailed: 'Impossibile avviare l’audio.',
    empty: 'Inserisci almeno un accordo.',
    unknown: 'Accordo non riconosciuto: {raw}',
    unsupported: 'Tipo di accordo non supportato: {raw}. Vedi l’elenco sotto la tastiera.',
    play: '▶ Avvia base',
    stop: '■ Ferma base',
    ready: 'Base · pronta',
    loadingSamples: 'Carico gli strumenti…',
    synthFallback: 'suoni sintetizzati (campioni non disponibili)',
    paused: 'Riproduzione fermata: premi Avvia per riprendere.',
    playing: '{chord} · accordo {index}/{total} · beat {beat}/{beats}',
    playingBar: '{chord} · battuta {bar}/{bars} · beat {beat}/{beats}',
    tooMany: 'Troppi accordi nella battuta {bar}: al massimo {max}.',
    songs: 'Brani…',
    songsTitle: 'Brani',
    songSearch: 'Cerca per titolo, autore o stile',
    songMine: 'Il tuo canzoniere',
    songLibrary: 'Giri e forme',
    songEmpty: 'Nessun brano salvato: aggiungine uno qui sotto.',
    songNoMatch: 'Nessun brano salvato corrisponde alla ricerca.',
    songAddTitle: 'Aggiungi brani',
    songPastePh: 'Incolla un link iReal Pro, un testo con gli accordi sopra le parole, o ChordPro',
    songAdd: 'Aggiungi',
    songFiles: 'Scegli file…',
    songBackup: 'Scarica backup',
    songClose: 'Chiudi',
    songDelete: 'Elimina {title}',
    songDeleteConfirm: 'Eliminare “{title}” dal canzoniere?',
    songAdded: '{n} brani aggiunti al canzoniere.',
    songNone: 'Non ho trovato accordi in quel testo.',
    songLost: '{n} accordi non si sono potuti conservare: sono mostrati come N.C. oppure omessi.',
    songBars: '{n} battute',
    untitled: 'Senza titolo',
    songAddHint:
      'File: MusicXML, ChordPro (.cho, .crd, .pro), testo, playlist iReal Pro esportate in HTML, backup del canzoniere. I brani restano in questo browser; niente viene caricato in rete.',
    loopLabel: 'Loop battute',
    loopFrom: 'Dalla battuta',
    loopTo: 'Alla battuta',
    loopClear: 'Tutto il brano',
    noPrevious: 'Il segno % nella battuta {bar} non ha una battuta prima da ripetere.',
    selection:
      '{total} accordi nella sequenza · {selected} selezionati · {distinct} accordi distinti sulla tastiera',
    common: 'Note comuni (almeno due accordi): ',
    none: 'nessuna',
    commonHint: 'Seleziona più accordi per vedere le note comuni.',
    detailHint: 'Clicca un pallino per leggere i suoi gradi nei diversi accordi.',
    boardAria: 'Note di {chords} su {strings} corde, tasti 0–{frets}',
    fret: 'tasto {fret}',
    position: 'Corda {string}, tasto {fret}: ',
    comparison: '{total} accordi a confronto',
    select: 'Seleziona un accordo',
    frets: '{frets} tasti',
  },
};
function tr(key, vars = {}) {
  return (translations[language][key] ?? translations.en[key] ?? key).replace(
    /\{(\w+)\}/g,
    (_, name) => String(vars[name] ?? ''),
  );
}
function playingStatus(at) {
  const text = tr(chart ? 'playingBar' : 'playing', {
    chord: at.slot.name,
    index: at.slotIndex + 1,
    total: progression.length,
    bar: at.barIndex + 1,
    bars: chart?.length,
    beat: at.slotBeat + 1,
    beats: at.slot.beats,
  });
  return synthFallback ? `${text} · ${tr('synthFallback')}` : text;
}
function applyLanguage() {
  document.documentElement.lang = language;
  $('language').value = language;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = tr(el.dataset.i18n);
  });
  document
    .querySelectorAll('[data-i18n-aria]')
    .forEach((el) => el.setAttribute('aria-label', tr(el.dataset.i18nAria)));
  document
    .querySelectorAll('[data-i18n-placeholder]')
    .forEach((el) => el.setAttribute('placeholder', tr(el.dataset.i18nPlaceholder)));
  $('play').textContent = tr(timer === null ? 'play' : 'stop');
  if (timer === null) $('playStatus').textContent = tr('ready');
  else if (visibleBeat >= 0) $('playStatus').textContent = playingStatus(locate(visibleBeat));
}

const palette = [
  '#78e1ba',
  '#ffa971',
  '#bca2ff',
  '#78cfff',
  '#ff88a8',
  '#e5d876',
  '#8ddc78',
  '#db9be8',
];
let progression = [],
  selected = new Set(),
  signature = '',
  cursor = 0,
  timer = null,
  colors = [];
function colorAt(i) {
  return palette[i] ?? `hsl(${(i * 137.508) % 360} 65% 73%)`;
}
function step(delta) {
  if (!progression.length) return;
  cursor = modIndex(cursor + delta, progression.length);
  selected = new Set([cursor]);
  render();
}
function modIndex(n, total) {
  return ((n % total) + total) % total;
}
// ---------------------------------------------------------------- the chart
// What the text box holds, read into chords with a place in time.
//   Without barlines every chord lasts "beats per chord": F7, C7
//   With barlines each stretch between them is one bar, shared by the chords inside it:
//     Dm7 | G7 | Cmaj7 A7 |      N.C. is a bar without harmony, % repeats the bar before,
//     3/4 Dm7 | G7 | ...          and a time signature changes the bars from there on.
const REST = /^n\.?c\.?$/i;
function restChord() {
  return {name: 'N.C.', rest: true, tones: [], root: 0, quality: '', accidental: ''};
}
// How the beats of a bar are shared out: evenly in pairs, the first chord taking what is left.
function shareBeats(beats, count) {
  if (count === 1) return [beats];
  if (count === 2) return [Math.ceil(beats / 2), Math.floor(beats / 2)];
  return [beats - count + 1, ...new Array(count - 1).fill(1)];
}
function readChart(text, perChord) {
  const slots = [],
    words = (part) =>
      part
        .trim()
        .split(/[\s,;]+/)
        .filter(Boolean),
    chordOf = (token) => (REST.test(token) ? restChord() : parseChord(token));
  if (!text.includes('|')) {
    for (const token of words(text))
      slots.push({...chordOf(token), start: slots.length * perChord, beats: perChord, bar: null});
    if (!slots.length) throw Error(tr('empty'));
    return {slots, bars: null, total: slots.length * perChord};
  }
  const bars = [];
  let meter = 4,
    total = 0;
  for (const part of text.split('|')) {
    let tokens = words(part);
    const time = tokens[0]?.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (time) {
      meter = Math.min(12, Math.max(1, Number(time[1])));
      tokens = tokens.slice(1);
    }
    if (!tokens.length) continue;
    const number = bars.length + 1;
    let chords;
    if (tokens.length === 1 && tokens[0] === '%') {
      if (!bars.length) throw Error(tr('noPrevious', {bar: number}));
      chords = bars.at(-1).slots.map((i) => ({...slots[i]}));
    } else chords = tokens.map(chordOf);
    if (chords.length > meter) throw Error(tr('tooMany', {bar: number, max: meter}));
    const shares = shareBeats(meter, chords.length),
      bar = {start: total, beats: meter, slots: []};
    chords.forEach((chord, i) => {
      bar.slots.push(slots.length);
      slots.push({...chord, start: total, beats: shares[i], bar: bars.length});
      total += shares[i];
    });
    bars.push(bar);
  }
  if (!slots.length) throw Error(tr('empty'));
  return {slots, bars, total};
}
let chart = null, // the bars, when the text is written with barlines
  totalBeats = 0,
  slotAt = [], // for every beat of the piece, the chord sounding
  barAt = [], // and, with barlines, the bar it falls in
  loop = null, // {from, to}: bars to repeat, counted from 0
  transportOffset = 0;
function setChart(read) {
  progression = read.slots;
  chart = read.bars;
  totalBeats = read.total;
  slotAt = [];
  barAt = [];
  progression.forEach((slot, i) => {
    for (let beat = 0; beat < slot.beats; beat++) {
      slotAt.push(i);
      barAt.push(slot.bar);
    }
  });
  loop = null;
}
// The stretch that plays round: the looped bars, or everything.
function playRange() {
  if (!chart || !loop) return {start: 0, length: totalBeats, firstBar: 0, bars: chart?.length};
  const first = chart[loop.from],
    last = chart[loop.to];
  return {
    start: first.start,
    length: last.start + last.beats - first.start,
    firstBar: loop.from,
    bars: loop.to - loop.from + 1,
  };
}
// Bars of the groove when there are no barlines: they simply count from where playback began.
function freeBarBeats() {
  return currentGroove().beats ?? 4;
}
// Where a played beat falls: which chord, which bar, and how many bars have gone by. Beats
// count from the start of playback, which begins `transportOffset` beats into the range.
function locate(beat) {
  const range = playRange(),
    travelled = transportOffset + beat,
    pos = range.start + modIndex(travelled, range.length),
    slotIndex = slotAt[pos],
    slot = progression[slotIndex],
    here = {pos, slotIndex, slot, slotBeat: pos - slot.start};
  if (!chart) {
    const beats = freeBarBeats();
    return {
      ...here,
      barIndex: null,
      barBeat: modIndex(beat, beats),
      barBeats: beats,
      playedBar: Math.floor(beat / beats),
    };
  }
  const barIndex = barAt[pos],
    bar = chart[barIndex];
  return {
    ...here,
    barIndex,
    barBeat: pos - bar.start,
    barBeats: bar.beats,
    playedBar: Math.floor(travelled / range.length) * range.bars + barIndex - range.firstBar,
  };
}
// Synthesized accompaniment: no downloaded samples, works offline.
let audio = null,
  master = null,
  pianoBus = null,
  pianoBus2 = null,
  drumBus = null,
  noiseBuffer = null,
  metalBuffer = null;
let audioVoices = new Set(),
  visualTimers = new Set(),
  playEpoch = 0,
  nextBeatAt = 0,
  transportBeat = 0,
  visibleBeat = -1;
// White noise for snare and kick click; a cluster of detuned square waves for cymbals,
// whose inharmonic overtones are what makes a hi-hat sound metallic rather than like hiss.
function fillBuffers() {
  const rate = audio.sampleRate;
  noiseBuffer = audio.createBuffer(1, rate, rate);
  const noise = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noise.length; i++) noise[i] = Math.random() * 2 - 1;
  metalBuffer = audio.createBuffer(1, rate, rate);
  const metal = metalBuffer.getChannelData(0);
  const partials = [205.3, 304.4, 369.6, 522.7, 540, 800];
  for (let i = 0; i < metal.length; i++) {
    let sum = 0;
    for (const f of partials) sum += Math.sin((2 * Math.PI * f * i) / rate) >= 0 ? 1 : -1;
    metal[i] = sum / partials.length;
  }
}
// A short synthetic room. Completely dry oscillators sound like a test tone.
function roomImpulse() {
  const rate = audio.sampleRate,
    length = Math.floor(rate * 1.1),
    impulse = audio.createBuffer(2, length, rate);
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel);
    let smooth = 0;
    for (let i = 0; i < length; i++) {
      const t = i / rate,
        fade = Math.pow(1 - i / length, 2) * Math.exp(-3.4 * t);
      smooth += 0.4 * ((Math.random() * 2 - 1) * fade - smooth);
      data[i] = smooth;
    }
  }
  return impulse;
}
function initAudio() {
  if (audio) return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) throw Error(tr('audioUnsupported'));
  audio = new AudioCtor();
  master = audio.createGain();
  master.gain.value = 0;
  const limiter = audio.createDynamicsCompressor();
  limiter.threshold.value = -14;
  limiter.knee.value = 12;
  limiter.ratio.value = 5;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.2;
  pianoBus = audio.createGain();
  pianoBus2 = audio.createGain();
  drumBus = audio.createGain();
  const lowCut = audio.createBiquadFilter();
  lowCut.type = 'highpass';
  lowCut.frequency.value = 130;
  lowCut.Q.value = 0.7;
  pianoBus.connect(lowCut);
  pianoBus2.connect(lowCut);
  lowCut.connect(master);
  drumBus.connect(master);
  master.connect(limiter);
  limiter.connect(audio.destination);
  fillBuffers();
  const room = audio.createConvolver(),
    pianoSend = audio.createGain(),
    drumSend = audio.createGain();
  room.buffer = roomImpulse();
  pianoSend.gain.value = 0.16;
  drumSend.gain.value = 0.09;
  lowCut.connect(pianoSend);
  drumBus.connect(drumSend);
  pianoSend.connect(room);
  drumSend.connect(room);
  room.connect(master);
  updateMix();
  audio.addEventListener('statechange', () => {
    if (audio.state !== 'running' && timer !== null) stop();
  });
}
function updateMix() {
  if (!audio) return;
  pianoBus.gain.setTargetAtTime(
    $('pianoEnabled').checked ? Number($('pianoVolume').value) / 100 : 0,
    audio.currentTime,
    0.015,
  );
  pianoBus2.gain.setTargetAtTime(
    $('pianoEnabled').checked ? Number($('instrument2Volume').value || 50) / 100 : 0,
    audio.currentTime,
    0.015,
  );
  drumBus.gain.setTargetAtTime(
    $('drumsEnabled').checked ? Number($('drumsVolume').value) / 100 : 0,
    audio.currentTime,
    0.015,
  );
}
// Every started source goes through here, so stop() can silence whatever is still scheduled.
function trackVoice(source, nodes) {
  audioVoices.add(source);
  source.onended = () => {
    audioVoices.delete(source);
    for (const node of [source, ...nodes]) node.disconnect();
  };
}

// Sampled instruments, recorded from real ones (see samples/CREDITS.txt). They are fetched on
// the first Start; when they cannot be (page opened from disk, no connection) the synthesized
// sounds below take over.
// The bass belongs to the player. No chord instrument plays a note below this one (E3), and
// what is left under it (body resonance, pick and hammer thumps) is filtered out of their mix.
const BASS_CEILING = 52;
const instruments = {
  piano: {
    folder: 'piano',
    notes: [51, 54, 57, 60, 63, 66, 69, 72],
    layers: 2,
    low: 58,
    rootLow: BASS_CEILING,
    level: 0.62,
    release: 0.1,
  },
  // No samples: the FM electric piano is the instrument.
  epiano: {low: 58, rootLow: BASS_CEILING},
  'guitar-acoustic': {
    folder: 'guitar-acoustic',
    notes: [52, 55, 58, 61, 64, 67],
    layers: 1,
    low: BASS_CEILING,
    rootLow: BASS_CEILING,
    level: 0.34,
    release: 0.12,
    guitar: true,
  },
  'guitar-electric': {
    folder: 'guitar-electric',
    notes: [51, 54, 57, 60, 63, 66],
    layers: 1,
    low: BASS_CEILING,
    rootLow: BASS_CEILING,
    level: 0.46,
    release: 0.12,
    guitar: true,
  },
};
// Takes available per dynamic layer: soft first, then hard where the kit has one.
const drumSamples = {
  kick: [2, 2],
  snare: [2, 2],
  rim: [2],
  hat: [3, 3],
  openhat: [2],
  pedal: [3],
  ride: [3, 3],
  crash: [1, 2],
  tom1: [2, 2],
  tom2: [2, 2],
};
const drumLevel = {
  kick: 1,
  snare: 0.8,
  rim: 0.75,
  hat: 0.7,
  openhat: 0.9,
  pedal: 2,
  ride: 1.8,
  crash: 1.1,
  tom1: 0.8,
  tom2: 1,
};
let openHat = null;
const banks = {};
let synthFallback = false;
function currentInstrument() {
  const name = $('instrument').value;
  return Object.hasOwn(instruments, name) ? name : 'piano';
}
// The chord instruments in play, each with its own mixer channel. The second is optional and
// must differ from the first: two copies of one instrument would only double every note.
function currentInstruments() {
  const first = currentInstrument(),
    second = $('instrument2').value,
    voices = [{name: first, bus: pianoBus}];
  if (Object.hasOwn(instruments, second) && second !== first)
    voices.push({name: second, bus: pianoBus2});
  return voices;
}
function bankFiles(name) {
  if (name === 'drums')
    return Object.entries(drumSamples).flatMap(([sound, layers]) =>
      layers.flatMap((takes, layer) =>
        Array.from({length: takes}, (_, take) => `drums/${sound}-${layer + 1}${'abc'[take]}.mp3`),
      ),
    );
  const set = instruments[name];
  if (!set?.folder) return [];
  return set.notes.flatMap((midi) =>
    Array.from({length: set.layers}, (_, layer) => `${set.folder}/${midi}-${layer + 1}.mp3`),
  );
}
// Resolves to true when every file of the bank is decoded. A failed load is not remembered,
// so the next Start tries again.
function loadBank(name) {
  const files = bankFiles(name);
  if (!files.length) return Promise.resolve(true);
  const bank = (banks[name] ??= {ready: false, loading: null, buffers: {}});
  if (bank.ready) return Promise.resolve(true);
  bank.loading ??= Promise.all(
    files.map(async (file) => {
      const response = await fetch(`samples/${file}`);
      if (!response.ok) throw Error(file);
      const data = await response.arrayBuffer();
      bank.buffers[file] = await new Promise((resolve, reject) =>
        audio.decodeAudioData(data, resolve, reject),
      );
    }),
  ).then(
    () => (bank.ready = true),
    () => {
      bank.loading = null;
      return false;
    },
  );
  return bank.loading;
}
// Plays one decoded sample. With `end` the note is damped there; without, it rings out.
function playBuffer(buffer, when, rate, level, bus, end, release) {
  const source = audio.createBufferSource(),
    env = audio.createGain();
  source.buffer = buffer;
  source.playbackRate.value = rate;
  env.gain.setValueAtTime(level, when);
  if (end !== undefined) env.gain.setTargetAtTime(0, end, release);
  source.connect(env);
  env.connect(bus);
  trackVoice(source, [env]);
  source.start(when);
  source.stop(end === undefined ? when + buffer.duration / rate + 0.05 : end + release * 7);
  return env;
}
function sampleNote(name, midi, when, duration, level, hard, bus) {
  const set = instruments[name],
    // The nearest recorded note, retuned by at most a semitone or two.
    nearest = set.notes.reduce((a, b) => (Math.abs(b - midi) < Math.abs(a - midi) ? b : a)),
    layer = hard && set.layers > 1 ? 2 : 1;
  playBuffer(
    banks[name].buffers[`${set.folder}/${nearest}-${layer}.mp3`],
    when,
    Math.pow(2, (midi - nearest) / 12),
    level,
    bus,
    when + duration,
    set.release,
  );
}
function playDrum(name, when, v) {
  const bank = banks.drums;
  if (!bank?.ready) return drumKit[name](when, v);
  const layers = drumSamples[name],
    layer = layers.length > 1 && v >= 0.62 ? 2 : 1,
    take = 'abc'[Math.floor(Math.random() * layers[layer - 1])],
    // The soft layer is quiet as recorded; it is not turned down as far again.
    gain = drumLevel[name] * (layer === 2 || layers.length === 1 ? v : 0.6 + v);
  // Closing the hi-hat cuts an open one short, as the pedal does on a real kit.
  if (openHat && (name === 'hat' || name === 'pedal' || name === 'openhat'))
    openHat.gain.setTargetAtTime(0, when, 0.012);
  const env = playBuffer(bank.buffers[`drums/${name}-${layer}${take}.mp3`], when, 1, gain, drumBus);
  if (name === 'openhat') openHat = env;
}

// Keys fallback and electric piano: a two-operator FM electric piano. The modulation index falls quickly after the attack,
// so each note starts bright and mellows, and a fast high-ratio modulator adds the tine "ping".
function keysNote(midi, when, duration, level, strength, bus) {
  const frequency = 440 * Math.pow(2, (midi - 69) / 12),
    carrier = audio.createOscillator(),
    body = audio.createOscillator(),
    bodyDepth = audio.createGain(),
    tine = audio.createOscillator(),
    tineDepth = audio.createGain(),
    env = audio.createGain(),
    end = when + duration,
    // Higher notes get less modulation, or they turn glassy.
    index = (0.45 + 1.5 * strength) * Math.min(1, 0.35 + 300 / frequency);
  carrier.type = body.type = tine.type = 'sine';
  carrier.frequency.value = frequency;
  body.frequency.value = frequency;
  tine.frequency.value = frequency * 14;
  bodyDepth.gain.setValueAtTime(frequency * index, when);
  bodyDepth.gain.exponentialRampToValueAtTime(frequency * 0.22, when + 0.4);
  tineDepth.gain.setValueAtTime(frequency * 1.1 * strength, when);
  tineDepth.gain.exponentialRampToValueAtTime(frequency * 0.002, when + 0.08);
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(level, when + 0.005);
  env.gain.setTargetAtTime(level * 0.4, when + 0.005, 0.45);
  env.gain.setTargetAtTime(0, end, 0.07);
  body.connect(bodyDepth);
  bodyDepth.connect(carrier.frequency);
  tine.connect(tineDepth);
  tineDepth.connect(carrier.frequency);
  carrier.connect(env);
  env.connect(bus);
  trackVoice(carrier, [env]);
  trackVoice(body, [bodyDepth]);
  trackVoice(tine, [tineDepth]);
  for (const osc of [carrier, body, tine]) {
    osc.start(when);
    osc.stop(end + 0.45);
  }
}
// What a pianist would play instead of stacking every chord tone from the root:
// the root below, then the notes that define the chord (3rd, 7th, alterations, top extension),
// each kept inside one fixed octave so common tones stay put from chord to chord.
function voicing(chord, low = 58, rootLow = BASS_CEILING) {
  const tones = (chord.intervals ?? qualities[chord.quality]).map(([semi, degree]) => ({
    semi,
    degree,
  }));
  let upper = tones;
  if (tones.length > 3) {
    upper = tones.filter((t) => t.degree !== 1);
    const drop = (test) => {
      upper = upper.filter((t) => !test(t));
    };
    if (tones.length > 4) drop((t) => t.degree === 5 && t.semi === 7);
    // A 13th chord leaves the 11th out; on a dominant 11th it is the major 3rd that goes,
    // because the two clash.
    if (upper.some((t) => t.degree === 13)) drop((t) => t.degree === 11);
    if (upper.some((t) => t.degree === 11) && upper.some((t) => t.semi === 4))
      drop((t) => t.degree === 3);
    for (const degree of [11, 9, 5]) if (upper.length > 4) drop((t) => t.degree === degree);
  }
  const notes = upper.map((t) => low + mod(chord.root + t.semi - low));
  return {
    root: rootLow + mod(chord.root - rootLow),
    notes: [...new Set(notes)].sort((a, b) => a - b),
  };
}
function compChord({name, bus}, chord, when, duration, velocity, withRoot, upStroke, register = 0) {
  const set = instruments[name],
    sampled = banks[name]?.ready,
    // The register shifts from bar to bar, so a returning chord is not always the same shape.
    {root, notes} = voicing(chord, set.low + register, set.rootLow),
    note = (midi, time, gain, strength) =>
      sampled
        ? sampleNote(name, midi, time, duration, set.level * gain, strength >= 0.85, bus)
        : keysNote(midi, time, duration, 0.15 * gain, strength, bus);
  if (set.guitar) {
    // A down stroke sweeps the whole shape, root included; an up stroke catches the top three.
    // The shape sits on the upper strings: the low ones are the bass player's.
    const shape = [...new Set([root, ...notes])].sort((a, b) => a - b),
      strings = upStroke ? shape.slice(-3).reverse() : shape,
      spread = currentGroove().strumSpread ?? 0.014,
      gain = velocity / Math.sqrt(strings.length);
    strings.forEach((midi, i) => note(midi, when + i * spread, gain, velocity));
    return;
  }
  const gain = velocity / Math.sqrt(notes.length);
  // The root (above the bass register) only marks each chord change.
  if (withRoot && !notes.includes(root)) note(root, when, gain * 1.15, velocity * 0.6);
  // A few milliseconds between notes, bottom to top, like fingers landing.
  notes.forEach((midi, i) => note(midi, when + i * 0.006, gain, velocity));
}

// Drums
function burst(buffer, when, decay, level, filters) {
  const source = audio.createBufferSource(),
    env = audio.createGain(),
    nodes = [env];
  source.buffer = buffer;
  let last = source;
  for (const [type, frequency, q = 0.7] of filters) {
    const filter = audio.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    last.connect(filter);
    last = filter;
    nodes.push(filter);
  }
  env.gain.setValueAtTime(level, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + decay);
  last.connect(env);
  env.connect(drumBus);
  trackVoice(source, nodes);
  // A random offset into the buffer: no two hits are sample-identical.
  source.start(when, Math.random() * 0.4);
  source.stop(when + decay + 0.02);
}
function thump(type, from, to, sweep, when, decay, level) {
  const osc = audio.createOscillator(),
    env = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, when);
  osc.frequency.exponentialRampToValueAtTime(to, when + sweep);
  env.gain.setValueAtTime(level, when);
  env.gain.exponentialRampToValueAtTime(0.0001, when + decay);
  osc.connect(env);
  env.connect(drumBus);
  trackVoice(osc, [env]);
  osc.start(when);
  osc.stop(when + decay + 0.02);
}
const drumKit = {
  kick(when, v) {
    thump('sine', 150, 46, 0.1, when, 0.3, 0.85 * v);
    burst(noiseBuffer, when, 0.012, 0.22 * v, [['lowpass', 2600]]);
  },
  snare(when, v) {
    thump('triangle', 195, 150, 0.07, when, 0.13, 0.28 * v);
    burst(noiseBuffer, when, 0.19, 0.4 * v, [
      ['highpass', 1500],
      ['lowpass', 9000],
    ]);
  },
  hat(when, v) {
    burst(metalBuffer, when, 0.05, 0.3 * v, [['highpass', 7500]]);
  },
  pedal(when, v) {
    burst(metalBuffer, when, 0.032, 0.36 * v, [['highpass', 8500]]);
  },
  ride(when, v) {
    burst(metalBuffer, when, 0.42, 0.32 * v, [['highpass', 5200]]);
  },
  rim(when, v) {
    thump('triangle', 830, 780, 0.02, when, 0.045, 0.3 * v);
    burst(noiseBuffer, when, 0.03, 0.2 * v, [['bandpass', 2600, 2]]);
  },
  openhat(when, v) {
    burst(metalBuffer, when, 0.3, 0.3 * v, [['highpass', 6500]]);
  },
  crash(when, v) {
    burst(metalBuffer, when, 1.3, 0.34 * v, [['highpass', 3800]]);
  },
  tom1(when, v) {
    thump('sine', 210, 140, 0.12, when, 0.32, 0.6 * v);
  },
  tom2(when, v) {
    thump('sine', 140, 88, 0.14, when, 0.4, 0.7 * v);
  },
};
// Grooves are written the way a drummer would chart them: one letter per subdivision.
//   .  rest      g  ghost note     o  soft     x  normal     X  accent
//   D d  guitar down stroke (loud, soft)       U u  up stroke
//   a  the next chord, played early and held over the bar line
// `grid` is the subdivisions per beat: 4 for straight sixteenths, 3 for a triplet feel, where
// the swung off-beat is the third triplet. Each groove lists several versions of every part;
// a different one is chosen as the bars go by, so the backing does not loop identically.
const HIT = {X: 1, x: 0.8, o: 0.5, g: 0.28, D: 1, d: 0.7, U: -0.8, u: -0.5, a: 0.8};
const grooves = {
  straight: {
    grid: 4,
    drums: [
      {kick: 'X.....x.X.......', snare: '....X.......X...', hat: 'x.o.x.o.x.o.x.o.'},
      {kick: 'X.......X.x.....', snare: '....X.......X...', hat: 'x.o.x.o.x.o.x.o.'},
      {kick: 'X.....x...x.....', snare: '....X..g....X...', hat: 'x.o.x.o.x.o.x.o.'},
      {
        kick: 'X.......X.....x.',
        snare: '....X.......X..g',
        hat: 'x.o.x.o.x.o.x...',
        openhat: '..............x.',
      },
    ],
    keys: ['X.....x.....x...', 'X.......x.....x.', 'X.....x...x.....', 'X.....x.......a.'],
    strum: ['D...d.u...u.d.u.', 'D...d...d.u.d.u.', 'D.....u.d.u...u.', 'D...d.u...u.d.a.'],
  },
  swing: {
    grid: 3,
    energy: 0.75,
    drums: [
      {ride: 'x..x.ox..x.o', pedal: '...x.....x..', kick: 'o.....o.....'},
      {ride: 'x..x.ox..x.o', pedal: '...x.....x..', kick: 'o.....o.....', snare: '.....g......'},
      {ride: 'x..x.ox.ox.o', pedal: '...x.....x..', kick: 'o..........o', snare: '..g.........'},
      {ride: 'x..x..x..x.o', pedal: '...x.....x..', kick: 'o.....o.....', snare: '.....o..g...'},
    ],
    keys: ['X....x......', 'X.......x...', 'x....x...x..', 'X....x.....a', '..x..x......'],
    // Four short chords to the bar, leaning on 2 and 4.
    strum: ['d..D..d..D..', 'd..D..d..D.u', 'd..D..d..D.a'],
    strumLength: 0.5,
  },
  shuffle: {
    grid: 3,
    drums: [
      {kick: 'X.....X.....', snare: '...X.....X..', hat: 'x.ox.ox.ox.o'},
      {kick: 'X....oX.....', snare: '...X.....X..', hat: 'x.ox.ox.ox.o'},
      {kick: 'X.....X....o', snare: '...X.....X.g', hat: 'x.ox.ox.ox.o'},
      {kick: 'X.....X.....', snare: '...X.....X..', ride: 'x.ox.ox.ox.o', pedal: '...x.....x..'},
    ],
    keys: ['X....x...x..', 'X.o..x......', 'x.ox.o...x..', 'X....x.....a'],
    strum: ['D.dD.dD.dD.d', 'D.dD.d...D.d', 'D.uD.uD.uD.u', 'D.dD.dD.dD.a'],
    strumLength: 0.7,
  },
  // Two bars, so the cross-stick can play the 3-2 clave.
  bossa: {
    grid: 4,
    span: 2,
    energy: 0.6,
    gentle: true,
    drums: [
      {
        kick: 'x.....o.x.....o.x.....o.x.....o.',
        rim: 'x.....x.....x.......x.....x.....',
        hat: 'o.g.o.g.o.g.o.g.o.g.o.g.o.g.o.g.',
      },
      {
        kick: 'x.....o.x.....o.x.....o.x...o.o.',
        rim: 'x.....x.....x.......x.....x.....',
        hat: 'ogogogogogogogogogogogogogogogog',
      },
      {
        kick: 'x.....o.x.....o.x.....o.x.....o.',
        rim: 'x.....x.....x.......x.....x...x.',
        hat: 'o.g.o.g.o.g.o.g.o.g.o.g.o.g.o.g.',
      },
    ],
    keys: [
      'X.....x.....x.......x.....x.....',
      'X.....x.......x.....x.....x.....',
      'X.....x...x.........x.....x...a.',
    ],
    // The same figures, plucked together rather than strummed.
    strum: [
      'D.....d.....d.......d.....d.....',
      'D.....d.......d.....d.....d.....',
      'D.....d...d.........d.....d...a.',
    ],
    strumSpread: 0.004,
  },
  funk: {
    grid: 4,
    drums: [
      {kick: 'X..x......x..x..', snare: '....X..g.g..X...', hat: 'xoxoxoxoxoxoxoxo'},
      {
        kick: 'X.....x..xx.....',
        snare: '....X.......X..g',
        hat: 'xoxoxoxoxoxox...',
        openhat: '..............x.',
      },
      {kick: 'X..x...x..x.....', snare: '....X..g....X.g.', hat: 'x.x.x.x.x.x.x.x.'},
      {kick: 'X..x......x..x..', snare: '....X..g.g..X..g', hat: 'xoxoxoxoxoxoxoxo'},
    ],
    keys: ['X..x..x.....x.x.', '..x..x..X.....x.', 'X.....x..x....x.', 'x..x........x.a.'],
    // Sixteenth-note scratching: short, tight chords.
    strum: ['D.du.uD..u.ud.u.', 'D..u.uD.d..u.ud.', 'D.du..D..u.ud...', 'D.du.uD..u.ud.a.'],
    strumLength: 0.45,
    keysLength: 0.5,
  },
  // Three beats to the bar, on a triplet grid.
  waltz: {
    grid: 3,
    beats: 3,
    energy: 0.7,
    gentle: true,
    drums: [
      {ride: 'x..x.ox..', pedal: '...x..x..', kick: 'o........'},
      {ride: 'x..x..x.o', pedal: '...x..x..', kick: 'o........', snare: '........g'},
      {ride: 'x.ox..x..', pedal: '...x..x..', kick: 'o.....o..'},
    ],
    keys: ['X.....x..', 'X..x.....', 'X....x...', 'X.......a'],
    strum: ['D..d..d..', 'D..d.ud..', 'D.....d..', 'D..d..d.a'],
  },
  ballad: {
    grid: 4,
    energy: 0.6,
    gentle: true,
    drums: [
      {kick: 'X.........x.....', rim: '....x.......x...', hat: 'o.g.o.g.o.g.o.g.'},
      {
        kick: 'X.....o...x.....',
        rim: '....x.......x...',
        ride: 'o...o...o...o...',
        pedal: '....o.......o...',
      },
      {kick: 'X.........x...o.', snare: '....o.......o...', hat: 'o.g.o.g.o.g.o.g.'},
    ],
    keys: ['X...............', 'X.......x.......', 'X.....o.x.......', 'X.......x.....a.'],
    // Arpeggiated: the strings are spread out instead of struck together.
    strum: ['D.......d.......', 'D...d...d...d...', 'D.......d...d...', 'D.......d.....a.'],
    strumSpread: 0.045,
  },
};
// Fills replace the end of a bar: the last beat (small) or the last two (big).
const fills = {
  4: {
    small: [
      {snare: 'x.xx'},
      {snare: 'ooxX'},
      {tom1: 'xx..', tom2: '..xx'},
      {snare: 'x.x.', tom2: '...x'},
    ],
    big: [
      {kick: 'x.......', snare: 'x.xxx.xx'},
      {kick: 'x.......', snare: 'xxx.....', tom1: '...xx...', tom2: '.....xxX'},
      {kick: 'x.......', snare: '..x.x.xx'},
      {kick: 'x.......', snare: 'x..x..x.', tom1: '.x..x...', tom2: '......xx'},
    ],
  },
  3: {
    small: [{snare: 'xxx'}, {snare: '.xx'}, {tom1: 'x..', tom2: '.xx'}, {snare: 'x.x'}],
    big: [
      {kick: 'x.....', snare: 'x.xxxx'},
      {snare: 'xxx...', tom1: '...xx.', tom2: '.....x'},
      {kick: 'x.....', snare: 'x..x.x'},
      {snare: '..xxxx'},
    ],
  },
};
function currentGroove() {
  return grooves[$('groove').value] ?? grooves.straight;
}
// A random index into `list`, never the one used last time.
function pick(list, avoid) {
  if (list.length < 2) return 0;
  if (avoid === undefined || avoid < 0 || avoid >= list.length)
    return Math.floor(Math.random() * list.length);
  const index = Math.floor(Math.random() * (list.length - 1));
  return index >= avoid ? index + 1 : index;
}
// Where the drummer marks the form. A long progression (five bars or more) gets its big fill
// on the last bar, before it comes round again, and at the end of each eight-bar section when
// it is long enough to have them; a shorter one gets it every eight bars, or it would never
// stop. Every other fourth bar ends with a small fill.
function fillKind(bar) {
  const loopBars = chart ? playRange().bars : totalBeats / freeBarBeats(),
    period = Number.isInteger(loopBars) && loopBars >= 5 ? loopBars : 8,
    inPeriod = modIndex(bar, period);
  if (inPeriod === period - 1) return 'big';
  if (period >= 16 && inPeriod % 8 === 7) return 'big';
  return inPeriod % 4 === 3 ? 'small' : null;
}
const hits = (pattern) => [...pattern].map((letter) => HIT[letter] ?? 0);
const registers = {keys: [0, 0, 4, -3], guitar: [0, 0, 5]};
let plans = new Map(),
  plansFor = '',
  anticipated = new Set();
const lastFill = {small: -1, big: -1};
// A plain pulse for bars the grooves are not written for (5/4, 2/4, 6/8...): the downbeat on
// the kick, every beat on the hi-hat, one chord per bar.
const plainGrooves = {};
function plainGroove(beats) {
  const steps = beats * 4;
  return (plainGrooves[beats] ??= {
    grid: 4,
    beats,
    gentle: true,
    plain: true,
    drums: [{kick: 'X'.padEnd(steps, '.'), hat: 'x...'.padEnd(steps, 'o...')}],
    keys: ['X'.padEnd(steps, '.')],
    strum: ['D'.padEnd(steps, '.')],
  });
}
// The groove a bar is played with: the chosen one when it is written for that many beats,
// otherwise the waltz for three and the plain pulse for anything else.
function grooveFor(beats) {
  const chosen = currentGroove();
  if ((chosen.beats ?? 4) === beats) return chosen;
  if (beats === 4) return grooves.straight;
  return beats === 3 ? grooves.waltz : plainGroove(beats);
}
// Everything that is decided once per bar: which version of each part is played, the fill,
// the crash after a big fill, the register of the chords and how hard the bar is played.
// `at` says which bar (counted as played) and how many beats it has.
function barPlan({playedBar: bar, barBeats}) {
  const groove = grooveFor(barBeats),
    key = `${$('groove').value}|${signature}|${loop?.from}-${loop?.to}`;
  if (plansFor !== key) {
    plans.clear();
    plansFor = key;
  }
  if (plans.has(bar)) return plans.get(bar);
  const barSteps = groove.grid * barBeats,
    span = groove.span ?? 1,
    previous = plans.get(bar - 1),
    held = bar % span !== 0 && previous?.groove === groove && previous,
    // Each four-bar phrase opens on the main beat; the versions come in between.
    choice = held
      ? held.choice
      : {
          drums:
            Math.floor(bar / span) % (4 / span) === 0
              ? 0
              : pick(groove.drums, previous?.choice.drums),
          keys: bar === 0 ? 0 : pick(groove.keys, previous?.choice.keys),
          strum: bar === 0 ? 0 : pick(groove.strum, previous?.choice.strum),
          // The second instrument gets its own figures (see below), chosen the same way.
          keys2: pick(groove.keys, previous?.choice.keys2),
          strum2: pick(groove.strum, previous?.choice.strum2),
          register: bar === 0 ? 0 : pick(registers.keys, -1),
        },
    from = modIndex(bar, span) * barSteps,
    cut = (pattern) => pattern.slice(from, from + barSteps),
    drums = {};
  for (const [part, pattern] of Object.entries(groove.drums[choice.drums % groove.drums.length]))
    drums[part] = hits(cut(pattern));
  const energy = groove.energy ?? 1,
    kind = groove.plain ? null : fillKind(bar),
    fill = kind && (groove.gentle ? 'small' : kind);
  if (fill) {
    const options = fills[groove.grid][fill],
      parts = options[(lastFill[fill] = pick(options, lastFill[fill]))],
      length = Object.values(parts)[0].length,
      start = barSteps - length;
    for (const part of Object.values(drums)) part.fill(0, start);
    for (const [part, pattern] of Object.entries(parts)) {
      drums[part] ??= new Array(barSteps).fill(0);
      // A fill grows towards the bar line.
      hits(pattern).forEach(
        (v, i) => (drums[part][start + i] = v * energy * (0.8 + (0.3 * i) / length)),
      );
    }
  }
  if (fillKind(bar - 1) === 'big' && !groove.gentle && bar > 0) {
    drums.crash = new Array(barSteps).fill(0);
    drums.crash[0] = 0.9 * energy;
    (drums.kick ??= new Array(barSteps).fill(0))[0] ||= 0.8;
  }
  const comp = (list, index) => {
    const letters = cut(list[index % list.length]);
    return {hits: hits(letters), push: [...letters].map((letter) => letter === 'a')};
  };
  // Two instruments playing the same figure would just be one louder instrument.
  if (choice.keys2 === choice.keys) choice.keys2 = (choice.keys + 1) % groove.keys.length;
  if (choice.strum2 === choice.strum) choice.strum2 = (choice.strum + 1) % groove.strum.length;
  const plan = {
    groove,
    choice,
    fill,
    drums,
    comp: [
      {keys: comp(groove.keys, choice.keys), strum: comp(groove.strum, choice.strum)},
      {keys: comp(groove.keys, choice.keys2), strum: comp(groove.strum, choice.strum2)},
    ],
    // A phrase leans forward: each bar a little stronger than the one before.
    scale: [0.94, 0.97, 1, 1.04][modIndex(bar, 4)],
  };
  plans.set(bar, plan);
  plans.delete(bar - 6);
  return plan;
}
// How far the chords are moved for this bar. The second instrument takes the other register,
// so the two do not sit on the same notes.
function registerFor(plan, slot, guitar) {
  const set = guitar ? registers.guitar : registers.keys,
    shift = set[plan.choice.register % set.length];
  if (slot === 0) return shift;
  return shift === 0 ? (set.at(-1) > 0 ? set.at(-1) : 4) : 0;
}
// Subdivisions from `step` to the next chord hit in the same bar, or to the bar line.
function patternGap(part, step) {
  for (let next = step + 1; next < part.length; next++) if (part[next]) return next - step;
  return part.length - step;
}
function beatSeconds() {
  return 60 / Math.min(300, Math.max(30, Number($('bpm').value) || 80));
}
function beatsPerChord() {
  return [2, 3, 4, 6, 8].includes(Number($('beats').value)) ? Number($('beats').value) : 4;
}
function scheduleBeat(beat, when, epoch) {
  const at = locate(beat),
    chord = at.slot,
    seconds = beatSeconds(),
    plan = barPlan(at),
    groove = plan.groove,
    grid = groove.grid,
    // Small random variation in how hard each hit lands.
    human = () => 0.92 + Math.random() * 0.16,
    stepSeconds = seconds / grid;
  if ($('drumsEnabled').checked)
    for (let sub = 0; sub < grid; sub++)
      for (const name of Object.keys(drumKit)) {
        const v = plan.drums[name]?.[at.barBeat * grid + sub];
        if (v) playDrum(name, when + sub * stepSeconds, Math.min(1, v * plan.scale * human()));
      }
  if ($('pianoEnabled').checked && !chord.rest)
    currentInstruments().forEach((voice, slot) => {
      const guitar = instruments[voice.name].guitar,
        part = (p) => p.comp[slot][guitar ? 'strum' : 'keys'],
        comp = part(plan),
        length = (guitar ? groove.strumLength : groove.keysLength) ?? 1,
        // Lengths are in beats here: bars of different grooves can sit side by side.
        ring = (beats) => Math.min(3.2, beats * seconds * 0.94 * length),
        register = registerFor(plan, slot, guitar),
        // The chord ends where the next one starts, or earlier if the next one is played ahead.
        lastBeat = beat - at.slotBeat + chord.beats - 1,
        last = locate(lastBeat),
        lastPlan = barPlan(last),
        next = locate(lastBeat + 1),
        canPush = next.slotIndex !== at.slotIndex && !next.slot.rest;
      let chordEnd = lastBeat + 1;
      for (let sub = 0; sub < lastPlan.groove.grid && canPush; sub++)
        if (part(lastPlan).push[last.barBeat * lastPlan.groove.grid + sub]) {
          chordEnd = lastBeat + sub / lastPlan.groove.grid;
          break;
        }
      for (let sub = 0; sub < grid; sub++) {
        const step = at.barBeat * grid + sub,
          time = when + sub * stepSeconds,
          now = beat + sub / grid;
        // Held over from an anticipation: this beat's chord is already sounding.
        if (sub === 0 && anticipated.delete(`${slot}:${beat}`)) continue;
        if (comp.push[step] && canPush && beat === lastBeat) {
          const nextPlan = barPlan(next),
            afterLine =
              patternGap(part(nextPlan).hits, next.barBeat * nextPlan.groove.grid) /
              nextPlan.groove.grid;
          anticipated.add(`${slot}:${beat + 1}`);
          compChord(
            voice,
            next.slot,
            time,
            ring(1 - sub / grid + Math.min(afterLine, next.slot.beats)),
            HIT.a * plan.scale * human(),
            true,
            false,
            register,
          );
          continue;
        }
        // A new chord is always stated on its first beat, whatever the pattern says.
        const chordStart = sub === 0 && at.slotBeat === 0,
          velocity = Math.abs(comp.hits[step]) || (chordStart ? 0.9 : 0);
        if (!velocity || now >= chordEnd) continue;
        // Let the chord ring until the next hit, but never into the next chord.
        compChord(
          voice,
          chord,
          time,
          ring(Math.min(patternGap(comp.hits, step) / grid, chordEnd - now)),
          Math.min(1, velocity * plan.scale * human()),
          chordStart,
          comp.hits[step] < 0,
          register,
        );
      }
    });
  const callback = setTimeout(
    () => {
      visualTimers.delete(callback);
      if (epoch !== playEpoch || timer === null) return;
      visibleBeat = beat;
      cursor = at.slotIndex;
      if (at.slotBeat === 0) {
        selected = new Set([cursor]);
        draw();
      }
      markBar(at.barIndex);
      $('playStatus').textContent = playingStatus(at);
      beatLights(at.barBeats).forEach((light, i) => light.classList.toggle('on', i === at.barBeat));
    },
    Math.max(0, (when - audio.currentTime) * 1000),
  );
  visualTimers.add(callback);
}
// One light per beat of the bar being played.
let lights = [];
function beatLights(count) {
  if (lights.length !== count) {
    lights = Array.from({length: count}, (_, i) => {
      const light = document.createElement('span');
      light.className = 'beat-light';
      light.textContent = i + 1;
      return light;
    });
    $('beatMeter').replaceChildren(...lights);
  }
  return lights;
}
function schedule() {
  if (timer === null) return;
  // Recover after a stalled tab without scheduling a burst of overdue notes.
  if (nextBeatAt < audio.currentTime - 0.2) {
    stop();
    $('playStatus').textContent = tr('paused');
    return;
  }
  while (nextBeatAt < audio.currentTime + 0.12) {
    scheduleBeat(transportBeat++, nextBeatAt, playEpoch);
    nextBeatAt += beatSeconds();
  }
}
function stop() {
  playEpoch++;
  plans.clear();
  anticipated.clear();
  if (timer !== null) clearInterval(timer);
  timer = null;
  for (const timeout of visualTimers) clearTimeout(timeout);
  visualTimers.clear();
  if (audio && master) {
    master.gain.cancelScheduledValues(audio.currentTime);
    master.gain.setTargetAtTime(0, audio.currentTime, 0.008);
    for (const source of audioVoices) {
      try {
        source.stop(audio.currentTime + 0.03);
      } catch {}
    }
  }
  $('play').textContent = tr('play');
  $('play').classList.remove('play-active');
  $('play').setAttribute('aria-pressed', 'false');
  $('playStatus').textContent = tr('ready');
  lights.forEach((light) => light.classList.remove('on'));
}
async function start() {
  stop();
  $('bpm').value = String(Math.min(300, Math.max(30, Number($('bpm').value) || 80)));
  if (!parseProgression() || !progression.length) return;
  // Playback follows one chord at a time, starting from the selected one.
  if (selected.size === 1) cursor = [...selected][0];
  selected = new Set([cursor]);
  render();
  const epoch = playEpoch;
  try {
    initAudio();
    await audio.resume();
    if (epoch !== playEpoch) return;
    if (audio.state !== 'running') throw Error(tr('audioUnavailable'));
    const missing = [...currentInstruments().map((voice) => voice.name), 'drums'].filter(
      (name) => !banks[name]?.ready,
    );
    if (missing.some((name) => bankFiles(name).length))
      $('playStatus').textContent = tr('loadingSamples');
    synthFallback = (await Promise.all(missing.map(loadBank))).includes(false);
    if (epoch !== playEpoch) return;
    updateMix();
    master.gain.cancelScheduledValues(audio.currentTime);
    master.gain.setValueAtTime(0, audio.currentTime);
    master.gain.linearRampToValueAtTime(0.8, audio.currentTime + 0.03);
    // Without barlines playback starts on the chosen chord; with them, on its bar, or at the
    // top of the loop when the chord lies outside it.
    const range = playRange(),
      from = chart ? chart[progression[cursor].bar].start : progression[cursor].start;
    transportOffset =
      from >= range.start && from < range.start + range.length ? from - range.start : 0;
    transportBeat = 0;
    visibleBeat = -1;
    nextBeatAt = audio.currentTime + 0.065;
    $('play').textContent = tr('stop');
    $('play').classList.add('play-active');
    $('play').setAttribute('aria-pressed', 'true');
    timer = setInterval(schedule, 25);
    schedule();
  } catch (e) {
    stop();
    $('error').textContent = e.message || tr('audioFailed');
  }
}

// Moves every chord by `delta` semitones and leaves the rest of the text as it was written:
// barlines, line breaks, N.C., % and time signatures.
function transpose(delta) {
  try {
    const pieces = $('chords').value.split(/(\s+|[,;|])/),
      isChord = (piece) => /^[A-Ga-g]/.test(piece) && !REST.test(piece),
      parsed = pieces.filter(isChord).map(parseChord);
    if (!parsed.length) throw Error(tr('empty'));
    stop();
    // Keep the writer's accidental preference: a progression written in sharps stays in sharps.
    const accidentals = parsed.map((c) => c.accidental),
      useSharps = accidentals.includes('#') && !accidentals.includes('b'),
      names = useSharps ? sharpNames : flatNames;
    let i = 0;
    $('chords').value = pieces
      .map((piece) => {
        if (!isChord(piece)) return piece;
        const chord = parsed[i++];
        return (
          names[mod(chord.root + delta)] +
          chord.quality +
          (chord.bassName ? '/' + names[mod(chord.bass + delta)] : '')
        );
      })
      .join('');
    const kept = loop;
    signature = '';
    render();
    loop = kept;
    draw();
  } catch (e) {
    $('error').textContent = e.message;
  }
}
function accepts(t) {
  const filter = $('toneFilter').value;
  return (
    filter === 'all' ||
    (filter === 'root' && (t.degree === 1 || t.bass)) ||
    (filter === 'triad' && ([1, 3, 5].includes(t.degree) || t.bass)) ||
    (filter === 'guide' && [3, 7].includes(t.degree))
  );
}

const natural = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11},
  letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const flatNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const sharpNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// Each tone is [semitone distance, diatonic degree]; spelling follows the chord.
const qualities = {
  '': [
    [0, 1],
    [4, 3],
    [7, 5],
  ],
  m: [
    [0, 1],
    [3, 3],
    [7, 5],
  ],
  5: [
    [0, 1],
    [7, 5],
  ],
  6: [
    [0, 1],
    [4, 3],
    [7, 5],
    [9, 6],
  ],
  m6: [
    [0, 1],
    [3, 3],
    [7, 5],
    [9, 6],
  ],
  7: [
    [0, 1],
    [4, 3],
    [7, 5],
    [10, 7],
  ],
  maj7: [
    [0, 1],
    [4, 3],
    [7, 5],
    [11, 7],
  ],
  m7: [
    [0, 1],
    [3, 3],
    [7, 5],
    [10, 7],
  ],
  mMaj7: [
    [0, 1],
    [3, 3],
    [7, 5],
    [11, 7],
  ],
  dim: [
    [0, 1],
    [3, 3],
    [6, 5],
  ],
  dim7: [
    [0, 1],
    [3, 3],
    [6, 5],
    [9, 7],
  ],
  m7b5: [
    [0, 1],
    [3, 3],
    [6, 5],
    [10, 7],
  ],
  aug: [
    [0, 1],
    [4, 3],
    [8, 5],
  ],
  sus2: [
    [0, 1],
    [2, 2],
    [7, 5],
  ],
  sus4: [
    [0, 1],
    [5, 4],
    [7, 5],
  ],
  '7sus4': [
    [0, 1],
    [5, 4],
    [7, 5],
    [10, 7],
  ],
  add9: [
    [0, 1],
    [4, 3],
    [7, 5],
    [14, 9],
  ],
  'm(add9)': [
    [0, 1],
    [3, 3],
    [7, 5],
    [14, 9],
  ],
  9: [
    [0, 1],
    [4, 3],
    [7, 5],
    [10, 7],
    [14, 9],
  ],
  maj9: [
    [0, 1],
    [4, 3],
    [7, 5],
    [11, 7],
    [14, 9],
  ],
  m9: [
    [0, 1],
    [3, 3],
    [7, 5],
    [10, 7],
    [14, 9],
  ],
  11: [
    [0, 1],
    [4, 3],
    [7, 5],
    [10, 7],
    [14, 9],
    [17, 11],
  ],
  m11: [
    [0, 1],
    [3, 3],
    [7, 5],
    [10, 7],
    [14, 9],
    [17, 11],
  ],
  13: [
    [0, 1],
    [4, 3],
    [7, 5],
    [10, 7],
    [14, 9],
    [17, 11],
    [21, 13],
  ],
  m13: [
    [0, 1],
    [3, 3],
    [7, 5],
    [10, 7],
    [14, 9],
    [17, 11],
    [21, 13],
  ],
  '7b5': [
    [0, 1],
    [4, 3],
    [6, 5],
    [10, 7],
  ],
  '7#5': [
    [0, 1],
    [4, 3],
    [8, 5],
    [10, 7],
  ],
  '7b9': [
    [0, 1],
    [4, 3],
    [7, 5],
    [10, 7],
    [13, 9],
  ],
  '7#9': [
    [0, 1],
    [4, 3],
    [7, 5],
    [10, 7],
    [15, 9],
  ],
};
const mod = (n) => ((n % 12) + 12) % 12;
// Other spellings of the supported qualities. Keys are matched after normalizeQuality().
const aliases = {
  maj: '',
  ma7: 'maj7',
  ma9: 'maj9',
  M7: 'maj7',
  M9: 'maj9',
  Δ: 'maj7',
  Δ7: 'maj7',
  min: 'm',
  min6: 'm6',
  min7: 'm7',
  min9: 'm9',
  min11: 'm11',
  min13: 'm13',
  mi: 'm',
  mi7: 'm7',
  mi9: 'm9',
  '-': 'm',
  '-6': 'm6',
  '-7': 'm7',
  '-9': 'm9',
  '-11': 'm11',
  '-13': 'm13',
  ø: 'm7b5',
  ø7: 'm7b5',
  Ø: 'm7b5',
  Ø7: 'm7b5',
  min7b5: 'm7b5',
  '°': 'dim',
  '°7': 'dim7',
  o: 'dim',
  o7: 'dim7',
  '+': 'aug',
  '7+': '7#5',
  '+7': '7#5',
  aug7: '7#5',
  '7sus': '7sus4',
  sus: 'sus4',
  mmaj7: 'mMaj7',
  'm(maj7)': 'mMaj7',
  minmaj7: 'mMaj7',
  madd9: 'm(add9)',
  'm(add2)': 'm(add9)',
  add2: 'add9',
};
function normalizeQuality(q) {
  // iReal Pro's shorthand: ^ is the major-seventh triangle, - is minor, h is half-diminished.
  if (q === '^') return 'maj7';
  let out = q.replace(/\^/g, 'maj').replace(/^h9/, 'm9b5').replace(/^h7?/, 'm7b5');
  // Word-based qualities are case-insensitive (Maj7, MIN, Dim); single letters are not (M7 ≠ m7).
  if (/^(maj|min|dim|aug|sus|add)/i.test(out)) out = out.toLowerCase();
  out = out.replace(/^(mi|-)maj7$/i, 'mMaj7');
  // Parenthesised alterations: 7(b9), m7(b5), 7(#5).
  out = out.replace(/\((b5|#5|b9|#9)\)$/, '$1');
  if (Object.hasOwn(aliases, out)) return aliases[out];
  return out.replace(/^-/, 'm').replace(/^mmaj/, 'mMaj');
}
// Works out the tones of a quality the table does not list, by reading it piece by piece:
// C7b13, Cmaj7#11, C13sus, Cm69, C7#9#5, Calt... Returns null when a piece makes no sense.
function buildQuality(quality) {
  let rest = quality.replace(/[()]/g, '').replace(/Maj/g, 'maj').replace(/6\/9/, '69');
  const take = (pattern) => {
    const found = rest.match(pattern);
    if (found) rest = rest.slice(found[0].length);
    return found;
  };
  let third = [4, 3],
    fifth = [7, 5],
    seventh = null,
    major = false;
  const added = new Map(); // degree -> semitones; 9 can hold two (b9 and #9)
  const add = (degree, semi) => added.set(`${degree}:${semi}`, [semi, degree]);
  if (take(/^(min|mi|m)(?!aj)/)) third = [3, 3];
  if (take(/^dim|^o(?![a-z])/)) {
    third = [3, 3];
    fifth = [6, 5];
    if (take(/^7/)) seventh = [9, 7];
  }
  if (take(/^aug|^\+/)) fifth = [8, 5];
  if (take(/^(maj|ma|M)/)) major = true;
  const number = take(/^(69|13|11|9|7|6|5|2|4)/);
  const flat7 = () => (seventh ??= major ? [11, 7] : [10, 7]);
  switch (number?.[0]) {
    case '69':
      add(6, 9);
      add(9, 14);
      break;
    case '13':
      flat7();
      add(9, 14);
      add(13, 21);
      break;
    case '11':
      flat7();
      add(9, 14);
      add(11, 17);
      break;
    case '9':
      flat7();
      add(9, 14);
      break;
    case '7':
      flat7();
      break;
    case '6':
      add(6, 9);
      break;
    case '5':
      third = null;
      break;
    case '2':
      add(9, 14);
      break;
    case '4':
      third = [5, 4];
      break;
  }
  while (rest) {
    let found;
    if (take(/^sus2/)) third = [2, 2];
    else if (take(/^sus4?/)) third = [5, 4];
    else if ((found = take(/^add(\d+)/))) {
      const semi = {2: 14, 3: 4, 4: 17, 6: 9, 9: 14, 11: 17, 13: 21}[found[1]];
      if (semi === undefined) return null;
      if (found[1] === '3') third = [4, 3];
      else add({2: 9, 4: 11}[found[1]] ?? Number(found[1]), semi);
    } else if (take(/^alt/)) {
      // The altered dominant: no natural fifth or ninth.
      flat7();
      fifth = null;
      add(9, 13);
      add(9, 15);
      add(13, 20);
    } else if ((found = take(/^([b#])(\d+)/))) {
      const shift = found[1] === '#' ? 1 : -1;
      if (found[2] === '5') fifth = [7 + shift, 5];
      else if (found[2] === '9') {
        added.delete('9:14');
        add(9, 14 + shift);
      } else if (found[2] === '11' && shift > 0) {
        added.delete('11:17');
        add(11, 18);
      } else if (found[2] === '13' && shift < 0) {
        added.delete('13:21');
        add(13, 20);
      } else if (found[2] === '6' && shift < 0) add(6, 8);
      else return null;
    } else if (take(/^(maj|ma|M)7/)) seventh = [11, 7];
    else if (take(/^7/)) flat7();
    else return null;
  }
  const order = (a, b) => a[1] - b[1] || a[0] - b[0];
  return [[0, 1], third, fifth, seventh, ...added.values()].filter(Boolean).sort(order);
}
function parseChord(raw) {
  const clean = raw.replaceAll('♭', 'b').replaceAll('♯', '#').replace(/[‒–—]/g, '-'),
    // A slash chord names its bass after the stroke; the 6/9 quality has a digit there.
    slash = clean.match(/^(.+)\/([A-Ga-g])([#b]?)$/),
    match = (slash ? slash[1] : clean).match(/^([A-Ga-g])([#b]?)(.*)$/);
  if (!match) throw Error(tr('unknown', {raw}));
  const rootLetter = match[1].toUpperCase(),
    acc = match[2],
    q = normalizeQuality(match[3]),
    intervals = Object.hasOwn(qualities, q) ? qualities[q] : buildQuality(q);
  if (!intervals) throw Error(tr('unsupported', {raw}));
  const pitch = (letter, accidental) =>
      mod(natural[letter] + (accidental === '#' ? 1 : accidental === 'b' ? -1 : 0)),
    root = pitch(rootLetter, acc);
  const tones = intervals.map(([semi, degree]) => {
    const pc = mod(root + semi),
      letter = letters[(letters.indexOf(rootLetter) + degree - 1) % 7];
    let diff = mod(pc - natural[letter]);
    if (diff > 6) diff -= 12;
    const name = letter + (diff > 0 ? '#'.repeat(diff) : 'b'.repeat(-diff)),
      major = [0, 2, 4, 5, 7, 9, 11][(degree - 1) % 7];
    let delta = mod(semi - major);
    if (delta > 6) delta -= 12;
    return {
      pc,
      name,
      degree,
      label: degree === 1 ? 'R' : (delta > 0 ? '#'.repeat(delta) : 'b'.repeat(-delta)) + degree,
    };
  });
  const chord = {name: rootLetter + acc + q, root, accidental: acc, tones, quality: q, intervals};
  if (slash) {
    // The note under a slash chord is the bass player's note: it is marked on the fretboard,
    // and added when it is not a chord tone (C/D).
    const bassName = slash[2].toUpperCase() + slash[3],
      bass = pitch(slash[2].toUpperCase(), slash[3]),
      tone = tones.find((t) => t.pc === bass);
    if (tone) tone.bass = true;
    else tones.push({pc: bass, name: bassName, degree: 0, label: '/', bass: true});
    Object.assign(chord, {name: `${chord.name}/${bassName}`, bass, bassName});
  }
  return chord;
}
function svgNode(tag, attrs = {}, text) {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text !== undefined) n.textContent = text;
  return n;
}
// Reads the textarea into `progression`. Returns false (and shows the error) when it does not parse.
function parseProgression() {
  let read;
  try {
    read = readChart($('chords').value, beatsPerChord());
  } catch (e) {
    stop();
    $('error').textContent = e.message;
    $('chords').setAttribute('aria-invalid', 'true');
    return false;
  }
  $('error').textContent = '';
  $('chords').removeAttribute('aria-invalid');
  const key = read.bars
    ? read.bars.map((bar) => bar.beats + ':' + bar.slots.map((i) => read.slots[i].name)).join('|')
    : beatsPerChord() + '/' + read.slots.map((c) => c.name).join('|');
  if (key !== signature) {
    // Changing only the beats per chord keeps the place and the selection.
    const names = read.slots.map((c) => c.name).join('|'),
      sameChords = !read.bars && !chart && names === progression.map((c) => c.name).join('|');
    stop();
    signature = key;
    setChart(read);
    $('loopFrom').value = $('loopTo').value = '';
    if (!sameChords) {
      cursor = 0;
      selected = new Set(progression.length <= 3 ? progression.map((_, i) => i) : [0]);
    }
  }
  return true;
}
// Parse, draw and remember the settings: what every user action calls.
function render() {
  if (!parseProgression()) return false;
  draw();
  savePreferences();
  return true;
}
let drawnSignature = '',
  stepButtons = [],
  barBoxes = [];
// Lights up the bar being played and keeps it in view inside the chart, without moving the page.
function markBar(index) {
  barBoxes.forEach((box, i) => box.classList.toggle('now', i === index));
  const box = barBoxes[index],
    list = $('progression');
  if (!box || typeof box.offsetTop !== 'number') return;
  const top = box.offsetTop - list.offsetTop;
  if (top < list.scrollTop || top + box.offsetHeight > list.scrollTop + list.clientHeight)
    list.scrollTop = Math.max(0, top - box.offsetHeight);
}
function drawProgression(unique) {
  const list = $('progression');
  if (drawnSignature === signature && stepButtons.length === progression.length) {
    // Same sequence as last time (e.g. the backing moved on): only the selection changed.
    stepButtons.forEach((button, i) => button.setAttribute('aria-pressed', selected.has(i)));
    return;
  }
  drawnSignature = signature;
  stepButtons = progression.map((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = c.rest ? 'step rest' : 'step';
    b.style.setProperty('--chord', c.rest ? 'transparent' : colors[unique.indexOf(c.name)]);
    b.setAttribute('aria-pressed', selected.has(i));
    const title = document.createElement('strong');
    title.textContent = c.name;
    if (chart) b.append(title);
    else {
      const small = document.createElement('small');
      small.textContent = `${i + 1} / ${progression.length}`;
      b.append(small, title);
    }
    b.addEventListener('click', (e) => {
      stop();
      cursor = i;
      if (e.shiftKey) {
        if (selected.has(i)) selected.delete(i);
        else selected.add(i);
      } else selected = new Set([i]);
      render();
    });
    return b;
  });
  // With barlines the chords are laid out as a chart, bar by bar; without, as a row of steps.
  barBoxes = (chart ?? []).map((bar, n) => {
    const box = document.createElement('div'),
      number = document.createElement('small');
    box.className = 'bar';
    number.className = 'num';
    number.textContent = n + 1;
    box.append(number, ...bar.slots.map((i) => stepButtons[i]));
    return box;
  });
  list.className = chart ? 'progression chart' : 'progression';
  list.replaceChildren(...(chart ? barBoxes : stepButtons));
}
// Draws the progression, fretboard and legend from the current state. No parsing, no storage.
function draw() {
  const unique = [...new Set(progression.filter((c) => !c.rest).map((c) => c.name))];
  colors = unique.map((_, i) => colorAt(i));
  const chords = [
    ...new Set(
      [...selected]
        .sort((a, b) => a - b)
        .filter((i) => progression[i] && !progression[i].rest)
        .map((i) => progression[i].name),
    ),
  ].map((name) => ({
    ...progression.find((c) => c.name === name),
    color: colors[unique.indexOf(name)],
  }));
  drawProgression(unique);
  // A whole song in the box: show a few lines of it, in smaller type.
  const lines = $('chords').value.trim().split('\n').length;
  $('chords').rows = Math.min(4, lines);
  $('chords').classList.toggle('long', lines > 1);
  drawLoop();
  drawSong();
  if (timer === null) beatLights(chart ? chart[0].beats : freeBarBeats());
  $('beats').disabled = Boolean(chart);
  $('selectionStatus').textContent = tr('selection', {
    total: progression.length,
    selected: selected.size,
    distinct: chords.length,
  });
  const common = Array.from({length: 12}, (_, pc) => ({
    pc,
    matches: chords.filter((c) => c.tones.some((t) => t.pc === pc && accepts(t))),
  })).filter((x) => x.matches.length > 1);
  $('commonNotes').textContent =
    chords.length > 1
      ? tr('common') +
        (common
          .map((x) =>
            [
              ...new Set(
                x.matches.flatMap((c) => c.tones.filter((t) => t.pc === x.pc).map((t) => t.name)),
              ),
            ].join('/'),
          )
          .join(' · ') || tr('none'))
      : tr('commonHint');
  $('detail').textContent = tr('detailHint');
  const fretCount = Number($('frets').value),
    tuning = $('tuning').value,
    strings = tuning === '5' ? [7, 2, 9, 4, 11] : tuning === 'drop' ? [7, 2, 9, 2] : [7, 2, 9, 4];
  const cell = 76,
    left = 70,
    top = 68,
    row = 80,
    width = left + (fretCount + 1) * cell + 30,
    height = top + (strings.length - 1) * row + 64;
  const svg = svgNode('svg', {
    viewBox: `0 0 ${width} ${height}`,
    role: 'img',
    'aria-label': tr('boardAria', {
      chords: chords.map((c) => c.name).join(', '),
      strings: strings.length,
      frets: fretCount,
    }),
  });
  svg.style.minWidth = `${Math.max(850, (fretCount + 1) * 56)}px`;
  svg.append(
    svgNode('rect', {
      x: left + cell / 2,
      y: top - 35,
      width: fretCount * cell,
      height: (strings.length - 1) * row + 70,
      rx: 8,
      fill: '#202b32',
    }),
  );
  for (let f = 0; f <= fretCount; f++) {
    let x = left + f * cell;
    svg.append(
      svgNode('text', {x, y: 24, fill: '#a5b5be', 'text-anchor': 'middle', 'font-size': 15}, f),
    );
    if (f > 0)
      svg.append(
        svgNode('line', {
          x1: x - cell / 2,
          x2: x - cell / 2,
          y1: top - 35,
          y2: height - 30,
          stroke: f === 1 ? '#a5b5be' : '#46555f',
          'stroke-width': f === 1 ? 5 : 2,
        }),
      );
    if ([3, 5, 7, 9, 12, 15, 17, 19, 21, 24].includes(f)) {
      for (const dx of f % 12 === 0 ? [-7, 7] : [0])
        svg.append(svgNode('circle', {cx: x + dx, cy: height - 14, r: 3, fill: '#7f919c'}));
    }
  }
  strings.forEach((open, s) => {
    const y = top + s * row;
    svg.append(
      svgNode(
        'text',
        {x: 22, y: y + 6, fill: '#a5b5be', 'text-anchor': 'middle', 'font-size': 20},
        flatNames[open],
      ),
    );
    svg.append(
      svgNode('line', {
        x1: left - 23,
        x2: width - 16,
        y1: y,
        y2: y,
        stroke: '#78868e',
        'stroke-width': 1.5 + s * 0.6,
      }),
    );
    for (let f = 0; f <= fretCount; f++) {
      const pc = mod(open + f),
        matches = chords.flatMap((chord, i) => {
          const tone = chord.tones.find((t) => t.pc === pc && accepts(t));
          return tone ? [{chord, tone, i}] : [];
        }),
        x = left + f * cell;
      if (!matches.length || ($('commonOnly').checked && matches.length < 2)) {
        if ($('others').checked)
          svg.append(
            svgNode(
              'text',
              {x, y: y + 5, fill: '#7d8e98', 'text-anchor': 'middle', 'font-size': 13},
              flatNames[pc],
            ),
          );
        continue;
      }
      const g = svgNode('g', {
        'data-pc': pc,
        'data-fret': f,
        'data-string': s,
        'data-chords': matches.map((m) => m.chord.name).join(','),
      });
      g.append(
        svgNode(
          'title',
          {},
          matches.map((m) => `${m.chord.name}: ${m.tone.name} (${m.tone.label})`).join(' · ') +
            ' · ' +
            tr('fret', {fret: f}),
        ),
      );
      const radius = 24;
      if (matches.length === 1)
        g.append(svgNode('circle', {cx: x, cy: y, r: radius, fill: matches[0].chord.color}));
      else
        matches.forEach((m, i) => {
          const start = -Math.PI / 2 + (i * 2 * Math.PI) / matches.length,
            end = start + (2 * Math.PI) / matches.length;
          g.append(
            svgNode('path', {
              d: `M ${x} ${y} L ${x + radius * Math.cos(start)} ${y + radius * Math.sin(start)} A ${radius} ${radius} 0 0 1 ${x + radius * Math.cos(end)} ${y + radius * Math.sin(end)} Z`,
              fill: m.chord.color,
            }),
          );
        });
      if (matches.some((m) => m.tone.degree === 1))
        g.append(
          svgNode('circle', {
            cx: x,
            cy: y,
            r: radius + 3,
            fill: 'none',
            stroke: '#f6f9fa',
            'stroke-width': 2,
          }),
        );
      // The bass note of a slash chord: a dashed ring, outside the root ring when both apply.
      if (matches.some((m) => m.tone.bass))
        g.append(
          svgNode('circle', {
            cx: x,
            cy: y,
            r: radius + 7,
            fill: 'none',
            stroke: '#ffd166',
            'stroke-width': 2.5,
            'stroke-dasharray': '5 4',
          }),
        );
      const allLabels = [
        ...new Set(
          matches.map((m) => ($('labels').value === 'degrees' ? m.tone.label : m.tone.name)),
        ),
      ];
      const labels = allLabels.length > 3 ? [allLabels[0], `+${allLabels.length - 1}`] : allLabels;
      labels.forEach((label, i) =>
        g.append(
          svgNode(
            'text',
            {
              x,
              y: y + 5 + (i - (labels.length - 1) / 2) * 14,
              fill: '#10201e',
              'font-size': labels.length > 1 ? 11 : 15,
              'font-weight': 750,
              'text-anchor': 'middle',
            },
            label,
          ),
        ),
      );
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => {
        $('detail').textContent =
          tr('position', {string: flatNames[open], fret: f}) +
          matches.map((m) => `${m.chord.name} → ${m.tone.name} (${m.tone.label})`).join(' · ');
      });
      svg.append(g);
    }
  });
  $('board').replaceChildren(svg);
  $('boardTitle').textContent =
    `${chords.length > 5 ? tr('comparison', {total: chords.length}) : chords.map((c) => c.name).join(' / ') || tr('select')} · ${tr('frets', {frets: fretCount})}`;
  $('legend').replaceChildren(
    ...chords.map((c, i) => {
      const card = document.createElement('div');
      card.className = 'chord-card';
      card.style.setProperty('--chord', c.color);
      const title = document.createElement('div');
      title.className = 'chord-title';
      const swatch = document.createElement('span');
      swatch.className = 'swatch';
      swatch.style.background = c.color;
      title.append(swatch, document.createTextNode(c.name));
      card.append(title);
      const tones = document.createElement('div');
      tones.className = 'tones';
      c.tones.forEach((t) => {
        const item = document.createElement('span');
        item.className = 'tone';
        item.append(document.createTextNode(t.name));
        const small = document.createElement('small');
        small.textContent = t.label;
        item.append(small);
        tones.append(item);
      });
      card.append(tones);
      return card;
    }),
  );
}
// ---------------------------------------------------------------- songs
// Songs come from the songbook kept in this browser, from the built-in forms, or from
// whatever is pasted or dropped in (see songs.js). Loading one writes it into the text box
// as a chart, so it can still be edited by hand.
let song = null, // where the text came from: {id, title, composer, builtin}
  songbook = [];
const isChordSymbol = (token) => {
  try {
    parseChord(token);
    return true;
  } catch {
    return false;
  }
};
// A song as text for the box: four bars to a line, chords in this app's spelling. Symbols it
// cannot read become N.C., and a bar keeps at most one chord per beat; both are counted.
function chartText(source) {
  let lost = 0,
    meter = '',
    beats = 4;
  const bars = source.bars.map((bar) => {
    let prefix = '';
    if (bar.meter && bar.meter !== meter) {
      if (meter || bar.meter !== '4/4') prefix = bar.meter + ' ';
      meter = bar.meter;
      beats = Math.min(12, Math.max(1, Number(meter.split('/')[0]) || 4));
    }
    const names = (bar.chords.length ? bar.chords : ['N.C.']).map((symbol) => {
      if (REST.test(symbol)) return 'N.C.';
      try {
        return parseChord(symbol).name;
      } catch {
        lost++;
        return 'N.C.';
      }
    });
    lost += Math.max(0, names.length - beats);
    return prefix + names.slice(0, beats).join(' ');
  });
  const lines = [];
  for (let i = 0; i < bars.length; i += 4) lines.push(bars.slice(i, i + 4).join(' | ') + ' |');
  return {text: lines.join('\n'), lost};
}
// The groove that suits a style as iReal and chord sites name them, or null to leave it alone.
function grooveForStyle(style, beats) {
  if (beats === 3) return 'waltz';
  const name = (style || '').toLowerCase(),
    table = [
      [/waltz/, 'waltz'],
      [/bossa|samba|latin|afro|cha|rumba|mambo|salsa|calypso/, 'bossa'],
      [/ballad|slow/, 'ballad'],
      [/funk|soul|r&b|rnb|disco|fusion|hip/, 'funk'],
      [/swing|bop|jazz|stride|gypsy|dixie|modal|turnaround|ii-v|stud/, 'swing'],
      [/shuffle|blues|12\/8|new orleans/, 'shuffle'],
      [
        /rock|pop|even|straight|country|folk|reggae|gospel|trad|classic|flamenco|tecnica/,
        'straight',
      ],
    ];
  return table.find(([pattern]) => pattern.test(name))?.[1] ?? null;
}
// Puts a song in the text box with its tempo and a groove to match. Returns how many chords
// could not be kept.
function loadSong(source) {
  const {text, lost} = chartText(source),
    firstMeter = source.bars.find((bar) => bar.meter)?.meter,
    beats = firstMeter ? Number(firstMeter.split('/')[0]) : 4,
    groove = source.settings?.groove ?? grooveForStyle(source.style, beats),
    bpm = source.settings?.bpm ?? source.bpm;
  stop();
  $('chords').value = text;
  song = {
    id: source.id ?? Songs.idOf(source),
    title: source.title || tr('untitled'),
    composer: source.composer || '',
    builtin: Boolean(source.builtin),
  };
  if (groove && Object.hasOwn(grooves, groove)) $('groove').value = groove;
  if (bpm) $('bpm').value = String(Math.min(300, Math.max(30, Math.round(bpm))));
  signature = '';
  render();
  return lost;
}
function drawSong() {
  $('song').hidden = !song;
  if (!song) return;
  $('songTitle').textContent = song.title;
  $('songInfo').textContent = [song.composer, chart ? tr('songBars', {n: chart.length}) : '']
    .filter(Boolean)
    .join(' · ');
}
// Reads pasted text or a file, saves what it finds and returns the saved songs.
async function addSongs(text, name = '') {
  const saved = [];
  for (const found of Songs.read(text, isChordSymbol, name).songs) {
    const record = await Songs.save({...found, title: found.title || tr('untitled')});
    if (record) saved.push(record);
  }
  return saved;
}
function closeSongs() {
  $('songsDialog').close?.();
}
// One song is opened straight away; several are just added to the list.
async function importSongs(sources) {
  const saved = [];
  for (const [text, name] of sources) saved.push(...(await addSongs(text, name)));
  songbook = await Songs.all();
  if (!saved.length) $('songsStatus').textContent = tr('songNone');
  else if (saved.length === 1) {
    const lost = loadSong(saved[0]);
    $('songsStatus').textContent = '';
    $('error').textContent = lost ? tr('songLost', {n: lost}) : '';
    closeSongs();
  } else $('songsStatus').textContent = tr('songAdded', {n: saved.length});
  drawSongs();
  return saved;
}
function drawSongs() {
  const query = $('songSearch').value,
    row = (record, removable) => {
      const item = document.createElement('div'),
        open = document.createElement('button'),
        title = document.createElement('strong'),
        meta = document.createElement('small');
      item.className = 'song-row';
      open.type = 'button';
      title.textContent = record.title;
      meta.textContent = [record.composer, record.style, tr('songBars', {n: record.bars.length})]
        .filter(Boolean)
        .join(' · ');
      open.append(title, meta);
      open.addEventListener('click', () => {
        const lost = loadSong(record);
        $('error').textContent = lost ? tr('songLost', {n: lost}) : '';
        closeSongs();
      });
      item.append(open);
      if (removable) {
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'remove';
        remove.textContent = '×';
        remove.setAttribute('aria-label', tr('songDelete', {title: record.title}));
        remove.addEventListener('click', async () => {
          if (!window.confirm(tr('songDeleteConfirm', {title: record.title}))) return;
          await Songs.remove(record.id);
          songbook = await Songs.all();
          drawSongs();
        });
        item.append(remove);
      }
      return item;
    },
    heading = (key) => {
      const h = document.createElement('h3');
      h.textContent = tr(key);
      return h;
    },
    mine = Songs.search(songbook, query),
    forms = Songs.search(Songs.library(language), query),
    parts = [heading('songMine')];
  if (mine.length) parts.push(...mine.map((record) => row(record, true)));
  else {
    const empty = document.createElement('p');
    empty.className = 'hint';
    empty.textContent = tr(songbook.length ? 'songNoMatch' : 'songEmpty');
    parts.push(empty);
  }
  if (forms.length)
    parts.push(heading('songLibrary'), ...forms.map((record) => row(record, false)));
  $('songList').replaceChildren(...parts);
}
// Tempo and groove chosen for a saved song are kept with it.
async function rememberSongSettings() {
  if (!song || song.builtin) return;
  const record = (await Songs.all()).find((saved) => saved.id === song.id);
  if (record)
    await Songs.save({
      ...record,
      settings: {bpm: Number($('bpm').value), groove: $('groove').value},
    });
}
// The bars to repeat, from the two number boxes (counted from 1). Anything incomplete or out
// of range means the whole piece.
function readLoop() {
  const from = Number($('loopFrom').value),
    to = Number($('loopTo').value),
    valid =
      chart &&
      Number.isInteger(from) &&
      Number.isInteger(to) &&
      from >= 1 &&
      to >= from &&
      to <= chart.length &&
      !(from === 1 && to === chart.length);
  loop = valid ? {from: from - 1, to: to - 1} : null;
  if (timer !== null) start();
  else draw();
}
function drawLoop() {
  $('loopBox').hidden = !chart;
  barBoxes.forEach((box, i) =>
    box.classList.toggle('looped', Boolean(loop) && i >= loop.from && i <= loop.to),
  );
  if (!chart) return;
  $('loopFrom').max = $('loopTo').max = String(chart.length);
  // The boxes show the loop in force; a half-typed one is left alone until it is complete.
  if (loop) {
    $('loopFrom').value = String(loop.from + 1);
    $('loopTo').value = String(loop.to + 1);
  }
}
function savePreferences() {
  try {
    const prefs = {language, song};
    for (const id of [
      'chords',
      'tuning',
      'frets',
      'labels',
      'toneFilter',
      'bpm',
      'beats',
      'groove',
      'instrument',
      'instrument2',
      'instrument2Volume',
      'pianoVolume',
      'drumsVolume',
    ])
      prefs[id] = $(id).value;
    for (const id of ['others', 'commonOnly', 'pianoEnabled', 'drumsEnabled'])
      prefs[id] = $(id).checked;
    localStorage.setItem('bassChordLab.v1', JSON.stringify(prefs));
  } catch {}
}
$('language').addEventListener('change', () => {
  language = $('language').value === 'it' ? 'it' : 'en';
  applyLanguage();
  // Saved separately: the choice must stick even while the progression does not parse.
  if (!render()) savePreferences();
});
$('transposeDown').addEventListener('click', () => transpose(-1));
$('transposeUp').addEventListener('click', () => transpose(1));
$('selectAll').addEventListener('click', () => {
  stop();
  selected = new Set(progression.map((_, i) => i));
  render();
});
$('selectNone').addEventListener('click', () => {
  stop();
  selected = new Set();
  render();
});
$('previous').addEventListener('click', () => {
  stop();
  step(-1);
});
$('next').addEventListener('click', () => {
  stop();
  step(1);
});
$('play').addEventListener('click', () => (timer === null ? start() : stop()));
for (const id of [
  'pianoEnabled',
  'drumsEnabled',
  'pianoVolume',
  'instrument2Volume',
  'drumsVolume',
])
  $(id).addEventListener('input', () => {
    updateMix();
    savePreferences();
  });
for (const id of ['bpm', 'beats', 'groove', 'instrument', 'instrument2'])
  $(id).addEventListener('change', () => {
    if (timer !== null) start();
    // The beats per chord are part of how the text is read.
    else if (id === 'beats') render();
    savePreferences();
    if (id === 'bpm' || id === 'groove') rememberSongSettings();
  });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stop();
});
$('chords').addEventListener('input', stop);
$('chords').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    render();
  }
});
$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  render();
});
for (const id of ['tuning', 'frets', 'labels', 'others', 'toneFilter', 'commonOnly'])
  $(id).addEventListener('change', render);
document.querySelectorAll('[data-chords]').forEach((b) =>
  b.addEventListener('click', () => {
    song = null;
    $('chords').value = b.dataset.chords;
    render();
  }),
);
$('reset').addEventListener('click', () => {
  song = null;
  $('chords').value = 'F7, C7';
  $('tuning').value = '4';
  $('frets').value = '12';
  $('labels').value = 'notes';
  $('others').checked = false;
  $('commonOnly').checked = false;
  $('toneFilter').value = 'all';
  stop();
  signature = '';
  render();
});
$('openSongs').addEventListener('click', async () => {
  $('songsStatus').textContent = '';
  songbook = await Songs.all();
  drawSongs();
  $('songsDialog').showModal?.();
});
$('songsClose').addEventListener('click', closeSongs);
$('songSearch').addEventListener('input', drawSongs);
$('songAdd').addEventListener('click', async () => {
  const saved = await importSongs([[$('songPaste').value, '']]);
  if (saved.length) $('songPaste').value = '';
});
$('songFiles').addEventListener('change', async () => {
  const sources = [];
  for (const file of $('songFiles').files) sources.push([await file.text(), file.name]);
  $('songFiles').value = '';
  await importSongs(sources);
});
$('songBackup').addEventListener('click', async () => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([await Songs.backup()], {type: 'application/json'}));
  link.download = 'bass-chord-lab-songs.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
});
for (const id of ['loopFrom', 'loopTo']) $(id).addEventListener('change', readLoop);
$('loopClear').addEventListener('click', () => {
  $('loopFrom').value = $('loopTo').value = '';
  readLoop();
});
try {
  const prefs = JSON.parse(localStorage.getItem('bassChordLab.v1'));
  if (prefs) {
    if (['en', 'it'].includes(prefs.language)) language = prefs.language;
    for (const id of [
      'chords',
      'tuning',
      'frets',
      'labels',
      'toneFilter',
      'bpm',
      'beats',
      'groove',
      'instrument',
      'instrument2',
      'instrument2Volume',
      'pianoVolume',
      'drumsVolume',
    ])
      if (typeof prefs[id] === 'string') $(id).value = prefs[id];
    $('others').checked = !!prefs.others;
    $('commonOnly').checked = !!prefs.commonOnly;
    for (const id of ['pianoEnabled', 'drumsEnabled'])
      if (typeof prefs[id] === 'boolean') $(id).checked = prefs[id];
    if (prefs.song && typeof prefs.song.title === 'string') song = prefs.song;
  }
} catch {}
applyLanguage();
render();
