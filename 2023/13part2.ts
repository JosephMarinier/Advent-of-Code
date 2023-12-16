fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const getMirrors = (pattern, skip = []) => {
        const rows = pattern.split("\n").map((row) => row.replace(/#/g, "1").replace(/\./g, "0"));
        const columns = rows[0].split("").map((_, x) => rows.map((row) => row[x]).join(""));

        return [rows, columns].map((array, dimension) => 1 + array.findIndex((_, index) => {
            const mirror = index + 1;
            if (mirror === array.length || mirror === skip[dimension]) {
                return false;
            }

            const before = array.slice(Math.max(0, 2 * mirror - array.length), mirror).reverse().join("\n");
            const after = array.slice(mirror, 2 * mirror).join("\n");

            return before === after;
        }));
    };

    const answer = text.trim().split("\n\n").map((pattern) => {
        const [horizontalMirror, verticalMirror] = getMirrors(pattern);
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern[i];
            if (char === "\n") {
                continue;
            }

            const newPattern = pattern.slice(0, i) + {"." : "#", "#": "."}[char] + pattern.slice(i + 1);
            const [newHorizontalMirror, newVerticalMirror] = getMirrors(newPattern, [horizontalMirror, verticalMirror]);
            if (newHorizontalMirror || newVerticalMirror) {
                return 100 * newHorizontalMirror + newVerticalMirror;
            }
        }
    }).reduce((a, b) => a + b);

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
