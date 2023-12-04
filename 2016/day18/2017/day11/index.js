const input = document.querySelector("pre").innerText.trim().split(",");

let x = 0,
    y = 0,
    z = 0,
    max = 0;

const map = {
    n: [0, 1, -1],
    ne: [1, 0, -1],
    se: [1, -1, 0],
    s: [0, -1, 1],
    sw: [-1, 0, 1],
    nw: [-1, 1, 0],
};

for (let instr of input) {
    const [dx, dy, dz] = map[instr];
    x += dx;
    y += dy;
    z += dz;
    const dist = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
    max = Math.max(max, dist);
}

console.log((Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2);
console.log(max);
