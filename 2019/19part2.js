compute = (program, inputs = []) => {
    const outputs = [];
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
            const input = Array.isArray(inputs) ? inputs.shift() : inputs();
            // console.assert(0 in inputs, `Empty input.`);
            program[mode(modes, 1)] = input;
            i += 2;
        },
        4: (modes) => {
            outputs.push(get(mode(modes, 1)));
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
        const modes = Array.from(String(instruction)).slice(0, -2).reverse().map(Number);
        instructions[opcode](modes);
    }
    console.assert(i === Infinity, `Program pointer reached the end at ${i} without halting.`);

    return outputs;
};

time = (task) => {
    const start = performance.now();
    const r = task();
    const end = performance.now();
    let elapsed = end - start;
    const units = [`ms`, `s`, `m`, `h`, `j`];
    const index = ([1000, 60, 60, 24].findIndex((max) => {
        if (elapsed < max) {
            return true;
        } else {
            elapsed /= max;
        }
    }) + units.length) % units.length;
    console.log(`${elapsed} ${units[index]}`);
    return r;
}

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const program = text.trim().split(`,`).map(Number);

    const answer = time(() => {
        let x = 0;
        let y = 0;
        let a, b;
        do {
            [a] = compute(program.slice(), [x, y + 99]);
            if (!a) {
                x++;
            }
            [b] = compute(program.slice(), [x + 99, y]);
            if (!b) {
                y++;
            }
        } while (!(a && b));
        return 10000 * x + y;
    });
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
