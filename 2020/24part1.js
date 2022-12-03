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
    const input = text.trim().split("\n").map((line) => [...line.matchAll(/[sn]?[ew]/g)].map((match) => {
        return {
            e: [1,  0],
            se: [0.5,  -1],
            sw: [-0.5,  -1],
            w: [-1,  0],
            nw: [-0.5,  1],
            ne: [0.5,  1],
        }[match[0]];
    }).reduce(([x, y], [dx, dy]) => [x + dx, y + dy]));
    console.log(input);

    //.reduce((a, b) => a + b)
    // for (let i = 0; i < 100; i++) {
    // }

    const answer = input.map((c) => c.join(",")).reduce((set, s) => {
        if (set.has(s)) {
            set.delete(s);
        } else {
            set.add(s);
        }
        return set;
    }, new Set()).size;

    console.log(answer); // 332
    document.querySelector(`input[name="answer"]`).value = answer;
    document.querySelector(`input[type="submit"]`).click();
});
