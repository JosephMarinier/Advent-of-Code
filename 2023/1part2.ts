fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const re = ["\\d", ...numbers].map((word) => `(${word})`).join("|");
    const re_reverse = ["\\d", ...numbers.map((word) => word.split("").reverse().join(""))].map((word) => `(${word})`).join("|");

    const answer = text.trim().split("\n").map((line) => Number([[line, re], [line.split("").reverse().join(""), re_reverse]].map(([l, r]) => {
        const match = l.match(r);
        if (!match) return NaN;
        const [_, digit, ...words] = match;
        return String(digit ?? `${words.findIndex(Boolean) + 1}`);
    }).join(""))).reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
