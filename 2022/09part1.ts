fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const X = 0;
    const Y = 1;

    const head = [0, 0];
    const tail = [0, 0];

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
            head[X] += DIRECTIONS[direction][X];
            head[Y] += DIRECTIONS[direction][Y];

            const dx = head[X] - tail[X];
            const dy = head[Y] - tail[Y];
            const dist = Math.max(Math.abs(dx), Math.abs(dy));
            if (dist > 1) {
                tail[X] += Math.sign(dy);
                tail[Y] += Math.sign(dx);
            }
            visited.add(tail.join(","));
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
