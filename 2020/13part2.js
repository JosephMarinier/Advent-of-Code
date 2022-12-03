fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    // text = ``;
    // const [, bussesLine] = text.trim().split("\n");
    const bussesLine = "17,x,13,19";
    // const bussesLine = "67,7,59,61";
    const busses = bussesLine.split(",").map(Number).map((b) => !isNaN(b) && BigInt(b));
    const filtered = busses.filter((b) => b);

    function modInverse(a, m) {
        // validate inputs
        // [a, m] = [Number(a), Number(m)]
        // if (Number.isNaN(a) || Number.isNaN(m)) {
        //   return NaN // invalid input
        // }
        a = (a % m + m) % m
        if (!a || m < 2) {
          return NaN // invalid input
        }
        // find the gcd
        const s = []
        let b = m
        while(b) {
          [a, b] = [b, a % b]
          s.push({a, b})
        }
        if (a !== 1n) {
          return NaN // inverse does not exists
        }
        // find the inverse
        let x = 1n
        let y = 0n
        for(let i = s.length - 2; i >= 0; --i) {
          [x, y] = [y,  x - y * (s[i].a / s[i].b)]
        }
        return (y % m + m) % m
    }

    // w * id = x + i

    const n = filtered.reduce((a, b) => a * b);
    console.log({ filtered, n });
    console.log(filtered.map((b) => modInverse((n / b) % b, b)));
    const lol = filtered.map((b) => ({
        a: (b - BigInt(busses.indexOf(b))) % b,
        n_: n / b,
        e: (modInverse((n / b) % b, b) % n) * n / b,
    }));
    console.log(lol);
    console.log(lol.map(({a, n_, e}) => a * e));
    console.log(lol.map(({a, n_, e}) => a * e).reduce((a, b) => (a + b) % n));
    const answer = filtered.map((b) => (((b - BigInt(busses.indexOf(b))) % b) * modInverse((n / b) % b, b) % n * n / b) % n).reduce((a, b) => (a + b) % n);

    console.log(answer);
    // not 905694340256526
    document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});

fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
  // text = ``;
  const [, bussesLine] = text.trim().split("\n");
  // const bussesLine = "17,x,13,19";
  // const bussesLine = "67,7,59,61";
  const busses = bussesLine.split(",").map(Number);
  const filtered = busses.filter((b) => !isNaN(b));

  function modInverse(a, m) {
      // validate inputs
      [a, m] = [Number(a), Number(m)]
      if (Number.isNaN(a) || Number.isNaN(m)) {
        return NaN // invalid input
      }
      a = (a % m + m) % m
      if (!a || m < 2) {
        return NaN // invalid input
      }
      // find the gcd
      const s = []
      let b = m
      while(b) {
        [a, b] = [b, a % b]
        s.push({a, b})
      }
      if (a !== 1) {
        return NaN // inverse does not exists
      }
      // find the inverse
      let x = 1
      let y = 0
      for(let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
      }
      return (y % m + m) % m
  }

  // w * id = x + i

  const n = filtered.reduce((a, b) => a * b);
  console.log({ filtered, n });
  console.log(filtered.map((b) => ({
      a: (b - busses.indexOf(b)) % b,
      n: n,
      n_: n / b,
      e: modInverse((n / b) % b, b) * n / b,
  })));
  const answer = filtered.map((b) => (((b - busses.indexOf(b)) % b) * modInverse((n / b) % b, b) % n * n / b) % n).reduce((a, b) => (a + b) % n);

  console.log(answer);
  // not 905694340256526
  document.querySelector(`input[name="answer"]`).value = answer;
  // document.querySelector(`input[type="submit"]`).click();
});
