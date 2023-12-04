const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .trim()
    .split("");

const pieces = [
    [["#", "#", "#", "#"]],

    [
        [" ", "#", " "],
        ["#", "#", "#"],
        [" ", "#", " "],
    ],

    [
        [" ", " ", "#"],
        [" ", " ", "#"],
        ["#", "#", "#"],
    ],

    [["#"], ["#"], ["#"], ["#"]],

    [
        ["#", "#"],
        ["#", "#"],
    ],
];
const getHeight = (arena) =>
    [...arena]
        .map((coord) => parseInt(coord.split(",")[1]))
        .reduce((max, height) => Math.max(max, height), -1) + 1;

const part1 = (input) => {
    let currentPiece = { position: { x: 0, y: 0 }, type: -1 };
    let pieceCount = 0,
        moveIndex = 0;
    let arena = new Set(),
        width = 7;
    while (pieceCount < 2022) {
        currentPiece.type = (currentPiece.type + 1) % pieces.length;
        let highest = getHeight(arena);
        currentPiece.position = {
            x: 2,
            y: highest + 3 + pieces[currentPiece.type].length - 1,
        };

        while (true) {
            let move = input[moveIndex] == ">" ? 1 : -1;
            moveIndex = (moveIndex + 1) % input.length;

            let xCollision = false;
            for (let y = 0; y < pieces[currentPiece.type].length; y++) {
                for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                    if (pieces[currentPiece.type][y][x] != "#") continue;

                    if (
                        currentPiece.position.x + x + move < 0 ||
                        currentPiece.position.x + x + move >= width ||
                        arena.has(
                            `${currentPiece.position.x + x + move},${
                                currentPiece.position.y - y
                            }`
                        )
                    )
                        xCollision = true;
                }
            }

            if (!xCollision) currentPiece.position.x += move;

            let yCollision = false;
            for (let y = 0; y < pieces[currentPiece.type].length; y++) {
                for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                    if (pieces[currentPiece.type][y][x] != "#") continue;

                    if (
                        currentPiece.position.y - y - 1 < 0 ||
                        arena.has(
                            `${currentPiece.position.x + x},${
                                currentPiece.position.y - y - 1
                            }`
                        )
                    )
                        yCollision = true;
                }
            }

            if (yCollision) break;
            else currentPiece.position.y--;
        }

        for (let y = 0; y < pieces[currentPiece.type].length; y++) {
            for (let x = 0; x < pieces[currentPiece.type][y].length; x++) {
                if (pieces[currentPiece.type][y][x] != "#") continue;
                arena.add(
                    `${currentPiece.position.x + x},${
                        currentPiece.position.y - y
                    }`
                );
            }
        }

        pieceCount++;
    }

    return getHeight(arena);
};

console.log(part1(data));
