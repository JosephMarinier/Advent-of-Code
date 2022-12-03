fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let input = text.trim().split("\n").map((line) => line.split(""));
    const height = input.length;
    const width = input[0].length;
    console.log({ input, width, height });

    let answer = 0;
    let inputString;
    let nextString;
    do {
        const b = Array.from(Array(height), () => Array(width).fill("."));
        input.forEach((line, y) => {
            line.forEach((c, x) => {
                if (c === ">") {
                    const x2 = (x + 1) % width;
                    b[y][input[y][x2] === "." ? x2 : x] = ">";
                } else if (c === "v") {
                    b[y][x] = "v";
                }
            });
        });
        const next = Array.from(Array(height), () => Array(width).fill("."));
        b.forEach((line, y) => {
            line.forEach((c, x) => {
                if (c === "v") {
                    const y2 = (y + 1) % height;
                    next[b[y2][x] === "." ? y2 : y][x] = "v";
                } else if (c === ">") {
                    next[y][x] = ">";
                }
            });
        });
        inputString = input.map((line) => line.join("")).join("\n");
        nextString = next.map((line) => line.join("")).join("\n");
        input = next;
        answer++;
        // console.log(inputString);
    } while (answer < 10000 && inputString !== nextString);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
