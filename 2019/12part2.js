fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const pos = text.trim().split(`\n`).map((line) => Object.fromEntries(Object.entries(/<x=(?<x>-?\d+), y=(?<y>-?\d+), z=(?<z>-?\d+)>/.exec(line).groups).map(([a, b]) => [a, Number(b)])));
    const vel = pos.map(() => ({x: 0, y: 0, z: 0}));
    const start = performance.now();
    const answer = [`x`, `y`, `z`].map((axis) => {
        const hash = () => pos.map((pos, star) => `${pos[axis]}/${vel[star][axis]}`).join(`\n`);
        const set = new Set();
        const max = 1000000;
        let i;
        for (i = 0; i < max; i++) {
            const h = hash();
            if (set.has(h)) {
                return i;
            } else {
                set.add(h);
            }
            pos.slice(0, -1).forEach((posa, a) => {
                pos.slice(a + 1).forEach((posb, b) => {
                    b = a + 1 + b;
                    if (posa[axis] < posb[axis]) {
                        vel[a][axis]++;
                        vel[b][axis]--;
                    } else if (posa[axis] > posb[axis]) {
                        vel[a][axis]--;
                        vel[b][axis]++;
                    }
                });
            });
            pos.forEach((pos, star) => {
                pos[axis] += vel[star][axis];
            });
        }
        console.assert(i < max, i);
    });
    const end = performance.now();
    console.log(`${end - start} ms`);
    console.log(encodeURI(`https://www.wolframalpha.com/input/?i=lcm ${answer.join(`,`)}`));
});
