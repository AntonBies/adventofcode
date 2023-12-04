const data = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .map((_) => _.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);

const ranges = [];

while (data.length) {
    let [low, high] = data.shift();
    while (data[0]?.[0] <= high + 1) {
        const [nextL, nextH] = data.shift();
        high = Math.max(high, nextH);
    }
    ranges.push([low, high]);
}

console.log(ranges[0][1] + 1);

ranges.reduce((acc, cur, i, a) => {
    if (i === 0) return acc;
    return acc + cur[0] - a[i - 1][1] - 1;
}, 0);
