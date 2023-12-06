fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const cards = text.trim().split("\n");
    const numberOfCards = cards.map(() => 1);
    cards.forEach((line, y) => {
        const match = line.match(/^Card +\d+: +([\d ]+) \| ([\d ]+)$/);
        if (match === null) throw new Error(`No match: ${line}`);
        const [winning, have] = match.slice(1).map((cards) => cards.split(/ +/).map(Number));
        const winningSet = new Set(winning);
        const intersection = have.reduce((intersection, c) => intersection + Number(winningSet.has(c)), 0);
        for (let i = 0; i < intersection; i++) {
            numberOfCards[y + 1 + i] += numberOfCards[y];
        }
    });
    const answer = numberOfCards.reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
