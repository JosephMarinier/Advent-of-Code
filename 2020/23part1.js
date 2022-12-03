fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = `389125467`;
    const input = text.trim().split("").map(Number);
    const max = Math.max(...input);

    let c = 0;
    for (let i = 0; i < 100; i++) {
        const current = input[c];
        // console.log({input: input.map((a, i) => i === c ? `(${a})` : a).join("  ")});
        const pick = input.splice(c + 1, 3);
        if (pick.length < 3) {
            pick.push(...input.splice(0, 3 - pick.length));
        }
        // console.log({pick: pick.join("  ")});
        let destination = current - 1;
        if (destination === 0){
            destination = max;
        }
        while (pick.includes(destination)) {
            console.log("not", destination)
            destination--;
            if (destination === 0){
                destination = max;
            }
        }
        // console.log({destination})
        const d = input.indexOf(destination);
        // console.log({d});
        input.splice(d + 1, 0, ...pick);
        c = (input.indexOf(current) + 1) % max;
    }

    while (input[0] !== 1) {
        input.push(input.shift());
    }
    input.shift();

    const answer = input.join("");

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
