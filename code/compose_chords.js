// CREATE AN INTERFACE TO ACCEPT USER INPUT - CODE FROM MATTHEW
const readline = require('readline');

// Chord class definition
class Chord {
    constructor(pad, name, accent, quality, numeral, mode, type, smartkey) {
        this.pad = pad;
        this.name = name;
        this.accent = accent;
        this.quality = quality;
        this.numeral = numeral;
        this.mode = mode;
        this.type = type;
        this.smartkey = smartkey;
    }
    pad() {
        console.log("Pad Location:", this.pad);
    }
    name() {
        console.log("Chord Name:", this.name);
    }
    accent() {
        console.log("Chord Accent:", this.accent);
    }
    quality() {
        console.log("Maj/Min:", this.quality);
    }
    numeral() {
        console.log("Pos:", this.numeral);
    }
    mode() {
        console.log("Mode:", this.mode);
    }
    type() {
        console.log("Type:", this.type);
    }
    smartkey() {
        console.log("Smart Key:", this.smartkey);
    }
    padData() {
        return this;
    }
};

// USER INPUT HANDLING FUNCTION - CODE FROM MATTHEW
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define the chromatic scale and intervals for transposition
const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const intervalMap = {
    '(I)': 0,
    '(ii)': 2,
    '(iii)': 4,
    '(IV)': 5,
    '(V)': 7,
    '(vi)': 9,
    '(vii°)': 11,
    '(V/V)': 16,         // Corrected interval to F# for key of D
    '(V(add9))': 7,
    '(IV(add9))': 5,
    '(IV6)': 5,
    '(Vsus4)': 7,
    '(I(sus9))': 0,
    '(vi7)': 9,
    '(V6)': 7,
    '(iv)': 5,
    '(vi(add9))': 9,
    '(I(sus2))': 0,
    '(bVII(add9))': 10,
    '(ii7)': 2,
    '(vi/E)': 9,
    '(vi/C)': 9,
    '(ii/V)': 2
};

// Helper function to transpose a chord
function transposeChord(root, steps) {
    let currentIndex = chromaticScale.indexOf(root);
    if (currentIndex === -1) {
        console.error(`Invalid root note: ${root}`);
        return root;
    }
    let newIndex = (currentIndex + steps + chromaticScale.length) % chromaticScale.length;
    return chromaticScale[newIndex];
}

// Function to build chord sets based on the key
function buildChordSets(songKey) {
    // Normalize songKey
    songKey = songKey.charAt(0).toUpperCase() + songKey.slice(1).toLowerCase();
    console.log(`Building chord sets for key: ${songKey}`);

    // The following code block constructs the MAJ1 chord set dynamically based on the key
    let maj1Chords = [
        new Chord(1, transposeChord(songKey, intervalMap['(I)']), "-", 'major', '(I)', 'Ionian', 'Maj1', 'C'),
        new Chord(2, transposeChord(songKey, intervalMap['(iii)']) + 'mi', '-', 'minor', '(iii)', 'Phrygian', 'Maj1', "C#"),
        new Chord(3, transposeChord(songKey, intervalMap['(IV)']), '-', 'major', '(IV)', 'Lydian', 'Maj1', 'D'),
        new Chord(4, transposeChord(songKey, intervalMap['(V)']), '-', 'major', '(V)', 'Mixolydian', 'Maj1', 'Eb'),
        new Chord(5, transposeChord(songKey, intervalMap['(vi)']) + 'mi', '-', 'minor', '(vi)', 'Aeolian', 'Maj1', 'E'),
        new Chord(6, transposeChord(songKey, intervalMap['(V/V)']) + 'sus4', '-', 'suspended', '(V/V)', 'Mixolydian', 'Maj1', 'F'),
        new Chord(7, transposeChord(songKey, intervalMap['(V(add9))']) + 'add9', '-', 'major', '(V(add9))', 'Mixolydian', 'Maj1', 'F#'),
        new Chord(8, transposeChord(songKey, intervalMap['(ii)']) + 'mi', '-', 'minor', '(ii)', 'Dorian', 'Maj1', 'G'),
        new Chord(9, transposeChord(songKey, intervalMap['(IV(add9))']) + 'add9', '-', 'major', '(IV(add9))', 'Lydian', 'Maj1', 'G#'),
        new Chord(10, transposeChord(songKey, intervalMap['(IV6)']) + '6', '-', 'major', '(IV6)', 'Lydian', 'Maj1', 'A'),
        new Chord(11, transposeChord(songKey, intervalMap['(Vsus4)']) + 'sus4', '-', 'suspended', '(Vsus4)', 'Mixolydian', 'Maj1', 'Bb'),
        new Chord(12, transposeChord(songKey, intervalMap['(V)']), '-', 'major', '(V)', 'Mixolydian', 'Maj1', 'B')
    ];



    // Log the chords to indicate that the chord sets have been built
console.log("MAJ1 Chord Set:");
maj1Chords.forEach(chord => console.log(chord.padData()));


    console.log("Chord sets have been built.");
}

// Function to prompt user for key to transpose the chord sets
function promptForSongKey() {
    // USER INPUT REQUEST #1 - PLEASE ENTER THE KEY TO TRANSPOSE THE CHORD SETS
    rl.question('Please enter the key to transpose the chord sets: ', (songKey) => {
        // Assuming the chord sets are built based on user input
        buildChordSets(songKey);
        promptForChordSearch();
    });
}

// Function to prompt user for chord to search in the sets
function promptForChordSearch() {
    // USER INPUT REQUEST #2 - PLEASE ENTER A CHORD TO SEARCH FOR
    rl.question('Please enter a chord to search for: ', (chordName) => {
        // Assuming findChordInSets function is implemented to find the chord in sets
        const foundChord = findChordInSets(chordName);
        if (foundChord) {
            console.log(`Found ${chordName} in ${foundChord.set}, Pad ${foundChord.pad}`);
        } else {
            console.log(`${chordName} not found in any set.`);
        }
        rl.close();
    });
}

// Function to find a chord in the transposed sets
function findChordInSets(chord) {
    // FIND CHORD IN TRANSPOSABLE SETS - CODE FROM MATTHEW
    // Dummy implementation for example purposes
    if (chord.toLowerCase() === 'cmi') {
        return { set: 'Maj1', pad: 2 };
    }
    return null;
}

// Start the prompt sequence
promptForSongKey();
