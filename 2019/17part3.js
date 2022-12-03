(() => {
    const allall = `L,4,R,8,L,6,L,10,L,6,R,8,R,10,L,6,L,6,L,4,R,8,L,6,L,10,L,6,R,8,R,10,L,6,L,6,L,4,L,4,L,10,L,4,L,4,L,10,L,6,R,8,R,10,L,6,L,6,L,4,R,8,L,6,L,10,L,6,R,8,R,10,L,6,L,6,L,4,L,4,L,10\n`;

    const lol = (all, rest2 = all, by = `A`) => {
        let i, limit;
        if (by[0] === `C`) {
            if (all.length > 20) {
                return null;
            }
            i = all.length - 1;
            limit = all.length;
        } else {
            i = 1;
            limit = Math.max(all.length, 20);
        }
        for (; i < limit; i++) {
            if (all[i] === `,`) {
                bol = all.substring(0, i);
                const rest = rest2.replace(RegExp(bol, `g`), by[0]);
                const match = rest.match(RegExp(`(?<=(?:[${by}],)+).+?(?=,[${by}])`));
                if (match === null) {
                    return {[by[0]]: bol};
                } else {
                    console.log(match[0]);
                    const b = lol(match[0], rest, String.fromCharCode(by[0].charCodeAt() + 1) + by);
                    console.log(b);
                    if (b !== null) {
                        return {[by[0]]: bol, ...b};
                    }
                }
            }
        }
        return null;
    }

    console.log(lol(allall));
    // Object.entries({
    //     A: `L,4,R,8,L,6,L,10`,
    //     B: `L,6,R,8,R,10,L,6,L,6`,
    //     C: `L,4,L,4,L,10`,
    // }).reduce((main, [by, pattern]) => main.replace(RegExp(pattern, `g`), by), all);
})();
