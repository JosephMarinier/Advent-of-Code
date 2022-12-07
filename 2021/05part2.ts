fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim()
        .split("\n")
        .map((segment) => segment.match(/^(\d+),(\d+) -> (\d+),(\d+)$/).slice(1).map(Number));
    console.log(inputs);

    const lol = {};
    inputs.forEach(([x1, y1, x2, y2]) => {
        const signX = Math.sign(x2 - x1);
        const signY = Math.sign(y2 - y1);
        for (let x = x1, y = y1; signX * x <= signX * x2 && signY * y <= signY * y2; x+=signX, y+=signY) {
            const key = `${x},${y}`;
            lol[key] = (lol[key] || 0) + 1;
        }
    });

    const answer = Object.values(lol).filter((v) => v >= 2).length;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
