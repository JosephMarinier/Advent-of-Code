fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const a = "a".charCodeAt(0);
    const A = "A".charCodeAt(0);

    const priorities = text.trim().split("\n").map((line) => {
        const stack = line.split("");
        const compartmentA = new Set(stack.slice(0, stack.length / 2));
        const compartmentB = new Set(stack.slice(stack.length / 2));
        const [intersection] = [...compartmentA].filter((item) => compartmentB.has(item));
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
