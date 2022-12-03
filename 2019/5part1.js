compute = (program, inputs = []) => {
    const outputs = [];
    let base = 0;
    let i = 0;
    const get = (i) => program[i] || 0;
    const mode = (i, m) => [program[i], i, program[base + i]][m];
    const instructions = {
        1: (m1 = 0, m2 = 0, m3 = 0) => {
            program[mode(i + 3, m3)] = get(mode(i + 1, m1)) + get(mode(i + 2, m2));
            i += 4;
        },
        2: (m1 = 0, m2 = 0, m3 = 0) => {
            program[mode(i + 3, m3)] = get(mode(i + 1, m1)) * get(mode(i + 2, m2));
            i += 4;
        },
        3: (m1 = 0) => {
            console.assert(0 in inputs, `Empty input.`);
            program[mode(i + 1, m1)] = inputs.shift();
            i += 2;
        },
        4: (m1 = 0) => {
            outputs.push(get(mode(i + 1, m1)));
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
        const modes = String(instruction).split(``).slice(0, -2).reverse().map(Number);
        instructions[opcode](...modes);
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
    document.querySelector(`input[name="answer"]`).value = answer;
});
