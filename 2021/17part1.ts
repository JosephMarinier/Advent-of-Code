fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [xRange, yRange] = text.trim().slice("target area: x=".length).split(", y=").map((range) => range.split("..").map(Number));

    const answer = yRange[0] * (yRange[0] + 1) / 2;
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
