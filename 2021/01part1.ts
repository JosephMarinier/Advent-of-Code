fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split("\n").map(Number);
    console.log(inputs);

    const answer = inputs.slice(1).filter((input, i) => input > inputs[i]).length;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
