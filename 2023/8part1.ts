fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [instructions, network] = text.trim().split("\n\n");
    const nodes = new Map(network.split("\n").map((line) => {
        const [from, to] = line.split(" = ");
        const [L, R] = to.slice(1, -1).split(", ");
        return [from, {L, R}];
    }));

    let answer = 0;
    let current = "AAA";
    do {
        current = nodes.get(current)?.[instructions[answer++ % instructions.length]];
    } while (current !== "ZZZ");

    console.log(answer);
    if (!answer || answer === 1000000) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
