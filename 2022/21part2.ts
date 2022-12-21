fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = new Map(text.trim().split("\n").map((line) => line.split(": ")));

    const INVERSE = { "+": "-", "-": "+", "*": "/", "/": "*" };

    const resolve = (monkey, result) => {
        if (monkey === "humn") {
            return result;
        }
        const value = input.get(monkey);
        if (!isNaN(value)) {
            return Number(value);
        }
        const [a, op, b] = value.split(" ");
        const aResolved = resolve(a, null);
        const bResolved = resolve(b, null);
        if (monkey === "root") {
            return aResolved === null ? resolve(a, bResolved) : resolve(b, aResolved);
        }
        if (aResolved !== null && bResolved !== null) {
            return eval(`${aResolved} ${op} ${bResolved}`);
        }
        if (result === null) {
            return null;
        }
        if (aResolved === null) {
            return resolve(a, eval(`${result} ${INVERSE[op]} ${bResolved}`));
        }
        return resolve(b, eval(
            op === "+" || op === "*" ? `${result} ${INVERSE[op]} ${aResolved}` : `${aResolved} ${op} ${result}`
        ));
    }

    const answer = resolve("root", null);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
