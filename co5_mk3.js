const readline = require('readline');
//The script uses readline to get user input, then returns harmonically relevant chords for the provided key.

const chordSets = {
    MAJ1: [
        { set: 'MAJ1', pad: 1, chord: 'C', name: 'I' },
        { set: 'MAJ1', pad: 2, chord: 'Emi', name: 'iii' },
        { set: 'MAJ1', pad: 3, chord: 'F', name: 'IV' },
        { set: 'MAJ1', pad: 4, chord: 'G', name: 'V' },
        { set: 'MAJ1', pad: 5, chord: 'Ami', name: 'vi' },
        { set: 'MAJ1', pad: 6, chord: 'Esus4', name: 'V/V' },
        { set: 'MAJ1', pad: 7, chord: 'Gadd9', name: 'V(add9)' },
        { set: 'MAJ1', pad: 8, chord: 'Dmi', name: 'ii' },
        { set: 'MAJ1', pad: 9, chord: 'Fadd9', name: 'IV(add9)' },
        { set: 'MAJ1', pad: 10, chord: 'F6', name: 'IV6' },
        { set: 'MAJ1', pad: 11, chord: 'Gsus4', name: 'Vsus4' },
        { set: 'MAJ1', pad: 12, chord: 'G', name: 'V' }
    ],
    MAJ2: [
        { set: 'MAJ2', pad: 1, chord: 'C', name: 'I' },
        { set: 'MAJ2', pad: 2, chord: 'C/B', name: 'I' },
        { set: 'MAJ2', pad: 3, chord: 'C/A', name: 'I' },
        { set: 'MAJ2', pad: 4, chord: 'C/G', name: 'I' },
        { set: 'MAJ2', pad: 5, chord: 'Fadd9', name: 'IV(add9)' },
        { set: 'MAJ2', pad: 6, chord: 'Fmi', name: 'iv' },
        { set: 'MAJ2', pad: 7, chord: 'Csus9', name: 'I(sus9)' },
        { set: 'MAJ2', pad: 8, chord: 'Ami7', name: 'vi7' },
        { set: 'MAJ2', pad: 9, chord: 'Emi', name: 'iii' },
        { set: 'MAJ2', pad: 10, chord: 'F', name: 'IV' },
        { set: 'MAJ2', pad: 11, chord: 'Gsus4', name: 'Vsus4' },
        { set: 'MAJ2', pad: 12, chord: 'G6', name: 'V6' }
    ],
    MAJ3: [
        { set: 'MAJ3', pad: 1, chord: 'C', name: 'I' },
        { set: 'MAJ3', pad: 2, chord: 'Ami', name: 'vi' },
        { set: 'MAJ3', pad: 3, chord: 'Fma7', name: 'IVmaj7' },
        { set: 'MAJ3', pad: 4, chord: 'Gsus4', name: 'Vsus4' },
        { set: 'MAJ3', pad: 5, chord: 'Ami add9', name: 'vi(add9)' },
        { set: 'MAJ3', pad: 6, chord: 'F6', name: 'IV6' },
        { set: 'MAJ3', pad: 7, chord: 'Csus2', name: 'I(sus2)' },
        { set: 'MAJ3', pad: 8, chord: 'G', name: 'V' },
        { set: 'MAJ3', pad: 9, chord: 'Dsus2', name: 'V/V' },
        { set: 'MAJ3', pad: 10, chord: 'Bb add9', name: 'bVII(add9)' },
        { set: 'MAJ3', pad: 11, chord: 'Gsus4', name: 'Vsus4' },
        { set: 'MAJ3', pad: 12, chord: 'Fadd9', name: 'IV(add9)' }
    ],
    MAJ4: [
        { set: 'MAJ4', pad: 1, chord: 'C', name: 'I' },
        { set: 'MAJ4', pad: 2, chord: 'G', name: 'V' },
        { set: 'MAJ4', pad: 3, chord: 'Ami', name: 'vi' },
        { set: 'MAJ4', pad: 4, chord: 'F6', name: 'IV6' },
        { set: 'MAJ4', pad: 5, chord: 'F', name: 'IV' },
        { set: 'MAJ4', pad: 6, chord: 'Ami/E', name: 'vi/E' },
        { set: 'MAJ4', pad: 7, chord: 'Dmi7', name: 'ii7' },
        { set: 'MAJ4', pad: 8, chord: 'Ami/C', name: 'vi/C' },
        { set: 'MAJ4', pad: 9, chord: 'Gadd9', name: 'V(add9)' },
        { set: 'MAJ4', pad: 10, chord: 'Ami7', name: 'vi7' },
        { set: 'MAJ4', pad: 11, chord: 'G/B', name: 'V6' },
        { set: 'MAJ4', pad: 12, chord: 'Dmi/G', name: 'ii/V' }
    ],
    MAJ5: [
        { set: 'MAJ5', pad: 1, chord: 'C', name: 'I' },
        { set: 'MAJ5', pad: 2, chord: 'D', name: 'ii' },
        { set: 'MAJ5', pad: 3, chord: 'F', name: 'IV' },
        { set: 'MAJ5', pad: 4, chord: 'C', name: 'I' },
        { set: 'MAJ5', pad: 5, chord: 'Ab', name: 'bVI' },
        { set: 'MAJ5', pad: 6, chord: 'Eb', name: 'bIII' },
        { set: 'MAJ5', pad: 7, chord: 'Bb', name: 'bVII' },
        { set: 'MAJ5', pad: 8, chord: 'F', name: 'V' },
        { set: 'MAJ5', pad: 9, chord: 'G7sus4', name: 'V7sus4' },
        { set: 'MAJ5', pad: 10, chord: 'Bb add9', name: 'bVII(add9)' },
        { set: 'MAJ5', pad: 11, chord: 'F6', name: 'IV6' },
        { set: 'MAJ5', pad: 12, chord: 'Cadd9', name: 'I(add9)' }
    ],
    MAJ6: [
        { set: 'MAJ6', pad: 1, chord: 'C', name: 'I' },
        { set: 'MAJ6', pad: 2, chord: 'G', name: 'V' },
        { set: 'MAJ6', pad: 3, chord: 'Dmi', name: 'ii' },
        { set: 'MAJ6', pad: 4, chord: 'Ami', name: 'vi' },
        { set: 'MAJ6', pad: 5, chord: 'F', name: 'IV' },
        { set: 'MAJ6', pad: 6, chord: 'G/F', name: 'V/IV' },
        { set: 'MAJ6', pad: 7, chord: 'C/E', name: 'I/E' },
        { set: 'MAJ6', pad: 8, chord: 'Ami7', name: 'vi7' },
        { set: 'MAJ6', pad: 9, chord: 'Dmi7', name: 'ii7' },
        { set: 'MAJ6', pad: 10, chord: 'Emi7', name: 'iii7' },
        { set: 'MAJ6', pad: 11, chord: 'C/F', name: 'I/IV' },
        { set: 'MAJ6', pad: 12, chord: 'Gsus4', name: 'Vsus4' }
    ],
    MAJ7: [
        { set: 'MAJ7', pad: 1, chord: 'C', name: 'I' },
        { set: 'MAJ7', pad: 2, chord: 'G', name: 'V' },
        { set: 'MAJ7', pad: 3, chord: 'Ami', name: 'vi' },
        { set: 'MAJ7', pad: 4, chord: 'Emi', name: 'iii' },
        { set: 'MAJ7', pad: 5, chord: 'F', name: 'IV' },
        { set: 'MAJ7', pad: 6, chord: 'C/E', name: 'I/E' },
        { set: 'MAJ7', pad: 7, chord: 'Dmi', name: 'ii' },
        { set: 'MAJ7', pad: 8, chord: 'Dmi/C', name: 'ii/C' },
        { set: 'MAJ7', pad: 9, chord: 'G7/B', name: 'V6/5' },
        { set: 'MAJ7', pad: 10, chord: 'G', name: 'V' },
        { set: 'MAJ7', pad: 11, chord: 'F/A', name: 'IV6' },
        { set: 'MAJ7', pad: 12, chord: 'G7/B', name: 'V6/5' }
    ],
    MAJ8: [
        { set: 'MAJ8', pad: 1, chord: 'Cma9', name: 'I(add9)' },
        { set: 'MAJ8', pad: 2, chord: 'C#dim', name: 'viio' },
        { set: 'MAJ8', pad: 3, chord: 'Dmi9', name: 'ii9' },
        { set: 'MAJ8', pad: 4, chord: 'D#dim7', name: 'viio7' },
        { set: 'MAJ8', pad: 5, chord: 'Emi9', name: 'iii9' },
        { set: 'MAJ8', pad: 6, chord: 'C9#5', name: 'I9(#5)' },
        { set: 'MAJ8', pad: 7, chord: 'Fma7(add13)', name: 'IVmaj7(add13)' },
        { set: 'MAJ8', pad: 8, chord: 'Bb9', name: 'bVII9' },
        { set: 'MAJ8', pad: 9, chord: 'Emi7', name: 'iii7' },
        { set: 'MAJ8', pad: 10, chord: 'A9', name: 'V/vi' },
        { set: 'MAJ8', pad: 11, chord: 'Dmi11', name: 'ii11' },
        { set: 'MAJ8', pad: 12, chord: 'G7(b9, b13)', name: 'V7(b9, b13)' }
    ],
    MIN1: [
        { set: 'MIN1', pad: 1, chord: 'Cmi', name: 'i' },
        { set: 'MIN1', pad: 2, chord: 'Cmi/Eb', name: 'i/Eb' },
        { set: 'MIN1', pad: 3, chord: 'Fmi', name: 'iv' },
        { set: 'MIN1', pad: 4, chord: 'G', name: 'V' },
        { set: 'MIN1', pad: 5, chord: 'Abma7', name: 'VImaj7' },
        { set: 'MIN1', pad: 6, chord: 'Eb', name: 'III' },
        { set: 'MIN1', pad: 7, chord: 'Gmi', name: 'v' },
        { set: 'MIN1', pad: 8, chord: 'Bb', name: 'VII' },
        { set: 'MIN1', pad: 9, chord: 'F', name: 'iv' },
        { set: 'MIN1', pad: 10, chord: 'Fmi/Ab', name: 'iv6' },
        { set: 'MIN1', pad: 11, chord: 'Cmi/G', name: 'i6' },
        { set: 'MIN1', pad: 12, chord: 'G', name: 'V' }
    ],
    MIN2: [
        { set: 'MIN2', pad: 1, chord: 'Cmi', name: 'i' },
        { set: 'MIN2', pad: 2, chord: 'G+/B', name: 'V+' },
        { set: 'MIN2', pad: 3, chord: 'Cmi/Bb', name: 'i/Bb' },
        { set: 'MIN2', pad: 4, chord: 'Cmi/A', name: 'i/A' },
        { set: 'MIN2', pad: 5, chord: 'Abma7', name: 'VImaj7' },
        { set: 'MIN2', pad: 6, chord: 'Ebma7', name: 'IIImaj7' },
        { set: 'MIN2', pad: 7, chord: 'Fmi', name: 'iv' },
        { set: 'MIN2', pad: 8, chord: 'Bb7', name: 'VII7' },
        { set: 'MIN2', pad: 9, chord: 'Cmi', name: 'i' },
        { set: 'MIN2', pad: 10, chord: 'Bb add9', name: 'VII(add9)' },
        { set: 'MIN2', pad: 11, chord: 'Ab add9', name: 'VI(add9)' },
        { set: 'MIN2', pad: 12, chord: 'G7sus4', name: 'V7sus4' }
    ],
    MIN3: [
        { set: 'MIN3', pad: 1, chord: 'Cmi', name: 'i' },
        { set: 'MIN3', pad: 2, chord: 'Ab', name: 'VI' },
        { set: 'MIN3', pad: 3, chord: 'Eb', name: 'III' },
        { set: 'MIN3', pad: 4, chord: 'Bb', name: 'VII' },
        { set: 'MIN3', pad: 5, chord: 'F', name: 'IV' },
        { set: 'MIN3', pad: 6, chord: 'Fmi', name: 'iv' },
        { set: 'MIN3', pad: 7, chord: 'Cmi/G', name: 'i6' },
        { set: 'MIN3', pad: 8, chord: 'Gsus4', name: 'V7sus4' },
        { set: 'MIN3', pad: 9, chord: 'Cmi', name: 'i' },
        { set: 'MIN3', pad: 10, chord: 'Cmi#5', name: 'i+' },
        { set: 'MIN3', pad: 11, chord: 'Cmi6', name: 'i6' },
        { set: 'MIN3', pad: 12, chord: 'Cmi7', name: 'i7' }
    ],
    MIN4: [
        { set: 'MIN4', pad: 1, chord: 'Cmi', name: 'i' },
        { set: 'MIN4', pad: 2, chord: 'Eb', name: 'III' },
        { set: 'MIN4', pad: 3, chord: 'Bb', name: 'VII' },
        { set: 'MIN4', pad: 4, chord: 'F', name: 'IV' },
        { set: 'MIN4', pad: 5, chord: 'Ab', name: 'VI' },
        { set: 'MIN4', pad: 6, chord: 'Abma7', name: 'VImaj7' },
        { set: 'MIN4', pad: 7, chord: 'Abmi7', name: 'VImin7' },
        { set: 'MIN4', pad: 8, chord: 'Ebma7', name: 'IIImaj7' },
        { set: 'MIN4', pad: 9, chord: 'Dsus4', name: 'V7sus4' },
        { set: 'MIN4', pad: 10, chord: 'D', name: 'V' },
        { set: 'MIN4', pad: 11, chord: 'Fmi/G', name: 'iv6' },
        { set: 'MIN4', pad: 12, chord: 'G+', name: 'V+' }
    ],
    MIN5: [
        { set: 'MIN5', pad: 1, chord: 'Cmi', name: 'i' },
        { set: 'MIN5', pad: 2, chord: 'Bb', name: 'VII' },
        { set: 'MIN5', pad: 3, chord: 'Ab6', name: 'Ab6' },
        { set: 'MIN5', pad: 4, chord: 'Bb add9', name: 'VII(add9)' },
        { set: 'MIN5', pad: 5, chord: 'Cmi', name: 'i' },
        { set: 'MIN5', pad: 6, chord: 'Dmi7', name: 'ii7' },
        { set: 'MIN5', pad: 7, chord: 'Cmi/Eb', name: 'i/Eb' },
        { set: 'MIN5', pad: 8, chord: 'Fmi', name: 'iv' },
        { set: 'MIN5', pad: 9, chord: 'G', name: 'V' },
        { set: 'MIN5', pad: 10, chord: 'Ab ma7', name: 'VImaj7' },
        { set: 'MIN5', pad: 11, chord: 'B6/9', name: 'vi' },
        { set: 'MIN5', pad: 12, chord: 'Csus4', name: 'Isus4' }
    ],
    MIN6: [
        { set: 'MIN6', pad: 1, chord: 'Cmi', name: 'i' },
        { set: 'MIN6', pad: 2, chord: 'Fmi', name: 'iv' },
        { set: 'MIN6', pad: 3, chord: 'Bb', name: 'VII' },
        { set: 'MIN6', pad: 4, chord: 'Eb', name: 'III' },
        { set: 'MIN6', pad: 5, chord: 'Ab', name: 'VI' },
        { set: 'MIN6', pad: 6, chord: 'Dmi7(b5)', name: 'ii7(b5)' },
        { set: 'MIN6', pad: 7, chord: 'Gadd(b9)', name: 'V(add9)' },
        { set: 'MIN6', pad: 8, chord: 'G', name: 'V' },
        { set: 'MIN6', pad: 9, chord: 'Ab/G', name: 'VI/5' },
        { set: 'MIN6', pad: 10, chord: 'G7', name: 'V7' },
        { set: 'MIN6', pad: 11, chord: 'Cmi/G', name: 'i6' },
        { set: 'MIN6', pad: 12, chord: 'G7(b9)', name: 'V7(b9)' }
    ],
    MIN7: [
        { set: 'MIN7', pad: 1, chord: 'Cmi9', name: 'i9' },
        { set: 'MIN7', pad: 2, chord: 'Ab9', name: 'VI9' },
        { set: 'MIN7', pad: 3, chord: 'Cmi11', name: 'i11' },
        { set: 'MIN7', pad: 4, chord: 'C7 (#9, b13)', name: 'V7(#9, b13)' },
        { set: 'MIN7', pad: 5, chord: 'Fmi9', name: 'iv9' },
        { set: 'MIN7', pad: 6, chord: 'Ebma7/F', name: 'IIImaj7/F' },
        { set: 'MIN7', pad: 7, chord: 'C11', name: 'i11' },
        { set: 'MIN7', pad: 8, chord: 'Ami11', name: 'vi11' },
        { set: 'MIN7', pad: 9, chord: 'Ab7#11', name: 'VI7#11' },
        { set: 'MIN7', pad: 10, chord: 'G7#9', name: 'V7#9' },
        { set: 'MIN7', pad: 11, chord: 'Cmi add9', name: 'i(add9)' },
        { set: 'MIN7', pad: 12, chord: 'G7 (b9, b13)', name: 'V7(b9, b13)' }
    ],
    MIN8: [
        { set: 'MIN8', pad: 1, chord: 'Cmi6/9', name: 'i6/9' },
        { set: 'MIN8', pad: 2, chord: 'Dmi7(b5)', name: 'ii7(b5)' },
        { set: 'MIN8', pad: 3, chord: 'Cmi11/G', name: 'i11/G' },
        { set: 'MIN8', pad: 4, chord: 'Cmi9', name: 'i9' },
        { set: 'MIN8', pad: 5, chord: 'Fmi9', name: 'iv9' },
        { set: 'MIN8', pad: 6, chord: 'Abmi7', name: 'VImin7' },
        { set: 'MIN8', pad: 7, chord: 'Ebmi7', name: 'IIImin7' },
        { set: 'MIN8', pad: 8, chord: 'Bbmi7(b5)', name: 'VII7(b5)' },
        { set: 'MIN8', pad: 9, chord: 'Ami11', name: 'vi11' },
        { set: 'MIN8', pad: 10, chord: 'Abma7#5', name: 'VImaj7#5' },
        { set: 'MIN8', pad: 11, chord: 'G7 (b9, b13)', name: 'V7(b9, b13)' },
        { set: 'MIN8', pad: 12, chord: 'Cmi9 ma7', name: 'i9ma7' }
    ]
};

