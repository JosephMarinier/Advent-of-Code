fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const pawns = text.trim().split("\n").map((line) => Number(line.slice("Player 1 starting position: ".length)));
    // const pawns = [4, 8];
    const scores = [0, 0];

    const ser = (pawns, scores) => [pawns, scores].join("@");
    const deSer = (s) => s.split("@").map((half) => half.split(",").map(Number));

    const lol = [, , , 1, 3, 6, 7, 6, 3, 1];

    const wins = [0, 0];
    const odds = new Map([[ser(pawns, scores), 1]]);
    console.log(odds);
    let i = 0;
    let player;
    const max = 100000;
    do {
        const list = [...odds];
        odds.clear();
        list.forEach(([o, before]) => {
            player = i % 2;
            lol.forEach((odd, dice) => {
                const [pawns, scores] = deSer(o);
                const end = ((pawns[player] - 1 + dice) % 10) + 1;
                pawns[player] = end;
                scores[player] += end;

                if (scores[player] >= 21) {
                    wins[player] += before * odd
                } else {
                    const n = ser(pawns, scores);
                    odds.set(n, (odds.get(n) || 0) + before * odd);
                }
            });
        });

        // console.log(odds);
        i++;
    } while (i < max && odds.size);
    if (i === max) {
        console.error("More!");
    } else {
        console.log({ i });
    }
    console.log(wins);

    const answer = Math.max(...wins);
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
