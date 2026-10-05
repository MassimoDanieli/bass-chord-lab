'use strict';
// Reading songs: iReal Pro links, MusicXML files, ChordPro and plain text with the chords
// above the words; a songbook kept in the browser; a small library of public-domain forms.
//
// Ported from Manico 4.0.0 (github.com/MassimoDanieli/accordi_di_basso, same author), where
// the form rules were checked bar by bar against iReal Pro's own MusicXML export on five
// standards (Alice In Wonderland, Caravan, And The Angels Sing, Butterfly, Blues Connotation):
// 283 bars played, identical chord for chord.
//
// A song is {title, composer, key, style, bpm, bars}; a bar is {chords: [symbols], meter}.
// Chord symbols are kept as written in the source; the app turns them into its own spelling.
const Songs = (() => {
  // ---------------------------------------------------------------- form
  // What the iReal body means, as learned from the bench:
  //   { }        repeat; a close on an already closed bar attaches to the last real one
  //   N1 N2 N3   endings; the scan looks ahead for the active number, skipping everything
  //   S          segno (where D.S. goes back to)
  //   Q          coda: the first is the jump point, the second the target
  //   <text>     D.C./D.S./Fine/counts like 3x; attaches to the bar of the next chord, or to
  //              the closed bar if a close comes first
  //   Kcl, x     repeat the previous bar          r   repeat the previous two bars
  //   p          restrike the previous chord (consecutive p collapse)
  //   W[/X]      the previous chord, possibly over a new bass
  //   n          N.C.: no harmony, but the bar exists
  //   T##        time signature, carried bar by bar (also mid-song)
  const TIMES_RE = /(?:^|[^0-9a-z])(\d+)x(?![a-z])/i;
  const CHORD_RE = /^([A-G][b#]?)((?:sus|alt|add|[0-9^\-oh+#b])*)(\/[A-G][b#]?)?/;

  /** From a plain iReal body to the written bars, with their form marks. */
  function readBody(body) {
    body = body.replace(/XyQ/g, ' ');
    const bars = [];
    let meter = '';
    let pending = [],
      pendingSegno = false,
      pendingCoda = false,
      codas = 0;
    const fresh = () => ({
      chords: [],
      words: '',
      meter,
      opens: false,
      closes: false,
      ending: 0,
      dacapo: false,
      dalsegno: false,
      fine: false,
      segno: false,
      nc: false,
    });
    let cur = fresh();

    const mark = (bar, text) => {
      if (/D\.C\./i.test(text)) bar.dacapo = true;
      if (/D\.S\./i.test(text)) bar.dalsegno = true;
      if (/Fine/i.test(text) && !/al Fine/i.test(text)) bar.fine = true;
      const times = text.match(TIMES_RE);
      if (times) bar.times = +times[1];
      bar.words = bar.words ? bar.words + ',' + text : text;
    };
    const arrive = () => {
      pending.forEach((text) => mark(cur, text));
      pending = [];
      if (pendingSegno) {
        cur.segno = true;
        pendingSegno = false;
      }
      if (pendingCoda) {
        codas++;
        if (codas === 1) cur.tocoda = true;
        else cur.codastart = true;
        pendingCoda = false;
      }
    };
    const alive = () => cur.chords.length > 0 || cur.nc;
    const flush = () => {
      if (alive() || cur.closes || cur.ending) bars.push(cur);
      cur = fresh();
    };
    const closed = () => {
      const target = alive() ? cur : bars[bars.length - 1];
      if (target) pending.forEach((text) => mark(target, text));
      pending = [];
    };
    const lastChord = () =>
      cur.chords.length
        ? cur.chords[cur.chords.length - 1]
        : bars.length
          ? bars[bars.length - 1].chords.slice(-1)[0]
          : null;

    let i = 0;
    while (i < body.length) {
      const c = body[i];
      if (c === '<') {
        const k = body.indexOf('>', i);
        pending.push(body.slice(i + 1, k < 0 ? body.length : k));
        i = k < 0 ? body.length : k + 1;
        continue;
      }
      if (c === '{') {
        flush();
        cur.opens = true;
        i++;
        continue;
      }
      if (c === '}') {
        closed();
        if (alive()) {
          cur.closes = true;
          flush();
        } else if (bars.length) bars[bars.length - 1].closes = true;
        i++;
        continue;
      }
      if (c === 'Z') {
        // The final Z attaches pending marks; LZ is an ordinary inner barline.
        if (body[i - 1] !== 'L') closed();
        flush();
        i++;
        continue;
      }
      if (c === '|' || c === ']' || c === '[') {
        flush();
        i++;
        continue;
      }
      if (c === 'N' && /\d/.test(body[i + 1])) {
        flush();
        cur.ending = +body[i + 1];
        i += 2;
        continue;
      }
      if (c === '*') {
        i += 2;
        continue;
      }
      if (c === 'T' && /\d\d/.test(body.slice(i + 1, i + 3))) {
        meter = body[i + 1] + '/' + body[i + 2];
        cur.meter = meter;
        i += 3;
        continue;
      }
      if (c === 'S') {
        if (alive()) cur.segno = true;
        else pendingSegno = true;
        i++;
        continue;
      }
      if (c === 'Q') {
        if (alive()) {
          codas++;
          if (codas === 1) cur.tocoda = true;
          else cur.codastart = true;
        } else pendingCoda = true;
        i++;
        continue;
      }
      if (c === 'n') {
        arrive();
        cur.nc = true;
        i++;
        continue;
      }
      if (c === 'p') {
        const previous = lastChord();
        if (previous) {
          arrive();
          if (cur.chords[cur.chords.length - 1] !== previous) cur.chords.push(previous);
        }
        i++;
        continue;
      }
      if (c === 'W') {
        const m = body.slice(i).match(/^W(\/[A-G][b#]?)?/);
        const previous = lastChord();
        if (previous) {
          arrive();
          cur.chords.push(previous.replace(/\/[A-G][b#]?$/, '') + (m[1] || ''));
        }
        i += m[0].length;
        continue;
      }
      if (body.slice(i, i + 3) === 'Kcl') {
        const before = alive() ? cur : bars[bars.length - 1];
        const chords = before ? [...before.chords] : [];
        flush();
        cur.chords = chords;
        arrive();
        flush();
        i += 3;
        continue;
      }
      if (c === 'x') {
        const before = alive() ? cur : bars[bars.length - 1];
        const chords = before ? [...before.chords] : [];
        if (alive()) flush();
        cur.chords = chords;
        arrive();
        flush();
        i++;
        continue;
      }
      if (c === 'r') {
        const two = bars.slice(-2);
        flush();
        two.forEach((bar) => {
          cur.chords = [...bar.chords];
          cur.nc = bar.nc;
          flush();
        });
        i++;
        continue;
      }
      if (' \t\nlsfUY,.L()'.includes(c)) {
        i++;
        continue;
      }
      const m = body.slice(i).match(CHORD_RE);
      if (m && m[0]) {
        arrive();
        cur.chords.push(m[0]);
        i += m[0].length;
        continue;
      }
      i++;
    }
    closed();
    flush();
    return bars;
  }

  /**
   * Unrolls the form as it is played: repeats with their counts, endings even out of place,
   * dal segno, the jump to the coda, da capo to the Fine or to ending N.
   */
  function unroll(bars) {
    const out = [];
    let i = 0,
      anchor = 0,
      afterDC = false,
      afterDS = false,
      seekCoda = false,
      rounds = 0;
    const passes = {};
    const dcBar = bars.find((bar) => bar.dacapo);
    const dcTarget = dcBar ? ((dcBar.words || '').match(/al (\d)/) || [])[1] : null;
    const dsBar = bars.find((bar) => bar.dalsegno);
    const dsCoda = dsBar && /al Coda/i.test(dsBar.words || '');
    const segnoAt = bars.findIndex((bar) => bar.segno);
    const codaAt = bars.findIndex((bar) => bar.codastart);

    while (i < bars.length && rounds++ < 2000) {
      const bar = bars[i];
      if (bar.opens) anchor = i;
      const pass = passes[anchor] || 1;
      const active = afterDC && dcTarget ? +dcTarget : pass;
      if (bar.ending && bar.ending !== active) {
        while (
          i < bars.length &&
          !bars[i].closes &&
          !(bars[i].ending && bars[i].ending !== bar.ending)
        )
          i++;
        if (i < bars.length && bars[i].closes) i++;
        continue;
      }
      out.push(bar);
      if (afterDC && bar.fine) break;
      if (bar.tocoda && afterDS && seekCoda && codaAt >= 0) {
        seekCoda = false;
        i = codaAt;
        continue;
      }
      if (bar.closes && !afterDC) {
        const times = bar.times || 2;
        if (pass < times) {
          passes[anchor] = pass + 1;
          i = anchor;
          continue;
        }
      }
      if (bar.dalsegno && !afterDS && segnoAt >= 0) {
        afterDS = true;
        seekCoda = !!dsCoda;
        i = segnoAt;
        continue;
      }
      if (bar.dacapo && !afterDC) {
        afterDC = true;
        i = 0;
        anchor = 0;
        continue;
      }
      i++;
    }
    return out;
  }
  const played = (bars) => unroll(bars).map((bar) => ({chords: bar.chords, meter: bar.meter}));

  // ---------------------------------------------------------------- iReal Pro links
  // irealb: Title=Composer==Style=Key==<marker+body>=Style=bpm=...
  // The body follows the marker and is scrambled in blocks of 50 characters; the old
  // irealbook format is plain.
  const MARKER = '1r34LbKcu7';

  function unscramble50(block) {
    const a = block.split('');
    let t;
    for (let i = 0; i < 5; i++) {
      t = a[i];
      a[i] = a[49 - i];
      a[49 - i] = t;
    }
    for (let i = 10; i < 24; i++) {
      t = a[i];
      a[i] = a[49 - i];
      a[49 - i] = t;
    }
    return a.join('');
  }
  function unscramble(s) {
    let out = '';
    while (s.length > 50) {
      out += unscramble50(s.slice(0, 50));
      s = s.slice(50);
    }
    return out + s;
  }

  /** The songs in an iReal link (a playlist holds many), with the form unrolled. */
  function readIReal(text) {
    let s = (text || '').trim();
    try {
      s = decodeURIComponent(s.replace(/\+/g, '%20'));
    } catch (e) {
      /* the link is already plain */
    }
    s = s.replace(/^irealb(ook)?:\/\//, '');

    const songs = [];
    s.split('===').forEach((part) => {
      const f = part.split('=');
      if (f.length < 6) return;
      // The body is found by its marker, not its position: app versions differ in the
      // number of empty fields.
      let body = f.find((field) => field.includes(MARKER));
      let key = f[4] || f[3] || '';
      let style = '',
        bpm = 0;
      if (body) {
        const k = f.indexOf(body);
        style = f[k + 1] || '';
        bpm = +(f[k + 2] || 0) || 0;
        body = unscramble(body.slice(body.indexOf(MARKER) + MARKER.length));
      } else {
        // irealbook, plain: Title=Composer=Style=Key=n=body
        body = f[5];
        key = f[3] || '';
        style = f[2] || '';
        if (!body) return;
      }
      const bars = played(readBody(body));
      if (bars.length > 1)
        songs.push({title: f[0] || '', composer: f[1] || '', key, style, bpm, bars});
    });
    return songs;
  }

  // ---------------------------------------------------------------- MusicXML
  // Uncompressed .musicxml/.xml, as exported by iReal Pro or MuseScore. Chords are the
  // <harmony> elements; the form marks are explicit and go through the same unroller.
  const KINDS = {
    major: '',
    minor: 'm',
    dominant: '7',
    'major-seventh': 'maj7',
    'minor-seventh': 'm7',
    diminished: 'o',
    'diminished-seventh': 'o7',
    'half-diminished': 'm7b5',
    augmented: '+',
    'suspended-fourth': 'sus',
    'suspended-second': 'sus2',
    'major-sixth': '6',
    'minor-sixth': 'm6',
    'dominant-ninth': '9',
    'minor-ninth': 'm9',
    'major-ninth': 'maj9',
    'minor-11th': 'm11',
    'dominant-11th': '11',
    'dominant-13th': '13',
    'minor-13th': 'm13',
    'minor-major': 'mmaj7',
    power: '5',
  };
  const alter = (a) => (a === '1' ? '#' : a === '-1' ? 'b' : '');

  function harmonySymbol(harmony) {
    const step = (harmony.match(/<root-step>([A-G])<\/root-step>/) || [])[1];
    if (!step) return null;
    const rootAlter = (harmony.match(/<root-alter>(-?\d)<\/root-alter>/) || [])[1];
    const text = (harmony.match(/<kind[^>]*text="([^"]*)"/) || [])[1];
    const kind = (harmony.match(/<kind[^>]*>([a-z0-9-]+)<\/kind>/) || [, ''])[1];
    let s =
      step +
      alter(rootAlter) +
      (text !== undefined ? text : KINDS[kind] !== undefined ? KINDS[kind] : kind);
    for (const degree of harmony.matchAll(/<degree>[\s\S]*?<\/degree>/g)) {
      const value = (degree[0].match(/<degree-value>(\d+)/) || [])[1];
      const change = (degree[0].match(/<degree-alter>(-?\d)/) || [])[1];
      s += alter(change) + value;
    }
    const bassStep = (harmony.match(/<bass-step>([A-G])<\/bass-step>/) || [])[1];
    const bassAlter = (harmony.match(/<bass-alter>(-?\d)<\/bass-alter>/) || [])[1];
    if (bassStep) s += '/' + bassStep + alter(bassAlter);
    return s;
  }

  function readMeasures(xml) {
    const bars = [];
    let codas = 0,
      meter = '';
    for (const m of xml.matchAll(/<measure[^>]*>([\s\S]*?)<\/measure>/g)) {
      const body = m[1];
      const time = body.match(/<beats>(\d+)<\/beats>[\s\S]*?<beat-type>(\d+)<\/beat-type>/);
      if (time) meter = time[1] + '/' + time[2];
      const chords = [];
      for (const h of body.matchAll(/<harmony[\s\S]*?<\/harmony>/g)) {
        const symbol = harmonySymbol(h[0]);
        if (symbol) chords.push(symbol);
      }
      const words = [...body.matchAll(/<words>([^<]*)<\/words>/g)].map((w) => w[1]).join(',');
      const bar = {
        chords,
        words,
        meter,
        opens: /<repeat direction="forward"/.test(body),
        closes: /<repeat direction="backward"/.test(body),
        ending: +((body.match(/<ending type="start" number="(\d+)"/) || [])[1] || 0),
        dacapo: /dacapo="/.test(body),
        dalsegno: /dalsegno="/.test(body),
        fine: /fine="yes"/.test(body),
        segno: /<segno\/>/.test(body),
      };
      if (/<coda\/>/.test(body)) {
        codas++;
        if (codas === 1) bar.tocoda = true;
        else bar.codastart = true;
      }
      const times = body.match(/<repeat[^>]*times="(\d+)"/) || words.match(TIMES_RE);
      if (times) bar.times = +times[1];
      bars.push(bar);
    }
    return bars;
  }

  function readMusicXML(xml) {
    const title = (xml.match(/<work-title>([^<]*)<\/work-title>/) || [, ''])[1].trim();
    const composer = (xml.match(/<creator type="composer">([^<]*)<\/creator>/) || [, ''])[1].trim();
    const bars = readMeasures(xml);
    if (!bars.length) return [];
    return [{title, composer, key: '', style: '', bpm: 0, bars: played(bars)}];
  }

  // ---------------------------------------------------------------- text and ChordPro
  // Plain text: the first non-chord line is the title, the second the author. A line is a
  // chord line when nearly all its tokens are valid symbols; barlines divide the bars when
  // they are there, otherwise each chord is one bar.
  const SECTION_RE =
    /^\s*\[?\s*(intro|verse|verso|chorus|ritornello|bridge|ponte|solo|outro|coda|interlude|pre-chorus|strofa)\b[^\]]*\]?\s*:?\s*$/i;
  const LATIN = {DO: 'C', RE: 'D', MI: 'E', FA: 'F', SOL: 'G', LA: 'A', SI: 'B'};

  /**
   * Latin notation (LAm, MI7, SIb, DO7+) to letters. The root must be capitalised, so the
   * words "mi", "si", "la" in lyrics do not become chords. The Italian 7+ is a major seventh.
   */
  function fromLatin(token) {
    const R = '(?:DO|RE|MI|FA|SOL|LA|SI|Do|Re|Mi|Fa|Sol|La|Si)';
    const m = token.match(new RegExp('^(' + R + ')([#b]?)([^/]*?)(/' + R + '[#b]?)?$'));
    if (!m) return token;
    let suffix = m[3] || '';
    if (/[A-Z]/.test(suffix)) return token; // real words, not suffixes
    suffix = suffix.replace(/^7\+$/, 'maj7').replace(/^2$/, 'sus2').replace(/^-/, 'm');
    let bass = '';
    if (m[4]) {
      const b = m[4].slice(1).match(new RegExp('^(' + R + ')([#b]?)$'));
      bass = '/' + LATIN[b[1].toUpperCase()] + (b[2] || '');
    }
    return LATIN[m[1].toUpperCase()] + m[2] + suffix + bass;
  }
  function clean(token) {
    token = token.replace(/^[([]+|[)\],.]+$/g, '').replace(/^N\.?C\.?$/i, 'N.C.');
    return fromLatin(token);
  }

  function readText(text, isChord) {
    const chordLike = (token) => {
      if (!token || token === '|') return false;
      if (token === 'N.C.') return true;
      if (/^\(?x\d+\)?$/i.test(token)) return false;
      return Boolean(isChord(token));
    };
    /** The tokens of a line of chords and barlines, or null when it is a line of words. */
    const chordLine = (line) => {
      // "Intro: Gm F": the section label must not sink the line.
      line = line.replace(/^\s*[A-Za-z]+\s*:\s*/, ' ');
      const tokens = line.trim().split(/\s+/).map(clean).filter(Boolean);
      if (!tokens.length) return null;
      const good = tokens.filter((token) => token === '|' || chordLike(token));
      if (!tokens.some(chordLike)) return null;
      if (good.length / tokens.length < 0.7) return null;
      return good;
    };
    /** Barlines divide the bars; without them each chord is one bar. */
    const toBars = (tokens) => {
      const bars = [];
      if (tokens.includes('|')) {
        let cur = [];
        tokens.forEach((token) => {
          if (token === '|') {
            if (cur.length) bars.push(cur);
            cur = [];
          } else cur.push(token);
        });
        if (cur.length) bars.push(cur);
      } else tokens.forEach((token) => bars.push([token]));
      return bars.map((chords) => ({chords: chords.filter((c) => c !== 'N.C.'), meter: ''}));
    };
    const chordPro = () => {
      const directive = (names) => {
        const m = text.match(new RegExp('\\{\\s*(?:' + names + ')\\s*:\\s*([^}]*)\\}', 'i'));
        return m ? m[1].trim() : '';
      };
      const bars = [];
      for (const line of text.split(/\r?\n/)) {
        if (/^\s*#/.test(line)) continue;
        const tokens = [...line.replace(/\{[^}]*\}/g, '').matchAll(/\[([^\]]+)\]/g)]
          .map((m) => clean(m[1]))
          .filter(chordLike);
        if (tokens.length) toBars(tokens).forEach((bar) => bars.push(bar));
      }
      if (!bars.length) return [];
      return [
        {
          title: directive('title|t'),
          composer: directive('artist|subtitle|st|composer'),
          key: '',
          style: '',
          bpm: +directive('tempo') || 0,
          bars,
        },
      ];
    };
    const plain = () => {
      const bars = [];
      const heading = [];
      for (const line of text.split(/\r?\n/)) {
        if (!line.trim()) continue;
        // Try it as a chord line first: "Intro: Gm F" is chords behind a label.
        const tokens = chordLine(line);
        if (tokens) {
          toBars(tokens).forEach((bar) => bars.push(bar));
          continue;
        }
        if (SECTION_RE.test(line)) continue;
        if (heading.length < 2 && !bars.length && line.trim().length < 80)
          heading.push(line.trim());
      }
      if (bars.length < 2) return [];
      return [
        {title: heading[0] || '', composer: heading[1] || '', key: '', style: '', bpm: 0, bars},
      ];
    };
    if (!text || !text.trim()) return [];
    const looksChordPro =
      /\{\s*(title|t|artist|subtitle|start_of_|comment)/i.test(text) ||
      /\[[A-G][^\]]*\]\w/.test(text);
    const songs = looksChordPro ? chordPro() : [];
    return songs.length ? songs : plain();
  }

  // ---------------------------------------------------------------- one entry point
  /**
   * Whatever was pasted or dropped: an iReal link (also inside an exported HTML page), a
   * songbook backup, MusicXML, ChordPro or plain text. `name` is the file name, when there
   * is one: it titles a song that does not declare its own.
   */
  function read(text, isChord, name = '') {
    text = String(text || '');
    const fallback = name.replace(/\.[^.]+$/, '');
    const titled = (songs) => songs.map((song) => ({...song, title: song.title || fallback || ''}));
    const link = text.match(/irealb(?:ook)?:\/\/[^"'<>\s]+/);
    if (link) return {kind: 'ireal', songs: titled(readIReal(link[0]))};
    if (/^\s*[[{]/.test(text)) {
      const songs = fromBackup(text);
      if (songs.length) return {kind: 'backup', songs};
    }
    if (/<score-partwise|<score-timewise/.test(text))
      return {kind: 'musicxml', songs: titled(readMusicXML(text))};
    return {kind: 'text', songs: titled(readText(text, isChord))};
  }

  // ---------------------------------------------------------------- songbook
  // Imported songs stay on the device, in IndexedDB. No server: the backup is a JSON file.
  // Where IndexedDB is missing or broken everything works the same for the session, in memory.
  const DB = 'bassChordLab',
    STORE = 'songs';
  let memory = new Map();
  let useIDB = typeof indexedDB !== 'undefined';
  let opening = null;

  function open() {
    if (!useIDB) return Promise.resolve(null);
    opening ??= new Promise((resolve) => {
      let request;
      try {
        request = indexedDB.open(DB, 1);
      } catch (e) {
        useIDB = false;
        resolve(null);
        return;
      }
      request.onupgradeneeded = () => request.result.createObjectStore(STORE, {keyPath: 'id'});
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        useIDB = false;
        resolve(null);
      };
    });
    return opening;
  }
  const done = (request) =>
    new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

  /** A song's identity: title and composer, lower case. */
  const idOf = (song) => ((song.title || '') + '|' + (song.composer || '')).toLowerCase().trim();
  const valid = (song) => song && song.title && Array.isArray(song.bars) && song.bars.length > 0;

  async function save(song) {
    if (!valid(song)) return null;
    const record = {
      id: idOf(song),
      title: song.title,
      composer: song.composer || '',
      key: song.key || '',
      style: song.style || '',
      bpm: song.bpm || 0,
      bars: song.bars.map((bar) => ({chords: [...(bar.chords || [])], meter: bar.meter || ''})),
      settings: song.settings || null,
      added: song.added || Date.now(),
    };
    const db = await open();
    if (!db) {
      memory.set(record.id, record);
      return record;
    }
    await done(db.transaction(STORE, 'readwrite').objectStore(STORE).put(record));
    return record;
  }
  async function all() {
    const db = await open();
    const list = db
      ? await done(db.transaction(STORE, 'readonly').objectStore(STORE).getAll())
      : [...memory.values()];
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }
  async function remove(id) {
    const db = await open();
    if (!db) {
      memory.delete(id);
      return;
    }
    await done(db.transaction(STORE, 'readwrite').objectStore(STORE).delete(id));
  }
  function search(list, query) {
    query = (query || '').toLowerCase().trim();
    if (!query) return list;
    return list.filter((song) =>
      [song.title, song.composer, song.style].some((field) =>
        (field || '').toLowerCase().includes(query),
      ),
    );
  }
  async function backup() {
    return JSON.stringify({bassChordLab: 'songbook', version: 1, songs: await all()}, null, 1);
  }
  /** Songs from a backup: this app's, or a Manico 4 songbook (Italian field names). */
  function fromBackup(text) {
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return [];
    }
    const list = Array.isArray(data) ? data : data && (data.songs || data.brani);
    if (!Array.isArray(list)) return [];
    return list
      .map((song) => ({
        ...song,
        style: song.style || song.stile || '',
        bars: (song.bars || []).map((bar) => ({
          chords: bar.chords || bar.accordi || [],
          meter: bar.meter || bar.metro || '',
        })),
      }))
      .filter(valid);
  }

  // ---------------------------------------------------------------- built-in forms
  // Harmonic forms, public-domain traditional tunes and essential reductions (basic
  // progressions are not subject to copyright; full charts of standards come from the
  // player's own iReal library). Each entry: [Italian name, English name, style, bpm, grid],
  // bars separated by spaces, chords inside a bar by commas.
  const LIBRARY = [
    [
      'Blues maggiore, 12 battute (Fa)',
      'Major blues, 12 bars (F)',
      'Blues',
      104,
      'F7 Bb7 F7 F7 Bb7 Bb7 F7 F7 C7 Bb7 F7 C7',
    ],
    [
      'Blues jazz, 12 battute (Sib)',
      'Jazz blues, 12 bars (Bb)',
      'Jazz blues',
      132,
      'Bb7 Eb7 Bb7 F-7,Bb7 Eb7 Edim7 Bb7 D-7,G7 C-7 F7 Bb7,G7 C-7,F7',
    ],
    [
      'Blues minore (Do)',
      'Minor blues (C)',
      'Blues',
      96,
      'C-7 C-7 C-7 C-7 F-7 F-7 C-7 C-7 Ab7 G7 C-7 G7',
    ],
    ['12 battute in Mi', '12 bars in E', 'Blues rock', 100, 'E7 E7 E7 E7 A7 A7 E7 E7 B7 A7 E7 B7'],
    [
      'Rhythm changes, sezione A (Sib)',
      'Rhythm changes, A section (Bb)',
      'Turnaround',
      160,
      'Bb^7,G-7 C-7,F7 Bb^7,G-7 C-7,F7 Bb7 Eb7,Edim7 Bb^7,F7 Bb6',
    ],
    [
      'Stile Autumn Leaves, sezione A',
      'Autumn Leaves style, A section',
      'II-V-I',
      120,
      'C-7 F7 Bb^7 Eb^7 A-7b5 D7b9 G-6 G-6',
    ],
    [
      'Stile Blue Bossa, prime otto',
      'Blue Bossa style, first eight',
      'Bossa jazz',
      116,
      'C-7 C-7 F-7 F-7 D-7b5 G7b9 C-7 C-7',
    ],
    [
      'Stile Song for My Father',
      'Song for My Father style',
      'Hard bop',
      126,
      'F-7 F-7 Eb7 Eb7 Db7 C7 F-7 F-7',
    ],
    [
      'Stile So What, vamp modale',
      'So What style, modal vamp',
      'Modal jazz',
      136,
      'D-7 D-7 D-7 D-7 Eb-7 Eb-7 D-7 D-7',
    ],
    ['Giro pop I-vi-IV-V (Do)', 'Pop loop I-vi-IV-V (C)', 'Pop / Soul', 118, 'C A-7 F G7'],
    ['Giro pop I-V-vi-IV (Do)', 'Pop loop I-V-vi-IV (C)', 'Pop', 72, 'C G A- F'],
    ['Giro reggae I-IV-I-V (La)', 'Reggae loop I-IV-I-V (A)', 'Reggae', 76, 'A D A E'],
    [
      'II-V-I che scende per quarte',
      'II-V-I moving down in fourths',
      'Studio',
      120,
      'D-7 G7 C^7 C^7 G-7 C7 F^7 F^7 C-7 F7 Bb^7 Bb^7 F-7 Bb7 Eb^7 Eb^7',
    ],
    ['II-V-I minore', 'Minor II-V-I', 'Studio', 110, 'D-7b5 G7b9 C-6 C-6 G-7b5 C7b9 F-6 F-6'],
    ['Turnaround I-VI-II-V (Do)', 'Turnaround I-VI-II-V (C)', 'Turnaround', 140, 'C^7 A7 D-7 G7'],
    ['Cadenza andalusa (La minore)', 'Andalusian cadence (A minor)', 'Flamenco', 112, 'A- G F E7'],
    [
      'Ciclo di quinte in dominanti',
      'Cycle of fifths in dominants',
      'Tecnica',
      90,
      'C7 F7 Bb7 Eb7 Ab7 Db7 Gb7 B7 E7 A7 D7 G7',
    ],
    [
      'Ciclo di terze maggiori',
      'Major thirds cycle',
      'Tecnica',
      100,
      'C^7 Eb7 Ab^7 B7 E^7 G7 C^7 C^7',
    ],
    [
      'Vamp dorico a due accordi',
      'Two-chord Dorian vamp',
      'Modale',
      96,
      'D-7 D-7 D-7 D-7 E-7 E-7 E-7 E-7',
    ],
    ['Canone di Pachelbel (Re)', 'Pachelbel canon (D)', 'Classico', 66, 'D A B- F# G D G A'],
    [
      'House of the Rising Sun (trad.)',
      'House of the Rising Sun (trad.)',
      'Folk',
      78,
      'A- C D F A- C E7 E7',
    ],
    ['Greensleeves (trad.)', 'Greensleeves (trad.)', 'Trad.', 90, 'A- C G E7 A- C E7 A-'],
    [
      'St. James Infirmary (trad.)',
      'St. James Infirmary (trad.)',
      'Trad. blues',
      84,
      'D- A7 D- D7 G- D- A7 D-',
    ],
    [
      'Amazing Grace (trad.)',
      'Amazing Grace (trad.)',
      'Gospel',
      70,
      'G G C G G G D7 D7 G G C G G D7 G G',
    ],
    ['Scarborough Fair (trad.)', 'Scarborough Fair (trad.)', 'Folk', 92, 'A- A- C A- A- G A- A-'],
    [
      'Sinner Man, vamp minore (trad.)',
      'Sinner Man, minor vamp (trad.)',
      'Trad.',
      132,
      'A- A- A- A- D- D- A- A- E7 D- A- A-',
    ],
  ];
  function library(language) {
    return LIBRARY.map(([it, en, style, bpm, grid]) => ({
      id: 'library|' + en.toLowerCase(),
      builtin: true,
      title: language === 'it' ? it : en,
      composer: '',
      key: '',
      style,
      bpm,
      bars: grid.split(' ').map((bar) => ({chords: bar.split(','), meter: ''})),
    }));
  }

  return {
    readBody,
    unroll,
    readIReal,
    readMusicXML,
    readText,
    read,
    idOf,
    save,
    all,
    remove,
    search,
    backup,
    fromBackup,
    library,
  };
})();
if (typeof module !== 'undefined') module.exports = Songs;
