fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n");

    const resolveInside = (ex) => eval(ex.split(" * ").map(eval).join(" * "));

    const resolve =  (ex) => {
        while (ex.includes("(")) {
            ex = ex.replaceAll(/\([^()]+\)/g, (m) => resolveInside(m.slice(1, -1)));
        }
        return resolveInside(ex);
    }

    const answer = input.map(resolve).reduce((a, b) => a + b);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
