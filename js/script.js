let fullPrice;
let rollback = 50;
let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;
let servicePercentPrice;
let allServicePrices;

// const isNUmber = function (num) {
//   return !isNaN(parseFloat(num)) && isFinite(num);
// };

const isNUmber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num != 0;
};

const asking = function () {
  title = prompt("Как называется ваш проект?");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?", 12000); 
  } while (screenPrice <= 0);
  adaptive = confirm("Нужен ли адаптив на сайте?");
};

function getAllServicePrices() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }
      sum += +prompt("Сколько это будет стоить?");
    while (!isNUmber(sum)){
      sum += +prompt("Сколько это будет стоить?");
    }
    
  }
  console.log(sum);
  return sum;
}

const getFullPrice = function () {
  return screenPrice + allServicePrices;
};

const getTitle = function () {
  return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
};

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice * (rollback/100));
};

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


asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices(); 
title = getTitle();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);


console.log(allServicePrices);
console.log(fullPrice);
console.log(servicePercentPrice);