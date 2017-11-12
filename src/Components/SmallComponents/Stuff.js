let d = [{a: 1}, {a: 5}, {a: 2}, {a: 0}];

d.sort((a, b) => {
  return a.a > b.a
});

console.log(d);