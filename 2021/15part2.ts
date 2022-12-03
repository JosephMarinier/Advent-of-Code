fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const risks = text.trim().split("\n").map((line) => line.split("").map(Number));
    const width = risks[0].length;
    const height = risks.length;
    const xMax = width * 5 - 1;
    const yMax = height * 5 - 1;

    const neighbor = (x, y) => [
        `${x},${y}`,
        (risks[y % height][x % width] + Math.floor(y / height) + Math.floor(x / width) - 1) % 9 + 1
    ];

    const neighbors = (c) => {
        const [x, y] = c.split(",").map(Number);
        const neighbors = [];
        if (y > 0) {
            neighbors.push(neighbor(x, y - 1));
        }
        if (y < yMax) {
            neighbors.push(neighbor(x, y + 1));
        }
        if (x > 0) {
            neighbors.push(neighbor(x - 1, y));
        }
        if (x < xMax) {
            neighbors.push(neighbor(x + 1, y));
        }
        return neighbors;
    };

    const goal = (c) => c === `${xMax},${yMax}`;

    const h = (c) => {
        const [x, y] = c.split(",").map(Number);
        return (xMax - x) + (yMax - y);
    };

    const answer = search(`0,0`, goal, h, neighbors);
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
