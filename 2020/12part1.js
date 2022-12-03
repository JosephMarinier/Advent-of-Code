fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `F10
// N3
// F7
// R90
// F11`;
    const input = text.trim().split("\n");

    let angle = 0;
    let x = 0;
    let y = 0;
    input.forEach((line) => {
        const value = Number(line.slice(1));
        switch (line.charAt(0)) {
            case "N":
                y += value;
                break;
            case "S":
                y -= value;
                break;
            case "E":
                x += value;
                break;
            case "W":
                x -= value;
                break;
            case "L":
                angle += value;
                break;
            case "R":
                angle -= value;
                break;
            case "F":
                x += value * Math.cos(angle * Math.PI / 180);
                y += value * Math.sin(angle * Math.PI / 180);
                break;
        }
    });
    const answer = Math.round(Math.abs(x) + Math.abs(y));

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
