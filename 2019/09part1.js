compute = (program, inputs = []) => {
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
            console.assert(0 in inputs, `Empty input.`);
            // console.log(modes, mode(modes, 1));
            program[mode(modes, 1)] = inputs.shift();
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
        // console.log(instruction);
        const modes = Array.from(String(instruction)).slice(0, -2).reverse().map(Number);
        instructions[opcode](modes);
    }
    console.assert(i === Infinity, `Program pointer reached maximum ${i} without halting.`);

    return outputs;
};

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const program = text.trim().split(`,`).map(Number);

    const outputs = compute(program, [1]);
    console.log(outputs);

    const answer = outputs.pop();
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
});
