const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
class El{constructor(){this.children=[];this.attrs={};this.style={setProperty(){}};this.classList={add(){},remove(){},toggle(){}};this.rows=1;this.value='';this.checked=false;this.textContent='';this.events={};this.dataset={};}setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}append(...n){this.children.push(...n);}replaceChildren(...n){this.children=n;}addEventListener(k,fn){this.events[k]=fn;}}
const html=fs.readFileSync(path.join(__dirname,'..','public','index.html'),'utf8');const ids={};for(const [,id]of html.matchAll(/id="([^"]+)"/g))ids[id]=new El();
const defaults={chords:'F7, C7',tuning:'4',frets:'12',labels:'notes',toneFilter:'all',bpm:'80',beats:'4',groove:'straight',pianoVolume:'65',drumsVolume:'45'};for(const[k,v]of Object.entries(defaults))ids[k].value=v;ids.pianoEnabled.checked=ids.drumsEnabled.checked=true;
const timers=new Map(),intervals=new Map(),nodes=[];let nextTimer=1;
class Param{constructor(){this.value=0;this.calls=[];}check(v,t){assert(Number.isFinite(v),'Non-finite parameter');assert(Number.isFinite(t)&&t>=0,'Invalid time');}setValueAtTime(v,t){this.check(v,t);this.value=v;this.calls.push(['set',v,t]);}linearRampToValueAtTime(v,t){this.check(v,t);this.value=v;this.calls.push(['linear',v,t]);}exponentialRampToValueAtTime(v,t){this.check(v,t);assert(v>0);this.value=v;this.calls.push(['exp',v,t]);}setTargetAtTime(v,t,c){this.check(v,t);assert(c>0);this.calls.push(['target',v,t,c]);}cancelScheduledValues(t){assert(t>=0);}}
class Node{constructor(kind){this.kind=kind;this.connections=[];for(const p of ['gain','frequency','Q','threshold','knee','ratio','attack','release','playbackRate'])this[p]=new Param();nodes.push(this);}connect(node){this.connections.push(node);}disconnect(){this.disconnected=true;}setPeriodicWave(wave){this.wave=wave;}start(t){assert(t>=0);this.started=t;}stop(t){assert(t>=0);this.stopped=t;}}
class Audio{constructor(){this.currentTime=0;this.sampleRate=48000;this.state='suspended';this.destination=new Node('destination');}createGain(){return new Node('gain');}createDynamicsCompressor(){return new Node('compressor');}createConvolver(){return new Node('convolver');}createPeriodicWave(real,imag){return {real,imag};}createBuffer(ch,length){return{getChannelData:()=>new Float32Array(length)};}createOscillator(){return new Node('oscillator');}createBufferSource(){return new Node('noise');}createBiquadFilter(){return new Node('filter');}addEventListener(){}async resume(){this.state='running';}}
const translatedNodes=[...html.matchAll(/data-i18n="([^"]+)"/g)].map(([,key])=>{const e=new El();e.dataset.i18n=key;return e;});const ariaNodes=[...html.matchAll(/data-i18n-aria="([^"]+)"/g)].map(([,key])=>{const e=new El();e.dataset.i18nAria=key;return e;});let savedPrefs=null;
const doc={documentElement:{lang:''},getElementById:id=>{assert(ids[id],'Missing '+id);return ids[id];},createElement:()=>new El(),createElementNS:()=>new El(),createTextNode:t=>({textContent:t}),querySelectorAll:q=>q==='[data-i18n]'?translatedNodes:q==='[data-i18n-aria]'?ariaNodes:[],addEventListener(){}};
const context=vm.createContext({document:doc,window:{AudioContext:Audio},setInterval:(f,ms)=>{const id=nextTimer++;intervals.set(id,f);return id;},clearInterval:id=>intervals.delete(id),setTimeout:(f,ms)=>{assert(ms>=0);const id=nextTimer++;timers.set(id,{fn:f,ms});return id;},clearTimeout:id=>timers.delete(id),localStorage:{getItem:()=>null,setItem:(key,value)=>{savedPrefs=JSON.parse(value);}}});
for(const file of ['songs.js','app.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..','public',file),'utf8'),context);
const run=code=>vm.runInContext(code,context),chord=s=>JSON.parse(run(`JSON.stringify(parseChord(${JSON.stringify(s)}))`));
assert.deepStrictEqual(chord('F7').tones.map(t=>t.name),['F','A','C','Eb']);assert.deepStrictEqual(chord('F#maj7').tones.map(t=>t.name),['F#','A#','C#','E#']);
// Alternative spellings map onto the supported qualities; single-letter case still matters (M7 vs m7).
for(const [input,quality] of [['CMaj7','maj7'],['CMAJ7','maj7'],['CM7','maj7'],['CΔ7','maj7'],['Cma7','maj7'],['Cmaj',''],['Cmin7','m7'],['CMIN7','m7'],['C-7','m7'],['C–7','m7'],['Cmi','m'],['C-','m'],['Cm7(b5)','m7b5'],['CØ7','m7b5'],['Co7','dim7'],['Co','dim'],['CDim','dim'],['C7(b9)','7b9'],['C7(#9)','7#9'],['C7+','7#5'],['Caug7','7#5'],['C7sus','7sus4'],['CSus4','sus4'],['Cm(maj7)','mMaj7'],['CminMaj7','mMaj7'],['Cadd2','add9']])assert.strictEqual(chord(input).quality,quality,input);
assert.deepStrictEqual(chord('Bbo7').tones.map(t=>t.label),['R','b3','b5','bb7']);assert.strictEqual(chord('Db7').accidental,'b');assert.strictEqual(chord('C7').accidental,'');
assert.throws(()=>chord('Cxyz'));assert.throws(()=>chord('H7'));assert.throws(()=>chord('C7/H'));assert.throws(()=>chord('C7b4'));
// Every quality iReal Pro can write is understood, and spelled from the root.
const spell=name=>chord(name).tones.map(t=>t.name+':'+t.label).join(' ');
for(const q of '5 2 add9 + o h sus ^ - ^7 -7 7 7sus h7 o7 ^9 ^13 6 69 ^7#11 ^9#11 ^7#5 -6 -69 -^7 -^9 -9 -11 -7b5 h9 -b6 -#5 9 7b9 7#9 7#11 7b5 7#5 9#11 9b5 9#5 7b13 7#9#5 7#9b5 7#9#11 7b9#11 7b9b5 7b9#5 7b9#9 7b9b13 7alt 13 13#11 13b9 13#9 7b9sus 7susadd3 9sus 13sus 7b13sus 11'.split(' ')){const c=chord('Bb'+q);assert(c.tones.length>=2&&c.tones[0].label==='R'&&new Set(c.tones.map(t=>t.pc)).size===c.tones.length,'Bb'+q);}
assert.strictEqual(chord('C^7').name,'Cmaj7');assert.strictEqual(chord('C-7').name,'Cm7');assert.strictEqual(chord('Ch7').name,'Cm7b5');assert.strictEqual(chord('C-^7').name,'CmMaj7');assert.strictEqual(chord('C-^9').name,'CmMaj9');
assert.strictEqual(spell('C7b13'),'C:R E:3 G:5 Bb:b7 Ab:b13');assert.strictEqual(spell('Cmaj7#11'),'C:R E:3 G:5 B:7 F#:#11');assert.strictEqual(spell('C7alt'),'C:R E:3 Bb:b7 Db:b9 D#:#9 Ab:b13');assert.strictEqual(spell('C13sus'),'C:R F:4 G:5 Bb:b7 D:9 A:13');assert.strictEqual(spell('Eb69'),'Eb:R G:3 Bb:5 C:6 F:9');assert.strictEqual(spell('F#m9b5'),'F#:R A:b3 C:b5 E:b7 G#:9');
// Slash chords: the bass is marked, and added when it is not a chord tone.
let slashed=chord('C/E');assert.strictEqual(slashed.name,'C/E');assert.strictEqual(slashed.tones.length,3);assert(slashed.tones.find(t=>t.name==='E').bass);
slashed=chord('Dm7/G');assert.strictEqual(slashed.bassName,'G');assert.strictEqual(slashed.tones.length,5);assert.deepStrictEqual(slashed.tones.at(-1),{pc:7,name:'G',degree:0,label:'/',bass:true});assert.strictEqual(chord('Bb6/9').bass,undefined,'6/9 is a quality, not a slash');
// The comping voicing copes with every generated quality too.
for(const name of ['C7alt','Cmaj9#11','C13b9','C7b9sus','Cm69','C/E','Dm7/G']){const v=JSON.parse(run(`JSON.stringify(voicing(parseChord(${JSON.stringify(name)})))`));assert(v.notes.length>=2&&v.notes.length<=4&&v.notes.every(n=>n>=58&&n<70),name+' voicing');}
(async()=>{await run('start()');assert.strictEqual(intervals.size,1);assert.strictEqual(ids.play.attrs['aria-pressed'],'true');assert(nodes.some(n=>n.kind==='noise'));const keysNotes=from=>nodes.slice(from).filter(n=>n.kind==='gain'&&n.connections.includes(run('pianoBus'))).length;assert.strictEqual(keysNotes(0),4,'F7 on the first beat: root plus 3rd, 5th and 7th');assert(timers.size===1,'First visual beat scheduled');
const stepsBefore=ids.progression.children;savedPrefs=null;
// Simulate the audio clock through the next chord; only one transport drives sound and fretboard.
const collectVisual=()=>{for(const[id,t]of [...timers]){timers.delete(id);t.fn();}};
collectVisual();assert(ids.playStatus.textContent.includes('F7'));
for(let beat=1;beat<=4;beat++){run(`audio.currentTime=${.065+beat*.75-.05};schedule()`);collectVisual();}
assert(ids.playStatus.textContent.includes('C7'));assert.strictEqual(run('cursor'),1);assert(ids.boardTitle.textContent.startsWith('C7'));assert.strictEqual(run('transportBeat'),5);
assert.strictEqual(savedPrefs,null,'Playback does not rewrite preferences');assert.strictEqual(ids.progression.children,stepsBefore,'Chord buttons are reused during playback');assert.deepStrictEqual(ids.progression.children.map(b=>b.attrs['aria-pressed']),[false,true]);
// Off-beat hat follows the swing fraction.
run('stop()');assert.strictEqual(timers.size,0);assert.strictEqual(intervals.size,0);assert(nodes.filter(n=>n.started!==undefined).every(n=>n.stopped!==undefined));
const drumTimes=beat=>{const from=nodes.length,t0=run('audio.currentTime')+.1;run(`scheduleBeat(${beat},${t0},playEpoch)`);const times=nodes.slice(from).filter(n=>n.kind==='noise').map(n=>Math.round((n.started-t0)*1e6)/1e6);run('stop()');return new Set(times);};
let before;ids.groove.value='swing';let offsets=drumTimes(1);assert(offsets.has(0)&&offsets.has(.5)&&!offsets.has(.375),'Swing offbeat: 2/3 of .75 seconds');
ids.groove.value='straight';offsets=drumTimes(1);assert(offsets.has(0)&&offsets.has(.375)&&!offsets.has(.5),'Straight offbeat: half of .75 seconds');
ids.groove.value='bossa';for(let beat=0;beat<8;beat++)run(`scheduleBeat(${beat},audio.currentTime+.1,playEpoch)`);run('stop()');ids.groove.value='nonsense';assert.strictEqual(run('currentGroove()===grooves.straight'),true);ids.groove.value='straight';
// Every groove is well formed: whole bars, known drums, known letters, several versions of each part.
const chart=JSON.parse(run('JSON.stringify({grooves,fills,drums:Object.keys(drumKit),letters:Object.keys(HIT)})'));
for(const [name,g] of Object.entries(chart.grooves)){assert([3,4].includes(g.grid),name+' grid');const size=g.grid*(g.beats||4)*(g.span||1),ok=(text,letters)=>[...text].every(c=>c==='.'||letters.includes(c));
assert(g.drums.length>=3&&g.keys.length>=3&&g.strum.length>=3,name+' has at least three versions of each part');
for(const version of g.drums)for(const [part,text] of Object.entries(version)){assert(chart.drums.includes(part),`${name}: unknown drum ${part}`);assert.strictEqual(text.length,size,`${name} ${part} length`);assert(ok(text,'Xxog'),`${name} ${part} letters`);}
for(const text of g.keys){assert.strictEqual(text.length,size,name+' keys length');assert(ok(text,'Xxoga'),name+' keys letters');assert('Xx'.includes(text[0])||g.keys.indexOf(text)>0,name+' main keys figure starts on the beat');}
for(const text of g.strum){assert.strictEqual(text.length,size,name+' strum length');assert(ok(text,'DdUua'),name+' strum letters');}
assert(ids.groove&&html.includes(`value="${name}"`),name+' is offered in the menu');}
for(const [grid,kinds] of Object.entries(chart.fills))for(const [kind,options] of Object.entries(kinds))for(const option of options)for(const [part,text] of Object.entries(option)){assert(chart.drums.includes(part));assert.strictEqual(text.length,kind==='big'?grid*2:Number(grid),`fill ${grid}/${kind}`);}
// The backing does not loop identically: versions change, phrases end with fills, a crash follows a big one.
const plan=(bar,beats=4)=>JSON.parse(run(`JSON.stringify(barPlan({playedBar:${bar},barBeats:${beats}}))`)),planned=n=>Array.from({length:n},(_,bar)=>plan(bar));
ids.groove.value='straight';ids.chords.value='C7 F7';ids.beats.value='4';run('render();stop()');let bars=planned(16);
assert(bars.every((b,i)=>i%4!==0||b.choice.drums===0),'Each phrase opens on the main beat');assert(new Set(bars.map(b=>b.choice.drums)).size>1&&new Set(bars.map(b=>b.choice.keys)).size>1,'Versions vary');
assert(bars.every((b,i)=>i===0||b.choice.keys!==bars[i-1].choice.keys),'The same chord figure is never played twice running');
assert.deepStrictEqual(bars.map(b=>b.fill||'-').join(''),'---small---big---small---big','Two-bar loop: small fill every four bars, big every eight');
assert(bars[7].drums.hat.slice(8).every(v=>v===0)&&Object.values(bars[7].drums).some(part=>part.slice(8).some(v=>v>0)),'A big fill replaces the last two beats');assert(bars[3].drums.hat.slice(0,12).some(v=>v>0)&&bars[3].drums.hat.slice(12).every(v=>v===0),'A small fill replaces the last beat only');
assert(bars[8].drums.crash[0]>0&&bars[8].drums.kick[0]>0&&!bars[4].drums.crash&&!bars[0].drums.crash,'Crash and kick after a big fill, not after a small one');
assert(bars[1].scale<bars[2].scale&&bars[2].scale<bars[3].scale,'A phrase grows');assert(new Set(bars.map(b=>b.choice.register)).size>1,'Chord register varies');
ids.chords.value='C7 F7 C7 C7 F7 F7 C7 C7 G7 F7 C7 G7';run('render();stop()');bars=planned(13);assert.deepStrictEqual(bars.map(b=>b.fill||'-'),['-','-','-','small','-','-','-','small','-','-','-','big','-'],'Twelve-bar blues: the big fill is at the turnaround');assert(bars[12].drums.crash[0]>0);
ids.chords.value='Dm7 G7 Cmaj7 A7';run('render();stop()');bars=planned(9);assert.deepStrictEqual(bars.map(b=>b.fill||'-'),['-','-','-','small','-','-','-','big','-'],'A four-bar loop is not interrupted by a big fill every time round');
ids.groove.value='ballad';run('stop()');bars=planned(9);assert(bars.every(b=>b.fill!=='big'&&!b.drums.crash),'A ballad never gets a big fill or a crash');
ids.groove.value='bossa';run('stop()');bars=planned(4);assert(bars[0].choice===undefined||bars[1].choice.drums===bars[0].choice.drums&&bars[1].choice.keys===bars[0].choice.keys,'A two-bar figure is kept whole');assert.notDeepStrictEqual(bars[0].drums.rim,bars[1].drums.rim,'The clave differs between its two bars');
// Every note a voicing can ask for is within two semitones of a recorded sample, in every register.
assert(run(`Object.entries(instruments).filter(([,set])=>set.notes).every(([,set])=>(set.guitar?registers.guitar:registers.keys).every(shift=>Object.keys(qualities).every(q=>Array.from({length:12},(_,root)=>voicing({root,quality:q},set.low+shift,set.rootLow)).every(v=>[v.root,...v.notes].every(m=>set.notes.some(n=>Math.abs(n-m)<=2))))))`),'Sample coverage');
// The bass register belongs to the player: no chord instrument, in any register, goes below E3, and its channel is low-cut.
assert.strictEqual(run('BASS_CEILING'),52);assert(run(`Object.values(instruments).every(set=>[-3,0,4,5].every(shift=>Object.keys(qualities).every(q=>Array.from({length:12},(_,root)=>voicing({root,quality:q},set.low+(set.guitar&&shift<0?0:shift),set.rootLow)).every(v=>[v.root,...v.notes].every(m=>m>=BASS_CEILING)))))`),'Nothing below the bass ceiling');
assert(run('Object.values(instruments).every(set=>!set.notes||Math.min(...set.notes)>=BASS_CEILING-1)'),'No sample below the bass ceiling is shipped');
for(const bus of ['pianoBus','pianoBus2']){const out=run(bus).connections;assert(out.length===1&&out[0].kind==='filter'&&out[0].type==='highpass'&&out[0].frequency.value>=100,bus+' goes through the low cut only');}
// Anticipation: the next chord arrives an eighth early and is not struck again on the downbeat.
ids.groove.value='straight';ids.chords.value='C7 F7';run('render();stop();Math.__random=Math.random;Math.random=()=>0.9');assert.strictEqual(plan(1).choice.keys,3);assert(plan(1).comp[0].keys.push[14]);
before=nodes.length;run('scheduleBeat(7,audio.currentTime+.1,playEpoch)');assert.strictEqual(keysNotes(before),4,'The pushed chord is played with its root');assert.strictEqual(run('anticipated.has("0:8")'),true);
before=nodes.length;run('scheduleBeat(8,audio.currentTime+.1,playEpoch)');assert.strictEqual(keysNotes(before),0,'Nothing is struck again on the downbeat');assert.strictEqual(run('anticipated.size'),0);run('Math.random=Math.__random;stop()');
ids.chords.value='C7';run('render();stop();Math.random=()=>0.9');before=nodes.length;run('scheduleBeat(7,audio.currentTime+.1,playEpoch)');assert.strictEqual(run('anticipated.size'),0,'With one chord there is nothing to anticipate');assert.strictEqual(keysNotes(before),3);run('Math.random=Math.__random;stop()');ids.chords.value='F7, C7';run('render();stop()');
// Two chord instruments: separate channels, different figures, different registers.
const voices=()=>JSON.parse(run('JSON.stringify(currentInstruments().map(v=>v.name))')),onBus=(from,bus)=>nodes.slice(from).filter(n=>n.kind==='gain'&&n.connections.includes(run(bus))).length;
ids.instrument.value='piano';ids.instrument2.value='';assert.deepStrictEqual(voices(),['piano']);ids.instrument2.value='none';assert.deepStrictEqual(voices(),['piano']);ids.instrument2.value='piano';assert.deepStrictEqual(voices(),['piano'],'The same instrument twice counts once');
ids.instrument2.value='guitar-acoustic';assert.deepStrictEqual(voices(),['piano','guitar-acoustic']);
for(const g of Object.keys(chart.grooves)){ids.groove.value=g;run('stop()');for(const b of planned(12)){assert.notStrictEqual(b.choice.keys2,b.choice.keys,g+': second instrument plays another keys figure');assert.notStrictEqual(b.choice.strum2,b.choice.strum,g+': second instrument plays another strum figure');}}
assert(run('[0,1,2,3].every(i=>[true,false].every(g=>registerFor({choice:{register:i}},0,g)!==registerFor({choice:{register:i}},1,g)))'),'The two instruments never share a register');
ids.groove.value='straight';ids.instrument2.value='epiano';ids.instrument2Volume.value='40';run('stop()');before=nodes.length;run('scheduleBeat(0,audio.currentTime+.1,playEpoch)');assert.strictEqual(onBus(before,'pianoBus'),4,'First instrument on its channel');assert.strictEqual(onBus(before,'pianoBus2'),4,'Second instrument on its own channel');
run('updateMix()');assert(run('pianoBus2').gain.calls.some(c=>c[0]==='target'&&c[1]===0.4),'Second instrument has its own volume');ids.pianoEnabled.checked=false;run('updateMix()');assert(run('pianoBus2').gain.calls.at(-1)[1]===0&&run('pianoBus').gain.calls.at(-1)[1]===0,'Muting chords mutes both');ids.pianoEnabled.checked=true;
ids.instrument2.value='none';before=nodes.length;run('scheduleBeat(0,audio.currentTime+.1,playEpoch)');assert.strictEqual(onBus(before,'pianoBus2'),0);run('stop()');ids.instrument.value='';
assert(run('Object.keys(drumKit).every(k=>k in drumSamples&&k in drumLevel)&&Object.keys(drumSamples).every(k=>k in drumKit)'),'Every drum exists both sampled and synthesized');
// A chord change is always stated, even where the pattern rests: two beats per chord, second chord starts on beat 3.
ids.beats.value='2';run('render()');before=nodes.length;run('scheduleBeat(2,audio.currentTime+.1,playEpoch)');assert(keysNotes(before)>=4,'Chord change on a pattern rest still sounds');before=nodes.length;run('scheduleBeat(3,audio.currentTime+.1,playEpoch)');assert.strictEqual(keysNotes(before),3,'Mid-chord stab has no root');run('stop()');ids.beats.value='4';run('render()');
// Voicings: root below, defining tones inside one octave, never the whole stack.
const voice=name=>JSON.parse(run(`JSON.stringify(voicing(parseChord(${JSON.stringify(name)})))`)),pcs=v=>v.notes.map(n=>n%12);
for(const name of ['C','Cm','C5','C7','Cmaj7','Dm7','G7','C9','C11','Cm11','C13','Cm13','F#7b9','Bb7#5','Ebdim7','Asus4']){const v=voice(name);assert(v.notes.length>=2&&v.notes.length<=4,name+' size');assert(v.notes.every(n=>n>=58&&n<70),name+' range');assert(v.root>=52&&v.root<64&&v.root%12===chord(name).root,name+' root');}
assert.deepStrictEqual(pcs(voice('C13')).sort((a,b)=>a-b),[2,4,9,10],'C13: 3rd, b7, 9th, 13th');assert(!pcs(voice('C11')).includes(4),'C11 drops the major 3rd');assert.deepStrictEqual(pcs(voice('Bb7#5')).sort((a,b)=>a-b),[2,6,8],'Altered 5th is kept');
assert(voice('Dm7').notes.includes(65)&&voice('G7').notes.includes(65),'Common tone F stays on the same key from Dm7 to G7');
ids.groove.value='swing';
ids.groove.value='straight';ids.pianoEnabled.checked=false;ids.drumsEnabled.checked=false;before=nodes.length;await run('start()');assert(!nodes.slice(before).some(n=>n.started!==undefined),'Both muted: no scheduled voices');run('stop()');
ids.pianoEnabled.checked=true;ids.drumsEnabled.checked=true;ids.chords.value='C7 F7 C7 C7 F7 F7 C7 C7 G7 F7 C7 G7';run('render()');assert.strictEqual(ids.progression.children.length,12);run('transpose(1)');assert(ids.chords.value.startsWith('Db7 Gb7 Db7'));assert.strictEqual(ids.progression.children.length,12);
// Transposition keeps the writer's accidentals: sharps stay sharps, mixed or flat input uses flats.
ids.chords.value='C#m7 F#7';run('render();transpose(2)');assert.strictEqual(ids.chords.value,'D#m7 G#7');ids.chords.value='Bbmaj7 F#7';run('render();transpose(1)');assert.strictEqual(ids.chords.value,'Bmaj7 G7');
ids.chords.value='Cxyz';await run('start()');assert(ids.error.textContent.length>0);assert.strictEqual(intervals.size,0);
ids.chords.value='Dm7 G7 Cmaj7';ids.beats.value='2';run('render()');await run('start()');assert.strictEqual(run('beatsPerChord()'),2);run('stop()');
// Stale asynchronous starts cannot restart after a stop.
const pending=run('start()');run('stop()');await pending;assert.strictEqual(intervals.size,0);
ids.chords.value='C Db D Eb E F F# G Ab A Bb B';run('render();selected=new Set(progression.map((_,i)=>i));render()');assert.strictEqual(ids.legend.children.length,12);

assert.strictEqual(doc.documentElement.lang,'en');assert.strictEqual(ids.language.value,'en');assert(ids.selectionStatus.textContent.includes('chords in sequence'));assert(translatedNodes.some(e=>e.textContent==='See the chords. Find the notes.'));
ids.language.value='it';ids.language.events.change();assert.strictEqual(doc.documentElement.lang,'it');assert(ids.selectionStatus.textContent.includes('accordi nella sequenza'));assert(translatedNodes.some(e=>e.textContent==='Vedi gli accordi. Trova le note.'));assert.strictEqual(savedPrefs.language,'it');
ids.chords.value='Cxyz';run('render()');assert(ids.error.textContent.includes('non supportato'));ids.language.value='en';ids.language.events.change();assert(ids.error.textContent.includes('Unsupported'));
ids.chords.value='C7 F7';run('render()');await run('start()');const clock=run('timer'),activeVoices=nodes.length;ids.language.value='it';ids.language.events.change();assert.strictEqual(run('timer'),clock,'Switch language keeps playback running');assert.strictEqual(nodes.length,activeVoices);assert.strictEqual(ids.play.textContent,'■ Ferma base');run('stop()');
assert(run('JSON.stringify(Object.keys(translations.en).sort())===JSON.stringify(Object.keys(translations.it).sort())'));assert(translatedNodes.every(e=>e.textContent.length>0));
// Sampled instruments. Every file the code can ask for exists, and nothing else is shipped.
const samplesDir=path.join(__dirname,'..','public','samples'),bank=name=>JSON.parse(run(`JSON.stringify(bankFiles(${JSON.stringify(name)}))`));
const expected=['piano','guitar-acoustic','guitar-electric','drums'].flatMap(bank);for(const file of expected)assert(fs.existsSync(path.join(samplesDir,file)),'Missing sample '+file);
const shipped=fs.readdirSync(samplesDir,{recursive:true}).filter(f=>f.endsWith('.mp3')).map(f=>f.split(path.sep).join('/'));assert.deepStrictEqual(shipped.sort(),[...expected].sort(),'No unused sample files');
assert.deepStrictEqual(bank('epiano'),[],'The electric piano is synthesized');
// Until now there was no fetch: everything above ran on the synthesized fallback.
assert.strictEqual(run('synthFallback'),true);
const fetched=[];context.fetch=async url=>{fetched.push(url);return{ok:true,arrayBuffer:async()=>({url})};};Audio.prototype.decodeAudioData=function(data,ok){ok({duration:2,url:data.url});};
ids.instrument.value='guitar-acoustic';ids.groove.value='straight';ids.beats.value='4';ids.chords.value='C7 F7';run('render()');before=nodes.length;await run('start()');
assert.strictEqual(run('synthFallback'),false);assert(fetched.includes('samples/guitar-acoustic/52-1.mp3')&&fetched.includes('samples/drums/kick-2a.mp3'));assert(!fetched.some(u=>u.includes('piano/')),'Only the chosen instrument is downloaded');
let played=nodes.slice(before).filter(n=>n.started!==undefined);assert(played.length>0&&played.every(n=>n.kind==='noise'&&n.buffer&&n.buffer.url),'Samples replace every oscillator');
assert.strictEqual(keysNotes(before),4,'C7 down stroke: bass note and three strings');assert(played.every(n=>Math.abs(Math.log2(n.playbackRate.value)*12)<=2.01),'Notes are retuned by two semitones at most');
const strings=played.filter(n=>n.buffer.url.includes('guitar')).map(n=>n.started);assert(strings.every((t,i)=>i===0||t>strings[i-1]),'Strings are struck one after the other');
collectVisual();assert(!ids.playStatus.textContent.includes('synthesized')&&!ids.playStatus.textContent.includes('sintetizzati'));run('stop()');
// Up strokes: top three strings, highest first.
before=nodes.length;run('scheduleBeat(1,audio.currentTime+.1,playEpoch)');const up=nodes.slice(before).filter(n=>n.kind==='noise'&&n.buffer.url.includes('guitar'));assert.strictEqual(up.length,4+3,'Beat 2: a down stroke then an up stroke');run('stop()');
// A second Start downloads nothing again; switching instrument downloads only the new one.
let count=fetched.length;await run('start()');run('stop()');assert.strictEqual(fetched.length,count);ids.instrument.value='piano';await run('start()');assert(fetched.slice(count).length===16&&fetched.slice(count).every(u=>u.includes('piano/')));
before=nodes.length;run('scheduleBeat(0,audio.currentTime+.1,playEpoch)');played=nodes.slice(before).filter(n=>n.kind==='noise'&&n.buffer.url.includes('piano'));assert(played.some(n=>n.buffer.url.endsWith('-2.mp3')),'An accented chord uses the louder piano layer');run('stop()');
// Closing the hi-hat cuts an open one short.
before=nodes.length;run('playDrum("openhat",audio.currentTime+1,.8);playDrum("hat",audio.currentTime+1.25,.8)');const openEnv=nodes.slice(before).find(n=>n.kind==='gain');assert(openEnv.gain.calls.some(c=>c[0]==='target'&&c[1]===0),'Open hi-hat is choked');run('stop()');
// Two sampled instruments are both downloaded, each once.
ids.instrument.value='piano';ids.instrument2.value='guitar-electric';count=fetched.length;await run('start()');assert(fetched.slice(count).length===6&&fetched.slice(count).every(u=>u.includes('guitar-electric/')),'Only the missing instrument is fetched');before=nodes.length;run('scheduleBeat(0,audio.currentTime+.1,playEpoch)');played=nodes.slice(before).filter(n=>n.kind==='noise');assert(played.some(n=>n.buffer.url.includes('piano/'))&&played.some(n=>n.buffer.url.includes('guitar-electric/')),'Both instruments sound');run('stop()');ids.instrument2.value='none';
// The electric piano needs no download and stays synthesized while drums are sampled.
ids.instrument.value='epiano';count=fetched.length;before=nodes.length;await run('start()');assert.strictEqual(fetched.length,count);assert.strictEqual(run('synthFallback'),false);assert(nodes.slice(before).some(n=>n.kind==='oscillator'&&n.started!==undefined));run('stop()');
// Offline: the download fails, the synthesizers play, and the next Start tries again.
context.fetch=async()=>{throw Error('offline');};run('delete banks["guitar-electric"]');ids.instrument.value='guitar-electric';before=nodes.length;await run('start()');assert.strictEqual(run('synthFallback'),true);assert.strictEqual(intervals.size,1,'Playback starts anyway');assert(nodes.slice(before).some(n=>n.kind==='oscillator'&&n.started!==undefined));collectVisual();assert(ids.playStatus.textContent.includes('sintetizzati'));run('stop()');
context.fetch=async url=>{fetched.push(url);return{ok:true,arrayBuffer:async()=>({url})};};await run('start()');assert.strictEqual(run('synthFallback'),false);assert(fetched.includes('samples/guitar-electric/66-1.mp3'));run('stop()');
context.fetch=async url=>({ok:false});run('delete banks["guitar-electric"]');await run('start()');assert.strictEqual(run('synthFallback'),true,'An HTTP error counts as a failed download');run('stop()');ids.instrument.value='piano';
// ---- Charts: bars, meters, loops, and songs loaded from the songbook ----
{
  const json = (code) => JSON.parse(run(`JSON.stringify(${code})`)),
    read = (text) => json(`readChart(${JSON.stringify(text)},4)`),
    at = (beat) => json(`(({slot,...rest})=>({...rest,name:slot.name}))(locate(${beat}))`),
    show = (text) => {
      ids.chords.value = text;
      run('render();stop()');
    };
  let c = read('Dm7 | G7 | Cmaj7 A7 | % |');
  assert.deepStrictEqual(c.slots.map((s) => [s.name, s.start, s.beats, s.bar]), [['Dm7', 0, 4, 0], ['G7', 4, 4, 1], ['Cmaj7', 8, 2, 2], ['A7', 10, 2, 2], ['Cmaj7', 12, 2, 3], ['A7', 14, 2, 3]]);
  assert.strictEqual(c.total, 16);
  assert.strictEqual(c.bars.length, 4);
  c = read('3/4 Dm7 | G7 C7 | N.C. |\n4/4 F7 | C D E F |');
  assert.deepStrictEqual(c.bars.map((b) => b.beats), [3, 3, 3, 4, 4]);
  assert.deepStrictEqual(c.slots.map((s) => s.beats), [3, 2, 1, 3, 4, 1, 1, 1, 1]);
  assert(c.slots[3].rest && c.slots[3].name === 'N.C.');
  assert.deepStrictEqual(read('| C | F G Am |').slots.map((s) => s.beats), [4, 2, 1, 1], 'Three chords: the first takes what is left');
  assert.throws(() => read('% | C |'), /1/);
  assert.throws(() => read('C | C D E F G |'), /2/);
  assert.throws(() => read('C | Cxyz |'));
  assert.throws(() => read(' | | '));
  assert.strictEqual(read('C, F').bars, null, 'Without barlines nothing changes');

  // Where a beat falls, with and without a loop.
  show('Dm7 | G7 | Cmaj7 A7 | Em7 |');
  assert.strictEqual(run('chart.length'), 4);
  assert.strictEqual(ids.progression.className, 'progression chart');
  assert.strictEqual(ids.progression.children.length, 4, 'One box per bar');
  assert.strictEqual(ids.progression.children[2].children.length, 3, 'Bar number and two chords');
  assert.strictEqual(ids.beats.disabled, true, 'Beats per chord do not apply to a chart');
  assert.strictEqual(ids.loopBox.hidden, false);
  assert.deepStrictEqual([0, 4, 9, 10, 15, 16, 26].map((b) => { const p = at(b); return [p.name, p.barIndex, p.barBeat, p.playedBar]; }), [['Dm7', 0, 0, 0], ['G7', 1, 0, 1], ['Cmaj7', 2, 1, 2], ['A7', 2, 2, 2], ['Em7', 3, 3, 3], ['Dm7', 0, 0, 4], ['A7', 2, 2, 6]]);
  ids.loopFrom.value = '2'; ids.loopTo.value = '3'; run('readLoop()');
  assert.deepStrictEqual(json('loop'), {from: 1, to: 2});
  assert.deepStrictEqual(json('playRange()'), {start: 4, length: 8, firstBar: 1, bars: 2});
  assert.deepStrictEqual([0, 4, 6, 8, 14].map((b) => { const p = at(b); return [p.name, p.barIndex, p.playedBar]; }), [['G7', 1, 0], ['Cmaj7', 2, 1], ['A7', 2, 1], ['G7', 1, 2], ['A7', 2, 3]]);
  for (const [from, to] of [['3', '2'], ['1', '4'], ['0', '2'], ['2', '9'], ['', '3'], ['1.5', '2']]) {
    ids.loopFrom.value = from; ids.loopTo.value = to; run('readLoop()');
    assert.strictEqual(run('loop'), null, `Loop ${from}-${to} means the whole piece`);
  }

  // Playback over a chart: the second chord of a bar is stated on its beat, with its root.
  ids.groove.value = 'ballad'; ids.instrument.value = 'piano'; ids.instrument2.value = 'none';
  run('Math.__random=Math.random;Math.random=()=>0.5');
  const struck = (beat) => { const before = nodes.length; run(`scheduleBeat(${beat},audio.currentTime+.1,playEpoch)`); return keysNotes(before); };
  await run('start()');
  run('stop();timer=1');
  assert(struck(8) >= 3, 'Cmaj7 at the top of bar 3');
  assert(struck(10) >= 3, 'A7 half way through bar 3');
  run('timer=null;stop()');

  // A bar of rest has drums but no chord; the status names the bar.
  show('C7 | N.C. | F7 |');
  run('timer=1');
  let before = nodes.length;
  for (let beat = 4; beat < 8; beat++) run(`scheduleBeat(${beat},audio.currentTime+.1,playEpoch)`);
  assert.strictEqual(keysNotes(before), 0, 'Nothing is played over N.C.');
  assert(nodes.length > before, 'The drums go on');
  assert(run('playingStatus(locate(4))').includes('2'), 'The status counts bars');
  run('timer=null;stop()');

  // Meters: a 3/4 bar gets a three-beat groove whatever the menu says, 4/4 gets the chosen one.
  ids.groove.value = 'funk';
  show('3/4 Dm7 | G7 |\n4/4 C7 | 5/4 F7 | 6/8 Bb7 |');
  const grooveOf = (bar) => json(`(g=>({beats:g.beats??4,grid:g.grid,same:g===grooves.funk,waltz:g===grooves.waltz}))(barPlan(locate(chart[${bar}].start)).groove)`);
  assert.strictEqual(grooveOf(0).beats, 3);
  assert.strictEqual(grooveOf(2).same, true);
  assert.strictEqual(grooveOf(3).beats, 5);
  assert.strictEqual(grooveOf(4).beats, 6);
  run('timer=1');
  before = nodes.length;
  for (let beat = 0; beat < run('totalBeats') * 2; beat++) run(`scheduleBeat(${beat},audio.currentTime+.1,playEpoch)`);
  assert(nodes.length > before);
  run('timer=null;stop()');
  ids.groove.value = 'waltz';
  show('3/4 Dm7 | G7 |');
  assert.strictEqual(grooveOf(0).waltz, true);
  show('Dm7 | G7 |');
  assert.strictEqual(grooveOf(0).beats, 4, 'A waltz groove is not forced onto 4/4');
  run('Math.random=Math.__random');

  // Transposing keeps barlines, line breaks, rests, repeats and meters where they were.
  show('3/4 Dm7 | G7/B |\nN.C. | % | F#m7b5 B7 |');
  ids.loopFrom.value = '1'; ids.loopTo.value = '2'; run('readLoop()');
  run('transpose(2)');
  assert.strictEqual(ids.chords.value, '3/4 Em7 | A7/C# |\nN.C. | % | G#m7b5 C#7 |');
  assert.deepStrictEqual(json('loop'), {from: 0, to: 1}, 'The loop survives a transposition');
  show('Bb7 | Eb7/G |'); run('transpose(-1)');
  assert.strictEqual(ids.chords.value, 'A7 | D7/Gb |');

  // Songs: from an iReal link to a chart, with tempo and groove.
  assert.strictEqual(run("grooveForStyle('Medium Swing',4)"), 'swing');
  assert.strictEqual(run("grooveForStyle('Bossa Nova',4)"), 'bossa');
  assert.strictEqual(run("grooveForStyle('Jazz Waltz',4)"), 'waltz');
  assert.strictEqual(run("grooveForStyle('Anything',3)"), 'waltz');
  assert.strictEqual(run("grooveForStyle('Rock Ballad',4)"), 'ballad');
  assert.strictEqual(run("grooveForStyle('',4)"), null);
  const link = fs.readFileSync(path.join(__dirname, 'songs.test.cjs'), 'utf8').match(/'(irealb:\/\/Autumn[^']+)'/)[1];
  ids.bpm.value = '80'; ids.groove.value = 'straight';
  let saved = await run(`importSongs([[${JSON.stringify(link)},'']])`);
  assert.strictEqual(saved.length, 1);
  assert.strictEqual(ids.error.textContent, '', 'Every chord of the song is understood');
  assert.strictEqual(run('chart.length'), 32);
  assert.strictEqual(ids.chords.value.split('\n').length, 8, 'Four bars to a line');
  assert(ids.chords.value.startsWith('Cm7 | F7 | Bbmaj7 | Ebmaj7 |'), ids.chords.value.split('\n')[0]);
  assert.strictEqual(ids.groove.value, 'swing');
  assert.strictEqual(ids.songTitle.textContent, 'Autumn Leaves');
  assert(ids.songInfo.textContent.includes('Kosma') && ids.songInfo.textContent.includes('32'));
  assert.strictEqual(ids.song.hidden, false);
  assert.strictEqual(savedPrefs.song.title, 'Autumn Leaves', 'The song is remembered with the rest');
  // A long form gets its big fill at the end of the chorus, not in the middle of a line.
  const fills = Array.from({length: 33}, (_, bar) => run(`fillKind(${bar})`) || '-');
  assert.strictEqual(fills[31], 'big');
  assert.strictEqual(fills[15], 'big');
  assert.strictEqual(fills[3], 'small');
  assert.strictEqual(fills[32], '-');
  // Tempo and groove chosen afterwards stay with the song.
  ids.bpm.value = '132'; ids.groove.value = 'bossa';
  await run('rememberSongSettings()');
  ids.bpm.value = '80'; ids.groove.value = 'straight';
  await run('Songs.all().then(list=>loadSong(list[0]))');
  assert.strictEqual(ids.bpm.value, '132');
  assert.strictEqual(ids.groove.value, 'bossa');
  // Several songs at once are listed, not opened; nonsense is refused politely.
  saved = await run(`importSongs([['Blues in F\\nF7 | Bb7 | F7 | F7','a.txt'],['{title: Two}\\n[C]la [G7]la [C]la','b.cho']])`);
  assert.strictEqual(saved.length, 2);
  assert.strictEqual(ids.songTitle.textContent, 'Autumn Leaves', 'Nothing is opened');
  assert(ids.songsStatus.textContent.includes('2'));
  saved = await run(`importSongs([['just some words','']])`);
  assert.strictEqual(saved.length, 0);
  assert(ids.songsStatus.textContent.length > 0);
  ids.songSearch.value = '';
  run('drawSongs()');
  assert(ids.songList.children.length >= 5, 'My songs, then the built-in forms');
  // Symbols this app cannot read become rests and are counted.
  assert.deepStrictEqual(json(`chartText({bars:[{chords:['C7','Xq'],meter:'4/4'},{chords:[],meter:'4/4'},{chords:['A','B','C','D','E'],meter:'4/4'},{chords:['Dm'],meter:'3/4'}]})`), {text: 'C7 N.C. | N.C. | A B C D | 3/4 Dm |', lost: 2});
  // Every built-in form loads cleanly in both languages.
  for (const language of ['en', 'it'])
    for (const form of json(`Songs.library('${language}')`)) {
      const lost = run(`loadSong(${JSON.stringify(form)})`);
      assert.strictEqual(lost, 0, form.title);
      assert(run('chart.length') === form.bars.length, form.title);
    }
  // A preset or a reset drops the song heading.
  ids.reset.events.click();
  assert.strictEqual(ids.song.hidden, true);
  assert.strictEqual(ids.loopBox.hidden, true);
  assert.strictEqual(ids.beats.disabled, false);
  assert.strictEqual(ids.progression.className, 'progression');
  ids.groove.value = 'straight'; ids.bpm.value = '80'; run('render();stop()');
}
console.log('PASS: one or two chord instruments; six grooves with changing versions, fills, crash, anticipations and registers; sampled piano, guitars and drums, strumming, hi-hat choke, download once, offline fallback and retry; ' +' EN/IT static labels, statuses, errors, language persistence, playback continuity; chord spellings, chord/visual/audio synchronization, straight and swing drums, instrument mutes, scheduled stop, cancellation during audio resume, twelve-step progression, transpose, malformed chords, two beats per chord, unlimited comparison; charts with bars, meters, rests, loops, transposition and songs.');
})().catch(e=>{console.error(e);process.exitCode=1;});
