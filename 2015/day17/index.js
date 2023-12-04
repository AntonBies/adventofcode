const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map(Number);
const total = 150;
const options = new Set();
let minAmount = 150;

const getSum = (arr) => arr.reduce((acc, cur) => acc + data[cur], 0);

const calculateOptions = (arr, option) => {
    const sum = getSum(option);
    if (sum > total) return;
    if (sum === total) {
        minAmount = Math.min(minAmount, option.length);
        return options.add(option.sort().join(","));
    }
    const last = option.at(-1);

    for (let i = last + 1; i < arr.length; i++) {
        calculateOptions(arr, [...option, i]);
    }
};

for (let i = 0; i < data.length; i++) {
    calculateOptions(data, [i]);
}

console.log(options.size);

options.forEach((item) => {
    const len = item.split(",").length;
    if (len > minAmount) options.delete(item);
});

console.log(options.size);
