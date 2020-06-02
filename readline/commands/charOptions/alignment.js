'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

async function alignment() {
  return new Promise( async (resolve, reject) => {
    let alignmentChoice = await rl.ask(
      chalk.hex('#4298eb')('\nWHat is your characters alignment?\n'),
      charDB.alignment
    );

    while(invalid(alignmentChoice, charDB.alignment)) {
      alignmentChoice = await rl.ask(chalk.red('\nThat alignment does not exist. Please try again.\n') + '- ');
    }

    let alignment = charDB.alignment[alignmentChoice - 1];

    resolve(alignment);
  });
};

module.exports = alignment;