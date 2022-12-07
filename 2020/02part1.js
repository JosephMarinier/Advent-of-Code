fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const answer = text.trim().split("\n").filter((line) => {
        const [, min, max, letter, word] = line.match(/^(\d+)-(\d+) (\w): (\w+)$/);
        const reps = word.replaceAll(new RegExp(`[^${letter}]`, "g"), "").length;
        return min <= reps && reps <= max;
    }).length;

    document.querySelector(`input[name="answer"]`).value = answer;
    document.querySelector(`input[type="submit"]`).click();
});
