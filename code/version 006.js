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

    baseNote = baseNote.replace(/[0123456789#bmiaddsus\(\),\+]/g, '').trim();
    const normalizedBaseNote = enharmonicMap[baseNote] || baseNote;
    const qualities = chord.match(/(mi|sus|add|maj|dim|aug|6|7|9|11|13|b|#|\+)/g) || [];

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
    MAJ8: ['Cma9', 'C#dim', 'Dmi9', 'D#dim7', 'Emi9', 'C9#5', 'Fma7(add13)', 'Bb9', 'Emi7', 'A9', 'Dmi11', 'G7(b9, b13)'],
    MIN1: ['Cmi', 'Cmi/Eb', 'Fmi', 'G', 'Abma7', 'Eb', 'Gmi', 'Bb', 'F', 'Fmi/Ab', 'Cmi/G', 'G'],
    MIN2: ['Cmi', 'G+/B', 'Cmi/Bb', 'Cmi/A', 'Abma7', 'Ebma7', 'Fmi', 'Bb7', 'Cmi', 'Bb add9', 'Ab add9', 'G7sus4'],
    MIN3: ['Cmi', 'Ab', 'Eb', 'Bb', 'F', 'Fmi', 'Cmi/G', 'Gsus4', 'Cmi', 'Cmi#5', 'Cmi6', 'Cmi7'],
    MIN4: ['Cmi', 'Eb', 'Bb', 'F', 'Ab', 'Abma7', 'Abmi7', 'Ebma7', 'Dsus4', 'D', 'Fmi/G', 'G+'],
    MIN5: ['Cmi', 'Bb', 'Ab6', 'Bb add9', 'Cmi', 'Dmi7', 'Cmi/Eb', 'Fmi', 'G', 'Ab ma7', 'B6/9', 'Csus4'],
    MIN6: ['Cmi', 'Fmi', 'Bb', 'Eb', 'Ab', 'Dmi7(b5)', 'Gadd(b9)', 'G', 'Ab/G', 'G7', 'Cmi/G', 'G7(b9)'],
    MIN7: ['Cmi9', 'Ab9', 'Cmi11', 'C7(#9, b13)', 'Fmi9', 'Ebma7/F', 'C11', 'Ami11', 'Ab7#11', 'G7#9', 'Cmi add9', 'G7(b9, b13)'],
    MIN8: ['Cmi6/9', 'Dmi7(b5)', 'Cmi11/G', 'Cmi9', 'Fmi9', 'Abmi7', 'Ebmi7', 'Bbmi7(b5)', 'Ami11', 'Abma7#5', 'G7(b9, b13)', 'Cmi9 ma7'],
};

// Function to transpose all chord sets and store them
function transposeAllChordSets(newRoot) {
    /**
     * Transposes all chord sets to a new root and stores them.
     *
     * @param {string} newRoot - The new root note to transpose to.
     */
    for (let setName in chordSets) {
        chordSets[setName] = transposeChordSet(chordSets[setName], "C", newRoot);
    }
}

// Function to get the Roman numeral for a chord in the context of a key
function getRomanNumeral(chord, root) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const majorScaleDegrees = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    const enharmonicMap = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
    };
    
    let baseNote = chord.replace(/(mi|#|b|add|sus|maj|dim|aug|6|7|9|11|13)/g, '').trim();
    const qualities = chord.match(/(mi|dim|aug|maj|sus|add)/g) || [];

    baseNote = enharmonicMap[baseNote] || baseNote;

    const rootIndex = notes.indexOf(root);
    const baseIndex = notes.indexOf(baseNote);

    const degree = (baseIndex - rootIndex + 12) % 12;

    const degreeToRoman = {
        0: 'I',   // Tonic
        2: 'ii',  // Supertonic
        4: 'iii', // Mediant
        5: 'IV',  // Subdominant
        7: 'V',   // Dominant
        9: 'vi',  // Submediant
        11: 'vii°' // Leading tone
    };

    let romanNumeral = degreeToRoman[degree] || "?";
    if (qualities.includes('mi') && !romanNumeral.match(/[a-z]/)) {
        romanNumeral = romanNumeral.toLowerCase();
    } else if (qualities.includes('dim')) {
        romanNumeral = romanNumeral.replace('ii', 'ii°').replace('vii', 'vii°');
    } else if (qualities.includes('aug')) {
        romanNumeral += '+';
    }

    return romanNumeral;
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
                console.log(`Chord found in set: ${setName}, position: ${position}`);
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
