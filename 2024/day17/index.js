const fs = require("fs");
const path = require("path");

const division = (obj, operand) => {
    return Math.floor(obj.A / Math.pow(2, operand));
};

class Computer {
    constructor({ A, B, C }, program) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.program = program;
        this.pointer = 0;
        this.output = [];
        this.operations = {
            0: function (obj, op) {
                const operand = obj.getComboOperand(op);
                obj.A = division(obj, operand);
                obj.pointer += 2;
                return obj;
            },
            1: function (obj, op) {
                obj.B = (obj.B ^ op) >>> 0;
                obj.pointer += 2;
                return obj;
            },
            2: function (obj, op) {
                const operand = obj.getComboOperand(op);
                obj.B = operand % 8;
                obj.pointer += 2;
                return obj;
            },
            3: function (obj, op) {
                obj.pointer = obj.A === 0 ? obj.pointer + 2 : op;
                return obj;
            },
            4: function (obj, op) {
                obj.B = (obj.B ^ obj.C) >>> 0;
                obj.pointer += 2;
                return obj;
            },
            5: function (obj, op) {
                const operand = obj.getComboOperand(op);
                obj.output.push(operand % 8);
                obj.pointer += 2;
                return obj;
            },
            6: function (obj, op) {
                const operand = obj.getComboOperand(op);
                obj.B = division(obj, operand);
                obj.pointer += 2;
                return obj;
            },
            7: function (obj, op) {
                const operand = obj.getComboOperand(op);
                obj.C = division(obj, operand);
                obj.pointer += 2;
                return obj;
            },
        };
    }

    getComboOperand(op) {
        const map = {
            4: this.A,
            5: this.B,
            6: this.C,
        };
        return map[op] ?? op;
    }

    doOperation(opcode, operand) {
        return this.operations[opcode](this, operand);
    }
}

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n");

const registers = data[0].split("\n").reduce((acc, row) => {
    const [_, name, initialValue] = row.match(/Register\s([ABC]):\s(\d+)/);
    acc[name] = Number(initialValue);
    return acc;
}, {});

const instr = data[1].match(/\d+.+/)[0].split(",").map(Number);

const partone = () => {
    const computer = new Computer(registers, instr);
    while (computer.pointer < computer.program.length) {
        const { pointer, program } = computer;
        computer.doOperation(program[pointer], program[pointer + 1]);
    }
    console.log(computer.output.join(","));
};

partone();
