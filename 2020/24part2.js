fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `sesenwnenenewseeswwswswwnenewsewsw
// neeenesenwnwwswnenewnwwsewnenwseswesw
// seswneswswsenwwnwse
// nwnwneseeswswnenewneswwnewseswneseene
// swweswneswnenwsewnwneneseenw
// eesenwseswswnenwswnwnwsewwnwsene
// sewnenenenesenwsewnenwwwse
// wenwwweseeeweswwwnwwe
// wsweesenenewnwwnwsenewsenwwsesesenwne
// neeswseenwwswnwswswnw
// nenwswwsewswnenenewsenwsenwnesesenew
// enewnwewneswsewnwswenweswnenwsenwsw
// sweneswneswneneenwnewenewwneswswnese
// swwesenesewenwneswnwwneseswwne
// enesenwswwswneneswsenwnewswseenwsese
// wnwnesenesenenwwnenwsewesewsesesew
// nenewswnwewswnenesenwnesewesw
// eneswnwswnwsenenwnwnwwseeswneewsenese
// neswnwewnwnwseenwseesewsenwsweewe
// wseweeenwnesenwwwswnew`;
    let input = text.trim().split("\n").map((line) => [...line.matchAll(/[sn]?[ew]/g)].map((match) => {
        return {
            e: [1,  0],
            se: [0,  -1],
            sw: [-1,  -1],
            w: [-1,  0],
            nw: [0,  1],
            ne: [1,  1],
        }[match[0]];
    }).reduce(([x, y], [dx, dy]) => [x + dx, y + dy])).map((c) => c.join(",")).reduce((set, s) => {
        if (set.has(s)) {
            set.delete(s);
        } else {
            set.add(s);
        }
        return set;
    }, new Set());

    for (let i = 0; i < 100; i++) {
        const copy = new Set([...input]);
        const coords = [...input].map((s) => s.split(","));
        const min_x = Math.min(...coords.map(([x]) => x)) - 1;
        const max_x = Math.max(...coords.map(([x]) => x)) + 1;
        const min_y = Math.min(...coords.map(([, y]) => y)) - 1;
        const max_y = Math.max(...coords.map(([, y]) => y)) + 1;
        for (let y = min_y; y <= max_y; y++) {
            for (let x = min_x; x <= max_x; x++) {
                const me = [x, y].join(",");
                const voisins = Object.values({
                    e: [1,  0],
                    se: [0,  -1],
                    sw: [-1,  -1],
                    w: [-1,  0],
                    nw: [0,  1],
                    ne: [1,  1],
                }).map(([dx, dy]) => [x + dx, y + dy].join(",")).filter((s) => input.has(s)).length;
                if (input.has(me)) {
                    if (voisins === 0 || voisins > 2) {
                        copy.delete(me);
                    }
                } else if (voisins === 2)  {
                    copy.add(me);
                }
            }
        }
        input = copy;
    }

    const answer = input.size;

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
    