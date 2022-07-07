'use strict';

const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const screenBtn = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber  = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const rangeSpan = document.querySelector('.range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalOther = document.getElementsByClassName('total-input')[2];
const totalFull = document.getElementsByClassName('total-input')[3];
const totalRollback = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');

const appData = {
  fullPrice: 0,
  rollback: 0,
  title: '',
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePercentPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  init: function () {
    appData.addTitle();
    
    startBtn.addEventListener('click', function(){
      appData.isError = false;
      appData.checkValues();
    });   
    screenBtn.addEventListener('click', appData.addScreenBlock);
    
    appData.getRollback(); 
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.logger();
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.screensCount;
    totalOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalFull.value = appData.fullPrice;
    totalRollback.value = appData.servicePercentPrice;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  isError: false,
  checkValues: function () {
    screens.forEach(function (screen) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (select.value === '' || input.value === '') {
          appData.isError = true;
      }
    });

    if (!appData.isError) {
        appData.start();
    } else {
        return;
    }
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function(screen, i){
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({ 
        id: i, 
        name: selectName, 
        price: +select.value * +input.value,
        count: +input.value
      });

    });
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    for (let screen of  appData.screens) {
      appData.screensCount += +screen.count;
    }
    for (let screen of  appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100);
    }
    appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
    appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice * (appData.rollback/100));
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);

  },
  getRollback: function () {
    const rangeValue = function (e) {
      rangeSpan.textContent = inputRange.value + '%';
      appData.rollback = +inputRange.value;
    };
    inputRange.addEventListener('input', rangeValue);

  },
  logger: function() {
    console.log(appData);
    
  }
};

appData.init();



