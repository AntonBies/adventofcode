const nodes = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .slice(2)
    .map((_) => {
        let [name, size, used, avail, useperc] = _.split(/[\s]+/);
        name = `${name.match(/x(\d+).*y(\d+)/).slice(1, 3)}`;
        [size, used, avail, useperc] = [size, used, avail, useperc]
            .map((_) => _.slice(0, -1))
            .map(Number);
        return { name, size, used, avail, useperc };
    });

console.log(
    nodes.reduce((acc, cur, i, list) => {
        const { name, size, used, avail, useperc } = cur;
        if (used === 0) return acc;
        const pairNodes = list.filter((_) => {
            return used <= _.avail && _.name !== name;
        });
        return acc + pairNodes.length;
    }, 0)
);

const grid = Array(32)
    .fill(0)
    .map((_) => Array(30));

for (let node of nodes) {
    const [x, y] = node.name.split(",");
    grid[y][x] = {
        size: node.size,
        used: node.used,
        avail: node.avail,
    };
}

console.log(
    grid
        .map((row) =>
            row
                .map((_) => (_.used < 1 ? "0" : _.used > 100 ? "#" : "."))
                .join(" ")
        )
        .join("\n")
);
