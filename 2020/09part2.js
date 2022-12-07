fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const numbers = text.trim().split("\n").map(Number);

    let i = 0, j = 1, answer;
    while (true) {
        const slice = numbers.slice(i, j);
        const sum = slice.reduce((a, b) => a + b);
        if (sum === 257342611) {
            answer = Math.min(...slice) + Math.max(...slice);
            break;
        } else if (sum < 257342611) {
            j++;
        } else {
            i++;
        }
    }

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
