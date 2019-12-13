fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const pos = text.trim().split(`\n`).map((line) => Object.fromEntries(Object.entries(/<x=(?<x>-?\d+), y=(?<y>-?\d+), z=(?<z>-?\d+)>/.exec(line).groups).map(([a, b]) => [a, Number(b)])));
    const vel = pos.map(() => ({x: 0, y: 0, z: 0}));
    for (let i = 0; i < 1000; i++) {
        for (let a = 0; a < 3; a++) {
            for (let b = a + 1; b < 4; b++) {
                [`x`, `y`, `z`].forEach((axis) => {
                    if (pos[a][axis] < pos[b][axis]) {
                        vel[a][axis]++;
                        vel[b][axis]--;
                    } else if (pos[a][axis] > pos[b][axis]) {
                        vel[a][axis]--;
                        vel[b][axis]++;
                    }
                });
            }
        }
        for (let j = 0; j < 4; j++) {
            [`x`, `y`, `z`].forEach((axis) => {
                pos[j][axis] += vel[j][axis];
            });
        }
    }
    console.log(pos, vel);
    const answer = pos.map((p, star) => [p, vel[star]].map((i) => Object.values(i).map((axis) => Math.abs(axis)).reduce((a, b) => a + b)).reduce((a, b) => a * b)).reduce((a, b) => a + b);
    console.log(answer);
    document.querySelector(`input[name=answer]`).value = answer;
});
