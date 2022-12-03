fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    let input = text.trim().split("\n").map((line) => line.split(""));
//     let input = `L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL`.trim().split("\n").map((line) => line.split(""));

    const get = (x, y) => [
        ...(input[y - 1] ? [
            ...(input[y - 1][x - 1] ? [input[y - 1][x - 1]] : []),
            input[y - 1][x],
            ...(input[y - 1][x + 1] ? [input[y - 1][x + 1]] : []),
        ] : []),
        ...(input[y][x - 1] ? [input[y][x - 1]] : []),
        ...(input[y][x + 1] ? [input[y][x + 1]] : []),
        ...(input[y + 1] ? [
            ...(input[y + 1][x - 1] ? [input[y + 1][x - 1]] : []),
            input[y + 1][x],
            ...(input[y + 1][x + 1] ? [input[y + 1][x + 1]] : []),
        ] : []),
    ];

    let i = 0;
    let answer;
    let change = true;
    while (change && i < 100) {
        i++;
        answer = 0;
        change = false;
        input = input.map((line, y) => [].map.call(line, (c, x) => {
            if (c === "L" && get(x, y).every((c) => c !== "#")) {
                change = true;
                answer++;
                return "#";
            } else if (c === "#" && get(x, y).filter((c) => c === "#").length >= 4) {
                change = true;
                return "L";
            } else {
                if (c === "#") {
                    answer++;
                }
                return c;
            }
        }));
    }
    console.log(i);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
