fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n\n`);

    const answer = inputs.filter((passeport) => {
        const map = new Map(passeport.split(/\s/).map((keyValues) => keyValues.split(":")));
        return ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].every((key) => map.has(key));
    }).length;

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
