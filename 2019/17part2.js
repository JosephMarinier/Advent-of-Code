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

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const program = text.trim().split(`,`).map(Number);
    program[0] = 2;

    const all = `R,8,L,10,R,8,R,12,R,8,L,8,L,12,R,8,L,10,R,8,L,12,L,10,L,8,R,8,L,10,R,8,R,12,R,8,L,8,L,12,L,12,L,10,L,8,L,12,L,10,L,8,R,8,L,10,R,8,R,12,R,8,L,8,L,12\n`;
    const functions = {
        A: `R,8,L,10,R,8`,
        B: `R,12,R,8,L,8,L,12`,
        C: `L,12,L,10,L,8`,
    };

    const main = Object.entries(functions).reduce((main, [by, pattern]) => main.replace(RegExp(pattern, `g`), by), all);
    const inputs = [main, ...Object.values(functions).map((f) => f + `\n`), `n\n`].reduce((a, b) =>  a + b);
    console.log(inputs);
    const outputs = compute(program, inputs.split(``).map(((c) => c.charCodeAt())));

    const answer = outputs.pop();
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
