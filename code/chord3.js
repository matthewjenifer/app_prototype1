// Define the chromatic scale to help with transposing
const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Define a normalization map for enharmonic equivalents
const enharmonicMap = {
  'A#': 'Bb',
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#'
};

// Helper function to normalize chord input
function normalizeChord(chord) {
  const match = chord.match(/[A-G]#?/);
  if (match) {
    const root = match[0];
    const normalizedRoot = enharmonicMap[root] || root; // Convert to enharmonic equivalent if available
    return chord.replace(root, normalizedRoot);
  }
  return chord;
}

// Helper function to transpose a chord with slash handling
function transposeChord(chord, steps) {
  chord = normalizeChord(chord); // Normalize the chord before transposing

  if (chord.includes('/')) {
    const [mainChord, bassNote] = chord.split('/');
    const transposedMainChord = transposeSingleChord(mainChord, steps);
    const transposedBassNote = transposeSingleChord(bassNote, steps);
    return `${transposedMainChord}/${transposedBassNote}`;
  } else {
    return transposeSingleChord(chord, steps);
  }
}

// Helper function to transpose a single chord (without considering slashes)
function transposeSingleChord(chord, steps) {
  const match = chord.match(/[A-G]#?/);
  if (!match) {
    console.error(`Invalid chord: ${chord}`);
    return chord;
  }

  let root = match[0];
  let chordType = chord.slice(root.length);
  let currentIndex = chromaticScale.indexOf(root);

  if (currentIndex === -1) {
    console.error(`Invalid root note: ${root}`);
    return chord;
  }

  let newIndex = (currentIndex + steps + 12) % 12;
  return chromaticScale[newIndex] + chordType;
}

// Function to calculate semitone difference between the original key and new key
function calculateSteps(originalKey, newKey) {
  originalKey = normalizeChord(originalKey);
  newKey = normalizeChord(newKey);

  let originalIndex = chromaticScale.indexOf(originalKey);
  let newIndex = chromaticScale.indexOf(newKey);
  return newIndex - originalIndex;
}

// Main transposer function (store the transposed chords)
let transposedChordSets = {};

function transposeChords(songKey, originalKey = 'C') {
  const steps = calculateSteps(originalKey, songKey);

  const chordSets = {
    MAJ1: {
      Pad1: 'C',
      Pad2: 'Emi',
      Pad3: 'F',
      Pad4: 'G',
      Pad5: 'Ami',
      Pad6: 'Esus4',
      Pad7: 'Gadd9',
      Pad8: 'Dmi',
      Pad9: 'Fadd9',
      Pad10: 'F6',
      Pad11: 'Gsus4',
      Pad12: 'G'
    },
    MAJ2: {
      Pad1: 'C',
      Pad2: 'C/B',
      Pad3: 'C/A',
      Pad4: 'C/G',
      Pad5: 'Fadd9',
      Pad6: 'Fmi',
      Pad7: 'Csus9',
      Pad8: 'Ami7',
      Pad9: 'Emi',
      Pad10: 'F',
      Pad11: 'Gsus4',
      Pad12: 'G6'
    },
    MAJ3: {
        Pad1: 'C',
        Pad2: 'Ami',
        Pad3: 'Fma7',
        Pad4: 'Gsus4',
        Pad5: 'Ami add9',
        Pad6: 'F6',
        Pad7: 'Csus2',
        Pad8: 'G',
        Pad9: 'Dsus2',
        Pad10: 'Bb add9',
        Pad11: 'Gsus4',
        Pad12: 'Fadd9'
      },
    MAJ4: {
        Pad1: 'C',
        Pad2: 'G',
        Pad3: 'Ami',
        Pad4: 'F6',
        Pad5: 'F',
        Pad6: 'Ami/E',
        Pad7: 'Dmi7',
        Pad8: 'Ami/C',
        Pad9: 'Gadd9',
        Pad10: 'Ami7',
        Pad11: 'G/B',
        Pad12: 'Dmi/G'
      },
    MAJ5: {
        Pad1: 'C',
        Pad2: 'D',
        Pad3: 'F',
        Pad4: 'C',
        Pad5: 'Ab',
        Pad6: 'Eb',
        Pad7: 'Bb',
        Pad8: 'F',
        Pad9: 'G7sus4',
        Pad10: 'Bb add9',
        Pad11: 'F6',
        Pad12: 'Cadd9'
      },
    MAJ6: {
        Pad1: 'C',
        Pad2: 'G',
        Pad3: 'Dmi',
        Pad4: 'Ami',
        Pad5: 'F',
        Pad6: 'G/F',
        Pad7: 'C/E',
        Pad8: 'Ami7',
        Pad9: 'Dmi7',
        Pad10: 'Emi7',
        Pad11: 'C/F',
        Pad12: 'Gsus4'
      },
      MAJ7: {
        Pad1: 'C',
        Pad2: 'G',
        Pad3: 'Ami',
        Pad4: 'Emi',
        Pad5: 'F',
        Pad6: 'C/E',
        Pad7: 'Dmi',
        Pad8: 'Dmi/C',
        Pad9: 'G7/B',
        Pad10: 'G',
        Pad11: 'F/A',
        Pad12: 'G7/B'
      },
      MAJ8: {
        Pad1: 'Cma9',
        Pad2: 'C#dim',
        Pad3: 'Dmi9',
        Pad4: 'D#dim7',
        Pad5: 'Emi9',
        Pad6: 'C9#5',
        Pad7: 'Fma7(add13)',
        Pad8: 'Bb9',
        Pad9: 'Emi7',
        Pad10: 'A9',
        Pad11: 'Dmi11',
        Pad12: 'G7(b9, b13)'
      },
      MIN1: {
        Pad1: 'Cmi',
        Pad2: 'Cmi/Eb',
        Pad3: 'Fmi',
        Pad4: 'G',
        Pad5: 'Abma7',
        Pad6: 'Eb',
        Pad7: 'Gmi',
        Pad8: 'Bb',
        Pad9: 'F',
        Pad10: 'Fmi/Ab',
        Pad11: 'Cmi/G',
        Pad12: 'G'
      },
      MIN2: {
        Pad1: 'Cmi',
        Pad2: 'G+/B',
        Pad3: 'Cmi/Bb',
        Pad4: 'Cmi/A',
        Pad5: 'Abma7',
        Pad6: 'Ebma7',
        Pad7: 'Fmi',
        Pad8: 'Bb7',
        Pad9: 'Cmi',
        Pad10: 'Bb add9',
        Pad11: 'Ab add9',
        Pad12: 'G7sus4'
      },
      MIN3: {
        Pad1: 'Cmi',
        Pad2: 'Ab',
        Pad3: 'Eb',
        Pad4: 'Bb',
        Pad5: 'F',
        Pad6: 'Fmi',
        Pad7: 'Cmi/G',
        Pad8: 'Gsus4',
        Pad9: 'Cmi',
        Pad10: 'Cmi#5',
        Pad11: 'Cmi6',
        Pad12: 'Cmi7'
      },
      MIN4: {
        Pad1: 'Cmi',
        Pad2: 'Eb',
        Pad3: 'Bb',
        Pad4: 'F',
        Pad5: 'Ab',
        Pad6: 'Abma7',
        Pad7: 'Abmi7',
        Pad8: 'Ebma7',
        Pad9: 'Dsus4',
        Pad10: 'D',
        Pad11: 'Fmi/G',
        Pad12: 'G+'
      },
      MIN5: {
        Pad1: 'Cmi',
        Pad2: 'Bb',
        Pad3: 'Ab6',
        Pad4: 'Bb add9',
        Pad5: 'Cmi',
        Pad6: 'Dmi7',
        Pad7: 'Cmi/Eb',
        Pad8: 'Fmi',
        Pad9: 'G',
        Pad10: 'Ab ma7',
        Pad11: 'B6/9',
        Pad12: 'Csus4'
      },
      MIN6: {
        Pad1: 'Cmi',
        Pad2: 'Fmi',
        Pad3: 'Bb',
        Pad4: 'Eb',
        Pad5: 'Ab',
        Pad6: 'Dmi7(b5)',
        Pad7: 'Gadd(b9)',
        Pad8: 'G',
        Pad9: 'Ab/G',
        Pad10: 'G7',
        Pad11: 'Cmi/G',
        Pad12: 'G7(b9)'
      },
      MIN7: {
        Pad1: 'Cmi9',
        Pad2: 'Ab9',
        Pad3: 'Cmi11',
        Pad4: 'C7(#9, b13)',
        Pad5: 'Fmi9',
        Pad6: 'Ebma7/F',
        Pad7: 'C11',
        Pad8: 'Ami11',
        Pad9: 'Ab7#11',
        Pad10: 'G7#9',
        Pad11: 'Cmi add9',
        Pad12: 'G7(b9, b13)'
      },
      MIN8: {
        Pad1: 'Cmi6/9',
        Pad2: 'Dmi7(b5)',
        Pad3: 'Cmi11/G',
        Pad4: 'Cmi9',
        Pad5: 'Fmi9',
        Pad6: 'Abmi7',
        Pad7: 'Ebmi7',
        Pad8: 'Bbmi7(b5)',
        Pad9: 'Ami11',
        Pad10: 'Abma7#5',
        Pad11: 'G7(b9, b13)',
        Pad12: 'Cmi9 ma7'
      }                     
  };

   // Transpose each chord in each set (for all sets MAJ1 to MIN8)
   Object.keys(chordSets).forEach(set => {
    transposedChordSets[set] = {};
    Object.keys(chordSets[set]).forEach(pad => {
      transposedChordSets[set][pad] = transposeChord(chordSets[set][pad], steps);
    });
  });
}

// Function to find a chord in the transposed sets
function findChordInSets(chord) {
  chord = normalizeChord(chord);

  for (let set in transposedChordSets) {
    for (let pad in transposedChordSets[set]) {
      if (transposedChordSets[set][pad] === chord) {
        return { set, pad };
      }
    }
  }
  return null;
}

// Circle of Fifths Functionality
function circleOfFifthsOutput(chordRoot) {
  chordRoot = normalizeChord(chordRoot);

  const circleOfFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
  const relativeMinors = {
    'C': 'Ami', 'C#': 'A#mi', 'Db': 'Bbm', 'D': 'Bmi', 'D#': 'Cmi', 'Eb': 'Cmi',
    'E': 'C#mi', 'F': 'Dmi', 'F#': 'D#mi', 'G': 'Emi', 'G#': 'Fmi', 'Ab': 'Fmi',
    'A': 'F#mi', 'A#': 'Gmi', 'Bb': 'Gmi', 'B': 'G#mi'
  };

  const currentKeyIndex = circleOfFifths.indexOf(chordRoot);
  if (currentKeyIndex === -1) {
    console.error(`Invalid root note for circle of fifths: '${chordRoot}'`);
    return;
  }

  const clockwiseKey = circleOfFifths[(currentKeyIndex + 1) % circleOfFifths.length];
  const counterClockwiseKey = circleOfFifths[(currentKeyIndex - 1 + circleOfFifths.length) % circleOfFifths.length];

  console.log('_______________________________');
  console.log('Circle of Fifths Information:');
  console.log('_______________________________');
  console.log(`Relative Minor: ${relativeMinors[chordRoot] || 'N/A'}`);
  console.log('_______________________________');
  console.log(`Clockwise Key: ${clockwiseKey}`);
  console.log(`Counter Clockwise Key: ${counterClockwiseKey}`);
  console.log('_______________________________');
  console.log(`Relative Minor of Clockwise Key: ${relativeMinors[clockwiseKey] || 'N/A'}`);
  console.log(`Relative Minor of Counter Clockwise Key: ${relativeMinors[counterClockwiseKey] || 'N/A'}`);
}

// Function to request chord input and display Circle of Fifths info
function promptUserForChord() {
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Please enter a chord to search for: ', (chord) => {
  chord = chord.trim();  // Trim any unnecessary whitespace to avoid input errors
  const result = findChordInSets(chord);
  if (result) {
    console.log(`Found ${chord} in ${result.set}, ${result.pad}`);
    const root = chord.match(/[A-G]#?/)[0]; // Extract the root note from the chord
    circleOfFifthsOutput(root); // Display circle of fifths info for the root note
  } else {
    console.log(`Chord ${chord} not found in any set.`);
  }
  readline.close();
});
}

// Function to request user input for transposition
function promptUserForKeyAndTranspose() {
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Please enter the key to transpose the chord sets: ', (songKey) => {
  transposeChords(songKey);
  console.log('Chord sets transposed. You can now input a chord to search.');
  promptUserForChord(); // Move on to chord input
});
}

// Start the process
promptUserForKeyAndTranspose();
