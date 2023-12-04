const input =
    ".^.^..^......^^^^^...^^^...^...^....^^.^...^.^^^^....^...^^.^^^...^^^^.^^.^.^^..^.^^^..^^^^^^.^^^..^";
const newRows = 399999;

const grid = [input.split("")];

const getTile = (left, right) => {
    if (left === right) return ".";
    return "^";
};

const addRow = () => {
    const rowNumber = grid.length;
    grid[rowNumber] = [];
    const prev = grid[rowNumber - 1];
    for (let i = 0; i < prev.length; i++) {
        const [left, right] = [prev[i - 1] || ".", prev[i + 1] || "."];
        grid[rowNumber][i] = getTile(left, right);
    }
};

for (let i = 0; i < newRows; i++) {
    addRow();
}

const safeTiles = grid.reduce((acc, row) => {
    return (
        acc +
        row.reduce((_, cur) => {
            if (cur === ".") _++;
            return _;
        }, 0)
    );
}, 0);

console.log(safeTiles);
