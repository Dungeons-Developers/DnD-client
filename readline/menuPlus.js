'use strict';

const menu = require('./menu');


const menuPlus = (user) => {
  console.log('I am the menuplus funtion', menu);
  menu(user);
}

module.exports = menuPlus;
