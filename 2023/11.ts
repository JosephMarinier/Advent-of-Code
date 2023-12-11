fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const map = text.trim().split("\n").map((line) => line.split(""));

    // The expansion ratio minus 1 to account for the empty line already present in the map;
    // Part 1:
    // const expansion = 2 - 1;
    // Part 2:
    const expansion = 1_000_000 - 1;

    const expansionY = map.slice(0, -1).reduce((exp, line) => [...exp, exp[exp.length - 1] + Number(!line.includes("#")) * expansion], [0]);
    const expansionX = map[0].slice(0, -1).reduce((exp, _, x) => [...exp, exp[exp.length - 1] + Number(map.every((line) => line[x] === ".")) * expansion], [0]);
    const galaxies = map.flatMap((line, y) => line.flatMap((char, x) => char === "#" ? [[x + expansionX[x], y + expansionY[y]]] : []));
    const distances = galaxies.slice(0, -1).flatMap(([ax, ay], i) => galaxies.slice(i + 1).map(([bx, by]) => Math.abs(bx - ax) + Math.abs(by - ay)));
    const answer = distances.reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
