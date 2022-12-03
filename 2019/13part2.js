compute = (program, inputs, callback) => {
    const outputs = [];
    let base = 0;
    let i = 0;
    const get = (i) => program[i] || 0;
    // const mode = (i, m) => [program[i], i, base + program[i]][m];
    const mode = (modes, di) => {
        const mode = modes[di - 1];
        const pointer = i + di;
        // console.log(di, mode, mode === 1 ? `pointer` : mode === 2 ? `base + program[pointer]` : `program[pointer]`);
        return mode === 1 ? pointer : mode === 2 ? base + program[pointer] : program[pointer];
    };
    const instructions = {
        1: (modes) => {
            program[mode(modes, 3)] = get(mode(modes, 1)) + get(mode(modes, 2));
            i += 4;
        },
        2: (modes) => {
            program[mode(modes, 3)] = get(mode(modes, 1)) * get(mode(modes, 2));
            i += 4;
        },
        3: (modes) => {
            //console.assert(0 in inputs, `Empty input.`);
            const input = inputs();
//             if (input === null) {
//                 i = Infinity;
//             }
//             const dir = {"a": -1, "s": 0, "d": 1}[input];
            // console.log(modes, mode(modes, 1));
//             program[mode(modes, 1)] = inputs.shift();
//             program[mode(modes, 1)] = Number(dir);
            program[mode(modes, 1)] = input;
            i += 2;
        },
        4: (modes) => {
            const output = get(mode(modes, 1));
            callback && callback(output);
            outputs.push(output);
            i += 2;
        },
        5: (modes) => {
            i = get(mode(modes, 1)) ? get(mode(modes, 2)) : i + 3;
        },
        6: (modes) => {
            i = get(mode(modes, 1)) ? i + 3 : get(mode(modes, 2));
        },
        7: (modes) => {
            program[mode(modes, 3)] = Boolean(get(mode(modes, 1)) < get(mode(modes, 2)));
            i += 4;
        },
        8: (modes) => {
            program[mode(modes, 3)] = Boolean(get(mode(modes, 1)) === get(mode(modes, 2)));
            i += 4;
        },
        9: (modes) => {
            base += get(mode(modes, 1));
            i += 2;
        },
        99: () => {
            i = Infinity;
        },
    };

    while (i < program.length) {
        const instruction = program[i];
        const opcode = instruction % 100;
        console.assert(opcode in instructions, `Unknown opcode ${opcode} in instruction ${instruction}.`);
        // console.log(instruction);
        const modes = Array.from(String(instruction)).slice(0, -2).reverse().map(Number);
        instructions[opcode](modes);
    }
    console.assert(i === Infinity, `Program pointer reached maximum ${i} without halting.`);

    return outputs;
};

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const program = text.trim().split(`,`).map(Number);
    program[0] = 2;

    const map = new Map();
    const outputs = Array(12).fill(1);
    let answer = 0;
    compute(program, () => {
        const lol = [...map].map(([xy, id]) => {
            const [x, y] = xy.split(`,`).map(Number);
            return [{x, y}, id];
        });
        const coords = lol.map(([a]) => a);
        const min = coords.reduce((min, a) => ({x: a.x < min.x ? a.x : min.x, y: a.y < min.y ? a.y : min.y}));
        const max = coords.reduce((max, a) => ({x: a.x > max.x ? a.x : max.x, y: a.y > max.y ? a.y : max.y}));
        const pixels = Array(max.y + 1 - min.y).fill(0).map(() => Array(max.x + 1 - min.x).fill(0));
        let joy = 0;
        lol.forEach(([{x, y}, id]) => {
            pixels[y][x] = id;
            if (id === 4) {
                joy += x;
            } else if (id === 3) {
                joy -= x;
            }
        });
        const chars = ` █░¯●`;
        console.log(pixels.map((line) => line.map((id) => chars[id]).join(``)).join(`\n`), 'score', answer);
        return joy; // Math.sign(joy);
        // return prompt("a s d ?");
    }, (output) => {
        if (outputs.length < 2) {
            outputs.push(output);
        } else {
            const x = outputs.shift();
            const y = outputs.shift();
            if (x === -1 && y === 0) {
                answer = output;
                //console.log('score', answer);
            } else {
                map.set([x,y].join(), output);
            }
        }
    });

    console.log(answer);
    //document.querySelector(`input[name="answer"]`).value = answer;
});
