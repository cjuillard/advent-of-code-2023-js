import { readFileLines } from "./modules/util.js"

class Race {
    constructor(time, recordDist) {
        this.time = time;
        this.recordDist = recordDist;
    }

    getWinningOptionsCount() {
        let winningOptionCount = 0;
        for(let windUpTime = 1; windUpTime < this.time; windUpTime++) {
            const currDist = windUpTime * (this.time - windUpTime);
            if(currDist > this.recordDist) {
                winningOptionCount++;
            }
        }

        return winningOptionCount;
    }
}

function splitByWhitespace(line) {
    const items = line.split(" ");
    for(let i = items.length - 1; i >= 0; i--) {
        if(items[i] == '') {
            items.splice(i, 1);
            continue;
        }

        items[i] = parseInt(items[i]);
    }

    return items;
}
function part1() {
    const times = splitByWhitespace(lines[0].split(":")[1]);
    const distances = splitByWhitespace(lines[1].split(":")[1]);

    const races = [];
    times.forEach((element, index) => {
        races.push(new Race(times[index], distances[index]));
    });

    let winningCombos = 0;
    races.forEach(value => {
        const currCombos = value.getWinningOptionsCount();
        if(winningCombos == 0) {
            winningCombos = currCombos;
        } else {
            winningCombos *= currCombos;
        }
    });

    console.log(`winning combos = ${winningCombos}`);
}

function combineNumbers(line) {
    const numberStr = line.replaceAll(" ", "");
    return parseInt(numberStr);
}

function part2() {
    const times = [combineNumbers(lines[0].split(":")[1])]
    const distances = [combineNumbers(lines[1].split(":")[1])];

    const races = [];
    times.forEach((element, index) => {
        races.push(new Race(times[index], distances[index]));
    });

    let winningCombos = 0;
    races.forEach(value => {
        const currCombos = value.getWinningOptionsCount();
        if(winningCombos == 0) {
            winningCombos = currCombos;
        } else {
            winningCombos *= currCombos;
        }
    });

    console.log(`winning combos = ${winningCombos}`);
}

let lines = readFileLines("input/input_day6.txt");
part1();
part2();