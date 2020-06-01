'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

async function deity() {
  return new Promise( async (resolve, reject) => {
    let deityChoice = await rl.ask(
      chalk.blue('\nWhich Deity will your character worship?\n'),
      charDB.deity
    );

    let deity = charDB.deity[deityChoice - 1];

    resolve(deity);
  });
}

module.exports = deity;