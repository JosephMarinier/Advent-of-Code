fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n");
    const cubes = new Set(input);

    const coords = input.map((line) => line.split(",").map(Number));
    const min = [
        Math.min(...coords.map(([x, y, z]) => x)),
        Math.min(...coords.map(([x, y, z]) => y)),
        Math.min(...coords.map(([x, y, z]) => z)),
    ];
    const max = [
        Math.max(...coords.map(([x, y, z]) => x)),
        Math.max(...coords.map(([x, y, z]) => y)),
        Math.max(...coords.map(([x, y, z]) => z)),
    ];

    const envelope = new Set();
    for (let x = min[0]; x <= max[0]; x++) {
        for (let y = min[1]; y <= max[1]; y++) {
            for (let z = min[2]; z <= max[2]; z++) {
                envelope.add([x, y, z].join(","));
            }
        }
    }

    while (true) {
        const exterior = [];
        for (let x = min[0]; x <= max[0]; x++) {
            for (let y = min[1]; y <= max[1]; y++) {
                for (let z = min[2]; z <= max[2]; z++) {
                    const cube = [x, y, z].join(",");
                    if (envelope.has(cube) && !cubes.has(cube) && [
                        [x + 1, y, z],
                        [x - 1, y, z],
                        [x, y + 1, z],
                        [x, y - 1, z],
                        [x, y, z + 1],
                        [x, y, z - 1],
                    ].some((neighbor) => !envelope.has(neighbor.join(",")))) {
                        exterior.push(cube);
                    }
                }
            }
        }
        if (exterior.length === 0) {
            break;
        }
        exterior.forEach((co) => {
            envelope.delete(co);
        });
    }

    const answer = Array.from(envelope.values(), (line) => line.split(",").map(Number)).flatMap(([x, y, z]) => [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
    ].filter((neighbor) => !envelope.has(neighbor.join(",")))).length;

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
