fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const answer = text.trim().split("\n").map(
        (line) => ["red", "green", "blue"].map(
            (color) => Math.max(...[...line.matchAll(new RegExp(`\\d+(?= ${color})`, "g"))].map(Number))
        ).reduce((a, b) => a * b)
    ).reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
