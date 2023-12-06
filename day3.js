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
    let adjacentStart = Math.max(0, startIndex - 1);
    let adjacentEnd = Math.min(lines.length, endIndex + 1);

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

console.log(`sum = ${sum}`);