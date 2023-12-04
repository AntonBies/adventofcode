const data = document.querySelector("pre").innerText.trim().split("\n");
const mod = data[0].length;
const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];

const checkTrees = ({ right, down }) => {
    let trees = 0;
    for (let i = 0; i < data.length; i += down) {
        const move = ((i / down) * right) % mod;
        if (data[i][move] === "#") trees++;
    }
    return trees;
};

slopes.reduce((acc, cur) => acc * checkTrees(cur), 1);
