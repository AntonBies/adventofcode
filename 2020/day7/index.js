const data = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .map((row) => {
        const [input, name, contents] = row.match(
            /([a-z]+ [a-z]+) bags contain (.+ bags?)\./
        );
        const children = [];
        if (contents !== "no other bags") {
            contents.split(", ").forEach((_) => {
                const [input, amount, name] = _.match(
                    /(\d+) ([a-z]+ [a-z]+) bags?/
                ).map((item, i) => (i === 1 ? Number(item) : item));
                children.push({ name, amount });
            });
        }
        return { name, children };
    });

const queue = ["shiny gold"];
const visited = new Set();
let sum = 0;

while (queue.length > 0) {
    const target = queue.shift();
    for (let bag of data) {
        if (visited.has(bag.name)) continue;
        if (bag.children.map((_) => _.name).includes(target)) {
            sum++;
            queue.push(bag.name);
            visited.add(bag.name);
        }
    }
}

const countBags = (bag) => {
    const obj = data.find((_) => _.name === bag);
    return obj.children.reduce((acc, cur) => {
        return acc + cur.amount + cur.amount * countBags(cur.name);
    }, 0);
};

countBags("shiny gold");
