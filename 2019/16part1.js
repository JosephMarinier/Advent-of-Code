fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(``).map(Number);
    const pattern = [0, 1, 0, -1];

    let answer = [...inputs];
    Array(100).fill(0).forEach(() => {
        answer = answer.map(
            (_, y) => {
                const t = answer.map((digit, x) => {
                    const i = Math.floor((x + 1) / (y + 1)) % 4;
                    return digit * pattern[i];
                });
                const lol = String(t.reduce((a, b) => a + b));
                const bol = lol[lol.length - 1];
                return bol;
            }
        );
    });

    answer = answer.slice(0, 8).join(``);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(``).map(Number);
    const pattern = [0, 1, 0, -1];

    let answer = [...inputs];
    Array(100).fill(0).forEach(() => {
        answer = answer.map((_, y) => Math.abs(answer.reduce((sum, digit, x) => {
            const i = Math.floor((x + 1) / (y + 1)) % 4;
            return sum + digit * pattern[i];
        }, 0) % 10));
    });

    answer = answer.slice(0, 8).join(``);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
