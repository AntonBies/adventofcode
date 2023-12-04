const fs = require('fs');
const path = require('path');

const ops = {
    "AND": (a,b) => a & b,
    "OR": (a,b) => a | b,
    "LSHIFT": (a,b) => (a << b) % 65536,
    "RSHIFT": (a,b) => (a >> b)% 65536,
    "NOT": (a) => 65535 - a
}

const isNumber = (input) => {
    return !isNaN(Number(input))
}

const wires = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce((acc, item) => {
        const [from, to] = item.split(" -> ");
        const parts = from.split(" ");
        if (parts.length === 3) {
            let [a, operator, b] = parts;
            acc[to] = function() {
                a = isNumber(a) ? Number(a) : wires[a]();
                b = isNumber(b) ? Number(b) : wires[b]();
                return ops[operator](a, b);
            }
        } else if (parts.length === 2) {
            let [operator, a] = parts;
            acc[to] = function() {
                a = isNumber(a) ? Number(a) : wires[a]();
                return ops[operator](a);
            }
   
        } else {
            let a = parts[0];
            acc[to] = function() {
                return isNumber(a) ? Number(a) : wires[a]()
            }
        }
        return acc;
    }, {});

const newWires = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce((acc, item) => {
        const [from, to] = item.split(" -> ");
        const parts = from.split(" ");
        if (parts.length === 3) {
            let [a, operator, b] = parts;
            acc[to] = function() {
                a = isNumber(a) ? Number(a) : newWires[a]();
                b = isNumber(b) ? Number(b) : newWires[b]();
                return ops[operator](a, b);
            }
        } else if (parts.length === 2) {
            let [operator, a] = parts;
            acc[to] = function() {
                a = isNumber(a) ? Number(a) : newWires[a]();
                return ops[operator](a);
            }
   
        } else {
            let a = parts[0];
            acc[to] = function() {
                return isNumber(a) ? Number(a) : newWires[a]()
            }
        }
        return acc;
    }, {});

const signal = wires.a();
newWires.b = function() { return signal };
console.log(signal);
console.log(newWires.a());