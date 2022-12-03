class Computer {
    constructor(program) {
        this.program = program.slice();
        this.inputs = [];
        this.outputs = [];
        this.base = 0;
        this.i = 0;
        this.instructions = {
            1: (modes) => {
                this.program[this.mode(modes, 3)] = this.get(this.mode(modes, 1)) + this.get(this.mode(modes, 2));
                this.i += 4;
            },
            2: (modes) => {
                this.program[this.mode(modes, 3)] = this.get(this.mode(modes, 1)) * this.get(this.mode(modes, 2));
                this.i += 4;
            },
            3: (modes) => {
                if (this.inputs.length === 0) {
                    return true;
                }
                this.program[this.mode(modes, 1)] = this.inputs.shift();
                this.i += 2;
            },
            4: (modes) => {
                this.outputs.push(this.get(this.mode(modes, 1)));
                this.i += 2;
            },
            5: (modes) => {
                this.i = this.get(this.mode(modes, 1)) ? this.get(this.mode(modes, 2)) : this.i + 3;
            },
            6: (modes) => {
                this.i = this.get(this.mode(modes, 1)) ? this.i + 3 : this.get(this.mode(modes, 2));
            },
            7: (modes) => {
                this.program[this.mode(modes, 3)] = Number(this.get(this.mode(modes, 1)) < this.get(this.mode(modes, 2)));
                this.i += 4;
            },
            8: (modes) => {
                this.program[this.mode(modes, 3)] = Number(this.get(this.mode(modes, 1)) === this.get(this.mode(modes, 2)));
                this.i += 4;
            },
            9: (modes) => {
                this.base += this.get(this.mode(modes, 1));
                this.i += 2;
            },
            99: () => {
                this.i = Infinity;
            },
        };
    }

    get(i) {
        return this.program[i] || 0;
    }

    mode(modes, di) {
        const mode = modes[di - 1];
        const pointer = this.i + di;
        return mode === 1 ? pointer : mode === 2 ? this.base + this.program[pointer] : this.program[pointer];
    }

    tic() {
        const instruction = this.program[this.i];
        const opcode = instruction % 100;
        console.assert(opcode in this.instructions, `Unknown opcode ${opcode} in instruction ${instruction}.`);
        const modes = Array.from(String(instruction)).slice(0, -2).reverse().map(Number);
        return this.instructions[opcode](modes);
    }

    next() {
        while (this.i < this.program.length) {
            if (this.tic()) {
                return this.outputs.splice(0, this.outputs.length - 1);
            }
        }
    }
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
    const explored = new Map();
    const inv = [];
    let carrying;
    let i;
    let room;
    let command;
    let items = [];
    const computer = new Computer(program);
    let outputs = computer.next();
    const lol = () => {
        const print = format(outputs);
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
    };
    while (outputs) {
        const l = lol();
        console.log('lol', format(l));
        outputs = computer.next(l);
    }

    const print = format(outputs);
    const answer = print.match(/\d+(?= on the keypad)/)[0];
    console.log(print);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
