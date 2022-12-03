fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`).map((line) => /deal into new stack|cut (?<cut>-?\d+)|deal with increment (?<increment>\d+)/.exec(line).groups); 

    const length = 10007;
    let answer = 2019;
    inputs.forEach(({cut, increment}) => {
        if (cut !== undefined) {
            cut = Number(cut);
            answer = (answer - cut + length) % length; // + length since Javascript's % n returns a number between -n and n.
        } else if (increment !== undefined) {
            increment = Number(increment);
            answer = (increment * answer) % length;
        } else {
            answer = length - 1 - answer;
        }
    });
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n`).map((line) => /deal into new stack|cut (?<cut>-?\d+)|deal with increment (?<increment>\d+)/.exec(line).groups); 

    const length = 10007;
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
    console.log(`y = ${mul}x + ${add} (mod ${length})`);

    const answer = (2019 * mul + add) % length;
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
