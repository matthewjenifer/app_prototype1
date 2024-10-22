const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

class Chord {
  constructor(pad, name, quality, numeral, mode, set) {
    this.pad = pad;
    this.name = name;
    this.quality = quality;
    this.numeral = numeral;
    this.mode = mode;
    this.set = set;
  }

  getChordData() {
    return {
      pad: this.pad,
      name: this.name,
      quality: this.quality,
      numeral: this.numeral,
      mode: this.mode,
      set: this.set,
    };
  }
}

const chordSets = {};

function transposeChord(chord, interval) {
  const [root, ...suffix] = chord.split(/(?=[A-Za-z#]+)/);
  const rootIndex = NOTES.indexOf(root);
  if (rootIndex === -1) return chord;
  const newRoot = NOTES[(rootIndex + interval + NOTES.length) % NOTES.length];
  return newRoot + suffix.join("");
}

function generateChords(root) {
  const rootIndex = NOTES.indexOf(root);
  if (rootIndex === -1) {
    console.log("Invalid root note. Please enter a valid key.");
    rl.close();
    return;
  }

  const interval = rootIndex - NOTES.indexOf("C");

  const originalChords = [
    // MAJ1
    new Chord(1, "C", "major", "I", "Ionian", "MAJ1"),
    new Chord(2, "Emi", "minor", "iii", "Phrygian", "MAJ1"),
    new Chord(3, "F", "major", "IV", "Lydian", "MAJ1"),
    new Chord(4, "G", "major", "V", "Mixolydian", "MAJ1"),
    new Chord(5, "Ami", "minor", "vi", "Aeolian", "MAJ1"),
    new Chord(6, "Esus4", "suspended", "V/V", "MAJ1"),
    new Chord(7, "Gadd9", "add9", "V(add9)", "MAJ1"),
    new Chord(8, "Dmi", "minor", "ii", "Dorian", "MAJ1"),
    new Chord(9, "Fadd9", "add9", "IV(add9)", "MAJ1"),
    new Chord(10, "F6", "major", "IV6", "MAJ1"),
    new Chord(11, "Gsus4", "suspended", "Vsus4", "MAJ1"),
    new Chord(12, "G", "major", "V", "Mixolydian", "MAJ1"),
    // MAJ2
    new Chord(1, "C", "major", "I", "Ionian", "MAJ2"),
    new Chord(2, "C/B", "major", "I", "Ionian", "MAJ2"),
    new Chord(3, "C/A", "major", "I", "Ionian", "MAJ2"),
    new Chord(4, "C/G", "major", "I", "Ionian", "MAJ2"),
    new Chord(5, "Fadd9", "add9", "IV(add9)", "MAJ2"),
    new Chord(6, "Fmi", "minor", "iv", "Aeolian", "MAJ2"),
    new Chord(7, "Csus9", "suspended 9", "I(sus9)", "MAJ2"),
    new Chord(8, "Ami7", "minor 7", "vi7", "Aeolian", "MAJ2"),
    new Chord(9, "Emi", "minor", "iii", "Phrygian", "MAJ2"),
    new Chord(10, "F", "major", "IV", "Lydian", "MAJ2"),
    new Chord(11, "Gsus4", "suspended", "Vsus4", "MAJ2"),
    new Chord(12, "G6", "major 6", "V6", "Mixolydian", "MAJ2"),
    // MAJ3
    new Chord(1, "C", "major", "I", "Ionian", "MAJ3"),
    new Chord(2, "Ami", "minor", "vi", "Aeolian", "MAJ3"),
    new Chord(3, "Fma7", "major 7", "IVmaj7", "Lydian", "MAJ3"),
    new Chord(4, "Gsus4", "suspended", "Vsus4", "Mixolydian", "MAJ3"),
    new Chord(5, "Ami add9", "minor add9", "vi(add9)", "Aeolian", "MAJ3"),
    new Chord(6, "F6", "major 6", "IV6", "Lydian", "MAJ3"),
    new Chord(7, "Csus2", "suspended 2", "I(sus2)", "Ionian", "MAJ3"),
    new Chord(8, "G", "major", "V", "Mixolydian", "MAJ3"),
    new Chord(9, "Dsus2", "suspended 2", "V/V", "Mixolydian", "MAJ3"),
    new Chord(10, "Bb add9", "add9", "bVII(add9)", "Mixolydian", "MAJ3"),
    new Chord(11, "Gsus4", "suspended", "Vsus4", "Mixolydian", "MAJ3"),
    new Chord(12, "Fadd9", "add9", "IV(add9)", "Lydian", "MAJ3"),
    // MAJ4
    new Chord(1, "C", "major", "I", "Ionian", "MAJ4"),
    new Chord(2, "G", "major", "V", "Mixolydian", "MAJ4"),
    new Chord(3, "Ami", "minor", "vi", "Aeolian", "MAJ4"),
    new Chord(4, "F6", "major 6", "IV6", "Lydian", "MAJ4"),
    new Chord(5, "F", "major", "IV", "Lydian", "MAJ4"),
    new Chord(6, "Ami/E", "minor", "vi/E", "Aeolian", "MAJ4"),
    new Chord(7, "Dmi7", "minor 7", "ii7", "Dorian", "MAJ4"),
    new Chord(8, "Ami/C", "minor", "vi/C", "Aeolian", "MAJ4"),
    new Chord(9, "Gadd9", "add9", "V(add9)", "Mixolydian", "MAJ4"),
    new Chord(10, "Ami7", "minor 7", "vi7", "Aeolian", "MAJ4"),
    new Chord(11, "G/B", "major", "V6", "Mixolydian", "MAJ4"),
    new Chord(12, "Dmi/G", "minor", "ii/V", "Dorian", "MAJ4"),
    // MAJ5
    new Chord(1, "C", "major", "I", "Ionian", "MAJ5"),
    new Chord(2, "D", "minor", "ii", "Dorian", "MAJ5"),
    new Chord(3, "F", "major", "IV", "Lydian", "MAJ5"),
    new Chord(4, "C", "major", "I", "Ionian", "MAJ5"),
    new Chord(5, "Ab", "major", "bVI", "Aeolian", "MAJ5"),
    new Chord(6, "Eb", "major", "bIII", "Phrygian", "MAJ5"),
    new Chord(7, "Bb", "major", "bVII", "Mixolydian", "MAJ5"),
    new Chord(8, "F", "major", "V", "Mixolydian", "MAJ5"),
    new Chord(9, "G7sus4", "suspended 4", "V7sus4", "Mixolydian", "MAJ5"),
    new Chord(10, "Bb add9", "add9", "bVII(add9)", "Mixolydian", "MAJ5"),
    new Chord(11, "F6", "major 6", "IV6", "Lydian", "MAJ5"),
    new Chord(12, "Cadd9", "add9", "I(add9)", "Ionian", "MAJ5"),
    // MAJ6
    new Chord(1, "C", "major", "I", "Ionian", "MAJ6"),
    new Chord(2, "G", "major", "V", "Mixolydian", "MAJ6"),
    new Chord(3, "Dmi", "minor", "ii", "Dorian", "MAJ6"),
    new Chord(4, "Ami", "minor", "vi", "Aeolian", "MAJ6"),
    new Chord(5, "F", "major", "IV", "Lydian", "MAJ6"),
    new Chord(6, "G/F", "major", "V/IV", "Mixolydian", "MAJ6"),
    new Chord(7, "C/E", "major", "I/E", "Ionian", "MAJ6"),
    new Chord(8, "Ami7", "minor 7", "vi7", "Aeolian", "MAJ6"),
    new Chord(9, "Dmi7", "minor 7", "ii7", "Dorian", "MAJ6"),
    new Chord(10, "Emi7", "minor 7", "iii7", "Phrygian", "MAJ6"),
    new Chord(11, "C/F", "major", "I/IV", "Ionian", "MAJ6"),
    new Chord(12, "Gsus4", "suspended", "Vsus4", "Mixolydian", "MAJ6"),
    // MAJ7
    new Chord(1, "C", "major", "I", "Ionian", "MAJ7"),
    new Chord(2, "G", "major", "V", "Mixolydian", "MAJ7"),
    new Chord(3, "Ami", "minor", "vi", "Aeolian", "MAJ7"),
    new Chord(4, "Emi", "minor", "iii", "Phrygian", "MAJ7"),
    new Chord(5, "F", "major", "IV", "Lydian", "MAJ7"),
    new Chord(6, "C/E", "major", "I/E", "Ionian", "MAJ7"),
    new Chord(7, "Dmi", "minor", "ii", "Dorian", "MAJ7"),
    new Chord(8, "Dmi/C", "minor", "ii/C", "Dorian", "MAJ7"),
    new Chord(9, "G7/B", "dominant 7", "V6/5", "Mixolydian", "MAJ7"),
    new Chord(10, "G", "major", "V", "Mixolydian", "MAJ7"),
    new Chord(11, "F/A", "major", "IV6", "Lydian", "MAJ7"),
    new Chord(12, "G7/B", "dominant 7", "V6/5", "Mixolydian", "MAJ7"),
    // MAJ8
    new Chord(1, "Cma9", "major 9", "I(add9)", "Ionian", "MAJ8"),
    new Chord(2, "C#dim", "diminished", "viio", "Locrian", "MAJ8"),
    new Chord(3, "Dmi9", "minor 9", "ii9", "Dorian", "MAJ8"),
    new Chord(4, "D#dim7", "diminished 7", "viio7", "Locrian", "MAJ8"),
    new Chord(5, "Emi9", "minor 9", "iii9", "Phrygian", "MAJ8"),
    new Chord(6, "C9#5", "9 sharp 5", "I9(#5)", "Ionian", "MAJ8"),
    new Chord(7, "Fma7(add13)", "major 7 add 13", "IVmaj7(add13)", "Lydian", "MAJ8"),
    new Chord(8, "Bb9", "dominant 9", "bVII9", "Mixolydian", "MAJ8"),
    new Chord(9, "Emi7", "minor 7", "iii7", "Phrygian", "MAJ8"),
    new Chord(10, "A9", "dominant 9", "V/vi", "Mixolydian", "MAJ8"),
    new Chord(11, "Dmi11", "minor 11", "ii11", "Dorian", "MAJ8"),
    new Chord(12, "G7(b9, b13)", "dominant 7 flat 9 flat 13", "V7(b9, b13)", "Mixolydian", "MAJ8"),
    // MIN1
    new Chord(1, "Cmi", "minor", "i", "Aeolian", "MIN1"),
    new Chord(2, "Cmi/Eb", "minor", "i/Eb", "Aeolian", "MIN1"),
    new Chord(3, "Fmi", "minor", "iv", "Aeolian", "MIN1"),
    new Chord(4, "G", "major", "V", "Mixolydian", "MIN1"),
    new Chord(5, "Abma7", "major 7", "VImaj7", "Lydian", "MIN1"),
    new Chord(6, "Eb", "major", "III", "Ionian", "MIN1"),
    new Chord(7, "Gmi", "minor", "v", "Dorian", "MIN1"),
    new Chord(8, "Bb", "major", "VII", "Mixolydian", "MIN1"),
    new Chord(9, "F", "major", "iv", "Lydian", "MIN1"),
    new Chord(10, "Fmi/Ab", "minor", "iv6", "Aeolian", "MIN1"),
    new Chord(11, "Cmi/G", "minor", "i6", "Aeolian", "MIN1"),
    new Chord(12, "G", "major", "V", "Mixolydian", "MIN1"),
    // MIN2
    new Chord(1, "Cmi", "minor", "i", "Aeolian", "MIN2"),
    new Chord(2, "G+/B", "augmented", "V+", "Harmonic Minor", "MIN2"),
    new Chord(3, "Cmi/Bb", "minor", "i/Bb", "Aeolian", "MIN2"),
    new Chord(4, "Cmi/A", "minor", "i/A", "Aeolian", "MIN2"),
    new Chord(5, "Abma7", "major 7", "VImaj7", "Lydian", "MIN2"),
    new Chord(6, "Ebma7", "major 7", "IIImaj7", "Ionian", "MIN2"),
    new Chord(7, "Fmi", "minor", "iv", "Aeolian", "MIN2"),
    new Chord(8, "Bb7", "dominant 7", "VII7", "Mixolydian", "MIN2"),
    new Chord(9, "Cmi", "minor", "i", "Aeolian", "MIN2"),
    new Chord(10, "Bb add9", "add9", "VII(add9)", "Mixolydian", "MIN2"),
    new Chord(11, "Ab add9", "add9", "VI(add9)", "Lydian", "MIN2"),
    new Chord(12, "G7sus4", "suspended 4", "V7sus4", "Mixolydian", "MIN2"),
    // MIN3
    new Chord(1, "Cmi", "minor", "i", "Aeolian", "MIN3"),
    new Chord(2, "Ab", "major", "VI", "Lydian", "MIN3"),
    new Chord(3, "Eb", "major", "III", "Ionian", "MIN3"),
    new Chord(4, "Bb", "major", "VII", "Mixolydian", "MIN3"),
    new Chord(5, "F", "major", "IV", "Lydian", "MIN3"),
    new Chord(6, "Fmi", "minor", "iv", "Aeolian", "MIN3"),
    new Chord(7, "Cmi/G", "minor", "i6", "Aeolian", "MIN3"),
    new Chord(8, "Gsus4", "suspended 4", "V7sus4", "Mixolydian", "MIN3"),
    new Chord(9, "Cmi", "minor", "i", "Aeolian", "MIN3"),
    new Chord(10, "Cmi#5", "augmented", "i+", "Harmonic Minor", "MIN3"),
    new Chord(11, "Cmi6", "minor 6", "i6", "Aeolian", "MIN3"),
    new Chord(12, "Cmi7", "minor 7", "i7", "Aeolian", "MIN3"),
    // MIN4
    new Chord(1, "Cmi", "minor", "i", "Aeolian", "MIN4"),
    new Chord(2, "Eb", "major", "III", "Ionian", "MIN4"),
    new Chord(3, "Bb", "major", "VII", "Mixolydian", "MIN4"),
    new Chord(4, "F", "major", "IV", "Lydian", "MIN4"),
    new Chord(5, "Ab", "major", "VI", "Lydian", "MIN4"),
    new Chord(6, "Abma7", "major 7", "VImaj7", "Lydian", "MIN4"),
    new Chord(7, "Abmi7", "minor 7", "VImin7", "Dorian", "MIN4"),
    new Chord(8, "Ebma7", "major 7", "IIImaj7", "Ionian", "MIN4"),
    new Chord(9, "Dsus4", "suspended 4", "V7sus4", "Mixolydian", "MIN4"),
    new Chord(10, "D", "major", "V", "Mixolydian", "MIN4"),
    new Chord(11, "Fmi/G", "minor", "iv6", "Aeolian", "MIN4"),
    new Chord(12, "G+", "augmented", "V+", "Harmonic Minor", "MIN4"),
    // MIN5
    new Chord(1, "Cmi", "minor", "i", "Aeolian", "MIN5"),
    new Chord(2, "Bb", "major", "VII", "Mixolydian", "MIN5"),
    new Chord(3, "Ab6", "major 6", "Ab6", "Lydian", "MIN5"),
    new Chord(4, "Bb add9", "add9", "VII(add9)", "Mixolydian", "MIN5"),
    new Chord(5, "Cmi", "minor", "i", "Aeolian", "MIN5"),
    new Chord(6, "Dmi7", "minor 7", "ii7", "Dorian", "MIN5"),
    new Chord(7, "Cmi/Eb", "minor", "i/Eb", "Aeolian", "MIN5"),
    new Chord(8, "Fmi", "minor", "iv", "Aeolian", "MIN5"),
    new Chord(9, "G", "major", "V", "Mixolydian", "MIN5"),
    new Chord(10, "Ab ma7", "major 7", "VImaj7", "Lydian", "MIN5"),
    new Chord(11, "B6/9", "6/9", "vi", "Aeolian", "MIN5"),
    new Chord(12, "Csus4", "suspended 4", "Isus4", "Ionian", "MIN5"),
    // MIN6
    new Chord(1, "Cmi", "minor", "i", "Aeolian", "MIN6"),
    new Chord(2, "Fmi", "minor", "iv", "Aeolian", "MIN6"),
    new Chord(3, "Bb", "major", "VII", "Mixolydian", "MIN6"),
    new Chord(4, "Eb", "major", "III", "Ionian", "MIN6"),
    new Chord(5, "Ab", "major", "VI", "Lydian", "MIN6"),
    new Chord(6, "Dmi7(b5)", "minor 7 flat 5", "ii7(b5)", "Locrian", "MIN6"),
    new Chord(7, "Gadd(b9)", "add b9", "V(add9)", "Mixolydian", "MIN6"),
    new Chord(8, "G", "major", "V", "Mixolydian", "MIN6"),
    new Chord(9, "Ab/G", "major", "VI/5", "Lydian", "MIN6"),
    new Chord(10, "G7", "dominant 7", "V7", "Mixolydian", "MIN6"),
    new Chord(11, "Cmi/G", "minor", "i6", "Aeolian", "MIN6"),
    new Chord(12, "G7(b9)", "dominant 7 flat 9", "V7(b9)", "Mixolydian", "MIN6"),
    // MIN7
    new Chord(1, "Cmi9", "minor 9", "i9", "Aeolian", "MIN7"),
    new Chord(2, "Ab9", "dominant 9", "VI9", "Lydian", "MIN7"),
    new Chord(3, "Cmi11", "minor 11", "i11", "Aeolian", "MIN7"),
    new Chord(4, "C7 (#9, b13)", "dominant 7", "V7(#9, b13)", "Mixolydian", "MIN7"),
    new Chord(5, "Fmi9", "minor 9", "iv9", "Aeolian", "MIN7"),
    new Chord(6, "Ebma7/F", "major 7", "IIImaj7/F", "Ionian", "MIN7"),
    new Chord(7, "C11", "dominant 11", "i11", "Aeolian", "MIN7"),
    new Chord(8, "Ami11", "minor 11", "vi11", "Dorian", "MIN7"),
    new Chord(9, "Ab7#11", "dominant 7 sharp 11", "VI7#11", "Lydian", "MIN7"),
    new Chord(10, "G7#9", "dominant 7 sharp 9", "V7#9", "Mixolydian", "MIN7"),
    new Chord(11, "Cmi add9", "minor add9", "i(add9)", "Aeolian", "MIN7"),
    new Chord(12, "G7 (b9, b13)", "dominant 7", "V7(b9, b13)", "Mixolydian", "MIN7"),
    // MIN8
    new Chord(1, "Cmi6/9", "minor 6/9", "i6/9", "Aeolian", "MIN8"),
    new Chord(2, "Dmi7(b5)", "minor 7 flat 5", "ii7(b5)", "Locrian", "MIN8"),
    new Chord(3, "Cmi11/G", "minor 11", "i11/G", "Aeolian", "MIN8"),
    new Chord(4, "Cmi9", "minor 9", "i9", "Aeolian", "MIN8"),
    new Chord(5, "Fmi9", "minor 9", "iv9", "Aeolian", "MIN8"),
    new Chord(6, "Abmi7", "minor 7", "VImin7", "Dorian", "MIN8"),
    new Chord(7, "Ebmi7", "minor 7", "IIImin7", "Ionian", "MIN8"),
    new Chord(8, "Bbmi7(b5)", "minor 7 flat 5", "VII7(b5)", "Locrian", "MIN8"),
    new Chord(9, "Ami11", "minor 11", "vi11", "Dorian", "MIN8"),
    new Chord(10, "Abma7#5", "major 7 sharp 5", "VImaj7#5", "Lydian", "MIN8"),
    new Chord(11, "G7 (b9, b13)", "dominant 7", "V7(b9, b13)", "Mixolydian", "MIN8"),
    new Chord(12, "Cmi ma7", "minor major 7", "i9ma7", "Aeolian", "MIN8"),
  ];

  for (let i = 1; i <= 16; i++) {
    chordSets[`SET${i}`] = originalChords.map((chord) => {
      const transposedName = transposeChord(chord.name, interval);
      return new Chord(chord.pad, transposedName, chord.quality, chord.numeral, chord.mode, `SET${i}`);
    });
  }

  console.log(`All chord sets have been generated for the key of ${root}.`);
}

function findHarmonicRelationships(currentChord) {
  console.log(`Finding harmonic relationships for ${currentChord}...`);
  const relatedChords = [];

  Object.keys(chordSets).forEach((key) => {
    chordSets[key].forEach((chord) => {
      if (chord.name.includes(currentChord)) {
        relatedChords.push(chord);
      }
    });
  });

  if (relatedChords.length > 0) {
    relatedChords.forEach((chord) => {
      console.log(
        `Pad: ${chord.pad} | Name: ${chord.name} | Quality: ${chord.quality} | Numeral: ${chord.numeral} | Mode: ${chord.mode} | Set: ${chord.set}`
      );
    });
  } else {
    console.log("No harmonic relationships found for the entered chord.");
  }
}

rl.question("Enter the root key (e.g., A, Bb, C#): ", (root) => {
  if (root) {
    generateChords(root);
    rl.question("Which chord are you on? (e.g., Eb, F#add9, Cmi7): ", (currentChord) => {
      if (currentChord) {
        findHarmonicRelationships(currentChord);
      }
      rl.close();
    });
  } else {
    console.log("Invalid root note. Please enter a valid key.");
    rl.close();
  }
});
