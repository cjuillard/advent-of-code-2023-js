const { readFileSync } = require('fs');
const { start } = require('repl');

const numberText = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
];

function getNumberFromLineAt(line, index) {
    let num = parseInt(line.charAt(index));
    if(!isNaN(num)) {
        return num;
    }

    for(let i = 0; i < numberText.length; i++) {
        const compareText = numberText[i];
        if(index + compareText.length <= line.length &&
            line.substring(index, index + compareText.length) === compareText) {
            return i + 1;
        }
    }

    return NaN;
}

function getTwoDigitNum(line) {
    if(line.length === 0)
        return 0;

    let firstDigit = NaN;
    for(let startIndex = 0; startIndex < line.length; startIndex++) {
        firstDigit = getNumberFromLineAt(line, startIndex);
        if(!isNaN(firstDigit)) {
            break;
        }
    }

    let secondDigit = NaN;
    for(let endIndex = line.length - 1; endIndex >= 0; endIndex--) {
        secondDigit = getNumberFromLineAt(line, endIndex);
        if(!isNaN(secondDigit)) {
            break;
        }
    }

    return firstDigit * 10 + secondDigit;
}

// Sample test
// let testLine = "one23four";
// console.log("number from line test = " + getNumberFromLineAt(testLine, 0));
// console.log(`line ${testLine} = ${getTwoDigitNum(testLine)}`);

const readFileLines = filename =>
  readFileSync(filename).toString('UTF8').split('\n');

let arr = readFileLines('input/input_day1.txt');
let sum = arr.reduce((acc, line) => acc + getTwoDigitNum(line), 0);
console.log(sum);