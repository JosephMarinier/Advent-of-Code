fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = `389125467`;
    let input = text.trim().split("").map(Number);
    let max = Math.max(...input);
    input = input.concat(Array(1_000_000 - max).fill().map((_, i) => i + 1 + max));
    max = 1_000_000;
    const next = new Map(input.map((label, i) => [label, input[(i + 1) % input.length]]));
    // console.log(next);
    // return;

    let current = input[0];
    for (let i = 0; i < 10_000_000; i++) {
        if (i % 100000 === 99999) {
            console.log("%");
        }
        // console.log({input: input.map((a, i) => i === c ? `(${a})` : a).join("  ")});
        const a = next.get(current);
        const b = next.get(a);
        const c = next.get(b);
        const pick = [a, c, b];
        next.set(current, next.get(c));
        // console.log({pick: pick.join("  ")});
        let destination = current - 1;
        if (destination === 0){
            destination = max;
        }
        while (pick.includes(destination)) {
            // console.log("not", destination)
            destination--;
            if (destination === 0){
                destination = max;
            }
        }
        next.set(c, next.get(destination));
        next.set(destination, a);

        current = next.get(current);
    }

    // console.log(next)

    const a = next.get(1);
    const answer = next.get(a) * a;
    console.log(a, next.get(a));

    // const answer = Array(input.length - 1).fill().reduce(([p, t]) => [`${p}${t}`, next.get(t)], ["", next.get(1)])[0];
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
