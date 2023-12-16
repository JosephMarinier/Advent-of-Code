fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const answer = text.trim().split(",").map(
        (step) => step.split("").reduce((hash, char) => (hash + char.charCodeAt(0)) * 17 % 256, 0)
    ).reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
