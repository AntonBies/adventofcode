const fs = require('fs');

const graph = {};

const data = fs
  .readFileSync('input.txt', { encoding: "utf-8" })
  .split('\n')
  .filter(Boolean)
  .map(item => {
    const [from, to] = item.split('-');
    graph[from] = graph[from] || [];
    graph[to] = graph[to] || [];
    graph[from].push(to);
    graph[to].push(from);
    return {from, to};
  })

console.log(data);

const isSmallCave = (cave) => {
  return /[a-z]/g.test(cave);
}

const depthFirstSearch = (node, visited, flag, paths) => {
  visited.push(node);
  if (node === 'end') {
     paths.push(visited.join(','));
     return;
  }

  for (let neighbour of graph[node]) {
    if (neighbour === 'start') {
      continue;
    }
    if (isSmallCave(neighbour) && visited.includes(neighbour)) {
      if (flag) {
        continue;
      }
      if (visited.filter(item => item === neighbour).length > 1) {
        continue;
      }
      depthFirstSearch(neighbour, [...visited], true, paths);
    } else {
      depthFirstSearch(neighbour, [...visited], flag, paths);
    }
  }
}

const paths = [];
depthFirstSearch('start', [], false, paths);
console.log(paths.length);