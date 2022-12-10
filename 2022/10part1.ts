fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let c = 1;
    let x = 1;
    let answer = 0;

    const tick = () => {
        if ((c - 20) % 40 === 0) {
            console.log(c, x);
            answer += c * x;
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
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
