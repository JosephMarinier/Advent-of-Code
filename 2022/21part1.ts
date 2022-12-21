fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = new Map(text.trim().split("\n").map((line) => line.split(": ")));

    let formula = input.get("root");
    while (/[a-zA-Z]/.test(formula)) {
        input.forEach((value, monkey) => {
            formula = formula.replaceAll(monkey, `(${value})`);
        });
    }

    const answer = eval(formula);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
