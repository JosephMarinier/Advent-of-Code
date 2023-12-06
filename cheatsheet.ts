fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n").map((line) => line.split("").map(Number));

    const answer = 0;

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});

const assertEqual = (actual, expected) => {
    if (actual !== expected) {
        throw new Error(`Expecting "${expected}" but got "${actual}"`);
    }
}

const array = [1, 2, 3];

// Sort ascending
array.sort((a, b) => a - b)

// Sort descending
array.sort((a, b) => b - a)

// Find min
Math.min(...array)
array.reduce((min, a) => a < min ? a : min)

// Find max
Math.min(...array)
array.reduce((max, a) => a > max ? a : max)

// Sum
const sum = array.reduce((a, b) => a + b)

const groupBy = (array, by) => {
    const map = new Map();
    array.forEach((item) => {
        const key = by(item);
        if (map.has(key)) {
            map.get(key).push(item);
        } else {
            map.set(key, [item]);
        }
    });
    return map;
}

const deg2rad = (deg) => deg * Math.PI / 180;

const rotate = ([x, y], rad) => [
    x * Math.cos(rad) - y * Math.sin(rad),
    x * Math.sin(rad) + y * Math.cos(rad),
];

let i = 0;
let player;
const max = 100000;
do {
    i++;
} while (i < max);
if (i === max) {
    console.error("More!");
} else {
    console.log({ i });
}

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
const search = (start, goal, h, neighbors) => {
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
                if (i % 1000 === 0 || heu === 0) {
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
