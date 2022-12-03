fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = ``;
    const [fields, ticket, nearby] = text.trim().split("\n\n");

    const ranges = fields.split("\n").map((line) => line.split(": ")[1].split(" or ").map((or) => or.split("-").map(Number))).reduce((a, b) => [...a, ...b]);
    console.log(ranges);

    const numbers = nearby.split("\n").slice(1).map((line) => line.split(",").map(Number)).reduce((a, b) => [...a, ...b]);
    console.log(numbers);
    const answer = numbers.filter(
        (n) => ranges.every(([min, max]) => n < min || max < n)
    ).reduce((a, b) => a + b);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
