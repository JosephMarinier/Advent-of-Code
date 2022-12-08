fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n").map((line) => line.split("").map(Number));

    const answer = Math.max(...input.flatMap((line, y) => line.map((height, x) => [
        line.slice(0, x).reverse(),
        line.slice(x + 1),
        input.slice(0, y).map((otherLine) => otherLine[x]).reverse(),
        input.slice(y + 1).map((otherLine) => otherLine[x]),
    ].map((trees) => (1 + trees.findIndex((other) => other >= height)) || trees.length).reduce((a, b) => a * b))));

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
