fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n");
    const cubes = new Set(input);

    const answer = input.map((line) => line.split(",").map(Number)).flatMap(([x, y, z]) => [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
    ].filter((neighbor) => !cubes.has(neighbor.join(",")))).length;

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
