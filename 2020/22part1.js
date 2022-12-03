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
    const input = text.trim().split("\n\n").map((line) => line.split("\n").slice(1).map(Number));
    console.log({a: input[0].join(), b:input[1].join()});

    for (let i = 0; i < 1000; i++) {
        const c = input.map((cards) => cards.shift());
        if (c[1] > c[0]) {
            input[1].push(...c.reverse());
        } else {
            input[0].push(...c);
        }
        console.log({c, a: input[0].join(), b:input[1].join()});
        if (input.some((cards)=>cards.length=== 0)){
            console.log("fini")
            break;
        }
    }

    const c = [...input[0],...input[1]]
    c.reverse()
    // console.log(c)
    const answer = c.map((c,  i) => c  * (i + 1)).reduce((a,b) => a +b);

    console.log(answer); // 34967
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
