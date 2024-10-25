//EXTRACT INTERVAL

// Function to extract interval information from the root note
function extractInterval(chord, root) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const enharmonicMap = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
    };

    chord = chord.trim();
    root = enharmonicMap[root] || root;
    const slashIndex = chord.indexOf('/');
    let baseNote = chord;
    let bassNote = null;

    if (slashIndex !== -1) {
        baseNote = chord.slice(0, slashIndex).trim();
        bassNote = chord.slice(slashIndex + 1).trim();
        bassNote = enharmonicMap[bassNote] || bassNote;
        bassNote = bassNote.replace(/[0123456789#b]/g, '').trim();
    }

    // Remove text inside parentheses, e.g., "(add13)"
    baseNote = baseNote.replace(/\(.*?\)/g, '');
    baseNote = baseNote.replace(/(mi|min|maj|ma|dim|aug|sus|add|alt|#|b|6|7|9|11|13|\+|madd9|b5|#5|6\/9|[0-9])/g, '').trim();
    const normalizedBaseNote = enharmonicMap[baseNote] || baseNote;
    const qualities = chord.match(/(mi|min|maj|ma|sus|add|dim|aug|alt|6|7|9|11|13|b|#|\+|madd9|b5|#5|6\/9)/g) || [];

    const rootIndex = notes.indexOf(root);
    if (!notes.includes(normalizedBaseNote)) {
        throw new Error(`Invalid base note '${normalizedBaseNote}' in chord '${chord}'`);
    }
    const baseIndex = notes.indexOf(normalizedBaseNote);
    const interval = (baseIndex - rootIndex + 12) % 12;

    let bassInterval = null;
    if (bassNote) {
        if (!notes.includes(bassNote)) {
            throw new Error(`Invalid bass note '${bassNote}' in chord '${chord}'`);
        }
        const bassIndex = notes.indexOf(bassNote);
        bassInterval = (bassIndex - rootIndex + 12) % 12;
    }

    return { interval, qualities, bassInterval };
}

//TRANSPOSE

// Function to transpose a chord
function transposeChord(interval, qualities, newRoot, bassInterval = null) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const enharmonicMap = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
    };

    newRoot = enharmonicMap[newRoot] || newRoot;
    const newRootIndex = notes.indexOf(newRoot);
    const newBaseIndex = (newRootIndex + interval) % 12;
    let newBaseNote = notes[newBaseIndex];

    let transposedChord = newBaseNote + qualities.join('');

    if (bassInterval !== null) {
        const newBassIndex = (newRootIndex + bassInterval) % 12;
        let newBassNote = notes[newBassIndex];
        transposedChord += '/' + newBassNote;
    }

    return transposedChord;
}

// Function to transpose all chord sets and store them
function transposeAllChordSets(newRoot) {
    const transposedChordSets = {};
    for (let setName in chordSets) {
        transposedChordSets[setName] = transposeChordSet(chordSets[setName], "C", newRoot);
    }
    return transposedChordSets;
}

// Function to transpose a single chord set
function transposeChordSet(chordSet, originalRoot, newRoot) {
    const transposedSet = [];
    for (let chord of chordSet) {
        const intervalData = extractInterval(chord, originalRoot);
        const transposedChord = transposeChord(
            intervalData.interval, intervalData.qualities, newRoot, intervalData.bassInterval
        );
        transposedSet.push(transposedChord);
    }
    return transposedSet;
}

// Established chord sets
const chordSets = {
    MAJ1: ['C', 'Emi', 'F', 'G', 'Ami', 'Esus4', 'Gadd9', 'Dmi', 'Fadd9', 'F6', 'Gsus4', 'G'],
    MAJ2: ['C', 'C/B', 'C/A', 'C/G', 'Fadd9', 'Fmi', 'Csus4', 'Ami7', 'Emi', 'F', 'Gsus4', 'G6'],
    MAJ3: ['C', 'Ami', 'Fma7', 'Gsus4', 'Ami add9', 'F6', 'Csus2', 'G', 'Dsus2', 'Bb add9', 'Gsus4', 'Fadd9'],
    MAJ4: ['C', 'G', 'Ami', 'F6', 'F', 'Ami/E', 'Dmi7', 'Ami/C', 'Gadd9', 'Ami7', 'G/B', 'Dmi/G'],
    MAJ5: ['C', 'D', 'F', 'C', 'Ab', 'Eb', 'Bb', 'F', 'G7sus4', 'Bb add9', 'F6', 'Cadd9'],
    MAJ6: ['C', 'G', 'Dmi', 'Ami', 'F', 'G/F', 'C/E', 'Ami7', 'Dmi7', 'Emi7', 'C/F', 'Gsus4'],
    MAJ7: ['C', 'G', 'Ami', 'Emi', 'F', 'C/E', 'Dmi', 'Dmi/C', 'G7/B', 'G', 'F/A', 'G7/B'],
    MAJ8: ['Cma9', 'C#dim', 'Dmi9', 'D#dim7', 'Emi9', 'C9#5', 'Fma7(add13)', 'Bb9', 'Emi7', 'A9', 'Dmi11', 'G7(b9,b13)'],
    MIN1: ['Cmi', 'Cmi/Eb', 'Fmi', 'G', 'Abma7', 'Eb', 'Gmi', 'Bb', 'F', 'Fmi/Ab', 'Cmi/G', 'G'],
    MIN2: ['Cmi', 'G+/B', 'Cmi/Bb', 'Cmi/A', 'Abma7', 'Ebma7', 'Fmi', 'Bb7', 'Cmi', 'Bbadd9', 'Abadd9', 'G7sus4'],
    MIN3: ['Cmi', 'Ab', 'Eb', 'Bb', 'F', 'Fmi', 'Cmi/G', 'Gsus4', 'Cmi', 'Cmi#5', 'Cmi6', 'Cmi7'],
    MIN4: ['Cmi', 'Eb', 'Bb', 'F', 'Ab', 'Abma7', 'Abmi7', 'Ebma7', 'Dsus4', 'D', 'Fmi/G', 'G+'],
    MIN5: ['Cmi', 'Bb', 'Ab6', 'Bb add9', 'Cmi', 'Dmi7', 'Cmi/Eb', 'Fmi', 'G', 'Ab ma7', 'B6/9', 'Csus4'],
    MIN6: ['Cmi', 'Fmi', 'Bb', 'Eb', 'Ab', 'Dmi7(b5)', 'Gadd(b9)', 'G', 'Ab/G', 'G7', 'Cmi/G', 'G7(b9)'],
    MIN7: ['Cmi9', 'Ab9', 'Cmi11', 'C7(#9,b13)', 'Fmi9', 'Ebma7/F', 'C11', 'Ami11', 'Ab7#11', 'G7#9', 'Cmiadd9', 'G7(b9,b13)'],
    MIN8: ['Cmi6/9', 'Dmi7(b5)', 'Cmi11/G', 'Cmi9', 'Fmi9', 'Abmi7', 'Ebmi7', 'Bbmi7(b5)', 'Ami11', 'Abma7#5', 'G7(b9,b13)', 'Cmi9ma7'],
};

// FIND RELATIVE MAJOR OR MINOR

// Function to get the relative major or minor of a chord
function getRelativeChord(chord) {
    const relativeMap = {
        'C': 'Am', 'Am': 'C',
        'G': 'Em', 'Em': 'G',
        'D': 'Bm', 'Bm': 'D',
        'A': 'F#m', 'F#m': 'A',
        'E': 'C#m', 'Em': 'G',
        'C#m': 'E', 'B': 'G#m',
        'G#m': 'B', 'Gb': 'Ebm',
        'Ebm': 'Gb', 'Db': 'Bbm',
        'Bbm': 'Db', 'Ab': 'Fm',
        'Fm': 'Ab', 'Eb': 'Cm',
        'Cm': 'Eb', 'Bb': 'Gm',
        'Gm': 'Bb', 'F': 'Dm',
        'Dm': 'F'
    };
    const enharmonicMap = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
    };
    let baseNote = chord.replace(/\(.*?\)/g, ''); // Remove text inside parentheses
const isMinor = /(mi|min|m|mi7|mi9|mi11|mi6|mi7\(b5\))/.test(chord);
    if (!isMinor) {
    baseNote = baseNote.replace(/(maj|ma|dim|aug|sus|add|alt|#|b|6|7|9|11|13|madd9|b5|#5|6\/9|[0-9])/g, '').trim();
}

    baseNote = enharmonicMap[baseNote] || baseNote;

    // Special handling for chords with specific suffixes
    if (/^(Ami7|Ami11|Ami\/E)$/.test(chord)) {
        baseNote = 'Am';
    } else if (/^(Bbmi7\(b5\))$/.test(chord)) {
        baseNote = 'Bbm';
    } else if (/^(Dmi7|Dmi9|Dmi11|Dmi7\(b5\)|Dmi\/C)$/.test(chord)) {
        baseNote = 'Dm';
    } else if (/^(Fmi\/Ab|Cmi\/Eb|Cmi11\/G|Cmi6\/9|Cmi9)$/.test(chord)) {
        baseNote = 'Cm';
    }

    return relativeMap[isMinor ? baseNote : baseNote + 'm'] || null;
}

console.log(`Chord: ${chord}, Base Note: ${baseNote}, Is Minor: ${isMinor}, Major Key: ${majorKey}, Original Chord: ${chord}, Simplified Chord: ${isMinor ? baseNote + 'm' : baseNote}`);


// CIRCLE OF FIFTHS

function getAdjacentChords(chord) { // Function to get the clockwise and counterclockwise chords from the circle of fifths
    const circleOfFifths = [
        'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'
    ];
    const minorMap = {
        'C': 'Am', 'G': 'Em', 'D': 'Bm', 'A': 'F#m', 'E': 'C#m',
        'B': 'G#m', 'Gb': 'Ebm', 'Db': 'Bbm', 'Ab': 'Fm', 'Eb': 'Cm',
        'Bb': 'Gm', 'F': 'Dm'
    };
    const enharmonicMap = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
    };

    let baseNote = chord.replace(/\(.*?\)/g, ''); // Remove text inside parentheses
const isMinor = /(mi|min|m|mi7|mi9|mi11|mi6|mi7\(b5\))/.test(chord);
if (!isMinor) {
    baseNote = baseNote.replace(/(maj|ma|dim|aug|sus|add|alt|#|b|6|7|9|11|13|madd9|b5|#5|6\/9|[0-9])/g, '').trim();
}

    baseNote = enharmonicMap[baseNote] || baseNote;

    // Special handling for chords with specific suffixes
    if (/^(Ami7|Ami11|Ami\/E)$/.test(chord)) {
    baseNote = 'Am';
} else if (/^(Bbmi7\(b5\))$/.test(chord)) {
    baseNote = 'Bbm';
} else if (/^(Dmi7|Dmi9|Dmi11|Dmi7\(b5\)|Dmi\/C)$/.test(chord)) {
    baseNote = 'Dm';
} else if (/^(Fmi\/Ab|Cmi\/Eb|Cmi11\/G|Cmi6\/9|Cmi9)$/.test(chord)) {
    baseNote = 'Cm';
}

    let majorKey = baseNote;

    // If the chord is minor, use the minor key directly
    if (isMinor) {
        majorKey = baseNote + 'm';
    }

    // Convert majorKey to enharmonic equivalent if needed
    majorKey = enharmonicMap[majorKey] || majorKey;

    // If majorKey is not found in circleOfFifths, return null values
    const index = circleOfFifths.indexOf(majorKey.replace('m', ''));
    if (index === -1) {
        return {
            clockwiseMajor: null,
            counterClockwiseMajor: null,
            clockwiseMinor: null,
            counterClockwiseMinor: null
        };
    }

    const clockwiseMajor = circleOfFifths[(index + 1) % circleOfFifths.length];
    const counterClockwiseMajor = circleOfFifths[(index - 1 + circleOfFifths.length) % circleOfFifths.length];
    const clockwiseMinor = minorMap[clockwiseMajor];
    const counterClockwiseMinor = minorMap[counterClockwiseMajor];

    return { clockwiseMajor, counterClockwiseMajor, clockwiseMinor, counterClockwiseMinor };
}

// Accept user input from the console
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the new root note to transpose to: ', (newRoot) => {
    transposeAllChordSets(newRoot);

    rl.question('What chord are you currently on? ', (currentChord) => {
        let found = false;
        for (const [setName, chordSet] of Object.entries(chordSets)) {
            const position = chordSet.indexOf(currentChord);
            if (position !== -1) {
                const relativeChord = getRelativeChord(currentChord);
                const { clockwiseMajor, counterClockwiseMajor, clockwiseMinor, counterClockwiseMinor } = getAdjacentChords(currentChord);
                console.log(`Chord found in set: ${setName}, position: ${position}, relative chord: ${relativeChord}, clockwise major: ${clockwiseMajor}, counter clockwise major: ${counterClockwiseMajor}, clockwise minor: ${clockwiseMinor}, counter clockwise minor: ${counterClockwiseMinor}`);
                found = true;
                break;
            }
        }
        if (!found) {
            console.log('Chord not found in any set.');
        }
        rl.close();
    });
});
