fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0`;
    const input = text.trim().split("\n").map((line) => line.match(/^(?:(?<mask>mask)|mem\[(?<mem>\d+)\]) = (?<value>\w+)$/));

    let m;
    const lol = new Map();
    input.forEach(({ groups: { mask, mem, value} }) => {
        // console.log({ mask, mem, value });
        if (mask) {
            m = value;
        } else if (mem) {
            const v = Number(mem).toString(2).padStart(36, "0");
            // const a = parseInt([].map.call(m, (b, i) => b === "X" ? v[i] : b).join(""), 2);
            // lol.set(a, Number(value));

            const all = [].reduce.call(m, (a, b, i) =>
            b === "X" ? [...a.map((a) => a + "0"), ...a.map((a) => a + "1")]
            : a.map((a) => a + (b === "1" ? "1" : v[i])), [""]);
            console.log(all.length);
            all.forEach((a) => {
                lol.set(a, Number(value));
            });

            // answer += BigInt(Math.pow(2, [].filter.call(m, (b) => b === "X").length)) * BigInt(value);
            // console.log(a, Number(value));
        } else {
            console.log("panic");
        }
    });
    console.log(lol);

    const answer = [...lol].map(([, n]) => n).reduce((a, b) => a + b);
    // 18315215215
    // 4328592799984

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    