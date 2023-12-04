const arr = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .map(Number)
    .reverse();
const sum = arr.reduce((acc, cur) => acc + cur) / 3;
const sum2 = arr.reduce((acc, cur) => acc + cur) / 4;
let groups = [];
let minQe = Number.MAX_VALUE;
let minLen = Number.MAX_VALUE;

const getSum = (list, sum, group) => {
    const len = group.length;
    if (len > minLen) return 0;
    const sub = group.reduce((acc, cur) => acc + cur, 0);
    if (sub > sum) return 0;
    const qe = group.reduce((acc, cur) => acc * cur, 1);
    if (qe > minQe) return 0;
    if (sub === sum) {
        groups.push({ group, sub, qe });
        minLen = len;
        minQe = qe;
        return 0;
    }
    for (let weight of list) {
        const listCopy = [...list];
        const groupCopy = [...group];
        groupCopy.push(weight);
        const left = listCopy.filter((item) => item < weight);
        getSum(left, sum, groupCopy);
    }
};

//getSum(arr, sum, []);
getSum(arr, sum2, []);
groups;
