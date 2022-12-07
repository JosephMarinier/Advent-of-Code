fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = "16,1,2,0,4,2,7,1,2,14";
    const inputs = text.trim().split("\n").map((line) => line.split(" | ").map((parts) => parts.split(" ")));
    console.log(inputs);

    const answer = inputs.map((input) => input[1].filter((output) => [2, 3, 4, 7].includes(output.length)).length).reduce((a, b) => a + b);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
