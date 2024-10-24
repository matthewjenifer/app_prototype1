    // Function to extract interval information from the root note
    function extractInterval(chord, root) {
        chord = simplifyChordName(chord);
          const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
          const enharmonicMap = {
              'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
              'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
              'B#': 'C', 'Cb': 'B', 'E#': 'F', 'Fb': 'E'
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
  
      // Function to simplify chord names by removing complex suffixes
      function simplifyChordName(chord) {
          const suffixes = [
              '7', 'add9', '6', 'sus4', 'dim', 'dim7', '7(b5)', '9', '11', '#5',
              '6/9', '7#5', '(add13)', '7sus4', '7(b9, b13)', '7(#9, b13)', '7#9',
              '7#11', 'add(b9)', 'add(b9,b13)', '#9'
          ];
  
          for (let suffix of suffixes) {
              if (chord.endsWith(suffix)) {
                  chord = chord.replace(suffix, '').trim();
                  break;  // Only remove one suffix per chord
              }
          }
  
          return chord;
      }
  
  
      // Function to transpose a chord
      function transposeChord(interval, qualities, newRoot, bassInterval = null) {
          const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
          const enharmonicMap = {
              'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
              'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
              'B#': 'C', 'Cb': 'B', 'E#': 'F', 'Fb': 'E'
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
          const transposedChordSetsWithSuffixes = {};
          const transposedChordSetsSimplified = {};
  
          for (let setName in chordSets) {
              const transposedSet = transposeChordSet(chordSets[setName], "C", newRoot);
              transposedChordSetsWithSuffixes[setName] = transposedSet;
  
              // Create a simplified version by removing suffixes
              transposedChordSetsSimplified[setName] = transposedSet.map(chord => simplifyChordName(chord));
          }
  
          return { transposedChordSetsWithSuffixes, transposedChordSetsSimplified };
      }
  
  
      // Function to transpose a single chord set
      function transposeChordSet(chordSet, originalRoot, newRoot) {
          const transposedSet = [];
          for (let chord of chordSet) {
              const intervalData = extractInterval(chord, originalRoot);
              const transposedChord = transposeChord(
                  intervalData.interval, intervalData.qualities, newRoot, intervalData.bassInterval
              );
            console.log(`Debug - Transposed Chord: Original: ${chord}, Transposed: ${transposedChord}`);
  
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
  
      // Function to get the Roman numeral for a chord in the context of a key
      function getRomanNumeral(chord, root) {
          const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
          const majorScaleDegrees = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
          const enharmonicMap = {
              'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
              'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
              'B#': 'C', 'Cb': 'B', 'E#': 'F', 'Fb': 'E'
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
  
      // Function to get the relative major or minor
      function getRelativeChord(currentChord) {
          const relativeMajorsMinors = {
              'C': 'Ami', 'Ami': 'C',
              'C#': 'A#mi', 'A#mi': 'C#',
              'Db': 'Bbmi', 'Bbmi': 'Db',
              'D': 'Bmi', 'Bmi': 'D',
              'D#': 'Cmi', 'Cmi': 'D#',
              'Eb': 'Cmi', 'Cmi': 'Eb',
              'E': 'C#mi', 'C#mi': 'E',
              'F': 'Dmi', 'Dmi': 'F',
              'F#': 'D#mi', 'D#mi': 'F#',
              'Gb': 'Ebmi', 'Ebmi': 'Gb',
              'G': 'Emi', 'Emi': 'G',
              'G#': 'Fmi', 'Fmi': 'G#',
              'Ab': 'Fmi', 'Fmi': 'Ab',
              'A': 'F#mi', 'F#mi': 'A',
              'A#': 'Gmi', 'Gmi': 'A#',
              'Bb': 'Gmi', 'Gmi': 'Bb',
              'B': 'G#mi', 'G#mi': 'B'
          };
  
          // Simplify the chord to match the base version
          const simplifiedChord = simplifyChordName(currentChord);
  
          // Remove qualities to get the base note for lookup
          let baseNote = simplifiedChord.replace(/(mi|maj|dim|aug|sus|add|6|7|9|11|13)/g, '').trim();
          baseNote = baseNote[0].toUpperCase() + baseNote.slice(1); // Ensure capitalization matches the dictionary
  
          if (relativeMajorsMinors[baseNote]) {
              return relativeMajorsMinors[baseNote];
          } else {
              throw new Error(`Relative chord not found for '${currentChord}'`);
          }
      }
  
  
  
      // Accept user input from the console
      const readline = require('readline');
      const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
      });
  
      rl.question('Enter the new root note to transpose to: ', (newRoot) => {
          // Define the transposed chord sets after receiving the user input
          const { transposedChordSetsWithSuffixes, transposedChordSetsSimplified } = transposeAllChordSets(newRoot);
  
        // Debugging log for transposed chord sets with suffixes
      console.log('Debug - Transposed Chord Sets with Suffixes:', transposedChordSetsWithSuffixes);
  
      // Debugging log for transposed simplified chord sets
      console.log('Debug - Transposed Simplified Chord Sets:', transposedChordSetsSimplified);
  
          // Print the transposed chord sets with suffixes to the console
          console.log('Transposed Chord Sets with Suffixes:');
          for (const [setName, transposedSet] of Object.entries(transposedChordSetsWithSuffixes)) {
              console.log(`${setName}: ${transposedSet.join(', ')}`);
          }
  
          rl.question('What chord are you currently on? ', (currentChord) => {
          console.log(`Debug - Original Current Chord Input: ${currentChord}`);
  
          try {
              let found = false;
              let setNameFound = '';
              let positionFound = -1;
  
              // Search in the transposed chord sets with suffixes (no need to simplify here)
              for (const [setName, chordSet] of Object.entries(transposedChordSetsWithSuffixes)) {
                  for (let i = 0; i < chordSet.length; i++) {
                      console.log(`Debug - Original Set Chord: ${chordSet[i]}`);
  
                      // Compare directly with the complex version
                      if (chordSet[i] === currentChord) {
                          setNameFound = setName;
                          positionFound = i;
                          console.log(`Chord found in set: ${setName}, position: ${i}`);
                          found = true;
                          break;
                      }
                  }
                  if (found) break;
              }
  
              if (!found) {
                  console.log('Chord not found in any set.');
              } else {
                  // Use the simplified version to determine the relative chord
                  const simplifiedCurrentChord = simplifyChordName(currentChord);
                  console.log(`Debug - Simplified Chord for Relative Lookup: ${simplifiedCurrentChord}`);
                  const relativeChord = getRelativeChord(simplifiedCurrentChord);
                  console.log(`Debug - Relative Chord Found: ${relativeChord}`);
  
                  console.log(`The relative chord is: ${relativeChord}`);
              }
          } catch (error) {
              console.error(error.message);
          }
          rl.close();
      });
            });
  
  
  
  
  