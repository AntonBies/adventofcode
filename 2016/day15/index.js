const data = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .map((disc) => {
        const [input, nr, len, start] = disc
            .match(
                /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)/
            )
            .map(Number);
        return {
            nr,
            len,
            start,
        };
    });

let time = 0;

while (true) {
    if (
        data.every(({ nr, len, start }) => {
            const hit = time + nr;
            const pos = (start + hit) % len;
            return pos === 0;
        })
    )
        break;
    time++;
}

console.log(time);

time = 0;
data.push({ nr: data.length + 1, len: 11, start: 0 });
data;

while (true) {
    if (
        data.every(({ nr, len, start }) => {
            const hit = time + nr;
            const pos = (start + hit) % len;
            return pos === 0;
        })
    )
        break;
    time++;
}

console.log(time);
