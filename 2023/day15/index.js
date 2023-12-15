const fs = require("fs");
const path = require("path");

const hash = (val) => {
	let hash = 0;
	for (let i in val) hash = (hash + val.charCodeAt(i)) * 17 % 256
	return hash; 
}

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split(",");

const verificationNumber = data.reduce((acc, cur) => acc + hash(cur), 0);
console.log(verificationNumber);

const boxes = data.reduce((acc, cur) => {
	const [fullMatch, label, op, n] = cur.match(/([a-z]+)([=-])(\d+)?/);
	const box = hash(label);
	acc[box] = acc[box] || [];
	const labelIndex = acc[box].findIndex(item => item.startsWith(label+"="));
	if (op === "-") labelIndex > -1 && acc[box].splice(labelIndex, 1);
	if (op === "=") labelIndex > -1 ? acc[box][labelIndex] = fullMatch : acc[box].push(fullMatch);
	return acc;
}, {});

const focusPower = Object.entries(boxes).reduce((acc, [box, lensArr]) => {
	return acc + lensArr.reduce((acc, lens, i) => acc + Number(lens.split("=")[1]) * (Number(box) + 1) * (i + 1), 0);
}, 0);
console.log(focusPower);