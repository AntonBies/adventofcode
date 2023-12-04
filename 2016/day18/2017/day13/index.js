const input = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .reduce((acc, cur) => {
        const [depth, range] = cur.split(": ").map(Number);
        return {
            [depth]: range,
            ...acc,
        };
    }, {});

const scannerAt0 = (range, t, d = 0) => {
    return (t + d) % (2 * (range - 1)) === 0;
};

const caught = (data, d) => {
    return data.some(([depth, range]) => scannerAt0(range, depth, d));
};

const last = Number(Object.keys(input).sort((a, b) => b - a)[0]);
let severity = 0;

for (let i = 0; i <= last; i++) {
    const cur = input[i];
    if (!cur) continue;
    if (scannerAt0(cur, i)) severity += i * cur;
}

let delay = 1;
const data = Object.entries(input).map((_) => _.map(Number));
while (caught(data, delay)) {
    delay++;
}

delay;
