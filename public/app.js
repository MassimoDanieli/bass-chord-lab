'use strict';
const $ = (id) => document.getElementById(id);
let language = 'en';
const translations = {
  en: {
    s0: 'See the chords. Find the notes.',
    s1: 'Compare chords on your bass fretboard.',
    s3: 'Your progression · separate chords with spaces, commas or |',
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
    s35: 'Chords volume',
    s36: 'Drums',
    s37: 'Drum volume',
    s38: 'Press Start backing: the instrument you choose plays the chords and drums keep time. You can mute either. The low register is left for you. Recorded instruments; without a connection the backing falls back to synthesized sounds.',
    s39: 'Fretboard',
    s40: 'Highest string at the top · fret 0 = open string',
    s41: 'Click a dot to see its degrees in each chord.',
    s42: 'Split dot = a tone shared by several chords. Light ring = the root of at least one chord. Hover over dots for details.',
    s43: 'Supported chords and how to use it',
    s44: 'International notation: C, D, E, F, G, A, B. Sharps # and flats b, including ♯ and ♭. Examples: F7, Bbmaj7, F#m7.',
    s45: 'Major, minor (m / min / −), 5, 6, m6, 7, maj7 (M7 / Δ7), m7, mMaj7, dim (°), dim7, m7b5 / ø7, aug / +, 7#5 / 7+, sus2, sus4, 7sus4, add9, m(add9), 9, maj9, m9, 11, m11, 13, m13, 7b5, 7b9, 7#9. Slash chords (C/E) are not supported in this preview.',
    s48: 'Enter a progression of any length and press Show. Each step lasts the selected number of beats, then the sequence loops. Use | to separate chords. Repeated chords are preserved. Select two or three chords with Shift + click for a clear comparison, or compare them all. The common tones filter shows notes present in at least two distinct selected chords. The backing is in 4/4 with six grooves: Straight, Swing, Shuffle, Bossa nova, Funk and Ballad. It does not loop identically: drums and chords change from bar to bar, the drummer plays a short fill every four bars and a bigger one, followed by a crash, before the progression starts again. The chord instrument (grand piano, electric piano, acoustic or electric guitar) plays the notes that define each chord. The instrument samples (about 2 MB) are downloaded the first time you start the backing. Changing BPM, beats or groove restarts from the current chord. Audio starts only after pressing Start backing and stops when you switch tabs. No installation required; without a connection the backing uses synthesized sounds. Your last settings are remembered in the browser when available.',
    s46: 'Explore the fretboard, one note at a time.',
    s47: 'Reset F7 / C7',
    s49: 'Backing track settings',
    s50: 'Examples',
    s51: 'Manico: transcribe and study bass lines',
    s53: 'Samples: Salamander Grand Piano by Alexander Holm (CC BY 3.0); Virtuosity Drums by Versilian Studios (CC0); acoustic guitar from the University of Iowa Musical Instrument Samples; electric guitar by Karoryfer Samples (CC0).',
    s54: 'Chord instrument',
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
    s3: 'La tua progressione · separa gli accordi con spazi, virgole o |',
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
    s35: 'Volume accordi',
    s36: 'Batteria',
    s37: 'Volume batteria',
    s38: 'Premi Avvia base: lo strumento che scegli suona gli accordi, la batteria tiene il tempo. Puoi spegnere ciascuno dei due. Il registro basso è libero per te. Strumenti reali campionati; senza connessione la base usa suoni sintetizzati.',
    s39: 'Tastiera',
    s40: 'Corda più acuta in alto · tasto 0 = corda a vuoto',
    s41: 'Clicca un pallino per leggere i suoi gradi nei diversi accordi.',
    s42: 'Pallino diviso = nota comune a più accordi. Anello chiaro = fondamentale di almeno un accordo. Passa sui pallini per i dettagli.',
    s43: 'Accordi supportati e come usarlo',
    s44: 'Notazione internazionale: C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si. Diesis # e bemolle b, anche ♯ e ♭. Esempi: F7, Bbmaj7, F#m7.',
    s45: 'Maggiori, minori (m / min / −), 5, 6, m6, 7, maj7 (M7 / Δ7), m7, mMaj7, dim (°), dim7, m7b5 / ø7, aug / +, 7#5 / 7+, sus2, sus4, 7sus4, add9, m(add9), 9, maj9, m9, 11, m11, 13, m13, 7b5, 7b9, 7#9. Gli accordi con basso indicato (C/E) non sono supportati in questa prova.',
    s48: 'Inserisci una progressione senza limite numerico di accordi e premi “Mostra”. Ogni elemento della sequenza dura il numero di beat impostato; la sequenza si ripete. Puoi usare | per separare gli accordi. Anche gli accordi ripetuti sono conservati. Per un confronto pulito seleziona due o tre accordi con Shift + clic; in alternativa confrontali tutti. Il filtro “note comuni” mostra le note presenti in almeno due accordi distinti selezionati. La base è in 4/4 con sei ritmi: Dritto, Swing, Shuffle, Bossa nova, Funk e Ballad. Non si ripete identica: batteria e accordi cambiano da una battuta all’altra, il batterista fa un breve fill ogni quattro battute e uno più grande, seguito da un piatto, prima che il giro ricominci. Lo strumento per gli accordi (pianoforte, piano elettrico, chitarra acustica o elettrica) suona le note che definiscono ogni accordo. I campioni degli strumenti (circa 2 MB) si scaricano la prima volta che avvii la base. Cambiare BPM, beat o ritmo riavvia dall’accordo corrente. L’audio parte solo dopo il clic su Avvia base; si ferma se passi a un’altra scheda. Nessuna installazione; senza connessione la base usa suoni sintetizzati. Le tue ultime impostazioni vengono ricordate nel browser, quando disponibile.',
    s46: 'Fatto per esplorare la tastiera, una nota alla volta.',
    s47: 'Ripristina F7 / C7',
    s49: 'Impostazioni della base',
    s50: 'Esempi',
    s51: 'Manico: trascrivi e studia le linee di basso',
    s53: 'Campioni: Salamander Grand Piano di Alexander Holm (CC BY 3.0); Virtuosity Drums di Versilian Studios (CC0); chitarra acustica dai Musical Instrument Samples dell’Università dell’Iowa; chitarra elettrica di Karoryfer Samples (CC0).',
    s54: 'Strumento per gli accordi',
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
function playingStatus(chord, index, beat, perChord) {
  const text = tr('playing', {
    chord: chord.name,
    index: index + 1,
    total: progression.length,
    beat: (beat % perChord) + 1,
    beats: perChord,
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
  $('play').textContent = tr(timer === null ? 'play' : 'stop');
  if (timer === null) $('playStatus').textContent = tr('ready');
  else if (visibleBeat >= 0) {
    const per = beatsPerChord();
    $('playStatus').textContent = playingStatus(progression[cursor], cursor, visibleBeat, per);
  }
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
function tokenize() {
  return $('chords')
    .value.trim()
    .split(/[\s,;|]+/)
    .filter(Boolean);
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
// Synthesized accompaniment: no downloaded samples, works offline.
let audio = null,
  master = null,
  pianoBus = null,
  drumBus = null,
  noiseBuffer = null,
  metalBuffer = null;
let audioVoices = new Set(),
  visualTimers = new Set(),
  playEpoch = 0,
  nextBeatAt = 0,
  transportBeat = 0,
  transportStart = 0,
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
  drumBus = audio.createGain();
  pianoBus.connect(master);
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
  pianoBus.connect(pianoSend);
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
const instruments = {
  piano: {
    folder: 'piano',
    notes: [45, 48, 51, 54, 57, 60, 63, 66, 69, 72],
    layers: 2,
    low: 58,
    rootLow: 44,
    level: 0.62,
    release: 0.1,
  },
  // No samples: the FM electric piano is the instrument.
  epiano: {low: 58, rootLow: 44},
  'guitar-acoustic': {
    folder: 'guitar-acoustic',
    notes: [40, 43, 46, 49, 52, 55, 58, 61, 64, 67],
    layers: 1,
    low: 52,
    rootLow: 40,
    level: 0.34,
    release: 0.12,
    guitar: true,
  },
  'guitar-electric': {
    folder: 'guitar-electric',
    notes: [40, 42, 45, 48, 51, 54, 57, 60, 63, 66],
    layers: 1,
    low: 52,
    rootLow: 40,
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
function sampleNote(name, midi, when, duration, level, hard) {
  const set = instruments[name],
    // The nearest recorded note, retuned by at most a semitone or two.
    nearest = set.notes.reduce((a, b) => (Math.abs(b - midi) < Math.abs(a - midi) ? b : a)),
    layer = hard && set.layers > 1 ? 2 : 1;
  playBuffer(
    banks[name].buffers[`${set.folder}/${nearest}-${layer}.mp3`],
    when,
    Math.pow(2, (midi - nearest) / 12),
    level,
    pianoBus,
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
function keysNote(midi, when, duration, level, strength) {
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
  env.connect(pianoBus);
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
function voicing(chord, low = 58, rootLow = 44) {
  const tones = qualities[chord.quality].map(([semi, degree]) => ({semi, degree}));
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
function compChord(chord, when, duration, velocity, withRoot, upStroke, register = 0) {
  const name = currentInstrument(),
    set = instruments[name],
    sampled = banks[name]?.ready,
    // The register shifts from bar to bar, so a returning chord is not always the same shape.
    {root, notes} = voicing(chord, set.low + register, set.rootLow),
    note = (midi, time, gain, strength) =>
      sampled
        ? sampleNote(name, midi, time, duration, set.level * gain, strength >= 0.85)
        : keysNote(midi, time, duration, 0.15 * gain, strength);
  if (set.guitar) {
    // A down stroke sweeps every string from the bass note; an up stroke catches the top three.
    const strings = upStroke ? notes.slice(-3).reverse() : [root, ...notes],
      spread = currentGroove().strumSpread ?? 0.014,
      gain = velocity / Math.sqrt(strings.length);
    strings.forEach((midi, i) => note(midi, when + i * spread, gain, velocity));
    return;
  }
  const gain = velocity / Math.sqrt(notes.length);
  // The root only marks each chord change; repeating it on every stab muddies the low end.
  if (withRoot) note(root, when, gain * 1.15, velocity * 0.6);
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
// on the last bar, before it comes round again; a shorter one gets it every eight bars, or it
// would never stop. Every other fourth bar ends with a small fill.
function fillKind(bar) {
  const loopBars = (progression.length * beatsPerChord()) / 4,
    period = Number.isInteger(loopBars) && loopBars >= 5 ? loopBars : 8,
    inPeriod = bar % period;
  if (inPeriod === period - 1) return 'big';
  return inPeriod % 4 === 3 ? 'small' : null;
}
const hits = (pattern) => [...pattern].map((letter) => HIT[letter] ?? 0);
const registers = {keys: [0, 0, 4, -3], guitar: [0, 0, 5]};
let plans = new Map(),
  plansFor = '',
  anticipated = new Set();
const lastFill = {small: -1, big: -1};
// Everything that is decided once per bar: which version of each part is played, the fill,
// the crash after a big fill, the register of the chords and how hard the bar is played.
function barPlan(bar) {
  const name = $('groove').value,
    groove = currentGroove(),
    guitar = Boolean(instruments[currentInstrument()].guitar),
    key = `${name}|${guitar}|${beatsPerChord()}|${signature}`;
  if (plansFor !== key) {
    plans.clear();
    plansFor = key;
  }
  if (plans.has(bar)) return plans.get(bar);
  const barSteps = groove.grid * 4,
    span = groove.span ?? 1,
    held = bar % span !== 0 && plans.get(bar - 1),
    previous = plans.get(bar - 1),
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
          register: bar === 0 ? 0 : pick(registers.keys, -1),
        },
    from = (bar % span) * barSteps,
    cut = (pattern) => pattern.slice(from, from + barSteps),
    drums = {};
  for (const [part, pattern] of Object.entries(groove.drums[choice.drums]))
    drums[part] = hits(cut(pattern));
  const energy = groove.energy ?? 1,
    kind = fillKind(bar),
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
  const comp = (pattern) => {
    const letters = cut(pattern);
    return {hits: hits(letters), push: [...letters].map((letter) => letter === 'a')};
  };
  const set = guitar ? registers.guitar : registers.keys,
    plan = {
      choice,
      fill,
      drums,
      keys: comp(groove.keys[choice.keys]),
      strum: comp(groove.strum[choice.strum]),
      register: set[choice.register % set.length],
      // A phrase leans forward: each bar a little stronger than the one before.
      scale: [0.94, 0.97, 1, 1.04][bar % 4],
    };
  plans.set(bar, plan);
  plans.delete(bar - 6);
  return plan;
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
  return [2, 4, 8].includes(Number($('beats').value)) ? Number($('beats').value) : 4;
}
function scheduleBeat(beat, when, epoch) {
  const perChord = beatsPerChord(),
    index = modIndex(transportStart + Math.floor(beat / perChord), progression.length),
    chord = progression[index],
    barBeat = beat % 4,
    seconds = beatSeconds(),
    groove = currentGroove(),
    grid = groove.grid,
    plan = barPlan(Math.floor(beat / 4)),
    keysOn = $('pianoEnabled').checked,
    drumsOn = $('drumsEnabled').checked,
    guitar = instruments[currentInstrument()].guitar,
    comp = guitar ? plan.strum : plan.keys,
    length = (guitar ? groove.strumLength : groove.keysLength) ?? 1,
    // Small random variation in how hard each hit lands.
    human = () => 0.92 + Math.random() * 0.16,
    stepSeconds = seconds / grid,
    ring = (steps) => Math.min(3.2, steps * stepSeconds * 0.94 * length);
  // The chord ends where the next one starts, or earlier if the next one is played ahead.
  const lastBeat = beat - (beat % perChord) + perChord - 1,
    lastPlan = barPlan(Math.floor(lastBeat / 4)),
    lastComp = guitar ? lastPlan.strum : lastPlan.keys,
    canPush = progression.length > 1;
  let chordEnd = (lastBeat + 1) * grid;
  for (let sub = 0; sub < grid && canPush; sub++)
    if (lastComp.push[(lastBeat % 4) * grid + sub]) chordEnd = lastBeat * grid + sub;
  for (let sub = 0; sub < grid; sub++) {
    const step = barBeat * grid + sub,
      time = when + sub * stepSeconds;
    if (drumsOn)
      for (const name of Object.keys(drumKit)) {
        const v = plan.drums[name]?.[step];
        if (v) playDrum(name, time, Math.min(1, v * plan.scale * human()));
      }
    if (!keysOn) continue;
    // Held over from an anticipation: this beat's chord is already sounding.
    if (sub === 0 && anticipated.delete(beat)) continue;
    const steps = beat * grid + sub;
    if (comp.push[step] && canPush && beat === lastBeat) {
      const nextPlan = barPlan(Math.floor((beat + 1) / 4)),
        nextComp = guitar ? nextPlan.strum : nextPlan.keys,
        afterLine = patternGap(nextComp.hits, ((beat + 1) % 4) * grid);
      anticipated.add(beat + 1);
      compChord(
        progression[modIndex(index + 1, progression.length)],
        time,
        ring(Math.min(grid - sub + afterLine, grid - sub + perChord * grid)),
        HIT.a * plan.scale * human(),
        true,
        false,
        plan.register,
      );
      continue;
    }
    // A new chord is always stated on its first beat, whatever the pattern says.
    const chordStart = sub === 0 && beat % perChord === 0,
      velocity = Math.abs(comp.hits[step]) || (chordStart ? 0.9 : 0);
    if (!velocity || steps >= chordEnd) continue;
    // Let the chord ring until the next hit, but never into the next chord.
    compChord(
      chord,
      time,
      ring(Math.min(patternGap(comp.hits, step), chordEnd - steps)),
      Math.min(1, velocity * plan.scale * human()),
      chordStart,
      comp.hits[step] < 0,
      plan.register,
    );
  }
  const callback = setTimeout(
    () => {
      visualTimers.delete(callback);
      if (epoch !== playEpoch || timer === null) return;
      visibleBeat = beat;
      cursor = index;
      if (beat % perChord === 0) {
        selected = new Set([cursor]);
        draw();
      }
      $('playStatus').textContent = playingStatus(chord, index, beat, perChord);
      document
        .querySelectorAll('.beat-light')
        .forEach((light, i) => light.classList.toggle('on', i === barBeat));
    },
    Math.max(0, (when - audio.currentTime) * 1000),
  );
  visualTimers.add(callback);
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
  document.querySelectorAll('.beat-light').forEach((light) => light.classList.remove('on'));
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
    const missing = [currentInstrument(), 'drums'].filter((name) => !banks[name]?.ready);
    if (missing.some((name) => bankFiles(name).length))
      $('playStatus').textContent = tr('loadingSamples');
    synthFallback = (await Promise.all(missing.map(loadBank))).includes(false);
    if (epoch !== playEpoch) return;
    updateMix();
    master.gain.cancelScheduledValues(audio.currentTime);
    master.gain.setValueAtTime(0, audio.currentTime);
    master.gain.linearRampToValueAtTime(0.8, audio.currentTime + 0.03);
    transportStart = cursor;
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

function transpose(delta) {
  try {
    const parsed = tokenize().map(parseChord);
    if (!parsed.length) throw Error(tr('empty'));
    stop();
    // Keep the writer's accidental preference: a progression written in sharps stays in sharps.
    const accidentals = parsed.map((c) => c.accidental);
    const useSharps = accidentals.includes('#') && !accidentals.includes('b');
    const names = useSharps ? sharpNames : flatNames;
    $('chords').value = parsed.map((c) => names[mod(c.root + delta)] + c.quality).join(' | ');
    signature = '';
    render();
  } catch (e) {
    $('error').textContent = e.message;
  }
}
function accepts(t) {
  const filter = $('toneFilter').value;
  return (
    filter === 'all' ||
    (filter === 'root' && t.degree === 1) ||
    (filter === 'triad' && [1, 3, 5].includes(t.degree)) ||
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
  // Word-based qualities are case-insensitive (Maj7, MIN, Dim); single letters are not (M7 ≠ m7).
  let out = /^(maj|min|dim|aug|sus|add)/i.test(q) ? q.toLowerCase() : q;
  out = out.replace(/^(mi|-)maj7$/i, 'mMaj7');
  // Parenthesised alterations: 7(b9), m7(b5), 7(#5).
  out = out.replace(/\((b5|#5|b9|#9)\)$/, '$1');
  return aliases[out] ?? out;
}
function parseChord(raw) {
  const clean = raw.replaceAll('♭', 'b').replaceAll('♯', '#').replace(/[‒–—]/g, '-'),
    match = clean.match(/^([A-Ga-g])([#b]?)(.*)$/);
  if (!match) throw Error(tr('unknown', {raw}));
  const rootLetter = match[1].toUpperCase(),
    acc = match[2],
    q = normalizeQuality(match[3]);
  if (!Object.hasOwn(qualities, q)) throw Error(tr('unsupported', {raw}));
  const root = mod(natural[rootLetter] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0));
  const tones = qualities[q].map(([semi, degree]) => {
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
  return {name: rootLetter + acc + q, root, accidental: acc, tones, quality: q};
}
function svgNode(tag, attrs = {}, text) {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text !== undefined) n.textContent = text;
  return n;
}
// Reads the textarea into `progression`. Returns false (and shows the error) when it does not parse.
function parseProgression() {
  let parsed;
  try {
    const tokens = tokenize();
    if (!tokens.length) throw Error(tr('empty'));
    parsed = tokens.map(parseChord);
  } catch (e) {
    stop();
    $('error').textContent = e.message;
    $('chords').setAttribute('aria-invalid', 'true');
    return false;
  }
  $('error').textContent = '';
  $('chords').removeAttribute('aria-invalid');
  const key = parsed.map((c) => c.name).join('|');
  if (key !== signature) {
    stop();
    signature = key;
    progression = parsed;
    cursor = 0;
    selected = new Set(parsed.length <= 3 ? parsed.map((_, i) => i) : [0]);
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
let drawnSignature = '';
function drawProgression(unique) {
  const list = $('progression');
  if (drawnSignature === signature && list.children.length === progression.length) {
    // Same sequence as last time (e.g. the backing moved on): only the selection changed.
    for (let i = 0; i < progression.length; i++)
      list.children[i].setAttribute('aria-pressed', selected.has(i));
    return;
  }
  drawnSignature = signature;
  list.replaceChildren(
    ...progression.map((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'step';
      b.style.setProperty('--chord', colors[unique.indexOf(c.name)]);
      b.setAttribute('aria-pressed', selected.has(i));
      const small = document.createElement('small');
      small.textContent = `${i + 1} / ${progression.length}`;
      const title = document.createElement('strong');
      title.textContent = c.name;
      b.append(small, title);
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
    }),
  );
}
// Draws the progression, fretboard and legend from the current state. No parsing, no storage.
function draw() {
  const unique = [...new Set(progression.map((c) => c.name))];
  colors = unique.map((_, i) => colorAt(i));
  const chords = [
    ...new Set(
      [...selected]
        .sort((a, b) => a - b)
        .map((i) => progression[i]?.name)
        .filter(Boolean),
    ),
  ].map((name) => ({
    ...progression.find((c) => c.name === name),
    color: colors[unique.indexOf(name)],
  }));
  drawProgression(unique);
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
function savePreferences() {
  try {
    const prefs = {language};
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
for (const id of ['pianoEnabled', 'drumsEnabled', 'pianoVolume', 'drumsVolume'])
  $(id).addEventListener('input', () => {
    updateMix();
    savePreferences();
  });
for (const id of ['bpm', 'beats', 'groove', 'instrument'])
  $(id).addEventListener('change', () => {
    if (timer !== null) start();
    savePreferences();
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
    $('chords').value = b.dataset.chords;
    render();
  }),
);
$('reset').addEventListener('click', () => {
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
      'pianoVolume',
      'drumsVolume',
    ])
      if (typeof prefs[id] === 'string') $(id).value = prefs[id];
    $('others').checked = !!prefs.others;
    $('commonOnly').checked = !!prefs.commonOnly;
    for (const id of ['pianoEnabled', 'drumsEnabled'])
      if (typeof prefs[id] === 'boolean') $(id).checked = prefs[id];
  }
} catch {}
applyLanguage();
render();
