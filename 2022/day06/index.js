const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("")
    .filter(Boolean);

const isStartOfPacket = (arr, index) => {
    if (index <= 2) return false;
    const packet = new Set(arr.slice(index - 3, index + 1));
    return packet.size === 4 ? index + 1 : false;
};

const startOfPacket = data.map((char, index) => isStartOfPacket(data, index));
console.log(startOfPacket.find(Boolean));

const isStartOfMessage = (arr, index) => {
    if (index <= 2) return false;
    const packet = new Set(arr.slice(index - 13, index + 1));
    return packet.size === 14 ? index + 1 : false;
};

const startOfMessage = data.map((char, index) => isStartOfMessage(data, index));
console.log(startOfMessage.find(Boolean));
