const n = 3004953;

class Elf {
    constructor(pos) {
        this.pos = pos;
        this.presents = 1;
        this.target = null;
        this.next = null;
        this.prev = null;
    }
}

class Circle {
    constructor() {
        this.head = new Elf(1);
        this.head.next = this.head;
        this.head.prev = this.head;
        this.tail = this.head;
        this.current = this.head;
        this.length = 1;
    }

    append(pos) {
        const newElf = new Elf(pos);
        newElf.prev = this.tail;
        newElf.next = this.head;
        this.tail.next = this.tail = this.head.prev = newElf;
        this.length++;
        return this;
    }

    takeLeft() {
        const amount = this.current.next.presents;
        this.current.presents += amount;
        this.current.next = this.current.next.next;
        this.current.next.prev = this.current;
        this.current = this.current.next;
        this.length--;
    }

    setTarget() {
        let target = this.current;
        const steps = Math.floor(this.length / 2);
        for (let i = 0; i < steps; i++) {
            target = target.next;
        }
        this.target = target;
    }

    takeAcross() {
        const current = this.current;
        const target = this.target;
        const amount = target.presents;
        current.presents += amount;

        const prev = target.prev;
        const next = target.next;
        prev.next = next;
        next.prev = prev;

        this.length--;
        this.current = current.next;
        this.target = this.length % 2 === 0 ? next.next : next;
    }
}

const elves = new Circle();
for (let i = 2; i <= n; i++) {
    elves.append(i);
}
delete elves.head;
delete elves.tail;
elves.setTarget();

while (elves.length > 1) {
    elves.takeAcross();
}
elves.current.pos;
