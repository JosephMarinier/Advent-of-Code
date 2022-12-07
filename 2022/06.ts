fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // Part One:
    // const markerLength = 4;
    // Part Two:
    const markerLength = 14;

    const input = text.trim().split("");

    let answer = 0;
    while (answer <= input.length && new Set(input.slice(answer - markerLength, answer)).size !== markerLength) {
        answer++;
    }

    console.log(answer);
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
