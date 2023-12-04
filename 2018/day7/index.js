const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) => {
        const [input, pre, post] = row.match(
            /Step (.+) must be finished before step (.+) can begin\./
        );
        return [pre, post];
    });

class Step {
    constructor(name) {
        this.name = name;
        this.finished = false;
        this.previous = [];
    }

    finish() {
        this.finished = true;
        return this;
    }

    addPrevious(step) {
        this.previous.push(step);
        return this;
    }

    removePrevious(step) {
        this.previous = this.previous.filter((el) => el !== step);
        return this;
    }
}

const steps = {};

for (let row of data) {
    const [pre, post] = row;
    steps[pre] = steps[pre] || new Step(pre);
    steps[post] = steps[post] || new Step(post);
    steps[post].addPrevious(pre);
}

let order = "";
const total = Object.keys(steps).length;

const getAvailableSteps = () => {
    const available = [];
    for (let step in steps) {
        if (steps[step].finished) continue;
        if (steps[step].previous.length === 0) available.push(steps[step]);
    }
    return available.sort((a, b) => {
        if (a.name < b.name) return -1;
        return 1;
    });
};

const finishStep = (step) => {
    step.finished = true;
    order += step.name;
    for (let post in steps) {
        steps[post].removePrevious(step.name);
    }
};

while (order.length < total) {
    const available = getAvailableSteps();
    finishStep(available[0]);
}

order;
