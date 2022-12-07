fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const opsO = text.trim().split("\n").map((line) => {
        const [op, arg] = line.split(" ");
        return [op, Number(arg)];
    });

    const lol = () => {
        for (let change = 0; change < opsO.length; change++) {
            if (opsO[change][0] === "acc") {
                // console.log("not", change);
                continue;
            }
            // console.log(change);
            const ops = opsO.map(([op, arg], j) => change === j ? [{"nop":"jmp", "jmp":"nop"}[op], arg] : [op, arg]);
            let a = 0;
            let i = 0;
            const visited = ops.map(() => false);
            while (!visited[i]) {
                if (i === ops.length) {
                    console.log("yeah", a);
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
        }
    }

    const answer = lol();

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const opsO = text.trim().split("\n").map((line) => {
        const [op, arg] = line.split(" ");
        return [op, Number(arg)];
    });

    let answer;
    for (let change = 0; change < opsO.length; change++) {
        if (opsO[change][0] === "acc") {
            continue;
        }
        const ops = opsO.map(([op, arg], j) => change === j ? [{"nop":"jmp", "jmp":"nop"}[op], arg] : [op, arg]);
        answer = 0;
        let i = 0;
        const visited = ops.map(() => false);
        while (!visited[i] && i !== ops.length) {
            visited[i] = true;
            const [op, arg] = ops[i];
            switch (op) {
                case "acc":
                    answer += arg;
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
        if (i === ops.length) {
            break;
        }
    }

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
