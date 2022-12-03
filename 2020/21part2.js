fetch(`${window.location.pathname}/input`).then((r) => r.text()).then((text) => {
    const allAllergens = new Map();
    const allIngredients = [];
    const input = text.trim().split("\n").map((line) => {
        const { ingredientsPart, allergensPart } = line.match(/^(?<ingredientsPart>[a-z ]+) \(contains (?<allergensPart>[a-z, ]+)\)$/).groups;
        const ingredients = ingredientsPart.split(" ");
        const allergens = allergensPart.split(", ");
        allergens.forEach((a) => {
            const r = allAllergens.get(a);
            allAllergens.set(a, new Set(r === undefined ? ingredients : ingredients.filter((i) => r.has(i))));
        })
        allIngredients.push(...ingredients);
        return { allergens, ingredients };
    });

    const ingredientsWithAllergens = new Map([...allAllergens].map(() => {
        const [a, ingredients] = [...allAllergens.entries()].find(([, i]) => i.size === 1);
        const ingredient = [...ingredients][0];
        allAllergens.delete(a);
        allAllergens.forEach((ingredients) => {
            ingredients.delete(ingredient);
        });
        return [ingredient, a];
    }));

    const answer = [...ingredientsWithAllergens].sort((a, b) => a[1].localeCompare(b[1])).map(([i]) => i).join(",");

    console.log(answer);
    // document.querySelector(`input[name="answer"]`).value = answer;
    // document.querySelector(`input[type="submit"]`).click();
});
