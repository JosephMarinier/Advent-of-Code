fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((instructions) => {
    const ops = {
        inp: (result, a) => result.replaceAll(a, "i"),
        ini: (result, a, b) => result.replaceAll(a, b), // custom
        add: (result, a, b) => result.replaceAll(a, `(${a}+${b})`),
        mul: (result, a, b) => result.replaceAll(a, `${a}*${b}`),
        div: (result, a, b) => result.replaceAll(a, `(${a}/${b})`),
        mod: (result, a, b) => result.replaceAll(a, `(${a}%${b})`),
        eql: (result, a, b) => result.replaceAll(a, `(${a}==${b})`),
        unq: (result, a, b) => result.replaceAll(a, `(${a}!=${b})`), // custom
    };
    console.log(Array.from(instructions.trim().matchAll(/inp w\nmul x 0\nadd x z\nmod x 26\ndiv z (\d+)\nadd x (-?\d+)\neql x w\neql x 0\nmul y 0\nadd y 25\nmul y x\nadd y 1\nmul z y\nmul y 0\nadd y w\nadd y (\d+)\nmul y x\nadd z y/g)).map((r) => r.slice(1).map(Number)));
    console.log(`inp w
mul x 0
add x z
mod x 26
div z a
add x b
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y c
mul y x
add z y`.replace(/mul \w 0\nadd/g, "ini").replace(/eql x w\neql x 0/g, "unq x w").split("\n").slice(-15).reverse().reduce((result, instruction) => {
        const [op, a, b] = instruction.split(" ");
        return ops[op](result, a, b);
    }, "z"));
});

/*
t = ((z%26)+b)!=i
z = (z/a)*(25*t+1) + (i+c)*t

a. t=1, z=a+1
b. t=1, z=(a+1)*26+b+1
c. t=1, z=((a+1)*26+b+1)*26+c+16
d. t=c+16-8!=d, c=1, d=9, t=0, z=(a+1)*26+b+1 (or t=1)
e. t=b+1-4!=e, b=9, e=6, t=0, z=a+1
f. t=1, z=(a+1)*26+f+3
g. t=1, z=((a+1)*26+f+3)*26+g+2
h. t=1, z=(((a+1)*26+f+3)*26+g+2)*26+h+15
i. t=h+15-13!=i, h=7, i=9, t=0, z=((a+1)*26+f+3)*26+g+2
j. t=g+2-3!=j, g=9, j=8, t=0, z=(a+1)*26+f+3
k. t=f+3-7!=k, f=9, k=5, t=0, z=a+1
l. t=1, z=(a+1)*26+l+1
m. t=l+1-6!=m, l=9, m=4, t=0, z=a+1
n. t=a+1-8!=n, a=9, n=2, t=0, z=0

99196997985942

a. t=1, z=a+1
b. t=1, z=(a+1)*26+b+1
c. t=1, z=((a+1)*26+b+1)*26+c+16
d. t=c+16-8!=d, c=1, d=9, t=0, z=(a+1)*26+b+1 (or t=1)
e. t=b+1-4!=e, b=4, e=1, t=0, z=a+1
f. t=1, z=(a+1)*26+f+3
g. t=1, z=((a+1)*26+f+3)*26+g+2
h. t=1, z=(((a+1)*26+f+3)*26+g+2)*26+h+15
i. t=h+15-13!=i, h=1, i=3, t=0, z=((a+1)*26+f+3)*26+g+2
j. t=g+2-3!=j, g=2, j=1, t=0, z=(a+1)*26+f+3
k. t=f+3-7!=k, f=5, k=1, t=0, z=a+1
l. t=1, z=(a+1)*26+l+1
m. t=l+1-6!=m, l=6, m=1, t=0, z=a+1
n. t=a+1-8!=n, a=8, n=1, t=0, z=0

84191521311611
*/
