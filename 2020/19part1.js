fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = ``;
    const [rules, messages] = text.trim().split("\n\n").map((line) => line.split("\n"));

    const rs = Object.fromEntries(rules.map((rule) => rule.replaceAll(`"`, "").split(": ")));
    let o = "0";
    let i = 0;
    while (/\d/.test(o) && i < 100) {
        i++;
        o = o.replaceAll(/\d+/g, (n) => `(${rs[n]})`);
        console.log(o);
    }
    const regexp = new RegExp(`^${o.replaceAll(" ", "")}$`);
    const answer = messages.filter((m) => regexp.test(m)).length;

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
