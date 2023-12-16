import { readFileLines } from "./modules/util.js"

function isDigit(c) {
    return !isNaN(c);
}

function hasSymbol(str) {
    // const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    return specialChars.test(str);
}

function hasAdjacentSymbol(lines, lineIndex, startIndex, endIndex) {
    const adjacentStart = Math.max(0, startIndex - 1);
    const adjacentEnd = Math.min(lines.length, endIndex + 1);

    if(lineIndex - 1 >= 0) {
        let prevLine = lines[lineIndex - 1];
        if(hasSymbol(prevLine.substring(adjacentStart, adjacentEnd)))
            return true;        
    }

    let currAdjStr = lines[lineIndex].substring(adjacentStart, adjacentEnd);
    if(hasSymbol(currAdjStr))
        return true;

    if(lineIndex + 1 < lines.length) {
        let nextLine = lines[lineIndex + 1];
        if(hasSymbol(nextLine.substring(adjacentStart, adjacentEnd)))
            return true;
    }

    return false;
}
let lines = readFileLines("input/input_day3.txt");

function computePart1Sum(lines) {
    // lines = ["...............776..............552........968"];
    let sum = 0;
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        let numStart = -1;
        for(let j = 0; j < line.length; j++) {
            if(isDigit(line.charAt(j))) {
                if(numStart == -1) {
                    numStart = j;
                }
            } else if(numStart != -1) {
                if(hasAdjacentSymbol(lines, i, numStart, j)) {
                    let numFound = parseInt(line.substring(numStart, line.length));
                    sum += numFound;
                }
                numStart = -1;
            }
        }
    
        if(numStart != -1) {
            if(hasAdjacentSymbol(lines, i, numStart, line.length)) {
                let numFound = parseInt(line.substring(numStart, line.length));
                sum += numFound;
            }
        }
    }
    
    return sum
}

function computeAdjacentNumbers(lines, lineIndex, gearIndex) {
    const startIndex = Math.max(0, gearIndex-1);
    const endIndex = Math.min(lines[lineIndex].length, gearIndex+1);

    let allNumbers = new Array();
    if(lineIndex - 1 >= 0) {
        allNumbers = allNumbers.concat(computeNumbersOnLine(lines[lineIndex-1], startIndex, endIndex));
    }

    allNumbers = allNumbers.concat(computeNumbersOnLine(lines[lineIndex], startIndex, endIndex));

    if(lineIndex + 1 < lines.length) {
        allNumbers = allNumbers.concat(computeNumbersOnLine(lines[lineIndex+1], startIndex, endIndex));
    } 

    return allNumbers;
}

class NumberInLine {
    constructor(line, startIndex, endIndex) {
        this.line = line;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }

    getNumber() {
        return parseInt(this.line.substring(this.startIndex, this.endIndex));
    }
}

function computeNumbersOnLine(line, startIndex, endIndex) {
    const numbersFound = new Array();
    for(let i = startIndex; i <= endIndex; i++) {
        if(isDigit(line.charAt(i))) {
            let numStart = i;
            while(numStart - 1 >= 0 && isDigit(line.charAt(numStart-1))) {
                numStart--;
            }

            let numEnd = numStart + 1;
            while(numEnd < line.length && isDigit(line.charAt(numEnd))) {
                numEnd++;
            }

            i = numEnd - 1;
            numbersFound.push(new NumberInLine(line, numStart, numEnd));
        }
    }

    return numbersFound;
}

function computeGearRatio(lines, lineIndex, gearIndex) {
    const adjacentNumbers = computeAdjacentNumbers(lines, lineIndex, gearIndex);
    if(adjacentNumbers.length != 2)
        return 0;

    let num1 = adjacentNumbers[0].getNumber();
    let num2 = adjacentNumbers[1].getNumber();
    return num1 * num2;
}

function computePart2GearRatioSum(lines) {
    let sum = 0;
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let currIndex;
        let currPos = 0;
        while((currIndex = line.indexOf('*', currPos)) >= 0) {
            const ratio = computeGearRatio(lines, i, currIndex);
            if(ratio > 0) {
                sum += ratio;
            }        
            currPos = currIndex + 1;
        }
    }

    return sum;
}

console.log(`sum = ${computePart1Sum(lines)}`);
console.log(`gear ratio sum = ${computePart2GearRatioSum(lines)}`);
