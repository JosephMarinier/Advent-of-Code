fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const lines = text.trim().split("\n").map((line) => line.split(""));

    const points = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
    };
    const closing = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">",
    };

    const scores = lines.flatMap((line) => {
        const stack = [];
        const error = line.find((char) => {
            if (char in closing) {
                stack.unshift(closing[char])
            } else {
                if (stack[0] === char) {
                    stack.shift();
                } else {
                    return true;
                }
            }
            return false;
        });
        return error ? [] : [stack.map((char) => points[char]).reduce((a, b) => a * 5 + b)];
    }).sort((a, b) => a - b);

    const answer = scores[(scores.length - 1) / 2];

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
