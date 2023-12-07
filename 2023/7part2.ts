fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const count = (array) => {
        const map = new Map();
        array.forEach((key) => {
            map.set(key, (map.get(key) || 0) + 1);
        });
        return map;
    };
    const getType = (hand) => {
        const handWithoutJokers = hand.replace(/J/g, "");
        const groups = count(handWithoutJokers.split(""));
        if (groups.size <= 1) return 0;
        const values = new Set(groups.values());
        if (groups.size === 2) return Math.min(...values);
        if (groups.size === 3) return values.has(handWithoutJokers.length - 2) ? 3 : 4;
        return 1 + groups.size;
    }

    const STRENGTH_ORDER = "AKQT98765432J";
    const getStrengths = (hand) => {
        return hand.split("").map((c) => STRENGTH_ORDER.indexOf(c));
    }
    const compareStrengths = (a, b) => {
        const c = getStrengths(a);
        const d = getStrengths(b);
        return d[0] - c[0] || d[1] - c[1] || d[2] - c[2] || d[3] - c[3] || d[4] - c[4];
    }

    const cards = text.trim().split("\n").map((line) => line.split(" "));
    cards.sort(([a], [b]) => getType(b) - getType(a) || compareStrengths(a, b));
    const answer = cards.map(([, bid], i) => (i + 1) * Number(bid)).reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
