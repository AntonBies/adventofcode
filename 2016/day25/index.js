const data = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .map((_) => {
        const [instr, val1, val2] = _.split(" ").map((val) =>
            Number.isNaN(Number(val)) ? val : Number(val)
        );
        return { instr, first: val1, second: val2 };
    });

const registers = { b: 0, c: 0, d: 0 };
let output = [];
const fns = {
    cpy: function (a, b, i) {
        if (typeof b === "number") return i;
        const val = typeof a === "number" ? a : registers[a];
        registers[b] = val;
        return i;
    },
    inc: function (a, b, i) {
        registers[a]++;
        return i;
    },
    dec: function (a, b, i) {
        registers[a]--;
        return i;
    },
    jnz: function (a, b, i) {
        const x = typeof a === "number" ? a : registers[a];
        const y = typeof b === "number" ? b : registers[b];
        if (x === 0) return i;
        return i + y - 1;
    },
    out: function (a, b, i) {
        output.push(registers[a]);
        return i;
    },
};

function gatherOutput(init) {
    registers.a = init;
    for (let i = 0; i < data.length; i++) {
        if (output.length > 20) return;
        const { instr, first, second } = data[i];
        i = fns[instr](first, second, i);
    }
}

function testOutput(init) {
    gatherOutput(init);
    return output.every((_, i) => i % 2 === _);
}

let j = 0;
while (!testOutput(j)) {
    output = [];
    j++;
}

j;
