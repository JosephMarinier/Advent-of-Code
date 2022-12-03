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

    const get = (x, y) => {
        let n = 0;
        for (let x2 = x - 1; x2 >= 0 && input[y][x2] !== "L"; x2--) {
            if (input[y][x2] === "#") {
                n++;
                break;
            }
        }
        for (let y2 = y - 1; y2 >= 0 && input[y2][x] !== "L"; y2--) {
            if (input[y2][x] === "#") {
                n++;
                break;
            }
        }
        for (let x2 = x + 1; x2 < input[0].length && input[y][x2] !== "L"; x2++) {
            if (input[y][x2] === "#") {
                n++;
                break;
            }
        }
        for (let y2 = y + 1; y2 < input.length && input[y2][x] !== "L"; y2++) {
            if (input[y2][x] === "#") {
                n++;
                break;
            }
        }

        for (let d = 1; x - d >= 0 && y - d >= 0 && input[y - d][x - d] !== "L"; d++) {
            if (input[y - d][x - d] === "#") {
                n++;
                break;
            }
        }
        for (let d = 1; x - d >= 0 && y + d < input.length && input[y + d][x - d] !== "L"; d++) {
            if (input[y + d][x - d] === "#") {
                n++;
                break;
            }
        }
        for (let d = 1; x + d < input[0].length && y - d >= 0 && input[y - d][x + d] !== "L"; d++) {
            if (input[y - d][x + d] === "#") {
                n++;
                break;
            }
        }
        for (let d = 1; x + d < input[0].length && y + d < input.length && input[y + d][x + d] !== "L"; d++) {
            if (input[y + d][x + d] === "#") {
                n++;
                break;
            }
        }

        return n;
    };

    let i = 0;
    let answer;
    let change = true;
    while (change && i < 100) {
        i++;
        answer = 0;
        change = false;
        input = input.map((line, y) => [].map.call(line, (c, x) => {
            if (c === "L" && get(x, y) === 0) {
                change = true;
                answer++;
                return "#";
            } else if (c === "#" && get(x, y) >= 5) {
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
