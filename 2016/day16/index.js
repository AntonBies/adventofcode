const input = "10001110011110000";
const len = 272;
let a = input;

const checkSum = (str) => {
    let cs = "";
    for (let i = 0; i < str.length; i += 2) {
        const j = i + 1;
        cs += str[i] === str[j] ? "1" : "0";
    }
    return cs;
};

while (a.length < len) {
    const b = a
        .split("")
        .reverse()
        .map((_) => (_ === "1" ? "0" : "1"))
        .join("");
    a = a + "0" + b;
}

a = a.slice(0, len);
debugger;
let cs = checkSum(a);

while (cs.length % 2 === 0) {
    cs = checkSum(cs);
}

cs;
