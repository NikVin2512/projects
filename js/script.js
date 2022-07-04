'use strict';

const appData = {
  fullPrice: 0,
  rollback: 10,
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  servicePercentPrice: 0,
  allServicePrices: 0,
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices(); 
    appData.getTitle();
    appData.logger();
  },
  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?");
    } while (appData.isNUmber(appData.title));

    for (let i = 0; i < 2; i++) {
      let name = '';
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (appData.isNUmber(name));
      let price = 0;

      do {
        price = +prompt("Сколько будет стоить данная работа?"); 
      } while (!appData.isNUmber(price));

      appData.screens.push({ id: i, name: name, price: price });

    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (appData.isNUmber(name));

      let price = 0;
      do {
        price = prompt("Сколько это будет стоить?");
      } while(!appData.isNUmber(price));
      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    for (let screen of  appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNUmber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num != false;
  },
  isString: function (val) {
    return (typeof val === "string" || val instanceof String);
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
  },
  
  getServicePercentPrices: function () {
    appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice * (appData.rollback/100));
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
  }
};

appData.start();



