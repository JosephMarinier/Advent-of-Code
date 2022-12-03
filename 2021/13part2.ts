fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [a, b] = text.trim().split("\n\n");
    const points = a.split("\n").map((line) => line.split(",").map(Number));
    const folds = b.split("\n").map((fold) => [fold[11], Number(fold.slice(13))]);

    const xFolds = folds.filter(([axis]) => axis === "x").map(([, x]) => Number(x));
    const yFolds = folds.filter(([axis]) => axis === "y").map(([, y]) => Number(y));
    const width = Math.min(...xFolds);
    const height = Math.min(...yFolds);

    const applyFolds = (c, fold) => c > fold ? 2 * fold - c : c;

    const set = new Set(points.map(([x, y]) => `${xFolds.reduce(applyFolds, x)},${yFolds.reduce(applyFolds, y)}`));

    console.log({ points, folds, width, height, set });

    console.log(Array.from(Array(height), (_, y) => Array.from(Array(width), (_, x) => set.has(`${x},${y}`) ? "#" : ".").join("")).join("\n"));
});
