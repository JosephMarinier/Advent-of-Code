fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`).map((line) => /deal into new stack|cut (?<cut>-?\d+)|deal with increment (?<increment>\d+)/.exec(line).groups); 

    const length = 119315717514047;
    // console.log(Number.MAX_SAFE_INTEGER / length);
    let mul = 1;
    let add = 0;
    inputs.forEach(({cut, increment}) => {
        if (cut !== undefined) {
            cut = Number(cut);
            add = (add - cut + length) % length;
        } else if (increment !== undefined) {
            increment = Number(increment);
            mul = (mul * increment) % length;
            add = (add * increment) % length;
        } else {
            mul = (length - mul) % length;
            add = (length - add) % length;
            add = (add + length - 1) % length;
        }
    });

    const n = 101741582076661;
    // console.log(Number.MAX_SAFE_INTEGER / n);
    console.log(`2020 = (x(${mul} ^ ${n}) + ${add} * (((${mul} ^ ${n} - 1) / (${mul} - 1)))) mod ${length}`);
    const bit = `${add} / ${mul - 1}`
    console.log(`2020 = (${mul} ^ ${n}(x + ${bit}) - ${bit}) mod ${length}`);

    // 2020 + length - add;

    // const answer = (2019 * mul + add) % length;
    // console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
});
