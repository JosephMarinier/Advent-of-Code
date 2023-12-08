fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [instructions, network] = text.trim().split("\n\n");
    const nodes = new Map(network.split("\n").map((line) => {
        const [from, to] = line.split(" = ");
        const [L, R] = to.slice(1, -1).split(", ");
        return [from, {L, R}];
    }));

    const answer = [...nodes.keys()].filter((from) => from.endsWith("A")).map((current) => {
        let count = 0;
        do {
            instructions.split("").forEach(instruction => {
                current = nodes.get(current)?.[instruction];
            });
            count++;
        } while (!current.endsWith("Z"));

        // <verification>
        const target = current;
        for (let i = 0; i < count; i++) {
            instructions.split("").forEach(instruction => {
                current = nodes.get(current)?.[instruction];
            });
        }
        if (current !== target) return 0;
        // </verification>

        return count;
    }).reduce((a, b) => a * b) * instructions.length;

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
