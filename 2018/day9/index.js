const nrPlayers = 423;
const lastMarble = 71944 * 100;

const scores = {};
for (let i = 0; i < nrPlayers; i++) {
    scores[i] = 0;
}

let current = {
    value: 0,
};
current.next = current;
current.previous = current;

const addAfter = (value, marble) => {
    const newMarble = {
        value: value,
        next: marble.next,
        previous: marble,
    };
    marble.next.previous = newMarble;
    marble.next = newMarble;
    return newMarble;
};

const remove = (marble) => {
    const prev = marble.previous;
    const next = marble.next;
    next.previous = prev;
    prev.next = next;
    current = next;
    return marble.value;
};

const playTurn = (turn) => {
    const player = turn % nrPlayers;
    const value = turn + 1;
    if (value % 23 === 0) {
        current =
            current.previous.previous.previous.previous.previous.previous
                .previous;
        const removed = remove(current);
        scores[player] = scores[player] + value + removed;
    } else {
        current = addAfter(value, current.next);
    }
};

for (let i = 0; i < lastMarble; i++) {
    playTurn(i);
}

Math.max(...Object.values(scores));
