fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`);
    const height = inputs.length;
    const width = inputs[0].length;

    let answer = 0;
    for (let y = 0; y < height; y++) {
        if (inputs[y][3 * y % width] === "#") {
            answer++;
        }
    }

    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
