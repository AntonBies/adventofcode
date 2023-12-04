const input = document
    .querySelector("pre")
    .innerText.trim()
    .split("\n")
    .map((_) => parseInt(_.replace(/[FL]/g, 0).replace(/[BR]/g, 1), 2))
    .sort((a, b) => b - a);

console.log(input[0]);
console.log(
    input.find((_, i) => {
        if (_ !== input[i + 1] + 1) return true;
        return false;
    }) - 1
);
