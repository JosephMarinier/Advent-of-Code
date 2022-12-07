fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`);
    const height = inputs.length;
    const width = inputs[0].length;

    const answer = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ].map(([dx, dy]) => {
        let answer = 0;
        for (let x = 0, y = 0; y < height; x += dx, y += dy) {
            if (inputs[y][x % width] === "#") {
                answer++;
            }
        }
        return answer;
    }).reduce((a, b) => a * b);

    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
