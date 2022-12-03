fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim()
        .split("\n")
        .map((segment) => segment.match(/^(\d+),(\d+) -> (\d+),(\d+)$/).slice(1).map(Number));
    console.log(inputs);

    const lol = {};
    inputs.forEach(([x1, y1, x2, y2]) => {
        if (x1 === x2) {
            const [min, max] = [y1, y2].sort((a, b) => a - b);
            for (let y = min; y <= max; y++) {
                const key = `${x1},${y}`;
                lol[key] = (lol[key] || 0) + 1;
            }
        } else if (y1 === y2) {
            const [min, max] = [x1, x2].sort((a, b) => a - b);
            for (let x = min; x <= max; x++) {
                const key = `${x},${y1}`;
                lol[key] = (lol[key] || 0) + 1;
            }
        }
    });

    const answer = Object.values(lol).filter((v) => v >= 2).length;

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
