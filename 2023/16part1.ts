fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const map = text.trim().split("\n").map((line) => line.split(""));
    const visited = map.map((line) => Array.from(Array(line.length), () => new Set()));
    const light = [];
    const visit = (cell) => {
        if (visited[cell.y][cell.x].size !== visited[cell.y][cell.x].add(cell.direction).size) {
            light.push(cell);
        }
    }
    visit({ x: 0, y: 0, direction: ">" });
    do {
        const { x, y, direction } = light.pop();
        if (direction === "<") {
            if (".-".includes(map[y][x]) && map[y][x - 1]) {
                visit({ x: x - 1, y, direction: "<" });
            }
            if ("|\\".includes(map[y][x]) && map[y - 1]) {
                visit({ x, y: y - 1, direction: "^" });
            }
            if ("|/".includes(map[y][x]) && map[y + 1]) {
                visit({ x, y: y + 1, direction: "v" });
            }
        } else if (direction === ">") {
            if (".-".includes(map[y][x]) && map[y][x + 1]) {
                visit({ x: x + 1, y, direction: ">" });
            }
            if ("|\\".includes(map[y][x]) && map[y + 1]) {
                visit({ x, y: y + 1, direction: "v" });
            }
            if ("|/".includes(map[y][x]) && map[y - 1]) {
                visit({ x, y: y - 1, direction: "^" });
            }
        } else if (direction === "^") {
            if (".|".includes(map[y][x]) && map[y - 1]) {
                visit({ x, y: y - 1, direction: "^" });
            }
            if ("-\\".includes(map[y][x]) && map[y][x - 1]) {
                visit({ x: x - 1, y, direction: "<" });
            }
            if ("-/".includes(map[y][x]) && map[y][x + 1]) {
                visit({ x: x + 1, y, direction: ">" });
            }
        } else if (direction === "v") {
            if (".|".includes(map[y][x]) && map[y + 1]) {
                visit({ x, y: y + 1, direction: "v" });
            }
            if ("-\\".includes(map[y][x]) && map[y][x + 1]) {
                visit({ x: x + 1, y, direction: ">" });
            }
            if ("-/".includes(map[y][x]) && map[y][x - 1]) {
                visit({ x: x - 1, y, direction: "<" });
            }
        }
    } while (light.length);
    console.log(visited.map((line) => line.map((cell) => `${cell.size === 1 ? [...cell] : cell.size || "."}`).join("")).join("\n"));
    const answer = visited.reduce((answer, line) => answer + line.filter((cell) => cell.size).length, 0);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
