fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const monkeys = Array.from(text.matchAll(/Monkey \d+:\n  Starting items: (?<items>.+)\n  Operation: new = (?<operation>old.+)\n  Test: divisible by (?<divisor>\d+)\n    If true: throw to monkey (?<trueMonkey>\d+)\n    If false: throw to monkey (?<falseMonkey>\d+)/g));

    const items = monkeys.map(({ groups: { items } }) => items.split(", ").map(Number));
    const lcd = monkeys.map(({ groups: { divisor } }) => divisor).map(Number).reduce((a, b) => a * b);
    const inspections = monkeys.map(() => 0);
    Array.from(Array(10_000), () => {
        monkeys.forEach(({ groups: { operation, divisor, trueMonkey, falseMonkey } }, monkey) => {
            items[monkey].splice(0).forEach((old) => {
                inspections[monkey]++;
                const worry = eval(operation) % lcd;
                items[Number(worry % Number(divisor) === 0 ? trueMonkey : falseMonkey)].push(worry);
            });
        })
    })

    const [a, b] = inspections.sort((a, b) => b - a);
    const answer = a * b;

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
    