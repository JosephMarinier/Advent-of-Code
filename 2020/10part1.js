fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const numbers = text.trim().split("\n").map(Number);

    numbers.sort((a, b) => a - b);

    const diff = [0, 0, 0, 0];
    numbers.reduce((a, b) => {
        diff[b - a]++;
        return b;
    }, 0);
    diff[3]++;

    const answer = diff[1] * diff[3];

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
