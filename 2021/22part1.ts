fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n").map((line) => {
        const [on_off, cuboid] = line.split(" ");
        return { on: on_off === "on", cuboid: cuboid.split(",").map((range) => range.slice(2).split("..").map(Number)) };
    });
    console.log(input);

    const inRange = (a) => -50 <= a && a <= 50;

    const set = new Set();
    input.forEach(({ on, cuboid }) => {
        if (cuboid.flat().every(inRange)) {
            for (let x = cuboid[0][0]; x <= cuboid[0][1]; x++) {
                for (let y = cuboid[1][0]; y <= cuboid[1][1]; y++) {
                    for (let z = cuboid[2][0]; z <= cuboid[2][1]; z++) {
                        const c = [x, y, z].join(",");
                        if (on) {
                            set.add(c);
                        } else {
                            set.delete(c);
                        }
                    }
                }
            }
        }
    });

    const answer = set.size;
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
