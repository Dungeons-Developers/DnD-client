'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

async function race() {
  return new Promise( async (resolve, reject) => {
    let raceChoice = await rl.ask(
      chalk.hex('#4298eb')('\nWhat is your characters race?\n') + 
      chalk.green('\n1. Dragonborn \n2. Dwarf \n3. Elf \n4. Gnome \n5. Half-Elf \n6. Half-Orc \n7. Halfling \n8. Human \n9. Tiefling \n\n') + '- '
    );
  
    while(invalid(raceChoice, charDB.races)) {
      raceChoice = await rl.ask(chalk.red('\nThat choice does not exist. Please try again.\n') + '- ');
    }

    let race = charDB.races[raceChoice - 1].name;
    resolve(race);
  });
};

// \n1. Dragonborn \n2. Dwarf \n3. Elf \n4. Gnome \n5. Half-Elf \n6. Half-Orc \n7. Halfling \n8. Human \n9. Tiefling \n\n- 

module.exports = race;