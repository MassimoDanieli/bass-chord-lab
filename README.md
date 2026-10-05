# Bass Chord Lab

**EN / IT** · Offline bass chord visualizer with a synchronized piano and drum backing track.

## English

Download the repository and open `public/index.html` in Safari or Chrome. No installation, build, external samples or Internet connection is required. Select **EN / IT** at the top; English is the initial language and the chosen language is remembered when browser storage is available.

Enter a progression such as `Dm7 | G7 | Cmaj7` and press **Show on fretboard**, or Cmd/Ctrl + Enter. Click a chord to study it alone; Shift + click adds or removes chords from a comparison.

Features:

- Progressions of any length, preserving repeated chords.
- Four or five strings, Drop D, and 12 / 15 / 24 frets.
- Chord colors, split dots for shared notes, root rings and note names or degrees.
- Root, triad, guide-tone and common-tone filters; semitone transposition.
- Looping synthesized electric piano and drums in three grooves: straight, swing and bossa nova.
- Adjustable BPM and 2 / 4 / 8 beats per chord, with independent volumes and instrument mutes.
- Bilingual labels, help, errors, tooltips and transport status.

Press **Start backing** to enable Web Audio. Everything is synthesized, with no recorded samples: an FM electric piano through a short synthetic room, and a drum kit built from oscillators and filtered noise. The piano plays the notes that define each chord (3rd, 7th, alterations, top extension) inside one octave, with the root only on chord changes. Straight has kick, snare on 2 and 4 and eighth-note hi-hats; swing has a ride cymbal, hi-hat on 2 and 4 and a delayed second eighth note; bossa nova has a two-bar clave on the rim. The low register is left for live bass. Changing BPM, beats or groove restarts at the current chord. Editing the progression or switching tabs stops playback.

Chord symbols use international notation with sharps and flats. Supported chord types and aliases are listed in the app. Slash chords such as `C/E` are not supported yet.

### Development

Production code lives in `public/` (`index.html`, `styles.css`, `app.js`) and has no dependencies. With Node.js 18 or newer:

```sh
npm test
```

Tests simulate the DOM and Web Audio APIs to check chord spelling, sequencing, audio scheduling, cancellation and EN / IT behavior, including language changes during playback. Layout and sound still need checks in a real browser.

For a local HTTP preview, run `python3 -m http.server 8000` from `public/` and open http://localhost:8000, or `npm run dev` to preview through Wrangler.

### Deployment

The site is deployed as static assets on Cloudflare Workers; `wrangler.jsonc` points at `public/`. Every push to `main` is built and deployed automatically once the repository is connected in the Cloudflare dashboard (Workers & Pages → Create → Import a repository; build command `npm run build` (which only runs the tests), deploy command `npx wrangler deploy`). A manual deploy from a machine logged in with Wrangler is `npm run deploy`.

---

## Italiano

Una piccola app offline per studiare gli accordi sulla tastiera del basso e suonare su una base di piano e batteria.

### Avvio

Scarica il repository e apri `public/index.html` con Safari o Chrome. Non servono installazioni, servizi esterni o una connessione Internet. Usa il selettore **EN / IT** in alto: la lingua iniziale è inglese e la scelta viene ricordata quando lo storage locale è disponibile. Premi **Avvia base** per abilitare l'audio.

### Funzioni

- Progressioni senza limite numerico di accordi, incluse le ripetizioni.
- Basso a quattro o cinque corde e accordatura Drop D; 12, 15 o 24 tasti.
- Colori per accordo e pallini divisi per le note comuni.
- Nomi delle note o gradi; filtri per fondamentali, triadi, guide tones e note comuni.
- Clic su un accordo per studiarlo; Shift + clic per confrontare più accordi.
- Trasposizione della progressione per semitoni.
- Accompagnamento in loop di piano sintetizzato e batteria, sincronizzato con la tastiera.
- Tre ritmi (dritto, swing, bossa nova), BPM regolabili e 2, 4 o 8 beat per accordo.
- Volume e mute separati per piano e batteria; indicatore dei quattro beat.
- Impostazioni ricordate nel browser quando lo storage locale è disponibile.

Inserisci per esempio `Dm7 | G7 | Cmaj7`. Ogni elemento dura il numero di beat impostato. Premi **Mostra sulla tastiera** oppure Cmd/Ctrl + Invio.

### Accordi

Notazione internazionale (C, D, E, F, G, A, B), diesis e bemolli anche Unicode. Tipi supportati: maggiore, minore, 5, 6, m6, 7, maj7, m7, mMaj7, dim, dim7, m7b5, aug, sus2, sus4, 7sus4, add9, m(add9), 9, maj9, m9, 11, m11, 13, m13, 7b5, 7#5, 7b9, 7#9. L'app mostra gli alias disponibili, come min7, M7 e ø7.

Gli slash chords, come C/E, non sono ancora supportati.

### Audio

Web Audio API, senza campioni scaricati. Il piano è un piano elettrico in sintesi FM, con un breve riverbero sintetico; la batteria combina oscillatori e rumore filtrato. Il piano suona le note che definiscono ogni accordo (3ª, 7ª, alterazioni, estensione più alta) dentro un'ottava, con la fondamentale solo ai cambi di accordo. Resta una base sintetica, non strumenti campionati.

La base è in 4/4. Dritto: cassa, rullante su 2 e 4, hi-hat a ottavi. Swing: piatto ride, hi-hat su 2 e 4, secondo ottavo ritardato. Bossa nova: clave di due battute sul bordo del rullante. Cambiare BPM, beat per accordo o ritmo riavvia la base dall'accordo corrente. Modificare la progressione o passare a un'altra scheda ferma la riproduzione.

### Sviluppo e verifica

HTML, CSS e JavaScript sono in `public/` (`index.html`, `styles.css`, `app.js`); nessuna dipendenza di produzione e nessun build necessario.

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
