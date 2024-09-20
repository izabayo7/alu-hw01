const fs = require('fs');

const inputsFolder = './sample_inputs';
const resultsFolder = './sample_results';


// Get the input file from the command line
const inputFile = process.argv[2];

// Extract unique integers from the input file
const numbers = extractUniqueIntegers(inputFile);

// Write the sorted numbers to the output file
writeUniqueIntegers(quicksort(numbers));



/**
 * Extracts unique integers from a file
 * 
 * @param {string} inputFile 
 * @returns {number[]} numbers
 */
function extractUniqueIntegers(inputFile) {
    const file = fs.readFileSync(`${inputsFolder}/${inputFile}`, 'utf8');
    const lines = file.split('\n');

    const numberConsumptions = {};
    let numbers = [];
    
    for (let i = 0; i < lines.length; i++) {

        if (!/^[-+]?\d+$/.test(lines[i].trim())) { // remove non-integer lines
            continue;
        }

        const number = parseInt(lines[i]);

        if (number < -1023 || number > 1023) {
            continue;
        }

        if (numberConsumptions[number] != 1) {
            numberConsumptions[number] = 1;
            numbers = [...numbers, number];
        }
    }

    // console.log("Initial length: ", lines.length);
    // console.log("Final length: ", numbers.length);

    return numbers
}

/**
 * Sorts numbers in ascending order
 * 
 * @param {number[]} numbers
 * @returns {number[]} sortedNumbers
 */
function quicksort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];  // Choosing the pivot (last element)
    const left = [];  // Elements smaller than pivot
    const right = [];  // Elements greater than pivot

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursively sort the left and right sub-arrays, and concatenate
    return [...quicksort(left), pivot, ...quicksort(right)];
}


/**
 * Writes numbers to a file
 * 
 * @param {number[]} numbers 
 */

function writeUniqueIntegers(numbers) {
    const file = fs.createWriteStream(`${resultsFolder}/${inputFile}_results.txt`);

    for (let i = 0; i < numbers.length; i++) {
        file.write(`${numbers[i]}\n`);
    }

    file.end();
}
