import { readFileLines } from "./modules/util.js"

class GameCard {
    constructor(line) {
        const gameInfo = line.split(":")[1];
        const numberSets = gameInfo.split("|");
        const winningNumbersStr = numberSets[0].trim().split(" ");
        const scratchNumbersStr = numberSets[1].trim().split(" ");

        const winningNumbers = new Set();
        winningNumbersStr.forEach((value) => {
            if(value === '')
                return;

            winningNumbers.add(parseInt(value));
        });

        const scratchNumbers = [];
        let gameSum = 0;
        this.winningNumberCount = 0;
        for(let j = 0; j < scratchNumbersStr.length; j++) {
            const scratchNumberStr = scratchNumbersStr[j];
            if(scratchNumberStr === '')
                continue;

            const scratchNumber = parseInt(scratchNumberStr);
            scratchNumbers.push(scratchNumber);
            if(winningNumbers.has(scratchNumber)) {
                this.winningNumberCount++;
                if(gameSum == 0) {
                    gameSum = 1;
                } else {
                    gameSum *= 2;
                }
            }
        }

        this.gameSum = gameSum;
        this.winningNumbers = winningNumbers;
        this.scratchNumbers = scratchNumbers;
    }
}

function part1() {
    let sum = 0;
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        var card = new GameCard(line);
        
        sum += card.gameSum;
    }

    console.log(`sum = ${sum}`);
}

function computeCards(games, currGameIndex, counts) {
    if(currGameIndex >= games.length)
        return;

    const winCount = games[currGameIndex].winningNumberCount;

    if(counts.has(currGameIndex)) {
        counts.set(currGameIndex, counts.get(currGameIndex) + 1);
    } else {
        counts.set(currGameIndex, 1);
    }

    for(let i = 0; i < winCount; i++) {
        computeCards(games, currGameIndex + i + 1, counts);
    }
}

function part2() {
    let sum = 0;
    const games = [];
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        var card = new GameCard(line);
        games.push(card);
    }

    const counts = new Map();
    for(let i = 0; i < games.length; i++) {
        computeCards(games, i, counts);
    }

    for(const count of counts.values()) {
        sum += count;
    }

    console.log(`sum = ${sum}`);
}
// lines = ["Card   1: 95 57w 30 62 11  5  9  3 72 87 | 94 72 72 72 74"];

let lines = readFileLines("input/input_day4.txt");
part1();
part2();