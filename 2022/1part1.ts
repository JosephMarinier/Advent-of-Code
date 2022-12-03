fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const elves = text.trim().split("\n\n").map((elf) => elf.split("\n").map(Number).reduce((a, b) => a + b));

    const answer = Math.max(...elves);

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
