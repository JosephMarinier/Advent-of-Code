fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const X = 0;
    const Y = 1;

    const HEAD = 0;
    const TAIL = 9

    const knots = Array.from(Array(TAIL + 1), () => [0, 0]);

    const DIRECTIONS = {
        L: [-1, 0],
        R: [1, 0],
        U: [0, 1],
        D: [0, -1],
    };

    const visited = new Set();
    text.trim().split("\n").forEach((move) => {
        const [direction, steps] = move.split(" ");
        Array.from(Array(Number(steps)), () => {
            knots[HEAD][X] += DIRECTIONS[direction][X];
            knots[HEAD][Y] += DIRECTIONS[direction][Y];
            knots.slice(1).forEach((knot, frontKnotIndex) => {
                const frontKnot = knots[frontKnotIndex];

                const dx = frontKnot[X] - knot[X];
                const dy = frontKnot[Y] - knot[Y];
                const dist = Math.max(Math.abs(dx), Math.abs(dy));
                if (dist > 1) {
                    knot[X] += Math.sign(dx);
                    knot[Y] += Math.sign(dy);
                }
            })
            visited.add(knots[TAIL].join(","));
        });
    });
    const answer = visited.size;

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
