'use strict';

const appData = {
  fullPrice: 0,
  rollback: 50,
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  service1: '',
  service2: '',
  servicePercentPrice: 0,
  allServicePrices: 0,
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices(); 
    appData.title = appData.getTitle();
    appData.logger();
  },
  asking: function () {
    appData.title = prompt("Как называется ваш проект?");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?", 12000); 
    } while (appData.screenPrice <= 0);
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNUmber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num != false;
  },
  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      let price = 0;
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }
      do {
        price = prompt("Сколько это будет стоить?");
      } while(!appData.isNUmber(price));
      sum += +price;
    }
    return sum;
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function () {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
  },
  
  getServicePercentPrices: function () {
    return Math.ceil(appData.fullPrice * (appData.rollback/100));
  },
  getRollbackMessage: function (price) {
    if (price > 30000){
      price = price - (10/100);
    } else if (price > 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price > 0) {
      return "Скидка не предусмотрена";
    } else if (price < 0) {
      return "Что то пошло не так";
    }
  },
  logger: function() {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    for (let key in appData){
      console.log(key);
    }
  }
};

appData.start();



