fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const rounds = text.trim().split("\n").map((line) => {
        const [abc, xyz] = line.split(" ");
        const elf = abc.charCodeAt(0) - "A".charCodeAt(0);
        const me = xyz.charCodeAt(0) - "X".charCodeAt(0);

        const shapeScore = 1 + (elf + me + 2) % 3;
        const outcomeScore = me * 3;
        return shapeScore + outcomeScore;
    });

    const answer = rounds.reduce((a, b) => a + b);

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
