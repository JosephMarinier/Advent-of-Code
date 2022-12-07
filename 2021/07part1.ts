fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = "16,1,2,0,4,2,7,1,2,14";
    const inputs = text.trim().split(",").map(Number);
    console.log(inputs);

    const median = inputs.sort((a, b) => a - b)[inputs.length / 2];

    const answer = inputs.map((input) => Math.abs(input - median)).reduce((a, b) => a + b);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
