const { readFileSync } = require('fs');
const { start } = require('repl');

const readFileLines = filename =>
  readFileSync(filename).toString('UTF8').split('\n');

let arr = readFileLines('input/input_day1.txt');

let sum = arr.reduce((acc, line) => acc + getTwoDigitNum(line), 0);
console.log(sum);

function getTwoDigitNum(line) {
    if(line.length === 0)
        return 0;

    let startIndex = 0;
    let endIndex = line.length - 1;
    for(startIndex = 0; startIndex < line.length; startIndex++) {
        let num = parseInt(line.charAt(startIndex));
        if(!isNaN(num)) {
            break;
        }
    }

    for(; endIndex >= 0; endIndex--) {
        let num = parseInt(line.charAt(endIndex));
        if(!isNaN(num)) {
            break;
        }
    }

    const firstDigit = parseInt(line.charAt(startIndex));
    const secondDigit = parseInt(line.charAt(endIndex));
    return firstDigit * 10 + secondDigit;
}