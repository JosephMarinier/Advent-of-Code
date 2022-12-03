fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let and, or;
    const map = new Map();
    text.trim().split("\n").forEach((line) => {
        const { groups: { mask, mem, value} } = line.match(/^(?:(?<mask>mask)|mem\[(?<mem>\d+)\]) = (?<value>\w+)$/);
        if (mask) {
            and = BigInt(`0b${value.replaceAll("X", "1")}`);
            or = BigInt(`0b${value.replaceAll("X", "0")}`);
        } else {
            map.set(mem, BigInt(value) & and | or);
        }
    });

    const answer = [...map.values()].reduce((a, b) => a + b);;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    
