fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = ``;
    const [fields, ticket, nearby] = text.trim().split("\n\n");

    const [, mine] = ticket.split("\n").map((line) => line.split(",").map(Number));

    const fieldRanges = new Map(fields.split("\n").map((line) => line.split(": ")).map(([field, ranges]) => [field, ranges.split(" or ").map((or) => or.split("-").map(Number))]));
    console.log(fieldRanges);

    const possible = new Map([...fieldRanges].map(([field]) => [field, Array(fieldRanges.size).fill().map(() => true)]));
    console.log(possible);

    const valids = nearby.split("\n").slice(1).map((line) => line.split(",").map(Number)).filter(
        (numbers) => numbers.every((n) => [...fieldRanges.values()].some((ranges) => ranges.some(([min, max]) => min <= n && n <= max)))
    );
    // console.log(valids);

    valids.forEach((numbers) => {
        numbers.forEach((n, i) => {
            [...fieldRanges].forEach(([field, ranges]) => {
                if (!ranges.some(([min, max]) => min <= n && n <= max)) {
                    possible.get(field)[i] = false;
                }
            });
        });
    });
    console.log([...possible.values()].map((pp) => pp.map((p) => p ? "X" : " ").join("")).join("\n"));

    let toClean = [...possible.values()];
    possible.forEach(() => {
        const unique = toClean.find((poss) => poss.filter((p) => p).length === 1);
        const i = unique.indexOf(true);
        console.log({unique, i});
        toClean = toClean.filter((t) => t !== unique);
        toClean.forEach((poss) => {
            poss[i] = false;
        });
        console.log([...possible.values()].map((pp) => pp.map((p) => p ? "X" : " ").join("")).join("\n"), toClean.length);
    });

    const answer = [...possible.values()].slice(0, 6).map((poss) => poss.indexOf(true)).map((i) => mine[i]).reduce((a, b) => a * b);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
