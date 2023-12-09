fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const answer = text.trim().split("\n").map((line) => {
        const history = line.split(" ").map(Number);
        const derivatives = [history];
        do {
            derivatives.unshift([]);
            derivatives[1].reduce((a, b) => {
                derivatives[0].push(b - a);
                return b;
            });
        } while (!derivatives[0].every((x) => x === 0));
        return derivatives.reduce((diff, line) => line[0] - diff, 0);
    }).reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
