fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const lines = text.trim().split("\n").map((line) => line.split("").map(Number));

    const map = new Map(lines.flatMap((line, y) => line.map((height, x) => [`${x},${y}`, height])));

    const getNeighbors = (c) => {
        const [x, y] = c.split(",").map(Number);
        return [`${x},${y - 1}`, `${x},${y + 1}`, `${x - 1},${y}`, `${x + 1},${y}`];
    }

    const basins = [...map].map(([c, height]) => {
        const neighbors = getNeighbors(c);
        if (neighbors.some((c) => map.get(c) < height)) {
            return 0;
        }
        let basin = new Set(neighbors.filter((c) => map.get(c) < 9));
        let size;
        do {
            size = basin.size;
            basin = [...basin].reduce((basin, c) => new Set([...basin, ...getNeighbors(c).filter((c) => map.get(c) < 9)]), basin);
        } while(size !== basin.size);
        return size;
    }).sort((a, b) => b - a);

    const [a, b, c] = basins;
    const answer = a * b * c;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    