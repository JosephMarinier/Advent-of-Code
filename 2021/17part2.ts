fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const [xRange, yRange] = text.trim().slice("target area: x=".length).split(", y=").map((range) => range.split("..").map(Number));

    const initialVxRange = [Math.floor(Math.sqrt(xRange[0] * 2)), xRange[1]];
    const initialVyRange = [yRange[0], -1 - yRange[0]];

    let answer = 0;
    for (let initialVx = initialVxRange[0]; initialVx <= initialVxRange[1]; initialVx++) {
        for (let initialVy = initialVyRange[0]; initialVy <= initialVxRange[1]; initialVy++) {
            let vx = initialVx, vy = initialVy, x = 0, y = 0;
            do {
                x += vx;
                y += vy;
                vx -= Math.sign(vx);
                vy--;
                if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
                    answer++;
                    break
                }
            } while (x <= xRange[1] && y >= yRange[0]);
        }
    }

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
