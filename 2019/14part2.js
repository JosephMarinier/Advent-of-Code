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

    let answer = 1;
    let previous;
    let ore = 0;
    do {
        ore = 0;
        const all = {
            ...Object.fromEntries([...reactions.keys()].map((chemical) => [chemical, 0])),
            FUEL: answer,
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
                        ore += mul * units;
                    } else {
                        all[chemical] += mul * units;
                    }
                });
            });
        }
        console.assert(i < max);
        previous = answer;
        answer = Math.floor(answer * 1000000000000 / ore);
    } while (answer !== previous);

    console.log(`${ore} ORE can produce ${answer} FUEL`);
    document.querySelector(`input[name="answer"]`).value = answer;
});