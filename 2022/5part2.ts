fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.split("\n\n");
    const crates = input[0].split("\n");
    const numbers = crates.pop();
    crates.reverse();
    const stacks = Array.from(numbers.matchAll(/\d/g), ({ index }) => crates.map((line) => line[index]).filter((crate) => crate !== " "));
    for (let move of input[1].matchAll(/move (\d+) from (\d+) to (\d+)/g)) {
        const [count, from, to] = move.slice(1).map(Number);
        stacks[to - 1].push(...stacks[from - 1].splice(-count, count));
    };

    const answer = stacks.map((stack) => stack.slice(-1)[0]).join("");

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
