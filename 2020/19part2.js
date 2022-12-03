fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = ``;
    const [rules, messages] = text.trim().split("\n\n").map((line) => line.split("\n"));

    const rs = Object.fromEntries(rules.map((rule) => rule.replaceAll(`"`, "").split(": ")));
    rs["8"] = `(?:42)+`;
    rs["11"] = `42 (?:42 (?:42 (?:42 31)? 31)? 31)? 31`;
    let o = "0";
    let i = 0;
    while (/\d/.test(o) && i < 100) {
        i++;
        o = o.replaceAll(/\d+/g, (n) => `(?:${rs[n]})`);
    }
    const regexp = new RegExp(`^${o.replaceAll(" ", "")}$`);
    const answer = time(() => messages.filter((m) => regexp.test(m)).length);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});

time = (task) => {
    const start = performance.now();
    const r = task();
    const end = performance.now();
    let elapsed = end - start;
    const units = [`ms`, `s`, `m`, `h`, `j`];
    const index = ([1000, 60, 60, 24].findIndex((max) => {
        if (elapsed < max) {
            return true;
        } else {
            elapsed /= max;
        }
    }) + units.length) % units.length;
    console.log(`${elapsed} ${units[index]}`);
    return r;
}
