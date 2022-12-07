fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const answer = text.trim().split(`\n\n`).map((group) => {
        const [papa, ...others] = group.split(`\n`);
        return [...papa].filter((letter) => others.every((other) => other.includes(letter))).length;
    }).reduce((a, b) => a + b);

    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
