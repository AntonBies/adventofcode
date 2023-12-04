const data = document.querySelector("pre").innerText.split(" ").map(Number);

class Node {
    constructor() {
        this.children = [];
        this.metadata = [];
    }

    addChild(input) {
        const node = new Node();
        const nrChildren = input.shift();
        const nrMeta = input.shift();
        for (let i = 0; i < nrChildren; i++) {
            node.addChild(input);
        }
        for (let i = 0; i < nrMeta; i++) {
            node.addMeta(input.shift());
        }
        this.children.push(node);
    }

    addMeta(item) {
        this.metadata.push(item);
    }
}

const root = new Node();
const nrChildren = data.shift();
const nrMeta = data.shift();
for (let i = 0; i < nrChildren; i++) {
    root.addChild(data);
}
for (let i = 0; i < nrMeta; i++) {
    root.addMeta(data.shift());
}

const sumAllMeta = (obj) => {
    const childrenSum = obj.children.reduce((acc, cur) => {
        return sumAllMeta(cur) + acc;
    }, 0);
    const curSum = obj.metadata.reduce((acc, cur) => acc + cur);
    return childrenSum + curSum;
};

const getValue = ({ children, metadata }) => {
    if (!children.length) return metadata.reduce((acc, cur) => acc + cur, 0);
    let sum = 0;
    for (let index of metadata) {
        const child = children[index - 1];
        if (child) sum += getValue(child);
    }
    return sum;
};

console.log(sumAllMeta(root));
console.log(getValue(root));
