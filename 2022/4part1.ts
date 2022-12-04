fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n").map((line) => {
        const [[a, b], [c, d]] = line.split(",").map((range) => range.split("-").map(Number));
        return a <= c && d <= b || c <= a && b <= d ? 1 : 0;
    });

    const answer = input.reduce((a, b) => a + b);

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
