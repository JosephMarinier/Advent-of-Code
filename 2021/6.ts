fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(",").map(Number);
    console.log(inputs);

    const counts = Array(9).fill(0);
    inputs.forEach((counter) => {
        counts[counter]++;
    });
    console.log(counts);

    for (let i = 0; i < 256; i++) {
        const born = counts.shift()
        counts.push(born);
        counts[6] += born;
    }

    const answer = counts.reduce((a, b) => a + b);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
