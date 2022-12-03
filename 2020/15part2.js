fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = `0,3,6`;
    const input = text.trim().split(",").map(Number);

    const start = input.length - 1;
    const stop = 30000000 - 1;
    let answer = input.pop();
    const map = new Map(input.map((v, i) => [v, i]));

    for (let i = start; i < stop; i++) {
        const v = answer;
        if (map.has(answer)) {
            answer = i - map.get(answer);
        } else {
            answer = 0;
        }
        map.set(v, i);
    }

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
