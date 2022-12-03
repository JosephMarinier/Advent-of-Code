fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `NNCB

// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C`;
    const [template, b] = text.trim().split("\n\n");
    const pairs = template.split("").slice(0, -1).map((_, i) => template.slice(i, i + 2));
    const pairsCounts = pairs.reduce((counts, pair) => ({...counts, [pair]: (counts[pair] || 0) + 1}), {});
    const rules = new Map(b.split("\n").map((rule) => rule.split(" -> ")));
    console.log({ pairs, pairsCounts, rules });

    const result = Array(40).fill(0).reduce(
        (pairsCounts) => Object.entries(pairsCounts).flatMap(([pair, count]) => {
            const n = rules.get(pair);
            return [[pair[0] + n, count], [n + pair[1], count]];
        }).reduce((counts, [pair, count]) => ({...counts, [pair]: (counts[pair] || 0) + count}), {}),
        pairsCounts,
    );
    console.log(result);

    const counts = Object.entries(result).map(([pair, count]) => [pair, pair[0] === pair[1] ? count * 2 : count]).reduce((counts, [pair, count]) => ({
        ...counts,
        [pair[0]]: (counts[pair[0]] || 0) + count,
        [pair[1]]: (counts[pair[1]] || 0) + count,
    }), {});
    const min = Object.entries(counts).reduce((a, b) => a[1] < b[1] ? a : b);
    const max = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b);
    counts[template[0]]++;
    counts[template[template.length - 1]]++;
    console.log(counts);

    const answer = Math.floor((max[1] - min[1]) / 2);
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    