fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `F10
// N3
// F7
// R90
// F11`;
    const input = text.trim().split("\n");

    const deg2rad = (deg) => deg * Math.PI / 180;

    const rotate = ([x, y], rad) => [
        x * Math.cos(rad) - y * Math.sin(rad),
        x * Math.sin(rad) + y * Math.cos(rad),
    ];

    let x = 0;
    let y = 0;
    let dx = 10;
    let dy = 1;
    input.forEach((line) => {
        const value = Number(line.slice(1));
        switch (line.charAt(0)) {
            case "N":
                dy += value;
                break;
            case "S":
                dy -= value;
                break;
            case "E":
                dx += value;
                break;
            case "W":
                dx -= value;
                break;
            case "L":
                [dx, dy] = rotate([dx, dy], deg2rad(value));
                break;
            case "R":
                [dx, dy] = rotate([dx, dy], deg2rad(-value));
                break;
            case "F":
                x += value * dx;
                y += value * dy;
                break;
        }
    });
    const answer = Math.round(Math.abs(x) + Math.abs(y));

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    