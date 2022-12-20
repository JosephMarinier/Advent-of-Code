fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n").map(Number);

    const order = [...input.keys()];

    input.forEach((move, i) => {
        const before = order.indexOf(i);
        const after = (before + move) % (input.length - 1);
        // Optionally rearrange position 0 to match the example:
        // if (after === 0) {
        //     after = input.length - 1;
        // }
        order.splice(after, 0, ...order.splice(before, 1));
    });

    const indexOf0 = order.indexOf(input.indexOf(0));
    const answer = [1000, 2000, 3000].map((pos) => input[order[(indexOf0 + pos) % input.length]]).reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
