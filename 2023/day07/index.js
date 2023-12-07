const fs = require("fs");
const path = require("path");

const cards = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
const jCards = ['J','2','3','4','5','6','7','8','9','T','Q','K','A'];
const typeMap = {'5': 6,'4,1': 5,'3,2': 4,'3,1,1': 3,'2,2,1': 2,'2,1,1,1': 1,'1,1,1,1,1': 0};

const getType = (obj) => {
    const str = Object.values(obj.counts).toSorted((a,b) => b - a).join();
    obj.type = typeMap[str];
    return obj.type;
}

const getJtype = (obj) => {
    const newCounts = {};
    for (let key in obj.counts) {
        if (key === 'J') continue;
        newCounts[key] = obj.counts[key];
    }
    if (obj.counts.J === 5) {
        newCounts.J = 5;
    } else if (obj.counts.J) {
        const sorted = Object.entries(newCounts).toSorted((a,b) => b[1] - a[1]);
        newCounts[sorted[0]?.[0]] += obj.counts.J;
    }
    const str = Object.values(newCounts).toSorted((a,b) => b - a).join();
    obj.jtype = typeMap[str];
    return obj.jtype;
}

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        const [hand, bid] = row.split(' ');
        const obj = hand.split('').reduce((acc, cur) => {
            acc[cur] = acc[cur] || 0;
            acc[cur]++;
            return acc;
        }, {})
        return {
            hand,
            bid: Number(bid),
            counts: obj
        };
    });

const rankedHands = data.toSorted((a,b) => {
    const [typeA, typeB] = [a.type || getType(a), b.type || getType(b)];
    if (typeA === typeB) {
        const [handA, handB] = [a.hand.split(""), b.hand.split("")];
        const i = handA.findIndex((letter, i) => letter !== handB[i]);
        return cards.indexOf(handA[i]) - cards.indexOf(handB[i]);
    }
    return typeA - typeB;
});

const rankedHandsWithJokers = data.toSorted((a,b) => {
    const [typeA, typeB] = [a.jtype || getJtype(a), b.jtype || getJtype(b)];
    if (typeA === typeB) {
        const [handA, handB] = [a.hand.split(""), b.hand.split("")];
        const i = handA.findIndex((letter, i) => letter !== handB[i]);
        return jCards.indexOf(handA[i]) - jCards.indexOf(handB[i]);
    }
    return typeA - typeB;
})

console.log(rankedHands.reduce((acc, cur, i) => acc + cur.bid * (i+1), 0));
console.log(rankedHandsWithJokers.reduce((acc, cur, i) => acc + cur.bid * (i+1), 0));