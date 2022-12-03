fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const pawns = text.trim().split("\n").map((line) => Number(line.slice("Player 1 starting position: ".length)));
    // const pawns = [4, 8];

    const score = [0, 0];

    let i = 0;
    let player;
    do {
        player = i % 2;
        const dice = (2 + (i * 3)) * 3;
        const end = ((pawns[player] - 1 + dice) % 10) + 1;
        pawns[player] = end;
        score[player] += end;
        console.log({dice, player, end, score: score[player]});
        i++;
    } while (i < 10000 && score.every((s) => s < 1000));

    i*=3;

    const loser = score[(player + 1) % 2];
    console.log({i, loser});
    const answer = i * loser;
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
