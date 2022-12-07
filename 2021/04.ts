fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [drawsString, ...boardsString] = text.trim().split("\n\n");
    const draws = drawsString.split(",").map(Number);
    const boards = boardsString.map((board) => board.split("\n").map((row) => row.trim().split(/ +/).map(Number)));
    console.log({ draws, boards });

    const lol = boards.map((board) => {
        const unmarked = board.flat();
        const turns = draws.findIndex((draw) => {
            const index = unmarked.indexOf(draw);
            if (index != -1) {
                unmarked.splice(index, 1);
            }
            return board.some((row) => row.every((number) => !unmarked.includes(number)))
            || board[0].some((_, x) => board.every((row) => !unmarked.includes(row[x])));
        });
        console.log({ board, unmarked, draws, turns, answer: unmarked.reduce((a, b) => a + b) * draws[turns] })
        return { turns, answer: unmarked.reduce((a, b) => a + b) * draws[turns] };
    }).sort((a, b) => b.turns - a.turns);
    console.log(lol);

    const { answer } = lol[0];
    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
