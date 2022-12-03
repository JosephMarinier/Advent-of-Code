fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim()
        .split("\n")
        .map((command) => command.split(" "))
        .map(([direction, units]) => [direction, Number(units)]);
    console.log(inputs);

    const [x, y] = inputs.reduce(([x, y, aim], [direction, units]) =>
        direction === "forward"
            ? [x + units, y + units * aim, aim]
            : [x, y, aim + (direction === "down" ? units : -units)],
        [0, 0, 0]
    );
    console.log([x, y]);

    const answer = x * y;
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
