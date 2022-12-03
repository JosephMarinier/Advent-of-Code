compute = (program, inputs, outputs) => {
    let base = 0;
    let i = 0;
    const get = (i) => program[i] || 0;
    const mode = (modes, di) => {
        const mode = modes[di - 1];
        const pointer = i + di;
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
            program[mode(modes, 1)] = inputs();
            i += 2;
        },
        4: (modes) => {
            outputs(get(mode(modes, 1)));
            i += 2;
        },
        5: (modes) => {
            i = get(mode(modes, 1)) ? get(mode(modes, 2)) : i + 3;
        },
        6: (modes) => {
            i = get(mode(modes, 1)) ? i + 3 : get(mode(modes, 2));
        },
        7: (modes) => {
            program[mode(modes, 3)] = Number(get(mode(modes, 1)) < get(mode(modes, 2)));
            i += 4;
        },
        8: (modes) => {
            program[mode(modes, 3)] = Number(get(mode(modes, 1)) === get(mode(modes, 2)));
            i += 4;
        },
        9: (modes) => {
            base += get(mode(modes, 1));
            i += 2;
        },
        99: () => {
            console.log(`Halt!`);
            i = Infinity;
        },
    };

    while (i < program.length) {
        const instruction = program[i];
        const opcode = instruction % 100;
        console.assert(opcode in instructions, `Unknown opcode ${opcode} in instruction ${instruction}.`);
        const modes = Array.from(String(instruction)).slice(0, -2).reverse().map(Number);
        instructions[opcode](modes);
    }
    console.assert(i === Infinity, `Program pointer reached the end at ${i} without halting.`);

    return outputs;
};

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const program = text.trim().split(`,`).map(Number);

    let pos = [0, 0];
    const map = new Map([[pos.join(`,`), 4]]);
    let done = false;
    // const commands = [3, 3, 3, 2, 2, 3, 3, 3, 3, 1, 1, 4];
    let command = 3;
    const movements = new Map([
        [1, [0, -1]],
        [2, [0, 1]],
        [3, [-1, 0]],
        [4, [1, 0]],
    ]);
    let i = 0;

    const move = (movement) => movement.map((movement, i) => pos[i] + movement);

    const display = () => {
        const lol = [...map].map(([xy, id]) => {
            const [x, y] = xy.split(`,`).map(Number);
            return [{x, y}, id];
        });
        const coords = lol.map(([a]) => a);
        const min = coords.reduce((min, a) => ({x: a.x < min.x ? a.x : min.x, y: a.y < min.y ? a.y : min.y}));
        const max = coords.reduce((max, a) => ({x: a.x > max.x ? a.x : max.x, y: a.y > max.y ? a.y : max.y}));
        const pixels = Array(max.y + 1 - min.y).fill(0).map(() => Array(max.x + 1 - min.x).fill(3));
        lol.forEach(([{x, y}, id]) => {
            pixels[y - min.y][x - min.x] = id;
        });
        // const [x, y] = pos;
        // pixels[y - min.y][x - min.x] = 5;
        pixels[0 - min.y][0 - min.x] = 4;
        const chars = `█·● XD`;
        // const chars = `#.G.S`;
        console.log(pixels.map((line) => line.map((id) => chars[id]).join(``)).join(`\n`));
    };

    try {
        compute(program, () => command, (output) => {
            // if (i > 10) {
            //     throw new Error("Not found!");
            // }
            i++;
            // console.log({output});
            const target = move(movements.get(command));
            map.set(target.join(`,`), output);
            if (output > 0) {
                pos = target;
                if (output === 2) {
                    console.log(`Found!`);
                    throw new Error("Found!");
                }
                // if (!done) {
                //     command = (command + 1) % 4 + 1;
                //     return;
                // }
            }
            // display();

            // if (commands.length) {
            //     command = commands.shift();
            //     return;
            // } else {
            //     throw new Error("End!");
            // }
            const unexplored = false;//[...movements].find(([, movement]) => !map.has(move(movement).join(`,`)));
            if (unexplored) {
                // done = false;
                [command] = unexplored;
            } else {
                // done = true;
                const choices = [...movements].filter(([, movement]) => map.get(move(movement).join(`,`)) !== 0);
                [command] = choices[Math.floor(Math.random() * choices.length)];
            }
            // console.log({command});
        });
    } catch(e) {
        display();

        const answer = 46;
        console.log(answer);
        document.querySelector(`input[name="answer"]`).value = answer;
    }
});
