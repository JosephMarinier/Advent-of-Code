fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [seedsParagraphs, ...paragraphs] = text.trim().split("\n\n");
    const seeds = seedsParagraphs.split(": ")[1].match(/\d+ \d+/g).map((pair) => {
        const [seedStart, length] = pair.split(" ").map(Number);
        return [seedStart, seedStart + length];
    });

    const out = paragraphs.reduce((sources, paragraph) => {
        const destinations = [];
        paragraph.split("\n").slice(1).forEach((line) => {
            const [destinationStart, sourceStart, length] = line.split(" ").map(Number);
            sources = sources.flatMap(([min, max]) => {
                if (max <= sourceStart || sourceStart + length <= min) {
                    return [[min, max]];
                }
                destinations.push([
                    destinationStart + Math.max(0, min - sourceStart),
                    destinationStart + Math.min(max - sourceStart, length),
                ]);
                const r = [];
                if (sourceStart + length < max) {
                    r.push([sourceStart + length, max]);
                }
                if (min < sourceStart) {
                    r.push([min, sourceStart]);
                }
                return r;
            });
        });
        return [...destinations, ...sources];
    }, seeds);

    console.log(out);
    const answer = Math.min(...out.map(([min, max]) => min));

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
