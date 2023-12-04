const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) =>
        row.match(
            /(.+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)$/
        )
    )
    .map((arr) => ({
        name: arr[1].toLowerCase(),
        capacity: Number(arr[2]),
        durability: Number(arr[3]),
        flavor: Number(arr[4]),
        texture: Number(arr[5]),
        calories: Number(arr[6]),
    }));

const map = {};
for (let ingredient of data) {
    map[ingredient.name] = ingredient;
}

const getValue = (balance, name) => {
    let value = 0;
    for (let key in balance) {
        value += map[key][name] * balance[key];
    }
    return value;
};

const getScore = (balance) => {
    const capacity = getValue(balance, "capacity");
    const durability = getValue(balance, "durability");
    const flavor = getValue(balance, "flavor");
    const texture = getValue(balance, "texture");
    const calories = getValue(balance, "calories");
    if (calories !== 500) return 0;
    if ([capacity, durability, flavor, texture].some((value) => value <= 0))
        return 0;
    return capacity * durability * flavor * texture;
};

let maxScore = 0;

for (let i = 100; i >= 0; i--) {
    const for2 = 100 - i;
    const first = data[0].name;
    const second = data[1].name;
    const third = data[2].name;
    const fourth = data[3].name;
    for (let j = for2; j >= 0; j--) {
        const for3 = 100 - (i + j);
        for (let k = for3; k >= 0; k--) {
            const for4 = 100 - (i + j + k);
            const score = getScore({
                [first]: i,
                [second]: j,
                [third]: k,
                [fourth]: for4,
            });
            maxScore = Math.max(maxScore, score);
        }
    }
}

maxScore;
