fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [time, distance] = text.trim().replace(/ +/g, "").split("\n").map((line) => Number(line.split(":")[1]));
    let answer = 0;
    for (let hold = 0; hold <= time; hold++) {
        if ((time - hold) * hold > distance) {
            answer++;
        }
    }

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
