const readline = require('readline');

function circleOfFifths(chordKey, relativeMinor = false) {
    const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
    const minorKeys = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];
    const keyAliases = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };

    chordKey = keyAliases[chordKey] || chordKey.charAt(0).toUpperCase() + chordKey.slice(1).toLowerCase();
    const index = majorKeys.indexOf(chordKey);

    if (index === -1) return "Invalid key input. Please provide a valid key.";

    if (relativeMinor) return minorKeys[index];

    return {
        relativeMinor: `${minorKeys[index]} of '${chordKey}'`,
        clockwise: `${majorKeys[(index + 1) % majorKeys.length]} (${keyAliases[majorKeys[(index + 1) % majorKeys.length]] || majorKeys[(index + 1) % majorKeys.length]})`,
        clockwiseRelativeMinor: `${minorKeys[(index + 1) % majorKeys.length]} (${minorKeys[(index + 1) % majorKeys.length]})`,
        counterClockwise: `${majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]} (${keyAliases[majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]] || majorKeys[(index - 1 + majorKeys.length) % majorKeys.length]})`,
        counterClockwiseRelativeMinor: `${minorKeys[(index - 1 + majorKeys.length) % majorKeys.length]} (${minorKeys[(index - 1 + majorKeys.length) % majorKeys.length]})`
    };
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Please enter a key: ', (key) => {
    console.log(circleOfFifths(key));
    rl.close();
});
