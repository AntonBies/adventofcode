const input = document.querySelector("pre").innerText.trim();
let garbage = false,
    nrGarbage = 0,
    score = 0,
    depth = 1;

for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "!") i++;
    else if (garbage && char !== ">") nrGarbage++;
    else if (char === "<") garbage = true;
    else if (char === ">") garbage = false;
    else if (char === "{") score += depth++;
    else if (char === "}") depth--;
}

console.log(score, nrGarbage);
