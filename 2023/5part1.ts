fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [seeds, ...maps] = text.trim().split("\n\n");

    const answer = Math.min(...maps.reduce((sources, paragraph) => {
        const destinations = [];
        paragraph.split("\n").slice(1).forEach((line) => {
            const [destinationStart, sourceStart, length] = line.split(" ").map(Number);
            sources = sources.filter((source) => {
                const inside = sourceStart <= source && source < sourceStart + length;
                if (inside) {
                    destinations.push(source - sourceStart + destinationStart);
                }
                return !inside;
            });
        });
        return [...destinations, ...sources];
    }, seeds.split(" ").slice(1).map(Number)));

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
