const readline = require('readline');

function circleOfFifths(chordKey, relativeMinor = false) {
    // Define an array of major keys in the circle of fifths order
    const majorKeys = [
        'C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'
    ];
    // Define an array of minor keys corresponding to each major key
    const minorKeys = [
        'Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'
    ];

    // Create a mapping of harmonically synonymous keys
    const keyAliases = {
        'Db': 'Db', 'C#': 'Db',
        'Eb': 'Eb', 'D#': 'Eb',
        'Gb': 'Gb', 'F#': 'Gb',
        'Ab': 'Ab', 'G#': 'Ab',
        'Bb': 'Bb', 'A#': 'Bb'
    };

    // Capitalize the first letter of the chordKey and convert the rest to lowercase
    chordKey = chordKey.charAt(0).toUpperCase() + chordKey.slice(1).toLowerCase();

    // Replace the key if it has a synonym
    let originalKey = chordKey;
    if (keyAliases[chordKey]) {
        chordKey = keyAliases[chordKey];
    }

    // If relativeMinor is true, return the relative minor or major key
    if (relativeMinor) {
        // Check if the input key is in the major keys array
        if (majorKeys.includes(chordKey)) {
            // Find the index of the major key and return the corresponding minor key
            const index = majorKeys.indexOf(chordKey);
            return minorKeys[index];
        } else if (minorKeys.includes(chordKey)) {
            // Find the index of the minor key and return the corresponding major key
            const index = minorKeys.indexOf(chordKey);
            return majorKeys[index];
        } else {
            // If the input key is invalid, return an error message
            return "Invalid key input. Please provide a valid key.";
        }
    }

    // If relativeMinor is false, find the harmonically adjacent keys
    if (majorKeys.includes(chordKey)) {
        // Find the index of the major key
        const index = majorKeys.indexOf(chordKey);
        // Return the keys that are clockwise and counterclockwise in the circle of fifths along with their relative minors and harmonic equivalents
        return {
            relativeMinor: `${minorKeys[index]} of '${originalKey}'`,
            clockwise: `${majorKeys[(index + 1) % majorKeys.length]} (${keyAliases[majorKeys[(index + 1) % majorKeys.length]]})`,
            clockwiseRelativeMinor: `${minorKeys[(index + 1) % majorKeys.length]} (${minorKeys[(index + 1) % majorKeys.length]})`,
            counterClockwise: `${majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]} (${keyAliases[majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]] || majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]})`,
            counterClockwiseRelativeMinor: `${minorKeys[(index - 1 + majorKeys.length) % majorKeys.length]} (${minorKeys[(index - 1 + majorKeys.length) % majorKeys.length]})`
        };
    } else {
        // If the input key is invalid, return an error message
        return "Invalid key input. Please provide a valid key.";
    }
}

// Create an interface for reading input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask the user for a key input
rl.question('Please enter a key: ', (key) => {
    const result = circleOfFifths(key);
    console.log(result);
    rl.close();
});
