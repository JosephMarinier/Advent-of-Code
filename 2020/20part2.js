fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
//     text = `Tile 2311:
// ..##.#..#.
// ##..#.....
// #...##..#.
// ####.#...#
// ##.##.###.
// ##...#.###
// .#.#.#..##
// ..#....#..
// ###...#.#.
// ..###..###

// Tile 1951:
// #.##...##.
// #.####...#
// .....#..##
// #...######
// .##.#....#
// .###.#####
// ###.##.##.
// .###....#.
// ..#.#..#.#
// #...##.#..

// Tile 1171:
// ####...##.
// #..##.#..#
// ##.#..#.#.
// .###.####.
// ..###.####
// .##....##.
// .#...####.
// #.##.####.
// ####..#...
// .....##...

// Tile 1427:
// ###.##.#..
// .#..#.##..
// .#.##.#..#
// #.#.#.##.#
// ....#...##
// ...##..##.
// ...#.#####
// .#.####.#.
// ..#..###.#
// ..##.#..#.

// Tile 1489:
// ##.#.#....
// ..##...#..
// .##..##...
// ..#...#...
// #####...#.
// #..#.#.#.#
// ...#.#.#..
// ##.#...##.
// ..##.##.##
// ###.##.#..

// Tile 2473:
// #....####.
// #..#.##...
// #.##..#...
// ######.#.#
// .#...#.#.#
// .#########
// .###.#..#.
// ########.#
// ##...##.#.
// ..###.#.#.

// Tile 2971:
// ..#.#....#
// #...###...
// #.#.###...
// ##.##..#..
// .#####..##
// .#..####.#
// #..#.#..#.
// ..####.###
// ..#.#.###.
// ...#.#.#.#

// Tile 2729:
// ...#.#.#.#
// ####.#....
// ..#.#.....
// ....#..#.#
// .##..##.#.
// .#.####...
// ####.#.#..
// ##.####...
// ##..#.##..
// #.##...##.

