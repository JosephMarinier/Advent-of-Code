fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const sum = (a, b) => a + b;
    const times = 200;

    let bools = [
        ...Array(times).fill().map(() => Array(5).fill().map(() => Array(5).fill(0))),
        text.trim().split(`\n`).map((line) => line.split(``).map((pixel) => Number(pixel === `#`))),
        ...Array(times).fill().map(() => Array(5).fill().map(() => Array(5).fill(0))),
    ];

    for (i = 0; i < times; i++) {
        // console.log(bools.map((image) => image.map((line) => line.map((bug) => bug ? `#` : `.`).join(``)).join(`\n`)).join(`\n\n`));
        bools = bools.map((image, level) => image.map((line, y) => line.map((bug, x) => {
            if (y === 2 && x === 2) {
                return 0;
            }
            const neighbours = [
                y === 0
                    ? bools[level - 1] && bools[level - 1][1][2] || 0
                    : (y - 1 === 2 && x === 2)
                        ? bools[level + 1] && bools[level + 1][4].reduce(sum) || 0
                        : image[y - 1] && image[y - 1][x] || 0,
                y === 4
                    ? bools[level - 1] && bools[level - 1][3][2] || 0
                    : (y + 1 === 2 && x === 2)
                        ? bools[level + 1] && bools[level + 1][0].reduce(sum) || 0
                        : image[y + 1] && image[y + 1][x] || 0,
                x === 0
                    ? bools[level - 1] && bools[level - 1][2][1] || 0
                    : (y === 2 && x - 1 === 2)
                        ? bools[level + 1] && bools[level + 1].map((line) => line[4]).reduce(sum) || 0
                        : line[x - 1] || 0,
                x === 4
                    ? bools[level - 1] && bools[level - 1][2][3] || 0
                    : (y === 2 && x + 1 === 2)
                        ? bools[level + 1] && bools[level + 1].map((line) => line[0]).reduce(sum) || 0
                        : line[x + 1] || 0,
            ]
            const count = neighbours.reduce(sum);
            return Number((count === 1 || (!bug && count === 2)));
        })));
    }

    const answer = bools.map((image) => image.map((line) => line.reduce(sum)).reduce(sum)).reduce(sum);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
