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

const registers = { a: 12, b: 0, c: 0, d: 0 };
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
    tgl: function (a, b, i) {
        const val = typeof a === "number" ? a : registers[a];
        if (!data[i + val]) return i;
        const { instr, first, second } = data[i + val];
        const newInstr = {
            inc: "dec",
            dec: "inc",
            tgl: "inc",
            cpy: "jnz",
            jnz: "cpy",
        };
        data[i + val].instr = newInstr[instr];
        return i;
    },
};

for (let i = 0; i < data.length; i++) {
    const { instr, first, second } = data[i];

    if (i === 4) {
        registers.a = registers.b * registers.d;
        registers.c = registers.d = 0;
        i = 9;
        continue;
    }
    i = fns[instr](first, second, i);
}

registers;
