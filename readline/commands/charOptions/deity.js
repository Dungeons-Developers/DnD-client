'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

async function deity() {
  return new Promise( async (resolve, reject) => {
    let deityChoice = await rl.ask(
      chalk.blue('\nWhich Deity will your character worship?\n'),
      charDB.deity
    );

    while(invalid(deityChoice, charDB.deity)) {
      deityChoice = await rl.ask(chalk.red('\nThat deity is not listed. Please try again.\n') + '- ');
    }

    let deity = charDB.deity[deityChoice - 1];

    resolve(deity);
  });
}

// async function choice() {
//   return new Promise( async (resolve, reject) => {
//     let choice = await rl.ask(
//       chalk.blue('\nWhich Deity will your character worship?\n'),
//       charDB.deity
//     );
//     resolve(choice);
//   })
// }

module.exports = deity;