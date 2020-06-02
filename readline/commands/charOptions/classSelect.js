'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

async function classSelect() {
  return new Promise( async (resolve, reject) => {
    let classChoice = await rl.ask(
      chalk.hex('#4298eb')('\nWhat is your characters class?\n'),
      charDB.classes
    );

    while(invalid(classChoice, charDB.classes)) {
      classChoice = await rl.ask(chalk.red('\nThat class does not exist. Please try again.\n') + '- ');
    }

    let charClass = charDB.classes[classChoice - 1];
    resolve(charClass);
  });
};

module.exports = classSelect;