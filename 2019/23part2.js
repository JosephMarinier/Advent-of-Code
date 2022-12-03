class Computer {
    constructor(program, inputs = [], getInputs = undefined, outputs = [], callback = (output) => outputs.push(output)) {
        this.program = program.slice();
        this.inputs = inputs;
        this.getInputs = getInputs;
        this.outputs = outputs;
        this.callback = callback;
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
                    this.inputs = this.getInputs();
                }
                this.program[this.mode(modes, 1)] = this.inputs.shift();
                this.i += 2;
            },
            4: (modes) => {
                this.outputs.push(this.get(this.mode(modes, 1)));
                if (this.callback) {
                    this.callback(this.outputs);
                }
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
                console.log(`Halt!`);
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
        console.assert(this.i < Infinity, `Pointer reached Inifinity.`);
        const instruction = this.program[this.i];
        const opcode = instruction % 100;
        console.assert(opcode in this.instructions, `Unknown opcode ${opcode} in instruction ${instruction}.`);
        const modes = Array.from(String(instruction)).slice(0, -2).reverse().map(Number);
        this.instructions[opcode](modes);
    }
};

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const program = text.trim().split(`,`).map(Number);

    const packets = [];
    let nat;
    const computers = Array(50).fill().map((_, address) => new Computer(program, [address], () => {
        const index = packets.findIndex(({to}) => to === address);
        const inputs = index === -1 ? [-1] : packets.splice(index, 1)[0].packet;
        // console.log({index, for: address, inputs: inputs.join()});
        return inputs;
    }, undefined, (outputs) => {
        if (outputs.length === 3) {
            const [to, ...packet] = outputs;
            if (to === 255) {
                console.log({to, packet: packet.join(), outputs: outputs.join()})
                nat = packet;
            } else {
                packets.push({to, packet});
            }
            // console.log({from: address, to, packet: packet.join()});
            outputs.splice(0, 3);
        }
    }));

    let i;
    let idle = 0;
    let prev;
    for (i = 0; i < 100000; i++) {
        computers.forEach((computer) => computer.tic());
        if (packets.length === 0 && nat) {
            idle++;
            if (idle === 100) {
                idle = 0;
                const [, answer] = nat;
                console.log({i, nat: nat.join(), answer});
                if (prev === answer) {
                    document.querySelector(`input[name="answer"]`).value = answer;
                    break;
                } else {
                    prev = answer;
                    packets.push({to: 0, packet: nat.slice()});
                }
            }
        }
    }
    console.log(`done`, i);
    console.log(packets);
});