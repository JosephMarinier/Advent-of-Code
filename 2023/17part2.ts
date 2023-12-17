fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // from cheatsheet.ts import search()

    const map = text.trim().split("\n").map((step) => step.split("").map(Number));
 
    const answer = search(
        "0,0,0,0,0",
        (node) => {
            const [x, y, , , times] = node.split(",").map(Number);
            return x === map[0].length - 1 && y === map.length - 1 && times >= 4;
        },
        (node) => {
            const [x, y] = node.split(",").map(Number);
            return Math.abs(map[0].length - 1 - x) + Math.abs(map.length - 1 - y);
        },
        (node) => {
            if (node === "0,0,0,0,0") {
                return [
                    ["1,0,1,0,1", map[0][1]],
                    ["0,1,0,1,1", map[1][0]],
                ]
            }
            const neighbors = [];
            const [x, y, dx, dy, times] = node.split(",").map(Number);
            if (times < 10) {
                // Go straight
                const heatLossStraight = map[y + dy]?.[x + dx];
                if (heatLossStraight) {
                    neighbors.push([`${x + dx},${y + dy},${dx},${dy},${times + 1}`, heatLossStraight]);
                }
            }
            if (times >= 4) {
                // Turn left
                const left = [-dy, dx];
                const heatLossLeft = map[y + left[1]]?.[x + left[0]];
                if (heatLossLeft) {
                    neighbors.push([`${x + left[0]},${y + left[1]},${left[0]},${left[1]},1`, heatLossLeft]);
                }
                // Turn right
                const right = [dy, -dx];
                const heatLossRight = map[y + right[1]]?.[x + right[0]];
                if (heatLossRight) {
                    neighbors.push([`${x + right[0]},${y + right[1]},${right[0]},${right[1]},1`, heatLossRight]);
                }
            }
            return neighbors;
        },
    );

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
