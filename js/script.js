let title = "Lesson02";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 4;
let rollback = 50;
let fullPrice = 10000;
let adaptive = true;

console.log(typeof title,typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log(screenPrice + "$");
console.log(fullPrice + "$");
console.log(screens.toLocaleLowerCase().split(", "));
console.log(fullPrice * (rollback/100) + "$");