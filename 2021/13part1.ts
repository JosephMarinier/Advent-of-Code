fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [a, b] = text.trim().split("\n\n");
    const points = a.split("\n").map((line) => line.split(",").map(Number));
    const folds = b.split("\n").map((fold) => [fold[11], Number(fold.slice(13))]).slice(0, 1);

    const xFolds = folds.filter(([axis]) => axis === "x").map(([, x]) => x);
    const yFolds = folds.filter(([axis]) => axis === "y").map(([, y]) => y);

    const applyFolds = (c, fold) => c > fold ? 2 * fold - c : c;

    const set = new Set(points.map(([x, y]) => `${xFolds.reduce(applyFolds, x)},${yFolds.reduce(applyFolds, y)}`));

    const answer = set.size;
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
