fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const numbers = text.trim().split("\n").map(Number);
    // const numbers = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
    // const numbers = [28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3];

    numbers.sort((a, b) => a - b);
    numbers.push(numbers[numbers.length - 1] + 3);

    let answer = 1;
    let streak = 0;
    numbers.reduce((a, b) => {
        if (b - a === 1) {
            streak++;
        } else {
            if (streak > 1) {
                let n = 1 << (streak - 1);
                if (streak > 3) {
                    n -= (streak - 3) * (streak - 4) + 1;
                }
                answer *= n;
            }
            streak = 0;
        }
        return b;
    }, 0);

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
