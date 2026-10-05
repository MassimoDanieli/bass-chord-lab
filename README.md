# Bass Chord Lab

**EN / IT** · Offline bass chord visualizer with a synchronized piano and drum backing track.

## English

Download the repository and open `public/index.html` in Safari or Chrome. No installation or build is required; opened from disk the backing uses synthesized sounds, served over HTTP it uses the recorded instruments. Select **EN / IT** at the top; English is the initial language and the chosen language is remembered when browser storage is available.

Enter a progression such as `Dm7 | G7 | Cmaj7` and press **Show on fretboard**, or Cmd/Ctrl + Enter. Click a chord to study it alone; Shift + click adds or removes chords from a comparison.

Features:

- Progressions of any length, preserving repeated chords.
- Four or five strings, Drop D, and 12 / 15 / 24 frets.
- Chord colors, split dots for shared notes, root rings and note names or degrees.
- Root, triad, guide-tone and common-tone filters; semitone transposition.
- Backing track with recorded instruments: one or two chord instruments (grand piano, acoustic or electric guitar, or a synthesized electric piano) and a jazz drum kit, in six grooves: straight, swing, shuffle, bossa nova, funk and ballad.
- The bass register is left free: no chord instrument plays below E3, and their mix is low-cut.
- The backing does not loop identically: drum and chord figures change from bar to bar, phrases end with fills, a crash marks the return of the progression, chords are sometimes played ahead of the beat and in different registers.
- Adjustable BPM and 2 / 3 / 4 / 6 / 8 beats per chord, with independent volumes and instrument mutes.
- Charts with real bars: write barlines and each stretch is one bar, shared by its chords (`Cmaj7 A7 |` is two beats each). `N.C.` is a bar of rest, `%` repeats the bar before, `3/4` changes the meter from there on. The chords are then laid out as a lead sheet, bar by bar, and the bar being played is lit.
- Songs: paste an iReal Pro link, or open a MusicXML, ChordPro or plain-text file. Repeats, endings, codas and D.S./D.C. are written out in the order they are played, and the song brings its tempo and a matching groove. Songs are kept in the browser (IndexedDB), with search and a backup file; a small library of common forms is built in.
- Loop any range of bars; transposition moves the whole song and keeps its layout.
- Bars in 3/4 get a waltz, other meters a plain pulse.
- Bilingual labels, help, errors, tooltips and transport status.

Press **Start backing** to enable Web Audio. The chord instrument and the drums are recorded samples (about 1.5 MB, downloaded the first time the backing starts; see `public/samples/CREDITS.txt`). The chord instrument plays the notes that define each chord (3rd, 7th, alterations, top extension) inside one octave; guitars strum them, down and up strokes included. Grooves are charted in `public/app.js` one letter per subdivision, with several versions of each part; a plan made bar by bar chooses among them, adds a small fill every four bars and a big one before the progression comes round again, and varies the register of the chords. When the samples cannot be loaded, for example when the page is opened from disk, the backing falls back to synthesized sounds. The low register is left for live bass. Changing BPM, beats or groove restarts at the current chord. Editing the progression or switching tabs stops playback.

Chord symbols use international notation with sharps and flats, including iReal Pro's shorthand (`C^7`, `C-7`, `Ch7`). Beyond the listed types, any combination of extensions and alterations is spelled out (`7b13`, `maj7#11`, `7alt`, `13sus`, `69`). Slash chords such as `C/E` or `Dm7/G` mark the bass note on the fretboard with a dashed ring.

### Development

Production code lives in `public/` (`index.html`, `styles.css`, `app.js`, and `songs.js` for reading and keeping songs) and has no dependencies. With Node.js 18 or newer:

```sh
npm test
```

`tools/build-samples.py` rebuilds `public/samples/` from the original libraries (needs ffmpeg and numpy; not part of the site build).

Tests simulate the DOM and Web Audio APIs to check chord spelling, sequencing, audio scheduling, cancellation and EN / IT behavior, including language changes during playback. Layout and sound still need checks in a real browser.

For a local HTTP preview, run `python3 -m http.server 8000` from `public/` and open http://localhost:8000, or `npm run dev` to preview through Wrangler.

### Deployment

The site is deployed as static assets on Cloudflare Workers; `wrangler.jsonc` points at `public/`. Every push to `main` is built and deployed automatically once the repository is connected in the Cloudflare dashboard (Workers & Pages → Create → Import a repository; build command `npm run build` (which only runs the tests), deploy command `npx wrangler deploy`). A manual deploy from a machine logged in with Wrangler is `npm run deploy`.

---

## Italiano

Una piccola app offline per studiare gli accordi sulla tastiera del basso e suonare su una base di piano e batteria.

### Avvio

Scarica il repository e apri `public/index.html` con Safari o Chrome. Non servono installazioni; aperta da disco la base usa suoni sintetizzati, servita via HTTP usa gli strumenti campionati. Usa il selettore **EN / IT** in alto: la lingua iniziale è inglese e la scelta viene ricordata quando lo storage locale è disponibile. Premi **Avvia base** per abilitare l'audio.

### Funzioni

