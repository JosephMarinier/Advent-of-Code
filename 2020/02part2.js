fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const answer = text.trim().split("\n").filter((line) => {
        const [, a, b, letter, word] = line.match(/^(\d+)-(\d+) (\w): (\w+)$/);
        return (word[a - 1] === letter) ^ (word[b - 1] === letter);
    }).length;

    document.querySelector(`input[name="answer"]`).value = answer;
    document.querySelector(`input[type="submit"]`).click();
});
