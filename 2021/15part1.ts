fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const risks = text.trim().split("\n").map((line) => line.split("").map(Number));
    const width = risks[0].length;
    const height = risks.length;
    console.log({ width, height });

    const answer = search(`0,0`, (c) => c === `${width - 1},${height - 1}`, (c) => {
        const [x, y] = c.split(",").map(Number);
        return (width - 1 - x) + (height - 1 - y);
    }, (c) => {
        const [x, y] = c.split(",").map(Number);
        const nei = [];
        if (y > 0) {
            nei.push([`${x},${y - 1}`, risks[y - 1][x]]);
        }
        if (y < height - 1) {
            nei.push([`${x},${y + 1}`, risks[y + 1][x]]);
        }
        if (x > 0) {
            nei.push([`${x - 1},${y}`, risks[y][x - 1]]);
        }
        if (x < width - 1) {
            nei.push([`${x + 1},${y}`, risks[y][x + 1]]);
        }
        return nei;
    });
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
