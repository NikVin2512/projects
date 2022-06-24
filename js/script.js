let fullPrice;
let rollback = 50;
const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?", 12000);
const adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let serviceAnswer1 = service1;
let serviceAnswer2 = service2;
let serviceAnswerPrice1 = servicePrice1;
let serviceAnswerPrice2 = servicePrice2;
fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice;
let allServicePrices;


function getAllServicePrices() {
  return servicePrice1 + servicePrice2;
}
getAllServicePrices(allServicePrices);

const getFullPrice = function () {
  return screenPrice + getAllServicePrices();
};
getFullPrice(fullPrice);

const getTitle = function (string) {
  return string[1].toUpperCase().trim() + string.slice(2).toLowerCase();
};
getTitle(title);

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice * (rollback/100));
};
getServicePercentPrices(servicePercentPrice); 

const getRollbackMessage = function (price) {
  if (price > 30000){
    price = price - (10/100);
  } else if (price > 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price > 0) {
    return "Скидка не предусмотрена";
  } else if (price < 0) {
    return "Что то пошло не так";
  }
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices(servicePercentPrice));