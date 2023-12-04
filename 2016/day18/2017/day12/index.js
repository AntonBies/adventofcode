const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) => {
        const [input, program, connections] = row.match(
            /(\d+) <-> ([0-9,\s]+)/
        );
        return {
            program,
            conn: connections.split(", "),
        };
    });

const map = data.reduce((acc, cur) => {
    acc[cur.program] = cur.conn;
    return acc;
}, {});

const checked = [];
const getSize = (program) => {
    if (checked.includes(program)) return 0;
    checked.push(program);
    return map[program].reduce((acc, cur) => acc + getSize(cur), 1);
};

const sizes = Object.keys(map).reduce((acc, cur) => {
    acc[cur] = getSize(cur);
    return acc;
}, {});

console.log(sizes[0]);
console.log(Object.keys(sizes).filter((item) => sizes[item] > 0).length);
