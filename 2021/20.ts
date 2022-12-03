fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [algo, input] = text.trim().split("\n\n");

    let patch = ".";
    
    const enhance = (input) => {
        const lines = input.split("\n").map((line) => `${patch}${patch}${line}${patch}${patch}`);
        lines.unshift(Array(lines[0].length).fill(patch).join(""), Array(lines[0].length).fill(patch).join(""));
        lines.push(Array(lines[0].length).fill(patch).join(""), Array(lines[0].length).fill(patch).join(""));
        patch = patch === "#" ? "." : "#";
        console.log(lines.join("\n"));

        return Array.from(Array(lines.length - 2), (_, y) =>
            Array.from(Array(lines[0].length - 2), (_, x) =>
                algo[parseInt(Array.from(Array(3), (_, dy) => lines[y + dy].slice(x, x + 3)).join("").replace(/\./g, "0").replace(/#/g, "1"), 2)]
            ).join("")
        ).join("\n");
    }

    const output = Array(50).fill(0).reduce(enhance, input);
    console.log(output);

    const answer = output.replace(/[^#]/g, "").length;
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
