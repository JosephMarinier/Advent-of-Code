fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [times, distances] = text.trim().split("\n").map((line) => line.split(/ +/g).slice(1).map(Number));
    const answer = times.map((time, i) => {
        const distance = distances[i];
        let better = 0;
        for (let hold = 0; hold <= time; hold++) {
            if ((time - hold) * hold > distance) {
                better++;
            }
        }
        return better
    }).reduce((a, b) => a * b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
