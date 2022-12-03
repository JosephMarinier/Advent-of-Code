fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = ``;
    const count = new Map();
    const tiles = text.trim().split("\n\n").map((tile) => {
        const [idLine, ...lines] = tile.split("\n");
        const id = Number(idLine.match(/\d+/)[0]);
        const borders = [
            lines.map((line) => line[line.length - 1]).join(""),
            lines[0],
            lines.map((line) => line[0]).join(""),
            lines[lines.length - 1],
        ];
        const bs = [...borders, ...borders.map((b) => b.split("").reverse().join(""))];
        bs.forEach((b) => {
            count.set(b, (count.get(b) || 0) + 1);
        });
        return [id, bs];
    });
    const sides = [...count].filter(([_, c]) => c === 1).map(([s]) => s);
    console.log(sides);
    console.log([...tiles].map(([_, borders]) => sides.filter((s) => borders.includes(s)).length));
    const corners = [...tiles].filter(([_, borders]) => sides.filter((s) => borders.includes(s)).length === 4);
    console.log(corners);

    const answer = corners.map(([id]) => (id)).reduce((a, b) => a * b);;

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
