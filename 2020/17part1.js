fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let set = new Set();
    const input = text.trim().split("\n").forEach((line, y) => {
        line.split("").forEach((c, x) => {
            if (c === "#") {
                set.add([x, y, 0].join(), true);
            }
        });
    });

    const lim = 20;
    for (let i = 0; i < 6; i++) {
        const set2 = new Set();
        for (let x = -lim; x < lim; x++) {
            for (let y = -lim; y < lim; y++) {
                for (let z = -lim; z < lim; z++) {
                    const c = set.has([x, y, z].join());
                    let n = 0;
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dz = -1; dz <= 1; dz++) {
                                if (set.has([x+dx, y+dy, z+dz].join())) {
                                    n++;
                                }
                            }
                        }
                    }
                    if (c && (n === 3 || n === 4) || !c && n === 3) {
                        set2.add([x, y, z].join());
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
