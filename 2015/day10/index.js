const transformNumber = (input) => {
    let toHandle = input;
    let output = "";

    while (toHandle.length) {
        const thisRound = toHandle[0];
        let currentIndex = 0;
        while (toHandle[currentIndex] === thisRound) {
            currentIndex++;
        }
        output = output + currentIndex + thisRound;
        toHandle = toHandle.slice(currentIndex);
    }
    return output;
};

let result = "1113222113";

for (let i = 0; i < 50; i++) {
    result = transformNumber(result, "");
}
result.length;
