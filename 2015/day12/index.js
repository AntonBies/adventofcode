const data = JSON.parse(document.querySelector("pre").innerText);

const getType = (item) => Object.prototype.toString.call(item);

const sumAllNumbers = (item) => {
    const type = getType(item);
    if (type === "[object String]") return 0;
    if (type === "[object Number]") return item;
    if (type === "[object Array]") {
        return item.reduce((acc, cur) => {
            acc += sumAllNumbers(cur);
            return acc;
        }, 0);
    }
    if (type === "[object Object]") {
        const values = Object.values(item);
        if (values.includes("red")) return 0;
        return values.reduce((acc, cur) => {
            acc += sumAllNumbers(cur);
            return acc;
        }, 0);
    }
    return 0;
};

data.reduce((acc, cur) => {
    acc += sumAllNumbers(cur);
    return acc;
}, 0);
