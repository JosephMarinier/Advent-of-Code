fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const assertEqual = (actual, expected) => {
        if (actual !== expected) {
            throw new Error(`Expecting "${expected}" but got "${actual}"`);
        }
    }

    const commands = text.trim().slice("$ ".length).split("\n\$ ");

    let answer = 0;

    const getSize = (expectedName) => {
        assertEqual(commands.shift(), `cd ${expectedName}`);
        const [command, ...list] = commands.shift().split("\n");
        assertEqual(command, "ls");
        const size = list.map((line) => {
            const [dir, name] = line.split(" ");
            return dir === "dir" ? getSize(name) : Number(dir);
        }).reduce((a, b) => a + b);
        if (size <= 100_000) {
            answer += size;
        }
        if (commands.length > 0) {
            assertEqual(commands.shift(), "cd ..");
        }
        return size;
    }
    getSize("/");

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