function circleOfFifths(chordKey, relativeMinor = false) {
    // The circleOfFifths() function determines the relative minor key, clockwise, and counterclockwise keys for a given major key, providing information about its harmonic relationships.

    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
    const minorKeys = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];
    const keyAliases = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb', 'Cb': 'B', 'Fb': 'E' };

    chordKey = keyAliases[chordKey] || chordKey.charAt(0).toUpperCase() + chordKey.slice(1).toLowerCase();
    const index = majorKeys.indexOf(chordKey);

    if (index === -1) {
        // Handle flat/sharp equivalence
        const equivalentKey = Object.keys(keyAliases).find(alias => keyAliases[alias] === chordKey);
        if (equivalentKey) {
            chordKey = keyAliases[equivalentKey];
        } else {
            return "Invalid key input. Please provide a valid key.";
        }
    }

    if (relativeMinor) return minorKeys[index];

    return {
        relativeMinor: `${minorKeys[index]} of '${chordKey}'`,
        clockwise: `${majorKeys[(index + 1) % majorKeys.length]} (${keyAliases[majorKeys[(index + 1) % majorKeys.length]] || majorKeys[(index + 1) % majorKeys.length]})`,
        clockwiseRelativeMinor: `${minorKeys[(index + 1) % majorKeys.length]} (${minorKeys[(index + 1) % majorKeys.length]})`,
        counterClockwise: `${majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]} (${keyAliases[majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]] || majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]})`,
        counterClockwiseRelativeMinor: `${minorKeys[(index - 1 + majorKeys.length) % majorKeys.length]} (${minorKeys[(index - 1 + majorKeys.length) % majorKeys.length]})`
    };
}

