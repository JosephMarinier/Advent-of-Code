fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const a = "a".charCodeAt(0);
    const A = "A".charCodeAt(0);

    const priorities = Array.from(text.trim().matchAll(/(\w+)\n(\w+)\n(\w+)/g), ([_, ...elves]) => {
        const sets = elves.map((elf) => new Set(elf.split("")));
        const [intersection] = [...sets[0]].filter((element) => sets[1].has(element) && sets[2].has(element));
        const c = intersection.charCodeAt(0);
        return c < a ? 27 + c - A : 1 + c - a;
    });

    const answer = priorities.reduce((a, b) => a + b);

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
