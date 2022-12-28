fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const snafu2dec = {
        "2": 2,
        "1": 1,
        "0": 0,
        "-": -1,
        "=": -2,
    };
    const dec2snafu = new Map(Object.entries(snafu2dec).map(([snafu, dec]) => [dec, snafu]));

    let sum = text.trim().split("\n").flatMap((line) => line.split("").reverse().map((v, i) => snafu2dec[v] * 5**i)).reduce((a, b) => a + b);

    const nextPowerOf5 = 5**Math.ceil(Math.log(sum) / Math.log(5));
    let answer = "";
    for (let powerOf5 = nextPowerOf5; powerOf5 >= 1; powerOf5 /= 5) {
        const digit = Math.round(sum / powerOf5);
        sum -= digit * powerOf5;
        console.log({digit, sum, powerOf5})
        if (answer || digit) {
            answer += dec2snafu.get(digit);
        }
    }

    console.log(answer);
    if (!answer) return;
    const field = document.querySelector(`input[name="answer"]`);
    if (field) field.value = String(answer);
    const submit = document.querySelector(`input[type="submit"]`);
    if (submit) submit.click();
});
