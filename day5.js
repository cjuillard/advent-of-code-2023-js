import { readFileLines } from "./modules/util.js"


class CategoryMapping {
    constructor() {
        this.mappings = [];
    }

    addMapping(mapping) {
        this.mappings.push(mapping);
    }
    
    remap(input) {
        let remappedVal = input;
        for(const mapping of this.mappings) {
            let initial = remappedVal;
            remappedVal = mapping.remap(remappedVal);
            if(remappedVal !== initial)
                return remappedVal;
        }

        return remappedVal;
    }
}

class RangeMapping {
    constructor(dstStart, srcStart, range) {
        this.dstStart = dstStart;
        this.srcStart = srcStart;
        this.range = range;
    }

    remap(input) {
        const offset = input - this.srcStart;
        if(offset < 0 || offset >= this.range) {
            return input;
        }
        
        return this.dstStart + offset;
    }
}

class Data {
    constructor(lines) {
        const seedsTokens = lines[0].split(":");
        this.seeds = seedsTokens[1].trim().split(" ");
        this.categories = [];

        for(let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if(line.trim().length == 0)
                continue;

            if(line.indexOf(':') != -1) {
                const newCategory = new CategoryMapping();
                this.categories.push(newCategory);
                i++;

                for(; i < lines.length; i++) {
                    const rangeMapLine = lines[i];
                    if(rangeMapLine.trim().length == 0)
                        break;

                    const numberStrs = rangeMapLine.split(" ");
                    const newRangeMap = new RangeMapping(parseInt(numberStrs[0]), 
                                                        parseInt(numberStrs[1]),
                                                        parseInt(numberStrs[2]));
                    newCategory.addMapping(newRangeMap);
                }
            }
        }
        console.log(this.seeds);
        console.log(this.categories);
    }

    remap(value) {
        let remapped = value;
        for(const category of this.categories) {
            remapped = category.remap(remapped);
        }

        return remapped;
    }
}
function part1() {
    const data = new Data(lines);

    let min = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < data.seeds.length; i++) {
        const original = data.seeds[i];
        const location = data.remap(original);

        console.log(`${original} --> ${location}`);
        min = Math.min(min, location);
    }

    console.log(`min = ${min}`);
}

function part2() {

}

let lines = readFileLines("input/input_day5.txt");
part1();
part2();