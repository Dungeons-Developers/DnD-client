'use strict';

const rl = require('./readline');

const chalk = require('chalk');

const createCharacter = require('./commands/charCreate');
const getCharacter = require('./commands/charGet');

let characterOptions =
  '1. View Characters - Get a list of all of your characters \n2. Create Character - Create a new player character\nX. Exit Application\n';

let charSelectOptions = '1. Delete Character \n2. Back to Main Menu \nX. Exit Application\n';

async function menu(user) {
  rl.question(chalk.hex('#4298eb')(characterOptions), async (input) => {
    switch (input.trim().toUpperCase()) {
      case '1':
        let character = await getCharacter(user);
        console.log('RESOLVED THING', character);
        character ? selectMenu(user, character) : menu(user);
        break;
      case '2':
        console.log('Entered character creator. \n');
        await createCharacter(user);
        menu(user);
        break;
      case 'X':
        rl.close();
        process.exit();
        break;
      default:
        console.log('Command not recognized');
        menu(user);
    }
  });
}

async function selectMenu(user, character){
  rl.question(chalk.hex('#4298eb')(charSelectOptions), async (input) => {
    switch(input.trim().toUpperCase()) {
      case '1':
        await deleteCharacter(character);
        menu(user);
      case '2':
        menu(user);
      case 'X':
        rl.close();
        process.exit();
      default:
        console.log('Command not recognized');
        selectMenu(user, character);
    }

  });
}

module.exports = {menu, selectMenu};
