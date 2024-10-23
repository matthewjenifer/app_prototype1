// Function to extract interval information from the root note
function extractInterval(chord, root) {
    /**
     * Extracts the interval information of a chord given a root note.
     *
     * @param {string} chord - The chord to analyze.
     * @param {string} root - The root note of the key.
     * @returns {Object} - The interval in semitones from the root and any additional chord qualities.
     */
    // Define the list of notes in chromatic order, including enharmonic equivalents
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const enharmonicMap = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
    };
    
    // Normalize root and base note to handle enharmonic equivalents
    root = enharmonicMap[root] || root;
    const slashIndex = chord.indexOf('/');
    let baseNote = chord;
    let bassNote = null;

    if (slashIndex !== -1) {
        baseNote = chord.slice(0, slashIndex);
        bassNote = chord.slice(slashIndex + 1);
        bassNote = enharmonicMap[bassNote] || bassNote;
    }

    baseNote = baseNote.replace(/[0123456789#bmiaddsus]/g, '');
    const normalizedBaseNote = enharmonicMap[baseNote] || baseNote;
    const qualities = chord.match(/(mi|sus|add|maj|dim|aug|6|7|9|11|13|b|#)/g) || []; // Extract qualities like 'mi', 'sus', 'add'
    
    // Calculate the interval from the root note to the chord's base note
    const rootIndex = notes.indexOf(root);
    const baseIndex = notes.indexOf(normalizedBaseNote);
    const interval = (baseIndex - rootIndex + 12) % 12;

    // Calculate interval for bass note if present
    let bassInterval = null;
    if (bassNote) {
        const bassIndex = notes.indexOf(bassNote);
        bassInterval = (bassIndex - rootIndex + 12) % 12;
    }

    return { interval, qualities, bassInterval };
}

// Function to transpose a chord based on interval and qualities
function transposeChord(interval, qualities, newRoot, bassInterval = null) {
    /**
     * Transposes a chord to a new root, preserving the interval and chord qualities.
     *
     * @param {number} interval - The interval from the original root.
     * @param {Array<string>} qualities - The list of chord qualities to preserve.
     * @param {string} newRoot - The new root note to transpose to.
     * @param {number|null} bassInterval - The interval for the bass note if present.
     * @returns {string} - The transposed chord.
     */
    // Define the list of notes in chromatic order, including enharmonic equivalents
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const enharmonicMap = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
    };
    
    // Normalize new root to handle enharmonic equivalents
    newRoot = enharmonicMap[newRoot] || newRoot;
    
    // Find the new base note by adding the interval to the new root
    const newRootIndex = notes.indexOf(newRoot);
    const newBaseIndex = (newRootIndex + interval) % 12;
    let newBaseNote = notes[newBaseIndex];

    // If the original note was an enharmonic, maintain the enharmonic spelling if possible
    if (enharmonicMap[newBaseNote] && Object.values(enharmonicMap).includes(newRoot)) {
        newBaseNote = enharmonicMap[newBaseNote];
    }

    // Reconstruct the chord by appending the qualities to the new base note
    let transposedChord = newBaseNote + qualities.join('');

    // Add the transposed bass note if present
    if (bassInterval !== null) {
        const newBassIndex = (newRootIndex + bassInterval) % 12;
        let newBassNote = notes[newBassIndex];
        if (enharmonicMap[newBassNote] && Object.values(enharmonicMap).includes(newRoot)) {
            newBassNote = enharmonicMap[newBassNote];
        }
        transposedChord += '/' + newBassNote;
    }

    return transposedChord;
}

// Function to transpose an entire chord set
function transposeChordSet(chordSet, root, newRoot) {
    /**
     * Transposes an entire chord set to a new root.
     *
     * @param {Array<string>} chordSet - The chord set to transpose.
     * @param {string} root - The root note of the key.
     * @param {string} newRoot - The new root note to transpose to.
     * @returns {Array<string>} - The transposed chord set.
     */
    return chordSet.map(chord => {
        const { interval, qualities, bassInterval } = extractInterval(chord, root);
        return transposeChord(interval, qualities, newRoot, bassInterval);
    });
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

// Accept user input from the console
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the new root note to transpose to: ', (newRoot) => {
    transposeAllChordSets(newRoot);

    // custom formatting function and output code here
    function formatArray(array) {
        return '[\n  ' + array.map(item => `'${item}'`).join(', ') + ' ]';
    }
    
    for (const [key, value] of Object.entries(chordSets)) {
        console.log(`${key}: ${formatArray(value)}`);
    }
    // custom formatting function and output code here
    
    rl.close();
});
