fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `Player 1:
// 9
// 2
// 6
// 3
// 1

// Player 2:
// 5
// 8
// 4
// 7
// 10`;
// text = `Player 1:
// 43
// 19

// Player 2:
// 2
// 29
// 14`;
    const input = text.trim().split("\n\n").map((line) => line.split("\n").slice(1).map(Number));
    const map = new Map();

    let game = 1;

    const play = (input) => {
        const innn = input[0].join(",") + "|" + input[1].join(",");
        if (map.has(innn)) {
            // console.log(innn)
            return map.get(innn);
        }
        const set = new Set();
        for (let i = 1; i < 10000; i++) {
            const ser = input[0].join(",") + "|" + input[1].join(",");
            if (set.has(ser)) {
                // console.log("Dead end");
                return false;
            }
            set.add(ser);
            const c = input.map((cards) => cards.shift());
            let oneWins;
            if (input[0].length >= c[0] && input[1].length >= c[1]) {
                oneWins = play(input.map((i, p) => i.slice(0, c[p])));
            } else {
                oneWins = c[1] > c[0];
            }
            if (oneWins) {
                input[1].push(...c.reverse());
            } else {
                input[0].push(...c);
            }
            if (input.some((cards)=>cards.length=== 0)){
                // console.log("fini");
                const r = input[0].length === 0;
                game++;
                map.set(innn, r);
                return r;
            }
        }
        console.log("SHSHHHIIIIIT");
    }

    play(input);

    console.log(input);
    const c = [...input[0], ...input[1]];
    c.reverse();
    const answer = c.map((c,  i) => c  * (i + 1)).reduce((a,b) => a +b);

    console.log(answer); // 40280, 32640
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
