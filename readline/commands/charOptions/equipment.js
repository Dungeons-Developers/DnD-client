'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');


async function equipment() {
  return new Promise( async (resolve, reject) => {
    let armorChoice = await rl.ask(
      chalk.blue('\nNext we will choose your characters equipment...\n\nPlease choose your armor.\n'),
      charDB.armor
    );

    let armor = charDB.armor[armorChoice - 1];

    let weaponChoice_1 = await rl.ask(
      chalk.blue('\nPlease choose a weapon (1/2)\n'),
      charDB.weapons
    );

    let weaponChoice_2 = await rl.ask(
      chalk.blue('\nPlease choose another weapon (2/2)\n- ')
    );

    let weapons = { 
      choice_1: charDB.weapons[weaponChoice_1], 
      choice_2: charDB.weapons[weaponChoice_2] 
    }

    let packChoice = await rl.ask(
      chalk.blue('\nPlease choose your adventuring pack\n'),
      charDB.adventuring_packs
    );

    let adventure_packs = charDB.adventuring_packs[packChoice - 1];

    resolve({ armor, weapons, adventure_packs });
  });
}

module.exports = equipment;