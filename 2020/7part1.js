fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const canBeIn = {};
    text.trim().split("\n").forEach((line) => {
        const [, color, insides] = /^(\w+ \w+) bags contain (.+)\.$/.exec(line);
        if (insides !== "no other bags") {
            insides.split(", ").map((inside) => {
                const [, , insideColor] = /^(\d+) (\w+ \w+) bags?$/.exec(inside);
                if (canBeIn[insideColor] === undefined) {
                    canBeIn[insideColor] = new Set();
                }
                canBeIn[insideColor].add(color);
            })
        }
    });

    const canBeInRecursive = (insideColor) => {
        return canBeIn[insideColor] ? [...canBeIn[insideColor]].reduce(
            (r, outsideColor) => [...r,  ...canBeInRecursive(outsideColor)],
            canBeIn[insideColor],
        ) : [];
    };

    const answer = new Set(canBeInRecursive("shiny gold")).size;

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
