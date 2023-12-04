if (!window.md5) {
    const script = document.createElement("script");
    script.src = "https://www.myersdaily.org/joseph/javascript/md5.js";
    document.head.appendChild(script);
}

const input = document.querySelector(".puzzle-input").innerText;
const hashes = [];

const hashFn = (str, n) => {
    let hash = str;
    for (let i = 0; i < n; i++) {
        hash = md5(hash);
    }
    return hash;
};

const isKey = (hash, index, n) => {
    const triple = hash.match(/(.)\1{2}/);
    if (!triple) return false;
    const char = triple[1];
    for (let j = index + 1; j <= index + 1000; j++) {
        hashes[j] = hashes[j] || hashFn(input + j, n);
        const regex = new RegExp(`(${char})\\1{4}`);
        const match = hashes[j].match(regex);
        if (match) {
            return true;
        }
    }
    return false;
};

const get64 = (salt, strechting = false) => {
    let i = -1;
    let n = strechting ? 2017 : 1;
    const keys = [];
    while (keys.length < 64) {
        i++;
        hashes[i] = hashes[i] || hashFn(input + i, n);
        const key = isKey(hashes[i], i, n);
        if (key) keys.push(i);
    }
    return i;
};

get64(input, true);
