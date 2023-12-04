const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean);

const createTree = (lines) => {
    const tree = {
        name: "/",
        isDirectory: true,
        children: [],
        size: 0,
    };

    let currentNode = tree;
    let currentCommand = null;

    for (const line of lines) {
        if (line[0] === "$") {
            const match = /\$\s(?<command>\w+)(?:\s(?<arg>.+))?/.exec(line);
            currentCommand = match.groups.command;

            if (currentCommand === "cd") {
                const target = match.groups.arg;
                switch (target) {
                    case "/":
                        currentNode = tree;
                        break;
                    case "..":
                        currentNode = currentNode.parent;
                        break;
                    default:
                        currentNode = currentNode.children.find(
                            (folder) =>
                                folder.isDirectory && folder.name === target
                        );
                }
            }
        }
        if (line.startsWith("dir")) {
            const newChild = {
                name: line.split("dir ")[1],
                isDirectory: true,
                children: [],
                parent: currentNode,
                size: 0,
            };
            currentNode.children.push(newChild);
        }
        if (line[0].match(/\d/)) {
            const newChild = {
                name: line.split(" ")[1],
                isDirectory: false,
                children: [],
                parent: currentNode,
                size: Number(line.split(" ")[0]),
            };
            currentNode.children.push(newChild);
        }
    }
    return tree;
};

const filesystem = createTree(data);
const sizes = [];

const findSize = (node) => {
    if (!node.isDirectory) return node.size;
    const dirSize = node.children
        .map((child) => findSize(child))
        .reduce((acc, cur) => acc + cur, 0);

    sizes.push(dirSize);
    return dirSize;
};

findSize(filesystem);
console.log(sizes.reduce((acc, cur) => (cur <= 100000 ? acc + cur : acc), 0));

const neededSpace = sizes[sizes.length - 1] - 40000000;
sizes.sort((a, b) => a - b);
console.log(sizes.find((size) => size >= neededSpace));
