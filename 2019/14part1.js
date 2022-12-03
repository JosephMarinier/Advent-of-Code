fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const reactions = new Map(text.trim().split(`\n`).map((reaction) => {
        const [input, output] = reaction.split(` => `);
        const inputs = input.split(`, `);
        const [{chemical, units}, ...needs] = [output, ...inputs].map((a) => {
            const [units, chemical] = a.split(` `);
            return {chemical, units: Number(units)};
        });
        return [chemical, {units, needs}];
    }));

    let answer = 0;
    const all = {
        ...Object.fromEntries([...reactions.keys()].map((chemical) => [chemical, 0])),
        FUEL: 1,
    };

    const max = 10000;
    let i = 0;
    while (i < max && Object.entries(all).some(([, units]) => units > 0)) {
        i++;
        Object.entries(all).forEach(([chemical, times]) => {
            const {units, needs} = reactions.get(chemical);
            const mul = Math.ceil(times / units);
            all[chemical] -= mul * units;
            needs.forEach(({chemical, units}) => {
                if (chemical === `ORE`) {
                    answer += mul * units;
                } else {
                    all[chemical] += mul * units;
                }
            });
        });
    }
    console.assert(i < max);

    console.log(answer);
    document.querySelector(`input[name="answer"]`).value = answer;
});
