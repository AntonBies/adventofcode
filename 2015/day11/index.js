const getNextPassword = (input) => {
    let output = input.split("");
    let letterIndex = input.length - 1;
    let letterCode = input.charCodeAt(letterIndex);

    while (letterCode === 122) {
        output[letterIndex] = "a";
        letterIndex--;
        letterCode = input.charCodeAt(letterIndex);
    }

    output[letterIndex] = String.fromCharCode(letterCode + 1);
    return output.join("");
};

const includes3 = (input) => {
    for (let i = 0; i < input.length - 2; i++) {
        const curCode = input.charCodeAt(i);
        if (
            curCode === input.charCodeAt(i + 1) - 1 &&
            curCode === input.charCodeAt(i + 2) - 2
        )
            return true;
    }
    return false;
};

const noBannedLetters = (input) => !input.match(/i|l|o/);

const hasTwoPairs = (input) => !!input.match(/(.)\1.*(.)\2/);

const isValid = (input) =>
    noBannedLetters(input) && includes3(input) && hasTwoPairs(input);

let password = "hxbxwxba";

while (!isValid(password)) {
    password = getNextPassword(password);
}
password = getNextPassword(password);
while (!isValid(password)) {
    password = getNextPassword(password);
}
password;
