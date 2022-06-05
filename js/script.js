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

let projectName = prompt("Как называется ваш проект?");
let screenType = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let workPrice = +prompt("Сколько будет стоить данная работа?", 12000);
let adaptiveWork = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let serviceAnswer1 = service1;
let serviceAnswer2 = service2;
let serviceAnswerPrice1 = servicePrice1;
let serviceAnswerPrice2 = servicePrice2;
title = projectName;
screens = screenType;
screenPrice = workPrice;
adaptive = adaptiveWork;
fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice * (rollback/100));

if (fullPrice > 30000){
  fullPrice = fullPrice - (10/100);
} else if (fullPrice > 15000 && fullPrice < 30000) {
  let sale5 = prompt("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice > 0) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
  console.log("Что то пошло не так");
}

console.log(title, screens, screenPrice, adaptive, fullPrice, servicePercentPrice);