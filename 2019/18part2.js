// 2020
// 1824

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
search = (start, goal, h) => {
    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    const openSet = new Set([start]);

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start to n currently known.
    // const cameFrom = new Map();

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    const gScore = new Map([[start, 0]]); // with default value of Infinity

    // For node n, fScore[n] := gScore[n] + h(n).
    const fScore = new Map([[start, h(start)]]) // with default value of Infinity

    let i = 0;
    while (openSet.size > 0) {
        i++;
        const current = [...openSet].reduce((a, b) => fScore.get(a) < fScore.get(b) ? a : b); // the node in openSet having the lowest fScore[] value
        if (goal(current)) {
            // return reconstruct_path(cameFrom, current)
            return fScore.get(current);
        }

        openSet.delete(current);
        // for each neighbor of current
        neighbors(current).forEach(([neighbor, d]) => {
            // d(current,neighbor) is the weight of the edge from current to neighbor
            // tentative_gScore is the distance from start to the neighbor through current
            // console.log(neighbor);
            // console.log(`${gScore.get(current)} + ${d}`);
            const tentative_gScore = gScore.get(current) + d;
            if (!gScore.has(neighbor) || tentative_gScore < gScore.get(neighbor)) {
                // This path to neighbor is better than any previous one. Record it!
                // cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentative_gScore);
                const heu = h(neighbor);
                if (i % 100 === 0 || heu === 0) {
                    console.log(i, openSet.size, tentative_gScore, heu);
                }
                fScore.set(neighbor, tentative_gScore + heu);
                openSet.add(neighbor);
            }
        });
    }

    // Open set is empty but goal was never reached
    return null;
};

neighbors = (text) => {
    const map = text.trim().split(`\n`).map((line) => line.split(``));
    const distances = map.map((line) => line.map((pixel) => `0123`.includes(pixel) ? 0 : Infinity));
    let answer = 0;
    let progress = Infinity;
    while (answer < 1000 && progress > 0) {
        progress = 0;
        map.forEach((line, y) => {
            line.forEach((pixel, x) => {
                if (distances[y][x] === Infinity && pixel === `.` && [
                    distances[y - 1] && distances[y - 1][x],
                    distances[y + 1] && distances[y + 1][x],
                    distances[y][x - 1],
                    distances[y][x + 1],
                ].includes(answer)) {
                    progress++;
                    distances[y][x] = answer + 1;
                }
            });
        });
        answer++;
    }
    map.forEach((line, y) => {
        line.forEach((pixel, x) => {
            if (/[a-z]/.test(pixel)) {
                const adjacents = [];
                if ((y - 1) in distances) {
                    adjacents.push(distances[y - 1][x]);
                }
                if ((y + 1) in distances) {
                    adjacents.push(distances[y + 1][x]);
                }
                if ((x - 1) in distances[y]) {
                    adjacents.push(distances[y][x - 1]);
                }
                if ((x + 1) in distances[y]) {
                    adjacents.push(distances[y][x + 1]);
                }
                distances[y][x] = adjacents.reduce((a, b) => Math.min(a, b)) + 1;
            }
        });
    });
    const neighbors = [];
    map.forEach((line, y) => {
        line.forEach((pixel, x) => {
            if (/[a-z]/.test(pixel) && distances[y][x] < Infinity) {
                const cadran = String(Number(y > 40) * 2 + Number(x > 40));
                // console.log(cadran);
                neighbors.push([text.replace(cadran, `.`).replace(pixel, cadran).replace(pixel.toUpperCase(), `.`), distances[y][x]]);
            }
        });
    });
    return neighbors;
};

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const width = text.indexOf(`\n`) - 2;
    text = text.replace(new RegExp(`\.\.\.(.{${width}})\.@\.(.{${width}})\.\.\.`, `s`), `0#1$1###$22#3`);
//     text = `#############
// #g#f.D#..h#l#
// #F###e#E###.#
// #dCba0#1BcIJ#
// #############
// #nK.L2#3G...#
// #M###N#H###.#
// #o#m..#i#jk.#
// #############`;
    console.log(text);
    const start = performance.now();
    const answer = search(text, (text) => text.match(/[a-z]/) === null, (text) => text.replace(/[^a-z]/g, ``).length);
    const end = performance.now();
    console.log(`${(end - start) / 60000} m`);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    document.querySelector(`input[type="submit"]`).click();
});
