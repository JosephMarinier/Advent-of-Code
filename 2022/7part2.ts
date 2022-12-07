fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const assertEqual = (actual, expected) => {
        if (actual !== expected) {
            throw new Error(`Expecting "${expected}" but got "${actual}"`);
        }
    }

    const commands = text.trim().slice("$ ".length).split("\n\$ ");

    const sizes = [];

    const getSize = (expectedName) => {
        assertEqual(commands.shift(), `cd ${expectedName}`);
        const [command, ...list] = commands.shift().split("\n");
        assertEqual(command, "ls");
        const size = list.map((line) => {
            const [dir, name] = line.split(" ");
            return dir === "dir" ? getSize(name) : Number(dir);
        }).reduce((a, b) => a + b);
        sizes.push(size);
        if (commands.length > 0) {
            assertEqual(commands.shift(), "cd ..");
        }
        return size;
    }
    const toDelete = 30_000_000 - (70_000_000 - getSize("/"));

    const answer = Math.min(...sizes.filter((size) => size >= toDelete));

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
