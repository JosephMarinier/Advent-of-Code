fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((start) => {
    start = "#############\n#...........#\n###B#C#B#D###\n  #A#D#C#A#\n  #########\n";
    let goal = "#############\n#...........#\n###A#B#C#D###\n  #A#B#C#D#\n  #########\n";

    const unfold = (state, ...newLines) => {
        const lines = state.split("\n");
        lines.splice(3, 0, ...newLines);
        state = lines.join("\n");
        return state;
    };
    // Part 2
    // start = unfold(start, "  #D#C#B#A#", "  #D#B#A#C#");
    // goal = unfold(goal, "  #A#B#C#D#", "  #A#B#C#D#");

    console.log({ start, goal });

    const letters = "ABCD".split("");

    const cost = Object.fromEntries(letters.map((letter, i) => [letter, 10 ** i]));

    const lineStarts = [...goal.matchAll("\n")].map((m) => m.index);

    const coord = (i) => {
        const lineStart = goal.lastIndexOf("\n", i);
        const y = lineStarts.indexOf(lineStart);
        const x = i - lineStart;
        return [x, y];
    }

    const fromCoord = ([x, y]) => lineStarts[y] + x;

    const distance = (a, b) => a.map((c, i) => Math.abs(c - b[i])).reduce((a, b) => a + b);

    const intermediateDestinations = [2, 3, 5, 7, 9, 11, 12].map((x2) => [x2, 0]);

    const goals = Object.fromEntries(letters.map((letter) => [
        letter,
        [...goal.matchAll(letter)].map((m) => m.index).map(coord),
    ]));

    const finalDestinations = (c, letter) => {
        const firstOccupied = goals[letter].findIndex(([x, y]) => isOccupied(c, [x, y]));
        if (firstOccupied !== 0) {
            if (firstOccupied === -1 || goals[letter].slice(firstOccupied).every(([x, y]) => c[fromCoord([x, y])] === letter)) {
                const lastFree = (firstOccupied + goals[letter].length + 1) % (goals[letter].length + 1) - 1;
                return [goals[letter][lastFree]];
            }
        }
        return [];
    }

    const isOccupied = (state, [x, y]) => state[fromCoord([x, y])] !== ".";

    const isPathFree = (state, [x, y], [x2, y2]) => {
        let dx = x;
        let dy = y;
        while (dy > y2) { // go up
            dy--;
            if (isOccupied(state, [dx, dy])) {
                return false;
            }
        }
        while (dx > x2) { // go left
            dx--;
            if (isOccupied(state, [dx, dy])) {
                return false;
            }
        }
        while (dx < x2) { // go right
            dx++
            if (isOccupied(state, [dx, dy])) {
                return false;
            }
        }
        while (dy < y2) { // go down
            dy++
            if (isOccupied(state, [dx, dy])) {
                return false;
            }
        }
        return true;
    };

    const move = (before, [x, y], [x2, y2]) => {
        const lines = before.split("");
        lines[fromCoord([x2, y2])] = lines[fromCoord([x, y])];
        lines[fromCoord([x, y])] = ".";
        return lines.join("");
    };

    let counter = 2;

    const answer = search(
        start,
        (state) => state === goal,
        (state) => letters.flatMap((letter) => [...state.matchAll(letter)].map((m) => m.index).map(coord).map(([x, y]) => {
            const dx = Math.abs(coord(goal.indexOf(letter))[0] - x);
            return cost[letter] * (dx + Math.sign(dx) * (1 + y));
        })).reduce((a, b) => a + b),
        (state) => {
            const moves = letters.flatMap((letter) => [...state.matchAll(letter)].map((m) => m.index).map(coord).flatMap(([x, y]) => {
                const destinations = y === 0 ? finalDestinations(state, letter) : intermediateDestinations;
                return destinations.flatMap(([x2, y2]) => {
                    return isPathFree(state, [x, y], [x2, y2]) ? [[move(state, [x, y], [x2, y2]), distance([x, y], [x2, y2]) * cost[letter]]] : [];
                });
            }));
            // console.log({moves});
            // counter--;
            return counter > 0 ? moves : [];
        }
    );
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});

// TODO
// dest column
// lowest free
// if no other letters below
