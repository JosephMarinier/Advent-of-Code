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
    const opposites = {
        north: `south`,
        east: `west`,
        south: `north`,
        west: `east`,
    };
    const blackList = new Set([`giant electromagnet`, `molten lava`, `infinite loop`, `photons`, `escape pod`]);
    const outputs = [];
    const explored = new Map();
    const inv = [];
    let carrying;
    let i;
    let room;
    let command;
    let items = [];
    compute(
        program,
        () => {
            const print = format(outputs.splice(0, outputs.length));
            console.log(print);
            const match = print.match(/== (?<room>.+) ==\n.+\n\nDoors here lead:\n(?<doors>.+?)\n\n(?:Items here:\n(?<items>.+?)\n\n)?/s);
            if (match) {
                room = match.groups.room;
                if (!explored.has(room)) {
                    if (match.groups.items) {
                        items = match.groups.items.split(`\n`).map((line) => line.substring(2)).filter((item) => !blackList.has(item));
                    }
                    const choices = new Set(match.groups.doors.split(`\n`).map((line) => line.substring(2)));
                    choices.delete(opposites[command]);
                    const filtered = [`north`, `east`, `south`, `west`].filter((move) => choices.has(move));
                    if (opposites[command]) {
                        filtered.push(opposites[command]);
                    }
                    explored.set(room, filtered);
                }
            }
            if (i !== undefined) {
                if (i >= 0) {
                    const toCarry = i.toString(2).padStart(inv.length, `0`).split(``).map(Number).map(Boolean);
                    const problem = inv.findIndex((_, j) => carrying[j] !== toCarry[j]);
                    if (problem === -1) {
                        console.log(i, inv.filter((_, j) => carrying[j]));
                        i--;
                        return deformat(`south\n`);
                    } else {
                        carrying[problem] = toCarry[problem]
                        const t = `${toCarry[problem] ? `take` : `drop`} ${inv[problem]}\n`;
                        console.log(t);
                        return deformat(t);
                    }
                } else {
                    const manual = prompt(print);
                    return manual === null ? null : deformat(manual + `\n`);
                }
            } else if (room === `Security Checkpoint`) {
                i = 2 ** inv.length - 1;
                carrying = inv.map(() => true);
                return deformat(`inv\n`);
            } else if (items.length > 0) {
                const item = items.shift();
                inv.push(item);
                return deformat(`take ${item}\n`);
            } else {
                command = explored.get(room).shift();
                return deformat(command + `\n`);
            }
        },
        outputs,
    );

    const print = format(outputs);
    const answer = print.match(/\d+(?= on the keypad)/)[0];
    console.log(print);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
