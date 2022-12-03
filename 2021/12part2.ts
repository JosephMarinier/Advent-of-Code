fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split("\n").map((line) => line.split("-"));
    console.log(inputs);

    const lol = (start, possibleMoves, twice) => {
        if (start === "end") {
            return [start];
        }
        return possibleMoves.filter((ends) => ends.includes(start)).flatMap((ends) => {
            const next = ends.find((end) => end !== start);
            let r;
            if (start === start.toLowerCase()) {
                r = lol(next, possibleMoves.filter((ends) => !ends.includes(start)), twice);
                if (start !== "start" && twice) {
                    r = [...new Set([...r, ...lol(next, possibleMoves, false)])]
                }
            } else {
                r = lol(next, possibleMoves, twice);
            }
            return r.map((path) => start + "," + path);
        });
    }

    const answer = lol("start", inputs, true).length;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
