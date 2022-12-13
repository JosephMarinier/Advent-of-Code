fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const compare = (left, right) => {
        const leftIsArray = Array.isArray(left);
        const rightIsArray = Array.isArray(right);
        if (!leftIsArray && !rightIsArray) {
            return left - right;
        } else if (leftIsArray && rightIsArray) {
            const minLength = Math.min(left.length, right.length);
            for (let i = 0; i < minLength; i++) {
                const c = compare(left[i], right[i]);
                if (c !== 0) {
                    return c;
                }
            }
            return compare(left.length, right.length);
        } else if (!leftIsArray) {
            return compare([left], right);
        } else { // !rightIsArray
            return compare(left, [right]);
        }
    };

    // Part One:
    // const answer = text.trim().split("\n\n").reduce((sum, pair, i) => sum + (compare(...pair.split("\n").map(eval)) <= 0 ? i + 1 : 0), 0);
    // Part Two:
    const dividers = [[[2]], [[6]]];
    const sortedPackets = [...text.trim().split(/\n+/g).map(eval), ...dividers].sort(compare);
    const [a, b] = dividers.map((divider) => sortedPackets.indexOf(divider) + 1);
    const answer = a * b;

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
