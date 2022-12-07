fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`);
    const ids = inputs.map((input) => parseInt(input.replaceAll(/[FL]/g, "0").replaceAll(/[BR]/g, "1"), 2));

    const answer = Math.max(...ids);

    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
