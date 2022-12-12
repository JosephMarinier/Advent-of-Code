fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const input = text.trim().split("\n").map((line) => line.split(""));
    const endY = input.findIndex((line) => line.includes("E"));
    const endX = input[endY].findIndex((c) => c === "E");
    const heights = input.map((line) => line.map((c) => c.replace("S", "a").replace("E", "z").charCodeAt(0)));

    // Part One:
    // let progress = input.map((line) => line.map((c) => c === "S"));
    // Part Two:
    let progress = input.map((line) => line.map((c) => c === "S" || c === "a"));

    let answer = 0;
    while (!progress[endY][endX]) {
        answer++;
        progress = heights.map((line, y) => line.map((height, x) =>
            (x > 0 && progress[y][x - 1] && height <= heights[y][x - 1] + 1) ||
            (y > 0 && progress[y - 1][x] && height <= heights[y - 1][x] + 1) ||
            (x < heights[y].length - 1 && progress[y][x + 1] && height <= heights[y][x + 1] + 1) ||
            (y < heights.length - 1 && progress[y + 1][x] && height <= heights[y + 1][x] + 1)
        ));
    }

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
