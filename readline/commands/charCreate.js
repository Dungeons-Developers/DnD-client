'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

const charDB = require('../../data/db.json');

async function createCharacter(user) {

  return new Promise(async (resolve, reject) => {

    console.log(
      chalk.green(
        'Please fill out the following information about your character:',
      ),
    );
  
    let name = await rl.ask(chalk.blue('\nWhat is your characters name? '));
  
    let input = await rl.ask(
      chalk.blue(
        '\nWhat is your characters race? \n1. Dragonborn \n2. Dwarf \n3. Elf \n4. Gnome \n5. Half-Elf \n6. Half-Orc \n7. Halfling \n8. Human \n9. Tiefling \n',
      ),
    );
  
    let race;
    switch (input) {
      case '1':
        race = 'Dragonborn';
        break;
      case '2':
        race = 'Dwarf';
        break;
      case '3':
        race = 'Elf';
        break;
      case '4':
        race = 'Gnome';
        break;
      case '5':
        race = 'Half-Elf';
        break;
      case '6':
        race = 'Half-Orc';
        break;
      case '7':
        race = 'Halfling';
        break;
      case '8':
        race = 'Human';
        break;
      case '9':
        race = 'Tiefling';
        break;
      default:
        break;
    }
  
    input = await rl.ask(
      chalk.blue(
        '\nWhat is your characters class? \n1. Barbarian \n2. Bard \n3. Cleric \n4. Druid \n5. Fighter \n6. Monk \n7. Paladin \n8. Ranger \n9. Rogue \n10. Sorcerer \n11. Warlock \n12. Wizard \n',
      ),
    );
    let charClass;
    switch (input) {
      case '1':
        charClass = 'Barbarian';
        break;
      case '2':
        charClass = 'Bard';
        break;
      case '3':
        charClass = 'Cleric';
        break;
      case '4':
        charClass = 'Druid';
        break;
      case '5':
        charClass = 'Fighter';
        break;
      case '6':
        charClass = 'Monk';
        break;
      case '7':
        charClass = 'Paladin';
        break;
      case '8':
        charClass = 'Ranger';
        break;
      case '9':
        charClass = 'Rogue';
        break;
      case '10':
        charClass = 'Sorcerer';
        break;
      case '11':
        charClass = 'Warlock';
        break;
      case '12':
        charClass = 'Wizard';
        break;
      default:
        break;
    }
  
    // attach name, race, skills
    let newChar = {...charDB.pre_made_Characters[charClass.toLowerCase()], name, race, user: user.username};
  
    let response = await superagent
      .post('https://cf-dnd-character-creator.herokuapp.com/v1/api/character')
      .send(newChar);
  
    console.log(
      chalk.green(
        `\nYou have created a ${response.body.race} ${response.body.class} named ${response.body.name}!`,
      ),
    );
    resolve();
  });

}

module.exports = createCharacter;
