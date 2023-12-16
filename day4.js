import { readFileLines } from "./modules/util.js"


let lines = readFileLines("input/input_day4.txt");

// lines = ["Card   1: 95 57w 30 62 11  5  9  3 72 87 | 94 72 72 72 74"];
let sum = 0;
for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    const gameInfo = line.split(":")[1];
    const numberSets = gameInfo.split("|");
    const winningNumbersStr = numberSets[0].trim().split(" ");
    const scratchNumbers = numberSets[1].trim().split(" ");

    const winningNumbers = new Set();
    winningNumbersStr.forEach((value) => {
        if(value === '')
            return;

        winningNumbers.add(parseInt(value));
    });
    
    let gameSum = 0;
    for(let j = 0; j < scratchNumbers.length; j++) {
        const scratchNumber = scratchNumbers[j];
        if(scratchNumber === '')
            continue;
        if(winningNumbers.has(parseInt(scratchNumber))) {
            if(gameSum == 0) {
                gameSum = 1;
            } else {
                gameSum *= 2;
            }
        }
    }
    sum += gameSum;
}

console.log(`sum = ${sum}`);