fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678`;
    const inputs = text.trim().split("\n").map((line) => line.split("").map(Number));
    const yMax = inputs.length - 1;
    const xMax = inputs[0].length - 1;

    const answer = inputs.flatMap((line, y) => line.map((height, x) => {
        const nei = [];
        if (y > 0) {
            nei.push(inputs[y - 1][x]);
        }
        if (y < yMax) {
            nei.push(inputs[y + 1][x]);
        }
        if (x > 0) {
            nei.push(inputs[y][x - 1]);
        }
        if (x < xMax) {
            nei.push(inputs[y][x + 1]);
        }
        return nei.every((n) => height < n) ? height + 1 : 0;
    })).reduce((a, b) => a + b);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
