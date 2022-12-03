fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = `0,3,6`;
    const input = text.trim().split(",").map(Number);

    let answer;
    for (let i = input.length; i < 2020; i++) {
        const l = input.slice(0, -1).lastIndexOf(input[i - 1]);
        answer = l === -1 ? 0 : i - 1 - l;
        input.push(answer);
    }

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
