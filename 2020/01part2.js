fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`).map(Number);
    console.log(inputs);

    const answer = (() => {
        for (let i = 0; i < inputs.length - 2; i++) {
            for (let j = i + 1; j < inputs.length - 1; j++) {
                for (let k = j + 1; k < inputs.length; k++) {
                    if (inputs[i] + inputs[j] + inputs[k] === 2020) {
                        return inputs[i] * inputs[j] * inputs[k];
                    }
                }
            }
        }
    })();

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