function findHarmonicallyRelevantChords(chord) {
    // The findHarmonicallyRelevantChords() function identifies chords that are harmonically related to the provided chord, searching across all sets.
    const relevantChords = [...chordSets.MAJ1, ...chordSets.MAJ2, ...chordSets.MAJ3, ...chordSets.MAJ4, ...chordSets.MAJ5, ...chordSets.MAJ6, ...chordSets.MAJ7, ...chordSets.MAJ8, ...chordSets.MIN1, ...chordSets.MIN2, ...chordSets.MIN3, ...chordSets.MIN4, ...chordSets.MIN5, ...chordSets.MIN6, ...chordSets.MIN7, ...chordSets.MIN8].filter(item => item.chord.includes(chord) || item.chord.includes(chord.replace('b', '#')) || item.chord.includes(chord.replace('#', 'b')) || item.chord.includes(chord.replace(/mi|sus|add/, '')));
    return relevantChords.length > 0 ? relevantChords : "No harmonically relevant chords found.";
}

function findChordsForKey(key) {
    //  The findChordsForKey() function uses the circleOfFifths() to find relevant chords for a given key and also finds chords for its relative minor, clockwise, and counterclockwise keys.
    const harmonics = circleOfFifths(key);
    const harmonicallyRelevantChords = {
        relativeMinor: harmonics.relativeMinor,
        chords: findHarmonicallyRelevantChords(harmonics.relativeMinor.split(' ')[0]),
        clockwise: harmonics.clockwise,
        clockwiseChords: findHarmonicallyRelevantChords(harmonics.clockwise.split(' ')[0]),
        clockwiseRelativeMinor: harmonics.clockwiseRelativeMinor,
        clockwiseRelativeMinorChords: findHarmonicallyRelevantChords(harmonics.clockwiseRelativeMinor.split(' ')[0]),
        counterClockwise: harmonics.counterClockwise,
        counterClockwiseChords: findHarmonicallyRelevantChords(harmonics.counterClockwise.split(' ')[0]),
        counterClockwiseRelativeMinor: harmonics.counterClockwiseRelativeMinor,
        counterClockwiseRelativeMinorChords: findHarmonicallyRelevantChords(harmonics.counterClockwiseRelativeMinor.split(' ')[0])
    };
    return harmonicallyRelevantChords;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Please enter a key or chord: ', (input) => {
    input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    console.log(findChordsForKey(input));
    rl.close();
});
