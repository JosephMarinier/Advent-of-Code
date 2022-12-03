fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(``).map(Number);
    const inputsLength = inputs.length;
    const need = inputsLength * 10000;
    const offset = Number(inputs.slice(0, 7).join(``));
    const len = need - offset;

    const start = performance.now();
    let answer = Array(len).fill(0).map((_, x) => inputs[(offset + x) % inputsLength]);
    Array(100).fill(0).forEach(() => {
        console.log(`%`);
        const answer2 = [];
        let sum = 0;
        for (let y = 0; y < len; y++) {
            sum = (sum + answer[len - 1 - y]) % 10;
            answer2[len - 1 - y] = sum;
        }
        answer = answer2;
    });
    const end = performance.now();
    console.log(`${end - start} ms`);

    answer = answer.slice(0, 8).join(``);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
