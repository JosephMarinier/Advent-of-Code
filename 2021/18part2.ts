fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = "[[[[4,3],4],4],[7,[[8,4],9]]]\n[1,1]";
//     text = `[1,1]
// [2,2]
// [3,3]
// [4,4]
// [5,5]`;
// text = `[1,1]
// [2,2]
// [3,3]
// [4,4]
// [5,5]
// [6,6]`;
// text = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
// [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
// [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
// [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
// [7,[5,[[3,8],[1,4]]]]
// [[2,[2,2]],[8,[8,1]]]
// [2,9]
// [1,[[[9,3],9],[[9,0],[0,7]]]]
// [[[5,[7,4]],7],1]
// [[[[4,2],2],6],[8,7]]`;
//     text = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
// [[[5,[2,8]],4],[5,[[9,9],0]]]
// [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
// [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
// [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
// [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
// [[[[5,4],[7,7]],8],[[8,3],8]]
// [[9,3],[[9,9],[6,[4,9]]]]
// [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
// [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;
    const numbers = text.trim().split("\n");

    const lol = (a, b) => {
        let sum = `[${a},${b}]`;
        let c;
        do {
            c = false;
            var reg = /\[\d+,\d+\]/g;
            var result;
            while ((result = reg.exec(sum)) !== null) {
                const left = sum.slice(0, result.index);
                if (left.split("").reduce((depth, c) => depth + (c === "[" ? 1 : c === "]" ? -1 : 0), 0) >= 4) {
                    const right = sum.slice(result.index + result[0].length);
                    c = true;
                    const [l, r] = result[0].matchAll(/\d+/g);
                    sum = `${
                        left.replace(/\d+(?=\D*$)/, (n) => `${Number(n) + Number(l)}`)
                    }0${
                        right.replace(/(?<=^\D*)\d+/, (n) => `${Number(n) + Number(r)}`)
                    }`
                    break;
                }
            }
            if (c) {
                continue;
            }
            sum = sum.replace(/\d\d+/, (n) => {
                c = true;
                return `[${Math.floor(Number(n) / 2)},${Math.ceil(Number(n) / 2)}]`;
            });
        } while (c);

        // mag
        while (/\D/.test(sum)) {
            sum = sum.replace(/\[\d+,\d+\]/, (c) => {
                const [l, r] = c.matchAll(/\d+/g);
                return `${3 * Number(l) + 2 * Number(r)}`;
            });
        }
        return Number(sum);
    };

    const answer = Math.max(...numbers.flatMap((a) => numbers.flatMap((b) => a === b ? [] : [lol(a, b)])));

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