- Progressioni senza limite numerico di accordi, incluse le ripetizioni.
- Basso a quattro o cinque corde e accordatura Drop D; 12, 15 o 24 tasti.
- Colori per accordo e pallini divisi per le note comuni.
- Nomi delle note o gradi; filtri per fondamentali, triadi, guide tones e note comuni.
- Clic su un accordo per studiarlo; Shift + clic per confrontare più accordi.
- Trasposizione della progressione per semitoni.
- Base con strumenti reali campionati: uno o due strumenti per gli accordi (pianoforte, chitarra acustica o elettrica, oppure un piano elettrico sintetizzato) e batteria jazz; sei ritmi (dritto, swing, shuffle, bossa nova, funk, ballad), BPM regolabili e 2, 3, 4, 6 o 8 beat per accordo.
- Il registro del basso resta libero: nessuno strumento suona sotto il Mi3 e il loro mix è filtrato sui bassi.
- La base non si ripete identica: le figure di batteria e accordi cambiano da una battuta all'altra, le frasi finiscono con un fill, un piatto segna il ritorno del giro, gli accordi sono a volte anticipati e suonati in registri diversi.
- Volume e mute separati per piano e batteria; indicatore dei beat della battuta.
- Griglie con battute vere: con le stanghette ogni tratto è una battuta, divisa tra gli accordi che contiene (`Cmaj7 A7 |` sono due beat ciascuno). `N.C.` è una battuta di pausa, `%` ripete la precedente, `3/4` cambia il metro da lì in poi. Gli accordi sono disposti come su un lead sheet e la battuta che suona è illuminata.
- Brani: incolla un link iReal Pro, oppure apri un file MusicXML, ChordPro o di testo. Ritornelli, finali, coda e D.S./D.C. sono svolti nell'ordine in cui si suonano, e il brano porta con sé tempo e ritmo adatto. I brani restano nel browser (IndexedDB), con ricerca e backup; è inclusa una piccola raccolta di giri e forme.
- Loop su un intervallo di battute; la trasposizione sposta tutto il brano e ne conserva la disposizione.
- Le battute in 3/4 hanno un valzer, gli altri metri una pulsazione semplice.
- Impostazioni ricordate nel browser quando lo storage locale è disponibile.

Inserisci per esempio `Dm7 | G7 | Cmaj7` (una battuta ciascuno) oppure `Dm7, G7, Cmaj7` (ogni accordo dura il numero di beat impostato). Premi **Mostra sulla tastiera** oppure Cmd/Ctrl + Invio.

### Accordi

Notazione internazionale (C, D, E, F, G, A, B), diesis e bemolli anche Unicode. Tipi supportati: maggiore, minore, 5, 6, m6, 7, maj7, m7, mMaj7, dim, dim7, m7b5, aug, sus2, sus4, 7sus4, add9, m(add9), 9, maj9, m9, 11, m11, 13, m13, 7b5, 7#5, 7b9, 7#9. L'app mostra gli alias disponibili, come min7, M7 e ø7.

Sono lette anche le sigle di iReal Pro (`C^7`, `C-7`, `Ch7`) e qualsiasi combinazione di estensioni e alterazioni (`7b13`, `maj7#11`, `7alt`, `13sus`, `69`). Negli slash chords, come `C/E` o `Dm7/G`, la nota di basso è segnata sulla tastiera con un anello tratteggiato.

### Audio

Web Audio API. Lo strumento per gli accordi e la batteria sono campioni di strumenti reali (circa 1,5 MB, scaricati al primo avvio della base; crediti in `public/samples/CREDITS.txt`). Lo strumento suona le note che definiscono ogni accordo (3ª, 7ª, alterazioni, estensione più alta) dentro un'ottava; le chitarre le suonano a pennata, in giù e in su. Se i campioni non si possono caricare, per esempio aprendo la pagina da disco, la base usa suoni sintetizzati.

I ritmi sono scritti in `public/app.js` una lettera per suddivisione, con più versioni di ogni parte; un piano fatto battuta per battuta sceglie tra queste, aggiunge un piccolo fill ogni quattro battute e uno grande prima che il giro ricominci, e cambia il registro degli accordi. Cambiare BPM, beat per accordo o ritmo riavvia la base dall'accordo corrente. Modificare la progressione o passare a un'altra scheda ferma la riproduzione.

### Sviluppo e verifica

HTML, CSS e JavaScript sono in `public/` (`index.html`, `styles.css`, `app.js`, e `songs.js` per leggere e conservare i brani); nessuna dipendenza di produzione e nessun build necessario.

Con Node.js 18 o successivo:

```sh
npm test
```

I test verificano la logica degli accordi, la sequenza e la programmazione audio usando DOM e Web Audio simulati. Non sostituiscono le prove del layout e l'ascolto in un browser reale.

Per una prova locale via HTTP, da `public/`:

```sh
python3 -m http.server 8000
```

Apri http://localhost:8000. In alternativa `npm run dev` usa Wrangler.

### Pubblicazione

Il sito è pubblicato come asset statici su Cloudflare Workers: `wrangler.jsonc` punta a `public/`. Una volta collegato il repository nella dashboard di Cloudflare (Workers & Pages → Create → Import a repository; comando di build `npm run build` (esegue solo i test), comando di deploy `npx wrangler deploy`), ogni push su `main` viene pubblicato in automatico. Da una macchina autenticata con Wrangler si può anche usare `npm run deploy`.
