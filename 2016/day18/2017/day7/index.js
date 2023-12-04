const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split(" -> "))
    .map(([nameAndWeight, children]) => {
        const [name, weight] = nameAndWeight.split(" ");
        return {
            name,
            weight: weight.match(/\d+/g).map(Number)[0],
            next: children?.split(", "),
        };
    });

class Node {
    constructor(name, weight, children) {
        this.name = name;
        this.weight = weight;
        this.children = [];
        this.parent = null;
    }
}

class Tree {
    constructor() {
        this.root = new Node("root", 0, []);
    }
    addNode({ name, next }) {
        if (!next) return;
        const node = nodes[name];
        this.root.children.push(node);
        for (let childName of next) {
            const childNode = nodes[childName];
            childNode.parent = node;
            node.children.push(childNode);
            noRootChildren.push(childName);
        }
    }
}

const nodes = {};
const noRootChildren = [];
const tree = new Tree();
//debugger;
for (let node of data) {
    const { name, weight, next } = node;
    nodes[name] = new Node(name, weight, next);
}

for (let node of data) {
    tree.addNode(node);
}

tree.root.children = tree.root.children.filter((node) => {
    return !noRootChildren.includes(node.name);
});

const getTotalWeight = (node) => {
    const currentNodeWeight = node.weight;
    const childrenWeight = node.children.reduce((acc, cur) => {
        return acc + getTotalWeight(cur);
    }, 0);
    return currentNodeWeight + childrenWeight;
};

const handleAllChildren = (node) => {
    for (let child of node.children) {
        child.total = getTotalWeight(child);
        handleAllChildren(child);
    }
};

const actualRoot = tree.root.children[0];
actualRoot.total = getTotalWeight(actualRoot);
handleAllChildren(actualRoot);

const childrenEqual = (node) => {
    childrenWeight = new Set(node.children.map((child) => child.total));
    node.equalChildren = childrenWeight.size === 1;
};

const checkAll = (node) => {
    for (let child of node.children) {
        childrenEqual(node);
        checkAll(child);
    }
};

childrenEqual(actualRoot);
checkAll(actualRoot);

const findChild = (node) => {
    let allChildrenEqual = node.equalChildren;
    if (!allChildrenEqual) {
        const unEqualChild = node.children.find(
            (child) => !child.equalChildren
        );
        if (unEqualChild) return findChild(unEqualChild);
        return node;
    }
};

console.log(
    findChild(actualRoot).children.map((item) => ({
        weight: item.weight,
        total: item.total,
    }))
);
