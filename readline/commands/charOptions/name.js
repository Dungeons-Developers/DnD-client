'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

async function name() {
  return new Promise( async (resolve, reject) => {
    let name = await rl.ask(chalk.hex('#4298eb')('What is your characters name? '));

    resolve(name);
  });
};

module.exports = name;