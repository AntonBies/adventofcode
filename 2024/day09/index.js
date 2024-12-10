const fs = require("fs");
const path = require("path");

class Node {
    constructor(count, val, checked = false) {
        this.count = count;
        this.value = val;
        this.checked = checked;
        this.next = null;
        this.previous = null;
    }
}

class List {
    constructor(count, val) {
        this.head = new Node(count, val);
        this.tail = this.head;
    }

    append(count, val) {
        const newNode = new Node(count, val);
        newNode.previous = this.tail;
        this.tail.next = this.tail = newNode;
        return this;
    }

    remove(node) {
        if (node === this.tail) {
            this.tail = node.previous;
            this.tail.next = null;
            if (this.tail.value === ".") {
                this.tail = this.tail.previous;
                this.tail.next = null;
            }
        } else {
            const previous = node.previous;
            const next = node.next;
            node.value = ".";
            if (previous.value === "." && next.value !== ".")
                this.combine(previous, node);
            if (previous.value !== "." && next.value === ".")
                this.combine(node, next);
            if (previous.value === "." && next.value === ".")
                this.combine(previous, this.combine(node, next));
        }
        return this;
    }

    insertBefore(node, count, val, checked) {
        const newNode = new Node(count, val, checked);
        node.count -= count;
        const previous = node.previous;
        node.previous = newNode;
        previous.next = newNode;
        newNode.previous = previous;
        newNode.next = node;
        return this;
    }

    combine(first, second) {
        first.count += second.count;
        const next = second.next;
        first.next = next;
        if (next) {
            next.previous = first;
        } else {
            this.tail = first;
        }
        return first;
    }
}

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("");

const partone = (input) => {
    const disk = input.reduce((acc, count, i) => {
        if (i === 0) return acc;
        const val = i % 2 === 1 ? "." : Math.floor(i / 2);
        acc.append(Number(count), val);
        return acc;
    }, new List(Number(input[0]), 0));

    let left = disk.head,
        right = disk.tail;

    while (left !== disk.tail) {
        if (left.value === left.next.value) {
            disk.combine(left, left.next);
            if (left === disk.tail) continue;
        }
        if (left.value !== ".") {
            left = left.next;
            continue;
        }
        const needed = left.count;
        const available = right.count;
        if (needed <= available) {
            left.value = right.value;
            right.count -= needed;
        }
        if (needed > available) {
            disk.insertBefore(left, available, right.value);
            left = left.previous;
            right.count = 0;
        }
        if (right.count === 0) {
            disk.remove(right);
            right = disk.tail;
        }
    }
    let combinedDisk = [];
    let current = disk.head;
    while (current) {
        combinedDisk = combinedDisk.concat(
            Array(current.count).fill(current.value)
        );
        current = current.next;
    }
    console.log(combinedDisk.reduce((acc, val, i) => acc + val * i, 0));
};

const parttwo = (input) => {
    const disk = input.reduce((acc, count, i) => {
        if (i === 0) return acc;
        const val = i % 2 === 1 ? "." : Math.floor(i / 2);
        acc.append(Number(count), val);
        return acc;
    }, new List(Number(input[0]), 0));

    let file = disk.tail;
    while (file) {
        if (file.value === "." || !!file.checked) {
            file = file.previous;
            continue;
        }
        let place = disk.head;
        while (place !== file) {
            if (place.value !== "." || place.count < file.count) {
                place = place.next;
                continue;
            }
            if (place.count === file.count) {
                place.value = file.value;
                place.checked = true;
                disk.remove(file);
                file = file.previous;
                break;
            }
            if (place.count > file.count) {
                disk.insertBefore(place, file.count, file.value, true);
                disk.remove(file);
                file = file.previous;
                break;
            }
        }
        file = file.previous;
    }

    let combinedDisk = [];
    let current = disk.head;
    while (current) {
        combinedDisk = combinedDisk.concat(
            Array(current.count).fill(current.value)
        );
        current = current.next;
    }
    console.log(
        combinedDisk.reduce(
            (acc, val, i) => acc + (val === "." ? 0 : val) * i,
            0
        )
    );
};

partone(data);
parttwo(data);
