fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim()
        .split("\n")
        .map((command) => command.split("").map(Number));
    console.log(inputs);

    const lol = (inputs, pos = 0) => {
        if (inputs.length === 1) {
            return [inputs, inputs];
        }
        const parts = Array.from(Array(2), (_, i) => inputs.filter((x) => x[pos] === i)).sort((a, b) => a.length - b.length);
        console.log(...parts);
        return parts;
    }

    let co2 = [...inputs], oxygen = [...inputs];
    inputs[0].forEach((_, pos) => {
        co2 = lol(co2, pos)[0];
        oxygen = lol(oxygen, pos)[1];
    });
    co2 = co2[0].join("");
    oxygen = oxygen[0].join("");
    console.log({ co2, oxygen });

    const answer = parseInt(co2, 2) * parseInt(oxygen, 2);
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
