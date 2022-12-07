fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const answer = text.trim().split(`\n\n`).map((group) => new Set(group.replaceAll(/\W/g, "")).size).reduce((a, b) => a + b);

    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
