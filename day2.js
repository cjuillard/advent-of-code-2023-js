import { readFileLines } from "./modules/util.js"



// 12 red cubes, 13 green cubes, and 14 blue cubes
const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

class Game {
    constructor(id, red, green, blue) {
        this.id = id;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

function parseGame(line) {
    let tokens = line.split(':');
    let idStr = tokens[0].substring("Game ".length);

    let r = 0;
    let g = 0;
    let b = 0;
    let sets = tokens[1].split(';');
    for(let i = 0; i < sets.length; i++) {
        let set = sets[i];
        let blockTypes = set.split(',');
        
        for(let j = 0; j < blockTypes.length; j++) {
            let blockInfo = blockTypes[j].split(" ");
            let blockCount = parseInt(blockInfo[1]);
            if(blockInfo[2] === "red") {
                r = Math.max(r, blockCount);
            } else if(blockInfo[2] === "green") {
                g = Math.max(g, blockCount);
            } else {
                b = Math.max(b, blockCount);
            }
        }
    }

    return new Game(parseInt(idStr), r, g, b);
}

let lines = readFileLines("input/input_day2.txt");
let sum = 0;
for(let i = 0; i < lines.length; i++) {
    let game = parseGame(lines[i]);
    if(game.red <= redCubes && game.green <= greenCubes && game.blue <= blueCubes) {
        sum += game.id;
    }
}

console.log(sum);
// console.log(lines[0]);
// console.log(lines[lines.length - 1]);