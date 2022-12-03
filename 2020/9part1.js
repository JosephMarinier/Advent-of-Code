fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const numbers = text.trim().split("\n").map(Number);

    let answer;
    for (let i = 25; i < numbers.length; i++) {
        const a = numbers[i];
        const p = numbers.slice(i - 25, i);
        if (p.every((q, j) => !p.slice(j).includes(a - q))) {
            answer = a;
            break;
        }
    }

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
