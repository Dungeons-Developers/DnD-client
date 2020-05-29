'use strict';

const rl = require('./readline');

const chalk = require('chalk');

// const commands = require('./commands');
const createCharacter = require('./commands/charCreate');
const getCharacter = require('./commands/charGet');

let characterOptions =
  '1. View Characters - Get a list of all of your characters \n2. Create Character - Create a new player character\nX. Exit Application\n';

function menu(user) {
  rl.question(chalk.hex('#4298eb')(characterOptions), (input) => {
    switch (input.trim().toUpperCase()) {
      case '1':
        getCharacter(user.username);
        break;
      case '2':
        console.log('Entered character creator. \n');
        createCharacter(user.username);
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
