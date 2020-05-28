'use strict';

const rl = require('./readline');

const chalk = require('chalk');

// const commands = require('./commands');
const createCharacter = require('./allTheCommands/charCreate');

let characterOptions = '1. View Characters - Get a list of all of your characters \n2. Create Character - Create a new player character\nX. Exit Application\n';

function menu(user) {
  rl.question(chalk.hex('#4298eb')(characterOptions), input => {
    
    switch (input.trim()) {
      case '1':
        console.log('CHARACTERS');
        break;
      case '2':
        console.log('Entered character creator. \n');
        createCharacter(user.username);
        break;
      case 'exit':
        rl.close();
        process.exit();
        break;
      default:
        console.log('Command not recognized');
    }
  });
}


// function menu() {
//   console.log(
//     chalk.hex('#4298eb')(
//       '\nPlease use the following numbered prompts to navigate the application:\n',
//     ),
//   );
//   console.log('1. View Characters - Get a list of all of your characters');
//   console.log('2. Create Character - Create a new player character\n');
//   console.log('X. Exit Application\n');
// }

module.exports = menu;
