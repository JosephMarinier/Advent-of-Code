fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`).map(Number);
    console.log(inputs);

    const answer = (() => {
        for (let i = 0; i < inputs.length - 1; i++) {
            for (let j = i + 1; j < inputs.length; j++) {
                if (inputs[i] + inputs[j] === 2020) {
                    return inputs[i] * inputs[j];
                }
            }
        }
    })();

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    document.querySelector(`input[type="submit"]`).click();
});
