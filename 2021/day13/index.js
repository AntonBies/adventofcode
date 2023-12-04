const fs = require('fs')

const data = fs
  .readFileSync('input.txt', { encoding: "utf-8" })
  .split('\n')
  .filter(Boolean)
  .slice(0)
  .map(item => item.split(',').map(Number));

const dots = {};

data.forEach(item => {
  const [x,y] = item;
  const xy = `${x}-${y}`;
  dots[xy] = dots[xy] ? dots[xy] + 1 : 1;
})

const foldLeft = foldValue => {
  for (let dot in dots) {
    let [x,y] = dot.split('-').map(Number);
    if (x > foldValue) {
      delete dots[dot];
      x = foldValue - (x - foldValue);
      const xy = `${x}-${y}`
      dots[xy] = dots[xy] ? dots[xy] + 1 : 1;
    }
  }
}

const foldUp = foldValue => {
  for (let dot in dots) {
    let [x,y] = dot.split('-').map(Number);
    if (y > foldValue) {
      delete dots[dot];
      y = foldValue - (y - foldValue);
      const xy = `${x}-${y}`
      dots[xy] = dots[xy] ? dots[xy] + 1 : 1;
    }
  }
}

foldLeft(655);
foldUp(447);
foldLeft(327);
foldUp(223);
foldLeft(163);
foldUp(111);
foldLeft(81);
foldUp(55);
foldLeft(40);
foldUp(27);
foldUp(13);
foldUp(6);

let print = Array(6).fill([]);
print.forEach((row, i) => {
  print[i] = Array(38).fill('.');
})

for (let dot in dots) {
  let [x,y] = dot.split('-').map(Number);
  print[y][x] = 888;
}
console.log(print);


/*
fold along x=655
fold along y=447
fold along x=327
fold along y=223
fold along x=163
fold along y=111
fold along x=81
fold along y=55
fold along x=40
fold along y=27
fold along y=13
fold along y=6
*/
