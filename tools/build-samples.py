#!/usr/bin/env python3
"""Builds public/samples/ from the original sample libraries.

Not part of the site build: run it by hand when the sample selection changes.
It expects the source files in a folder laid out as described in SOURCES below and needs
ffmpeg and numpy. Every output is trimmed to its attack, cut to the length the backing
track can use, faded out, level-matched per instrument and encoded as MP3.

Usage: python3 tools/build-samples.py <raw-folder>
"""
import subprocess
import sys
from pathlib import Path

import numpy as np

RATE = 44100
OUT = Path(__file__).resolve().parent.parent / 'public' / 'samples'

SOURCES = """
raw/piano/<note>v<layer>.flac   Salamander Grand Piano V3 (Alexander Holm, CC BY 3.0)
                                github.com/sfzinstruments/SalamanderGrandPiano, Samples/
raw/drums/<mic>_<sound>...flac  Virtuosity Drums (Versilian Studios, CC0)
                                github.com/sfzinstruments/virtuosity_drums, Samples/<mic>/
raw/ag/<note>.mp3               Acoustic guitar, University of Iowa Musical Instrument Samples,
                                via github.com/nbrosowsky/tonejs-instruments, samples/guitar-acoustic/
raw/eg/<note>.mp3               Electric guitar, Karoryfer Samples (CC0),
                                via github.com/nbrosowsky/tonejs-instruments, samples/guitar-electric/
"""

NOTE = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}


def midi(name):
    """'Ds3' or 'A2' -> MIDI number (C4 = 60)."""
    sharp = 1 if name[1] == 's' else 0
    return NOTE[name[0]] + sharp + (int(name[-1]) + 1) * 12


def decode(path, channels):
    raw = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', str(channels), '-ar', str(RATE), '-'],
        check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, channels).astype(np.float64)


def shape(audio, seconds, fade):
    """Start 2 ms before the attack, keep `seconds`, fade the last `fade` seconds out."""
    envelope = np.abs(audio).max(axis=1)
    onset = int(np.argmax(envelope > envelope.max() * 0.02))
    audio = audio[max(0, onset - RATE // 500):][:int(seconds * RATE)].copy()
    n = min(len(audio), int(fade * RATE))
    audio[-n:] *= np.linspace(1, 0, n)[:, None] ** 2
    return audio


def encode(audio, path, quality):
    path.parent.mkdir(parents=True, exist_ok=True)
    assert np.abs(audio).max() <= 1.0, path
    subprocess.run(
        ['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ac', str(audio.shape[1]), '-ar', str(RATE), '-i', '-',
         '-codec:a', 'libmp3lame', '-q:a', str(quality), str(path)],
        check=True, input=audio.astype(np.float32).tobytes())


def write_group(items, target, quality):
    """items: {output path: audio}. One gain for the whole group keeps its internal balance."""
    gain = target / max(np.abs(a).max() for a in items.values())
    for path, audio in items.items():
        encode(audio * gain, path, quality)
    return gain


def main(raw):
    raw = Path(raw)
    report = []

    # Piano: two dynamics per note, sampled every minor third.
    for layer, (source_layer, target) in enumerate([(6, 0.5), (11, 0.95)], start=1):
        group = {}
        for name in ['A2', 'C3', 'Ds3', 'Fs3', 'A3', 'C4', 'Ds4', 'Fs4', 'A4']:
            group[OUT / 'piano' / f'{midi(name)}-{layer}.mp3'] = shape(
                decode(raw / 'piano' / f'{name}v{source_layer}.flac', 2), 4.5, 1.2)
        report.append((f'piano layer {layer}', write_group(group, target, 4)))

    # Guitars: one dynamic, mono.
    for folder, out, names in [
        ('ag', 'guitar-acoustic', ['E2', 'G2', 'As2', 'Cs3', 'E3', 'G3', 'As3', 'Cs4', 'E4', 'G4']),
        ('eg', 'guitar-electric', ['E2', 'Fs2', 'A2', 'C3', 'Ds3', 'Fs3', 'A3', 'C4', 'Ds4', 'Fs4']),
    ]:
        group = {OUT / out / f'{midi(name)}-1.mp3': shape(decode(raw / folder / f'{name}.mp3', 1), 3.5, 1.0)
                 for name in names}
        # These sets come normalised note by note, so match them individually.
        for path, audio in group.items():
            report.append((f'{out} {path.stem}', write_group({path: audio}, 0.9, 5)))

    # Drums: overhead pair, plus the close microphone on kick and snare for punch.
    def drum(overhead, close=None, close_gain=0.7):
        audio = decode(raw / 'drums' / overhead, 2)
        if close:
            audio = audio + decode(raw / 'drums' / close, 1) * close_gain
        return audio

    kit = {
        # sound: (seconds, fade, [[soft variants], [hard variants]], peak target)
        'kick': (0.7, 0.3, [[drum(f'oh_kick_vl2_rr{r}.flac', f'kickmic_kick_vl2_rr{r}.flac', 1.0) for r in (1, 2)],
                            [drum(f'oh_kick_vl4_rr{r}.flac', f'kickmic_kick_vl4_rr{r}.flac', 1.0) for r in (1, 2)]], 0.7),
        'snare': (0.8, 0.3, [[drum(f'oh_snare_vl{v}.flac', f'snaremic_snare_vl{v}.flac') for v in (10, 13)],
                             [drum(f'oh_snare_vl{v}.flac', f'snaremic_snare_vl{v}.flac') for v in (27, 30)]], 0.7),
        'rim': (0.45, 0.2, [[drum(f'oh_rim_vl{v}.flac', f'snaremic_rim_vl{v}.flac') for v in (8, 12)]], 0.7),
        'hat': (0.4, 0.15, [[drum(f'oh_hat_vl2_rr{r}.flac') for r in (1, 2, 3)],
                            [drum(f'oh_hat_vl4_rr{r}.flac') for r in (1, 2, 3)]], 0.7),
        # The foot 'chick' is quiet by nature: a lower target keeps its place in the kit.
        'pedal': (0.35, 0.15, [[drum(f'oh_pedal_rr{r}.flac') for r in (1, 2, 3)]], 0.4),
        'ride': (3.0, 1.5, [[drum(f'oh_ride_vl2_rr{r}.flac') for r in (1, 2, 3)],
                            [drum(f'oh_ride_vl3_rr{r}.flac') for r in (1, 2, 3)]], 0.7),
    }
    for sound, (seconds, fade, layers, target) in kit.items():
        group = {}
        for layer, variants in enumerate(layers, start=1):
            for variant, audio in zip('abc', variants):
                group[OUT / 'drums' / f'{sound}-{layer}{variant}.mp3'] = shape(audio, seconds, fade)
        report.append((f'drums {sound}', write_group(group, target, 5)))

    for name, gain in report:
        print(f'{name:28s} gain x{gain:.2f}')
    total = sum(f.stat().st_size for f in OUT.rglob('*.mp3'))
    print(f'{len(list(OUT.rglob("*.mp3")))} files, {total / 1e6:.2f} MB')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
