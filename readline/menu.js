'use strict';

const rl = require('./readline');

const chalk = require('chalk');

// const commands = require('./commands');
const createCharacter = require('./commands/charCreate');
const getCharacter = require('./commands/charGet');

let characterOptions =
  '1. View Characters - Get a list of all of your characters \n2. Create Character - Create a new player character\nX. Exit Application\n';

async function menu(user) {
  rl.question(chalk.hex('#4298eb')(characterOptions), async (input) => {
    switch (input.trim().toUpperCase()) {
      case '1':
        await getCharacter(user);
        menu(user);
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
    }
  });
}

module.exports = menu;
