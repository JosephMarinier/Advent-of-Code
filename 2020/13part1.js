fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = ``;
    const [timestamp, busses] = text.trim().split("\n");
    const t = Number(timestamp);
    const b = busses.split(",").filter((b) => b !== "x").map(Number);

    const x = b.map((b) => Math.ceil(t / b) * b);
    console.log({t, b, x});
    const min = Math.min(...x)
    const answer = (min - t) * b[x.indexOf(min)];

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
