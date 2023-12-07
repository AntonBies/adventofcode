(function () {
    const fs = require("fs");

    const data = fs
        .readFileSync("input.txt", { encoding: "utf-8" })
        .split("\n")
        .filter(Boolean)
        .map((row) => row.split(",").map((elf) => elf.split("-").map(Number)));

    const isFullyContained = ([first, second]) => {
        if (first[0] >= second[0] && first[1] <= second[1]) return true;
        if (second[0] >= first[0] && second[1] <= first[1]) return true;
        return false;
    };

    const hasOverlap = ([first, second]) => {
        if (first[0] > second[1] || first[1] < second[0]) return false;
        return true;
    };

    console.log(data.filter(isFullyContained).length);
    console.log(data.filter(hasOverlap).length);
})();
