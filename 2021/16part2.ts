fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const bits = text.trim().split("").map((hex) => parseInt(hex, 16).toString(2).padStart(4, "0")).join("");

    let i = 0;
    const parse = () => {
        const version = parseInt(bits.slice(i, i += 3), 2);
        const type = parseInt(bits.slice(i, i += 3), 2);
        switch (type) {
        case 4:
            let prefix = 0;
            let valueString = "";
            do {
                prefix = parseInt(bits.slice(i, i += 1), 2);
                valueString += bits.slice(i, i += 4);
            } while (prefix);
            const value = parseInt(valueString, 2);
            return value;
        default:
            const lengthType = parseInt(bits.slice(i, i += 1), 2);
            const l = 15 - lengthType * 4;
            const length = parseInt(bits.slice(i, i += l), 2);
            let subs = [];
            if (lengthType) {
                subs = Array.from(Array(length), parse)
            } else {
                const start = i;
                while (i < start + length) {
                    subs.push(parse());
                }
            }
            return subs.reduce([
                (a, b) => a + b,
                (a, b) => a * b,
                (a, b) => a < b ? a : b,
                (a, b) => a > b ? a : b,
                ,
                (a, b) => Number(a > b),
                (a, b) => Number(a < b),
                (a, b) => Number(a === b),
            ][type]);
        }
    }
    const answer = parse();

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
