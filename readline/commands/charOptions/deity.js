'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

/**
 * Lets user choose deity to assign to newly created character object. 
 */
async function deity() {
  return new Promise( async (resolve, reject) => {
    let deityChoice = await rl.ask(
      chalk.hex('#4298eb')('\nWhich Deity will your character worship?\n'),
      charDB.deity
    );

    while(invalid(deityChoice, charDB.deity)) {
      deityChoice = await rl.ask(chalk.red('\nThat deity is not listed. Please try again.\n') + '- ');
    }

    let deity = charDB.deity[deityChoice - 1];

    resolve(deity);
  });
}

module.exports = deity;