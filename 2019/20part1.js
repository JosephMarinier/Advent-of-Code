fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const map = text.split(`\n`).map((line) => line.split(``));
    let aa, zz;
    const label2portal = new Map();
    map.forEach((line, y) => {
        line.forEach((pixel, x) => {
            if (pixel === `.`) {
                const label = [
                    map[y - 2][x] + map[y - 1][x],
                    map[y + 1][x] + map[y + 2][x],
                    map[y][x - 2] + map[y][x - 1],
                    map[y][x + 1] + map[y][x + 2],
                ].find((label) => /^\w+$/.test(label));
                if (label) {
                    if (label === `AA`) {
                        aa = {x, y};
                    } else if (label === `ZZ`) {
                        zz = {x, y};
                    } else {
                        if (label2portal.has(label)) {
                            label2portal.get(label).push({x, y});
                        } else {
                            label2portal.set(label, [{x, y}]);
                        }
                    }
                }
            }
        });
    });
    const v = [...label2portal.values()];
    const portals = new Map([
        ...v.map(([a, b]) => [Object.values(a).join(`,`), Object.values(b).join(`,`)]),
        ...v.map(([a, b]) => [Object.values(b).join(`,`), Object.values(a).join(`,`)]),
    ]);
    const distances = map.map((line) => line.map(() => Infinity));
    distances[aa.y][aa.x] = 0;
    let i = 0;
    while (i < 10) {
        map.forEach((line, y) => {
            line.forEach((pixel, x) => {
                if (distances[y][x] === Infinity && pixel === `.`) {
                    const neighbors = [
                        distances[y - 1] && distances[y - 1][x],
                        distances[y + 1] && distances[y + 1][x],
                        distances[y][x - 1],
                        distances[y][x + 1],
                    ];
                    const s = [x, y].join(`,`);
                    if (portals.has(s)) {
                        const [x, y] = portals.get(s).split(`,`);
                        neighbors.push(distances[y][x]);
                    } 
                    if (neighbors.includes(i)) {
                        distances[y][x] = i + 1;
                    }
                }
            });
        });
        i++;
        // console.log(distances.map((line) => line.map((pixel) => pixel === Infinity ? ` ` : String.fromCharCode(48 + pixel)).join(``)).join(`\n`));
    }

    const answer = distances[zz.y][zz.x];
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});