fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim()
        .split("\n")
        .map((command) => command.split("").map(Number));
    console.log(inputs);

    const sum = inputs.reduce((a, b) => a.map((x, i) => x + b[i]));
    console.log(sum);

    const gamma = sum.map((x) => x > inputs.length / 2 ? 1 : 0).join("");
    const epsilon = sum.map((x) => x < inputs.length / 2 ? 1 : 0).join("");
    console.log({ gamma, epsilon });

    const answer = parseInt(gamma, 2) * parseInt(epsilon, 2);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
