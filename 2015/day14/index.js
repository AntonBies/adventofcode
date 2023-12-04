const data = document
    .querySelector("pre")
    .innerText.split("\n")
    .filter(Boolean)
    .map((row) =>
        row.match(
            /(.+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./
        )
    );

const map = {};

for (let row of data) {
    const [input, name, speed, flyDur, restDur] = row.map((item, index) => {
        if ([2, 3, 4].includes(index)) return Number(item);
        return item;
    });
    map[name] = {
        speed,
        flyDur,
        restDur,
    };
}

const distanceTraveled = (name, seconds) => {
    const { speed, flyDur, restDur } = map[name];
    const sessionLength = flyDur + restDur;
    const distancePerSession = flyDur * speed;

    const fullSessions = Math.floor(seconds / sessionLength);
    const timeLeft = seconds % sessionLength;

    if (timeLeft > flyDur) {
        return distancePerSession * (fullSessions + 1);
    }

    return distancePerSession * fullSessions + timeLeft * speed;
};

const maxDistance = function (seconds) {
    return Object.keys(map).reduce((acc, cur) => {
        const distance = distanceTraveled(cur, seconds);
        const max = Math.max(distance, acc);
        return max;
    }, -Infinity);
};

maxDistance(2503);
const scores = {};
for (let key in map) {
    scores[key] = 0;
}

const distancePerReindeer = function (seconds) {
    return Object.keys(map).reduce((acc, cur) => {
        const distance = distanceTraveled(cur, seconds);
        acc[cur] = distance;
        return acc;
    }, {});
};

const part2 = (seconds) => {
    for (let i = 1; i <= seconds; i++) {
        const distances = Object.entries(distancePerReindeer(i));
        const maxValue = distances.sort((a, b) => {
            return b[1] - a[1];
        })[0][1];
        const leaders = distances
            .filter((arr) => arr[1] === maxValue)
            .map((reindeer) => reindeer[0]);
        for (let leader of leaders) {
            scores[leader]++;
        }
    }
};

part2(2503);
console.log(scores);
