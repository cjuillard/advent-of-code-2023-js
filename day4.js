import { readFileLines } from "./modules/util.js"


let lines = readFileLines("input/input_day4.txt");

lines = ["Card   1: 95 57 30 62 11  5  9  3 72 87 | 94 72 72 72 74"];
let sum = 0;
for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    const gameInfo = line.split(":")[1];
    const numberSets = gameInfo.split("|");
    const winningNumbers = numberSets[0].trim();
    const scratchNumbers = numberSets[1].trim().split(" ");

    let gameSum = 0;
    for(let j = 0; j < scratchNumbers.length; j++) {
        if(winningNumbers.indexOf(scratchNumbers[j]) != -1) {
            console.log(scratchNumbers[j]);
            if(gameSum == 0) {
                gameSum = 1;
            } else {
                gameSum *= 2;
            }
        }
    }

    console.log(winningNumbers);
    console.log(scratchNumbers);
    sum += gameSum;
}

console.log(`sum = ${sum}`);