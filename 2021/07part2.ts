fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = "16,1,2,0,4,2,7,1,2,14";
    const inputs = text.trim().split(",").map(Number);
    console.log(inputs);

    // Why round with the example and ceil and floor with the real input?
    const avg = Math.floor(inputs.reduce((a, b) => a + b) / inputs.length);

    const answer = inputs.map((input) => (n = Math.abs(input - avg), n * (n + 1) / 2)).reduce((a, b) => a + b);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
