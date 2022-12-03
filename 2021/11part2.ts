fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const lines = text.trim().split("\n").map((line) => line.split("").map(Number));
    console.log(lines);

    let map = new Map(lines.flatMap((line, y) => line.map((energy, x) => [`${x},${y}`, energy])));

    let answer = Array(10000).fill(0).findIndex(() => {
        let count = 0;
        map = new Map([...map].map(([c, energy]) => [c, energy + 1]));
        let found;
        do {
            found = [...map].find(([c, energy]) => energy > 9);
            if (found) {
                const [c, energy] = found;
                const [x, y] = c.split(",").map(Number);
                count++;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const dc = `${x + dx},${y + dy}`;
                        const dEnergy = map.get(dc);
                        if (dEnergy !== 0) {
                            map.set(dc, dEnergy + 1);
                        }
                    }
                }
                map.set(c, 0);
            }
        } while (found);
        return count === 100;
    }) + 1;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
