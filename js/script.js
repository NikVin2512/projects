'use strict';

const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const screenBtn = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber  = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const rangeSpan = document.querySelector('.range-value');

const mainTotalItems = document.querySelectorAll('.main-total__item');
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
    this.addTitle();
    this.rangeDis();

    startBtn.addEventListener('click', () => {
      this.isError = false;
      this.checkValues();
    });   
    screenBtn.addEventListener('click', this.addScreenBlock);
    resetBtn.addEventListener('click', this.reset);
    this.getRollback(); 
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.logger();
  },
  rangeDis: function() {
    inputRange.disabled = true;
  },
  rangeNotDis: function() {
    inputRange.disabled = false;
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.screensCount;
    totalOther.value = this.servicePricesPercent + this.servicePricesNumber;
    totalFull.value = this.fullPrice;
    totalRollback.value = this.servicePercentPrice;
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  isError: false,
  checkValues: function () {
    screens.forEach( (screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (select.value === '' || input.value === '') {
        this.isError = true;
      }
    });

    if (!this.isError) {
      this.start();
      this.displayNone();     
      this.addDisabled();
      this.rangeNotDis();
      
    } else {
        return;
    }
  },
  displayNone: function () {
    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  }, 
  displayBlock: function () {
    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';
  },
  addDisabled: function () {
    screens.forEach( (screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      select.disabled = true;
      input.disabled = true;
    });
    otherItemsPercent.forEach( (item) => {
      const input = item.querySelector('input');
      input.disabled = true;
    });
    otherItemsNumber.forEach( (item) => {
      const input = item.querySelector('input');
      input.disabled = true;
    });
  },
  addNotDisabled: function () {
    screens.forEach( (screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      select.disabled = false;
      input.disabled = false;
      select.value = '';
      input.value = '';
    });
    otherItemsPercent.forEach( (item) => {
      const input = item.querySelector('input');
      input.disabled = false;
      input.checked = false;

    });
    otherItemsNumber.forEach( (item) => {
      const input = item.querySelector('input');
      input.disabled = false;
      input.checked = false;
      
    });
  },
  clearMainTotalItems: function () {
    mainTotalItems.forEach(function (item) {
      const input = item.querySelector('input');
      input.value = '0';
    });
  },
  reset: function () {
    appData.addNotDisabled();
    appData.displayBlock();
    appData.clearMainTotalItems();
    for (var key in appData) {
        delete appData[key];
    }
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, i) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({ 
        id: i, 
        name: selectName, 
        price: +select.value * +input.value,
        count: +input.value
      });

    });
  },
  addServices: function () {
    otherItemsPercent.forEach( (item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach( (item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if(check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    for (let screen of  this.screens) {
      this.screensCount += +screen.count;
    }
    for (let screen of  this.screens) {
      this.screenPrice += +screen.price;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100);
    }
    this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
    this.servicePercentPrice = this.fullPrice - Math.ceil(this.fullPrice * (this.rollback/100));
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);

  },
  getRollback: function () {
    const rangeValue =  (e) => {
      rangeSpan.textContent = inputRange.value + '%';
      this.rollback = +inputRange.value;
      this.servicePercentPrice = this.fullPrice - Math.ceil(this.fullPrice * (this.rollback/100));
      this.showResult();
    };
    inputRange.addEventListener('input', rangeValue);

  },
  logger: function() {
    console.log(this);
    
  }
};

appData.init();



