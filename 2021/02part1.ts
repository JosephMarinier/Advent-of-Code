fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim()
        .split("\n")
        .map((command) => command.split(" "))
        .map(([direction, units]) => [direction, Number(units)]);
    console.log(inputs);

    const [x, y] = inputs.map(([direction, units]) => ({
            forward: [units, 0],
            down: [0, units],
            up: [0, -units],
        }[direction]))
        .reduce(([x, y], [dx, dy]) => [x + dx, y + dy]);
    console.log([x, y]);

    const answer = x * y;
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
