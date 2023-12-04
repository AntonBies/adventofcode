let data = document.querySelector("pre").innerText.trim().split("\n");

const startVal = "abcdefgh".split("");

const actions = {
    "move position": function (instr, val) {
        const [input, x, y] = instr.match(/(\d)[^0-9]+(\d)/).map(Number);
        if (x < y)
            return [
                ...val.slice(0, x),
                ...val.slice(x + 1, y + 1),
                val[x],
                ...val.slice(y + 1),
            ];
        if (y < x)
            return [
                ...val.slice(0, y),
                val[x],
                ...val.slice(y, x),
                ...val.slice(x + 1),
            ];
        return val;
    },
    "swap position": function (instr, val) {
        const [input, x, y] = instr.match(/(\d)[^0-9]+(\d)/).map(Number);
        [val[x], val[y]] = [val[y], val[x]];
        return val;
    },
    "swap letter": function (instr, val) {
        const [input, x, y] = instr.match(/letter (.) with letter (.)/);
        return val.map((_) => (_ === x ? y : _ === y ? x : _));
    },
    "rotate left": function (instr, val) {
        const k = val.length - parseInt(instr.match(/(\d)/)[1]);
        const copy = [...val];
        for (let i = 0; i < val.length; i++) {
            const newIndex = (i + k) % val.length;
            val[newIndex] = copy[i];
        }
        return val;
    },
    "rotate right": function (instr, val) {
        const k = parseInt(instr.match(/(\d)/)[1]);
        const copy = [...val];
        for (let i = 0; i < val.length; i++) {
            const newIndex = (i + k) % val.length;
            val[newIndex] = copy[i];
        }
        return val;
    },
    "rotate based": function (instr, val) {
        const x = instr.match(/letter (.)/)[1];
        const index = val.indexOf(x);
        const k = index > 3 ? index + 2 : index + 1;
        const copy = [...val];
        for (let i = 0; i < val.length; i++) {
            const newIndex = (i + k) % val.length;
            val[newIndex] = copy[i];
        }
        return val;
    },
    "reverse positions": function (instr, val) {
        const [input, x, y] = instr.match(/(\d)[^0-9]+(\d)/).map(Number);
        return [
            ...val.slice(0, x),
            ...val.slice(x, y + 1).reverse(),
            ...val.slice(y + 1),
        ];
    },
};

let pw = startVal;

for (let row of data) {
    const instr = row.match(/[^\s]+\s[^\s]+/)[0];
    pw = actions[instr](row, pw);
}

console.log(pw.join(""));

const reverseActions = {
    "move position": function (instr, val) {
        const [input, y, x] = instr.match(/(\d)[^0-9]+(\d)/).map(Number);
        if (x < y)
            return [
                ...val.slice(0, x),
                ...val.slice(x + 1, y + 1),
                val[x],
                ...val.slice(y + 1),
            ];
        if (y < x)
            return [
                ...val.slice(0, y),
                val[x],
                ...val.slice(y, x),
                ...val.slice(x + 1),
            ];
        return val;
    },
    "swap position": function (instr, val) {
        const [input, x, y] = instr.match(/(\d)[^0-9]+(\d)/).map(Number);
        [val[x], val[y]] = [val[y], val[x]];
        return val;
    },
    "swap letter": function (instr, val) {
        const [input, x, y] = instr.match(/letter (.) with letter (.)/);
        return val.map((_) => (_ === x ? y : _ === y ? x : _));
    },
    "rotate right": function (instr, val) {
        const k = val.length - parseInt(instr.match(/(\d)/)[1]);
        const copy = [...val];
        for (let i = 0; i < val.length; i++) {
            const newIndex = (i + k) % val.length;
            val[newIndex] = copy[i];
        }
        return val;
    },
    "rotate left": function (instr, val) {
        const k = parseInt(instr.match(/(\d)/)[1]);
        const copy = [...val];
        for (let i = 0; i < val.length; i++) {
            const newIndex = (i + k) % val.length;
            val[newIndex] = copy[i];
        }
        return val;
    },
    "rotate based": function (instr, val) {
        const x = instr.match(/letter (.)/)[1];
        const index = val.indexOf(x);
        const k = [7, 7, 2, 6, 1, 5, 0, 4][index];
        const copy = [...val];
        for (let i = 0; i < val.length; i++) {
            const newIndex = (i + k) % val.length;
            val[newIndex] = copy[i];
        }
        return val;
    },
    "reverse positions": function (instr, val) {
        const [input, x, y] = instr.match(/(\d)[^0-9]+(\d)/).map(Number);
        return [
            ...val.slice(0, x),
            ...val.slice(x, y + 1).reverse(),
            ...val.slice(y + 1),
        ];
    },
};

data.reverse();
const scrambled = "fbgdceah".split("");

pw = scrambled;

for (let row of data) {
    const instr = row.match(/[^\s]+\s[^\s]+/)[0];
    pw = reverseActions[instr](row, pw);
}

console.log(pw.join(""));