// Tile 3079:
// #.#.#####.
// .#..######
// ..#.......
// ######....
// ####.#..#.
// .#...#.##.
// #.#####.##
// ..#.###...
// ..#.......
// ..#.###...`;
    const count = new Map();
    const insides = new Map();
    let total = 0;
    const tiles = new Map(text.trim().split("\n\n").map((tile) => {
        const [idLine, ...lines] = tile.split("\n");
        const id = Number(idLine.match(/\d+/)[0]);
        const bs = [
            lines[0],
            lines.map((line) => line[line.length - 1]).join(""),
            lines[lines.length - 1].split("").reverse().join(""),
            lines.map((line) => line[0]).reverse().join(""),
            lines[0].split("").reverse().join(""),
            lines.map((line) => line[line.length - 1]).reverse().join(""),
            lines[lines.length - 1],
            lines.map((line) => line[0]).join(""),
        ];
        bs.forEach((b) => {
            total++;
            count.set(b, (count.get(b) || 0) + 1);
        });
        insides.set(id, lines.slice(1, -1).map((line) => line.slice(1, -1)));
        return [id, bs];
    }));

    const groupBy = (array, by) => {
        const map = new Map();
        array.forEach((item) => {
            const key = by(item);
            if (map.has(key)) {
                map.get(key).push(item);
            } else {
                map.set(key, [item]);
            }
        });
        return map;
    }
    // console.log(total, [...count.values()].reduce((a, b) => a + b), "groups", groupBy([...count], (([_, c]) => c)));
    const sides = [...count].filter(([_, c]) => c === 1).map(([s]) => s);
    // console.log(sides);
    const corners = [...tiles].filter(([_, borders]) => sides.filter((s) => borders.includes(s)).length === 4);
    // console.log(corners);

    // console.log(corners[0][1].map((c) => count.get(c)));

    const orientation = [[0, 1], [1, 2], [2, 3], [3, 0]].find((sides) => sides.every((side) => count.get(corners[0][1][side]) === 2));

    // console.log(corners[0][0]);
    const arr = [
        [
            [corners[0][0], [corners[0][1][orientation[0]], corners[0][1][orientation[1]]], insides.get(corners[0][0])] // TODO flip?
        ]
    ];
    console.log({ orientation });
    // console.log(tiles.size);
    tiles.delete(corners[0][0]);
    // console.log(tiles.size);

    const flipDiagonal = (tile) => tile.map((line, y) => line.split("").map((_, x) => tile[x][y]).join(""));

    let width;
    for (let x = 0; x < 100; x++) {
        const b = arr[0][x][1][0/* top */];
        const found = [...tiles].find(([_, borders]) => borders.includes(b));
        if (!found) {
            // console.log("not found", x);
            width = x;
            break;
        }
        const [id, bs] = found;
        const inside = insides.get(id);
        tiles.delete(id);
        // console.log("index", bs.indexOf(b), id, "in", x + 1, 0);
        const [fff, rotated] = [
            [[bs[6], bs[5]], () => inside.reverse()],
            [[bs[7], bs[6]], () => flipDiagonal(inside)],
            [[bs[4], bs[7]], () => inside.map((line) => line.split("").reverse().join(""))],
            [[bs[5], bs[4]], () => flipDiagonal(inside.reverse()).reverse()],
            [[bs[2], bs[3]], () => inside.map((line) => line.split("").reverse().join("")).reverse()],
            [[bs[3], bs[0]], () => flipDiagonal(inside.reverse())],
            [[bs[0], bs[1]], () => inside],
            [[bs[1], bs[2]], () => flipDiagonal(inside).reverse()],
        ][bs.indexOf(b)];
        arr[0].push([id, fff, rotated()]);
    }
    for (let y = 0; y < 100; y++) {
        arr.push([]);
        for (let x = 0; x <= width; x++) {
            // console.log("ll")
            // console.log(arr[y], arr[y][x]);
            // console.log(arr[y][x][1]);
            // console.log(arr[y][x][1][1/* left */]);
            const b = arr[y][x][1][1/* left */];
            const found = [...tiles].find(([_, borders]) => borders.includes(b));
            if (!found) {
                // console.log("WHAAAAAAAT?", b);
                break;
            }
            const [id, bs] = found;
            const inside = insides.get(id);
            tiles.delete(id);
            // console.log("index", bs.indexOf(b), id, "in", x, y + 1);
            const [fff, rotated] = [
                [[bs[7], bs[6]], () => flipDiagonal(inside)],
                [[bs[4], bs[7]], () => inside.map((line) => line.split("").reverse().join(""))],
                [[bs[5], bs[4]], () => flipDiagonal(inside.reverse()).reverse()],
                [[bs[6], bs[5]], () => inside.reverse()],
                [[bs[1], bs[2]], () => flipDiagonal(inside).reverse()],
                [[bs[2], bs[3]], () => inside.map((line) => line.split("").reverse().join("")).reverse()],
                [[bs[3], bs[0]], () => flipDiagonal(inside.reverse())],
                [[bs[0], bs[1]], () => inside],
            ][bs.indexOf(b)];
            arr[y + 1].push([id, fff, rotated()]);
            // console.log(arr);
        }
        if (tiles.size === 0) {
            // console.log("yesss", y);
            break;
        }
    }
    // console.log(arr);

    const flipHorizontal = (image) => [...image].reverse();

    const image = arr.map((bob) => bob.map(([, , tile]) => tile).reduce((a, b) => [...b, ...a])).reduce((a, b) => a.map((c, i) => c + b[i]));
    const length = image[0].length;
    const monster = `#( \n)#(    )##(    )##(    )###(\n )#(  )#(  )#(  )#(  )#(  )#`;
    const r = new RegExp(monster.replaceAll(" ", ".").replaceAll("\n", `.{${length - 19}}`), "s");
    console.log(r);

    const ccc = [
        flipDiagonal(flipHorizontal(image)).reverse(),
        flipHorizontal(image),
        flipDiagonal(image),
        image.map((line) => line.split("").reverse().join("")),
        flipDiagonal(image).reverse(),
        image.map((line) => line.split("").reverse().join("")).reverse(),
        flipDiagonal(flipHorizontal(image)),
        image,
    ];
    const cc = ccc.map((image) => {
        let i = image.join("\n");
        let c = 0;
        while (r.test(i) && c < 100) {
            c++;
            i = i.replace(r, `O$1O$2OO$3OO$4OOO$5O$6O$7O$8O$9O$10O`);
        }
        if (c > 0) {
            console.log(i);
        }
        return c;
    });
    console.log(cc, Math.max(...cc));
    const answer = image.join("").split("").filter((c) => c === "#").length - 15 * Math.max(...cc);

    console.log(answer); // 2501, 2516, 2586
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
