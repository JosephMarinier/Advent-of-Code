// unique number of segments: 1, 4, 7, 8
// 5 segments: 2, 3, 5
// 6 segments: 0, 6, 9

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"

    const inputs = text.trim().split("\n").map((line) => line.split(" | ").map((parts) => parts.split(" ").map((parts) => parts.split(""))));
    console.log(inputs);

    const normal = "abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg".split(" ");

    const answer = inputs.map((input) => {
        const correspondence = Object.fromEntries("abcdefg".split("").map((segment) => [segment, undefined]));

        const frequencies = Object.fromEntries("abcdefg".split("").map((segment) => [segment, 0]));
        input[0].flat().forEach((segment) => {
            frequencies[segment]++;
        });

        Object.entries({ "b": 6, "e": 4, "f": 9 }).forEach(([segment, frequency]) => {
            correspondence[Object.entries(frequencies).find(([_, freq]) => freq === frequency)[0]] = segment;
        });

        const _1 = input[0].find((segments) => segments.length === 2);
        correspondence[_1.find((segment) => correspondence[segment] === undefined)] = "c";

        const _7 = input[0].find((segments) => segments.length === 3);
        correspondence[_7.find((segment) => correspondence[segment] === undefined)] = "a";

        const _4 = input[0].find((segments) => segments.length === 4);
        correspondence[_4.find((segment) => correspondence[segment] === undefined)] = "d";

        const _8 = input[0].find((segments) => segments.length === 7);
        correspondence[_8.find((segment) => correspondence[segment] === undefined)] = "g";

        return Number(input[1].map((segments) => normal.indexOf(segments.map((segment) => correspondence[segment]).sort().join(""))).join(""));
    }).reduce((a, b) => a + b);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
    document.querySelector(`input[type="submit"]`).click();
});
