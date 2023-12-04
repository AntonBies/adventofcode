const shop = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n\n")
    .map((cat) =>
        cat
            .split("\n")
            .slice(1)
            .map((weapon) => {
                const [input, name, cost, damage, armor] = weapon
                    .match(/(.+\s?\w)\s\s+(\d+)\s\s+(\d+)\s\s+(\d+)/)
                    .map((item) =>
                        !isNaN(Number(item)) ? Number(item) : item
                    );
                return { name, cost, damage, armor };
            })
    );

shop[1].push({ name: "None", cost: 0, damage: 0, armor: 0 });
shop[2].push({ name: "None1", cost: 0, damage: 0, armor: 0 });
shop[2].push({ name: "None2", cost: 0, damage: 0, armor: 0 });

class Player {
    constructor(points, damage, armor) {
        this.points = points;
        this.damage = damage;
        this.armor = armor;
    }
}

const fight = (player, boss) => {
    let winner = null;
    const bosshit = Math.max(player.damage - boss.armor, 1);
    const playerhit = Math.max(boss.damage - player.armor, 1);
    while (true) {
        boss.points -= bosshit;
        if (boss.points <= 0) {
            winner = "player";
            break;
        }
        player.points -= playerhit;
        if (player.points <= 0) {
            winner = "boss";
            break;
        }
    }
    return winner;
};

const winresult = {
    cost: Number.MAX_VALUE,
    combination: {},
};

const loseresult = {
    cost: Number.MIN_VALUE,
    combination: {},
};

for (let weapon of shop[0]) {
    for (let armor of shop[1]) {
        for (let ring of shop[2]) {
            const ringsLeft = shop[2].filter((el) => el.name !== ring.name);
            for (let secondRing of ringsLeft) {
                const cost =
                    weapon.cost + armor.cost + ring.cost + secondRing.cost;
                const boss = new Player(100, 8, 2);
                const player = new Player(
                    100,
                    weapon.damage + ring.damage + secondRing.damage,
                    armor.armor + ring.armor + secondRing.armor
                );
                if (fight(player, boss) === "player" && cost < winresult.cost) {
                    winresult.cost = cost;
                    winresult.comination = {
                        weapon: weapon.name,
                        armor: armor.name,
                        firstRing: ring.name,
                        secondRing: secondRing.name,
                    };
                }
                if (fight(player, boss) === "boss" && cost > loseresult.cost) {
                    loseresult.cost = cost;
                    loseresult.combination = {
                        weapon: weapon.name,
                        armor: armor.name,
                        firstRing: ring.name,
                        secondRing: secondRing.name,
                    };
                }
            }
        }
    }
}
