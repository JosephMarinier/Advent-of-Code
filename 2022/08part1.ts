fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n").map((line) => line.split("").map(Number));

    const answer = input.flatMap((line, y) => line.filter((height, x) => [
        line.slice(0, x),
        line.slice(x + 1),
        input.slice(0, y).map((otherLine) => otherLine[x]),
        input.slice(y + 1).map((otherLine) => otherLine[x]),
    ].some((trees) => trees.every((other) => other < height)))).length;

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
