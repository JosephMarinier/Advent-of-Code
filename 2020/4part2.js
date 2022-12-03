fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const inputs = text.trim().split(`\n\n`);

    const between = (a, b, c) => a <= b && b <= c;

    const answer = inputs.filter((passeport) => {
        const { byr, iyr, eyr, hgt, hcl, ecl, pid } = Object.fromEntries(passeport.split(/\s/).map((keyValues) => keyValues.split(":")));
        const conditions = [
            byr && between(1920, byr, 2002),
            iyr && between(2010, iyr, 2020),
            eyr && between(2020, eyr, 2030),
            hgt && (hgt.endsWith("cm") && between(150, hgt.slice(0, -2), 193) || hgt.endsWith("in") && between(59, hgt.slice(0, -2), 76)),
            hcl && /^#[0-9a-f]{6}$/.test(hcl),
            ecl && /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl),
            pid && /^\d{9}$/.test(pid),
        ];
        return conditions.every((a) => a);
    }).length;

    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
