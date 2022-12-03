fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split("\n").map((line) => line.split("-"));
    console.log(inputs);

    const lol = (start, lines) => {
        if (start === "end") {
            return 1;
        }
        const nexts = lines.filter((ends) => ends.includes(start));
        let rest;
        if (start === start.toLowerCase()) {
            rest = lines.filter((ends) => !ends.includes(start));
        } else {
            rest = [...lines];
        }
        return nexts.map((ends) => {
            const end = ends.find((end) => end !== start);
            return lol(end, rest);
        }).reduce((a, b) => a + b, 0);
    }

    let answer = lol("start", inputs);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
