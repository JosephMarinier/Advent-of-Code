fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let bools = text.trim().split(`\n`).map((line) => line.split(``).map((pixel) => Number(pixel === `#`)));

    let answer = parseInt(bools.reduce((a, b) => [...a, ...b]).reverse().join(``), 2);
    const set = new Set([answer]);
    let i;
    for (i = 0; i < 100000; i++) {
        console.log(answer);
        bools = bools.map((line, y) => line.map((bug, x) => {
            const neighbours = [
                bools[y - 1] && bools[y - 1][x] || 0,
                bools[y + 1] && bools[y + 1][x] || 0,
                bools[y][x - 1] || 0,
                bools[y][x + 1] || 0,
            ]
            const count = neighbours.reduce((a, b) => a + b);
            return Number((count === 1 || (!bug && count === 2)));
        }));
        // console.log(bools.map((line) => line.map((bug) => bug ? `#` : `.`).join(``)).join(`\n`));
        answer = parseInt(bools.reduce((a, b) => [...a, ...b]).reverse().join(``), 2);
        if (set.has(answer)) {
            break;
        } else {
            set.add(answer);
        }
    }

    console.log(i, answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
