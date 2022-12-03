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
    const all = [...v.map(([a]) => a), ...v.map(([, b]) => b)];
    const min = all.reduce((a, b) => ({x: Math.min(a.x, b.x), y: Math.min(a.y, b.y)}));
    const max = all.reduce((a, b) => ({x: Math.max(a.x, b.x), y: Math.max(a.y, b.y)}));
    const portals = new Map([
        ...v.map(([a, b]) => [Object.values(a).join(`,`), {coord: Object.values(b).join(`,`), level: (a.x === min.x || a.x === max.x || a.y === min.y || a.y === max.y) ? -1 : 1}]),
        ...v.map(([a, b]) => [Object.values(b).join(`,`), {coord: Object.values(a).join(`,`), level: (b.x === min.x || b.x === max.x || b.y === min.y || b.y === max.y) ? -1 : 1}]),
    ]);
    const levels = Array(100).fill(0);
    const distances = levels.map(() => map.map((line) => line.map(() => Infinity)));
    distances[0][aa.y][aa.x] = 0;
    let answer = 0;
    while (answer < 10000 && distances[0][zz.y][zz.x] === Infinity) {
        levels.forEach((_, level) => {
            map.forEach((line, y) => {
                line.forEach((pixel, x) => {
                    if (distances[level][y][x] === Infinity && pixel === `.`) {
                        const neighbors = [
                            distances[level][y - 1] && distances[level][y - 1][x],
                            distances[level][y + 1] && distances[level][y + 1][x],
                            distances[level][y][x - 1],
                            distances[level][y][x + 1],
                        ];
                        const s = [x, y].join(`,`);
                        if (portals.has(s)) {
                            const {coord, level: diff} = portals.get(s);
                            const [x, y] = coord.split(`,`);
                            const level2 = level + diff;
                            if (level2 in distances) {
                                neighbors.push(distances[level2][y][x]);
                            }
                        } 
                        if (neighbors.includes(answer)) {
                            distances[level][y][x] = answer + 1;
                        }
                    }
                });
            });
        });
        answer++;
        console.log(answer);
    }
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});