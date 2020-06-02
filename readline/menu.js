'use strict';

const rl = require('./readline');

const chalk = require('chalk');

const createCharacter = require('./commands/charCreate');
const getCharacter = require('./commands/charGet');
const deleteCharacter = require('./commands/charDelete');

let characterOptions =
  '1. View Characters - Get a list of all of your characters \n2. Create Character - Create a new player character\nX. Exit Application\n';

let charSelectOptions = '1. Delete Character \n2. Back to Main Menu \nX. Exit Application\n';

/**
 * Generates the first menu. It asks users if they want to look at their full character list OR make a new character OR close the application.
 * 
 * @param {*} user - user object for the logged-in user
 */
async function menu(user) {
  rl.question(chalk.hex('#4298eb')(characterOptions), async (input) => {
    switch (input.trim().toUpperCase()) {
      case '1':
        let character = await getCharacter(user);
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

/**
 * Generates the second menu. It asks users if they want to delete a character OR return to the main menu OR exit the application.
 * 
 * @param {*} user - user object for the logged in user
 * @param {*} character - character object for the individually selected character
 */
async function selectMenu(user, character){
  rl.question(chalk.hex('#4298eb')(charSelectOptions), async (input) => {
    switch(input.trim().toUpperCase()) {
      case '1':
        
        await deleteCharacter(character);
        menu(user);
        break;
      case '2':
        menu(user);
        break;
      case 'X':
        rl.close();
        process.exit();
        break;
      default:
        console.log('Command not recognized');
        selectMenu(user, character);
    }

  });
}

module.exports = {menu, selectMenu};
