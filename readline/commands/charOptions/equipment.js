'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

/**
 * Lets user choose armor(1), weapons(2), and pack(1) for newly created character object. 
 */
async function equipment() {
  return new Promise( async (resolve, reject) => {

    let armor = await getArmor();

    let weapons = await getWeapons();

    let adventure_packs = await getPack();

    resolve({ armor, weapons, adventure_packs });
  });
}

async function getArmor() {
  return new Promise( async ( resolve, reject ) => {
    let armorChoice = await rl.ask(
      chalk.hex('#4298eb')('\nNext we will choose your characters equipment...\n\nPlease choose your armor.\n'),
      charDB.armor
    );

    while(invalid(armorChoice, charDB.armor)) {
      armorChoice = await rl.ask(chalk.red('\nThat armor is not listed. Please try again.\n') + '- ')
    }

    let armor = charDB.armor[armorChoice - 1];

    resolve(armor);
  });
}

async function getWeapons() {
  return new Promise( async ( resolve, reject ) => {

    let weaponChoice_1 = await getWeaponOne();

    let weaponChoice_2 = await getWeaponTwo();

    let weapons = { 
      choice_1: charDB.weapons[weaponChoice_1 - 1], 
      choice_2: charDB.weapons[weaponChoice_2 - 1] 
    }

    resolve(weapons);
  });
}

async function getWeaponOne() {
  return new Promise( async ( resolve, reject ) => {
    let weaponChoice_1 = await rl.ask(
      chalk.hex('#4298eb')('\nPlease choose a weapon (1/2)\n'),
      charDB.weapons
    );

    while(invalid(weaponChoice_1, charDB.weapons)) {
      weaponChoice_1 = await rl.ask(chalk.red('\nThat weapon is not listed. Please try again.\n') + '- ')
    }

    resolve(weaponChoice_1);
  });
}

async function getWeaponTwo() {
  return new Promise( async ( resolve, reject ) => {
    let weaponChoice_2 = await rl.ask(
      chalk.hex('#4298eb')('\nPlease choose another weapon (2/2)\n- ')
    );

    while(invalid(weaponChoice_2, charDB.weapons)) {
      weaponChoice_2 = await rl.ask(chalk.red('\nThat weapon is not listed. Please try again.\n') + '- ')
    }

    resolve(weaponChoice_2);
  })
}

async function getPack() {
  return new Promise( async ( resolve, reject ) => {
    let packChoice = await rl.ask(
      chalk.hex('#4298eb')('\nPlease choose your adventuring pack\n'),
      charDB.adventuring_packs
    );

    while(invalid(packChoice, charDB.adventuring_packs)) {
      packChoice = await rl.ask(chalk.red('\nThat pack is not listed. Please try again.\n') + '- ')
    }

    let adventure_packs = charDB.adventuring_packs[packChoice - 1];

    resolve(adventure_packs);
  })
}

module.exports = equipment;