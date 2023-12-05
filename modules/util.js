import { readFileSync } from 'fs'

export function readFileLines(filename) {
    let lines = readFileSync(filename).toString('UTF8').split('\n');
    if(lines[lines.length - 1].length === 0)
        lines = lines.slice(0, lines.length - 1);

    return lines;
}
  