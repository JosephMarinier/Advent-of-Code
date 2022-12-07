compute = (program, inputs = []) => {
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
        99: () => {
            i = Infinity;
        },
    };

    while (i < program.length) {
        const instruction = program[i];
        const opcode = instruction % 100;
        console.assert(opcode in instructions, `Unknown opcode ${instruction}.`);
        const modes = String(opcode).split(``).slice(0, -2).reverse().map(Number);
        instructions[opcode](...modes);
    }
    console.assert(i === Infinity, `Program pointer reached maximum ${i} without halting.`);
};

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const program = text.trim().split(`,`).map(Number);
    program[1] = 12;
    program[2] = 2;

    compute(program);

    const answer = program[0];
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
