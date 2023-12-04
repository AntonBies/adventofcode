const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) =>
        row.match(/Sue (\d+): (.+): (\d+), (.+): (\d+), (.+): (\d+)$/)
    )
    .map((item) => ({
        name: Number(item[1]),
        [item[2]]: Number(item[3]),
        [item[4]]: Number(item[5]),
        [item[6]]: Number(item[7]),
    }));

const map = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
};

const isCorrectAunt = (aunt) => {
    for (let key in aunt) {
        if (key === "name") continue;
        if (key === "cats" || key === "trees") {
            if (aunt[key] <= map[key]) return false;
        } else if (key === "goldfish" || key === "pomeranians") {
            if (aunt[key] >= map[key]) return false;
        } else if (aunt[key] !== map[key]) {
            return false;
        }
    }
    return true;
};

for (let aunt of data) {
    if (isCorrectAunt(aunt)) console.log(aunt.name);
}
