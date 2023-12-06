fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const lines = text.trim().split("\n");

    const partNumbers = Array.from(Array(lines.length + 2), () => Array.from(Array(lines[0].length + 2), () => 0));
    lines.forEach(
        (line, y) => {
            [...line.matchAll(/\d+/g)].forEach(({0: digits, index: x}) => {
                digits.split("").forEach((_, dx) => {
                    partNumbers[y + 1][x + dx + 1] = Number(digits);
                });
            })
        }
    );

    let answer = 0;
    lines.forEach((line, y) => {
        line.split("").forEach((c, x) => {
            if (c === "*") {
                // The `new Set().size` works only if all part numbers are unique.
                const neighbors = new Set(partNumbers.slice(y, y + 3).flatMap((row) => row.slice(x, x + 3)).filter((n) => n > 0));
                if (neighbors.size === 2) {
                    answer += [...neighbors].reduce((a, b) => a * b);
                }
            }
        })
    });

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
