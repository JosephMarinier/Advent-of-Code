fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const scanners = text.trim().split("\n\n").map((scanner) => scanner.split("\n").slice(1).map((beacon) => beacon.split(",").map(Number)));

    const world = new Set(scanners.pop().map((c) => c.join(",")));
    const worldScanners = [[0, 0, 0]];
    let possibilities = scanners.map((scanner) => [
        "",
        "X",
        "Y",
        "XX",
        "XY",
        "YX",
        "YY",
        "XXX",
        "XXY",
        "XYX",
        "XYY",
        "YXX",
        "YYX",
        "YYY",
        "XXXY",
        "XXYX",
        "XXYY",
        "XYXX",
        "XYYY",
        "YXXX",
        "YYYX",
        "XXXYX",
        "XYXXX",
        "XYYYX",
    ].map((rotations) => rotations.split("").reduce((scanner, rotation) => {
        const cos = 0;
        const sin = 1;
        return rotation === "X"
            ? scanner.map(([x, y, z]) => [x, cos * y - sin * z, sin * y + cos * z])
            : scanner.map(([x, y, z]) => [sin * z + cos * x, y, cos * z - sin * x]);
    }, scanner)));

    let i = 1000;
    while (i && possibilities.length) {
        possibilities = possibilities.filter((p) => {
            return !p.some((possibleScanners) => {
                const map = new Map();
                return [...world].map((c) => c.split(",")).some((scanner) => {
                    return possibleScanners.some((possibleScanner) => {
                        const diffs = scanner.map((c, i) => Number(c) - possibleScanner[i]);
                        const diff = diffs.join(",");
                        const n = (map.get(diff) || 0) + 1;
                        if (n === 12) {
                            possibleScanners.forEach((possibleScanner) => {
                                world.add(possibleScanner.map((c, i) => c + diffs[i]).join(","));
                                worldScanners.push(diffs);
                            })
                            return true;
                        }
                        map.set(diff, n);
                    })
                });
            });
        });
        i--;
    }
    if (i === 0) {
        console.log("more!");
    }

    const answer = Math.max(...worldScanners.map(
        (a) => Math.max(...worldScanners.map(
            (b) => a.map((c, i) => Math.abs(c - b[i])).reduce((a, b) => a + b)
        ))
    ));
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
