const input = "94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243";
const data = input.split(",").map(Number);
const data2 = [...input].map((x) => x.charCodeAt(0));
data2.push(17, 31, 73, 47, 23);

function part1() {
    let list = [...Array(256).keys()],
        pos = 0,
        skip = 0;
    for (let len of data) {
        list = [...list.slice(pos), ...list.slice(0, pos)];
        list = [...list.slice(0, len).reverse(), ...list.slice(len)];
        list = [...list.slice(-pos), ...list.slice(0, -pos)];
        pos = (pos + len + skip++) % list.length;
    }

    return list[0] * list[1];
}

function part2() {
    let list = [...Array(256).keys()],
        pos = 0,
        skip = 0;
    const denseHash = [];
    for (let i = 0; i < 64; i++) {
        for (let len of data2) {
            list = [...list.slice(pos), ...list.slice(0, pos)];
            list = [...list.slice(0, len).reverse(), ...list.slice(len)];
            list = [...list.slice(-pos), ...list.slice(0, -pos)];
            pos = (pos + len + skip++) % list.length;
        }
    }

    for (let i = 0; i < 16; i++) {
        const xorValue = list
            .slice(i * 16, i * 16 + 16)
            .reduce((acc, cur) => acc ^ cur);
        denseHash.push(xorValue);
    }
    const zeropad = (n) => ("0" + n).slice(-2);
    return denseHash.map((el) => zeropad(el.toString(16))).join("");
}

console.log(part1());
console.log(part2());
