let int = 266219;
let func = num => Number(num);
let arr = Array.from(String(int), func);

console.log(arr);
let res = arr.reduce((acc, rec) => acc * rec);

console.log(res);
let rez = res ** 3;
console.log(rez);
console.log(String(rez).slice(0,2));