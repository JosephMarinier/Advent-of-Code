fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let answer = 0;
    const map = text.trim().split("\n").map((line) => line.split(""));
    const visited = map.map((line) => Array.from(Array(line.length), () => new Set()));
    const light = [];
    const visit = (cell) => {
        if (visited[cell.y][cell.x].size !== visited[cell.y][cell.x].add(cell.direction).size) {
            light.push(cell);
        }
    }

    const get = () => {
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
        return visited.reduce((answer, line) => answer + line.filter((cell) => {
            const size = cell.size;
            cell.clear();
            return size;
        }).length, 0);
    }

    for (let y = 0; y < map.length; y++) {
        visit({ x: 0, y, direction: ">" });
        answer = Math.max(answer, get());
        visit({ x: map[0].length - 1, y, direction: "<" });
        answer = Math.max(answer, get());
    }
    for (let x = 0; x < map[0].length; x++) {
        visit({ x, y: 0, direction: "v" });
        answer = Math.max(answer, get());
        visit({ x, y: map.length - 1, direction: "^" });
        answer = Math.max(answer, get());
    }

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
