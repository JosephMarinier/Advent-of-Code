fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const mustContain = Object.fromEntries(text.trim().split("\n").map((line) => {
        const [, color, insides] = /^(\w+ \w+) bags contain (.+)\.$/.exec(line);
        return [color, insides === "no other bags" ? [] : insides.split(", ").reduce((r, inside) => {
            const [, count, insideColor] = /^(\d+) (\w+ \w+) bags?$/.exec(inside);
            return [...r, ...Array(Number(count)).fill(insideColor)];
        }, [])];
    }));

    const mustContainRecursive = (color) => mustContain[color].reduce((r, c) => [...r, c, ...mustContainRecursive(c)], []);

    const answer = mustContainRecursive("shiny gold").length;

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
