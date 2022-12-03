fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let set = new Set();
    const input = text.trim().split("\n").forEach((line, y) => {
        line.split("").forEach((c, x) => {
            if (c === "#") {
                set.add([x, y, 0, 0].join(), true);
            }
        });
    });

    const lim = 15;
    for (let i = 0; i < 6; i++) {
        console.log({ i });
        const set2 = new Set();
        const xyzw = [...set].map((c) => c.split(",").map(Number));
        const coords = xyzw.reduce(
            ([xs, ys, zs, ws], [x, y, z, w]) => [[...xs, x], [...ys, y], [...zs, z], [...ws, w]],
            [[], [], [], []],
        );
        const [xMin, yMin, zMin, wMin] = coords.map((all) => Math.min(...all));
        const [xMax, yMax, zMax, wMax] = coords.map((all) => Math.max(...all));
        for (let x = xMin - 1; x <= xMax + 1; x++) {
            console.log("x", xMin, xMax);
            for (let y = yMin - 1; y <= yMax + 1; y++) {
                for (let z = zMin - 1; z <= zMax + 1; z++) {
                    for (let w = wMin - 1; w <= wMax + 1; w++) {
                        const c = set.has([x, y, z, w].join());
                        let n = 0;
                        for (let dx = -1; dx <= 1; dx++) {
                            for (let dy = -1; dy <= 1; dy++) {
                                for (let dz = -1; dz <= 1; dz++) {
                                    for (let dw = -1; dw <= 1; dw++) {
                                        if (set.has([x+dx, y+dy, z+dz, w+dw].join())) {
                                            n++;
                                        }
                                    }
                                }
                            }
                        }
                        if (c && n === 4 || n === 3) {
                            set2.add([x, y, z, w].join());
                        }
                    }
                }
            }
        }
        set = set2;
    }

    const answer = set.size;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    