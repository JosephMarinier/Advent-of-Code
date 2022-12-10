fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let c = 0;
    let x = 1;
    let answer = "";

    const tick = () => {
        answer += Math.abs(c % 40 - x) <= 1 ? "█" : " ";
        if (c % 40 === 39) {
            answer += "\n";
        }
        c++;
    }

    text.trim().split("\n").forEach((line) => {
        const [op, v] = line.split(" ");
        tick();
        if (op === "addx") {
            tick();
            x += Number(v);
        }
    });

    console.log(answer);
});
