compute = (program, getInputs = [], outputs = [], callback = (output) => outputs.push(output)) => {
    let inputs = Array.isArray(getInputs) ? getInputs : [];
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
            if (inputs.length === 0) {
                inputs = getInputs();
            }
            program[mode(modes, 1)] = inputs.shift();
            i += 2;
        },
        4: (modes) => {
            callback(get(mode(modes, 1)));
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
    const format = (outputs) => outputs.map((char) => String.fromCharCode(char)).join(``);
    const deformat = (inputs) => inputs.split(``).map((char) => char.charCodeAt());
    const outputs = [];
    compute(
        program,
        deformat(
`NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
WALK
`
        ),
        // () => {
        //     const print = format(outputs);
        //     outputs.splice(0, outputs.length);
        //     console.log(print);
        //     const r = deformat(prompt(print) + `\nWALK\n`);
        //     console.log(r);
        //     return r;
        // },
        outputs);

    console.log(outputs);
    const print = format(outputs);
    const answer = outputs.pop();
    console.log(print);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
