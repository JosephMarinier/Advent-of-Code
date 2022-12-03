fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const ops = text.trim().split("\n").map((line) => {
        const [op, arg] = line.split(" ");
        return [op, Number(arg)];
    });
    const visited = ops.map(() => false);

    let a = 0;
    let i = 0;

    while (!visited[i]) {
        if (i > ops.length) {
            return a;
        }
        visited[i] = true;
        const [op, arg] = ops[i];
        switch (op) {
            case "acc":
                a += arg;
                i++;
                break;
            case "jmp":
                i += arg;
                break;
            case "nop":
                i++;
                break;
        }
    }

    const answer = a;

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
