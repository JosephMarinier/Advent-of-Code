fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const lines = text.trim().split("\n").map((line) => line.split(""));

    const points = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
    };
    const closing = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">",
    };

    const answer = lines.map((line) => {
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
        return error ? points[error] : 0;
    }).reduce((a, b) => a + b);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    