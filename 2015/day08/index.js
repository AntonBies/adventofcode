const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) => row.split(""));

const countCharsInMemory = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item === '"') continue;
        if (item === "\\") {
            const next = arr[i + 1];
            if (next === "x") i += 2;
            i++;
        }
        count++;
    }
    return count;
};

const countExtraChars = (arr) => {
    let count = 2;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (["\\", '"'].includes(item)) count++;
    }
    return count;
};

const answer = data.reduce((acc, cur) => {
    const charsOfCode = cur.length;
    const charsInMemory = countCharsInMemory(cur);

    acc["charsOfCode"] = acc["charsOfCode"] || 0;
    acc["charsOfCode"] += charsOfCode;
    acc["charsInMemory"] = acc["charsInMemory"] || 0;
    acc["charsInMemory"] += charsInMemory;

    return acc;
}, {});

answer["charsOfCode"] - answer["charsInMemory"];

const part2 = data.reduce((acc, cur) => acc + countExtraChars(cur), 0);
part2;
