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
    const [a, b] = text.trim().split("\n\n");
    const template = a.split("");
    const rules = new Map(b.split("\n").map((rule) => rule.split(" -> ")));
    console.log(rules);

    const result = Array(10).fill(0).reduce(
        (template) => [...template.slice(0, -1).flatMap((left, i) => [left, rules.get(template.slice(i, i + 2).join(""))]), template[template.length - 1]],
        template,
    );
    console.log(result);

    const counts = result.reduce((counts, letter) => ({...counts, [letter]: (counts[letter] || 0) + 1}), {});
    const min = Object.entries(counts).reduce((a, b) => a[1] < b[1] ? a : b);
    const max = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b);
    console.log(counts);

    const answer = max[1] - min[1];
    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
