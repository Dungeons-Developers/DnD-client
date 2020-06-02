'use strict';

const rl = require('./readline');

const chalk = require('chalk');

const commands = require('./commands');

console.log(chalk.hex('#1ddb4c')('\nWelcome to D&D Companion!\n'));

/**
 * This function starts our application in the terminal
 */
function start() {
  rl.question(
    chalk.hex('#4298eb')('1. Log in\n2. Sign up\n\nX. Exit\n'),
    (input) => {
      switch (input.toUpperCase()) {
        case '1':
          commands.login();
          break;
        case '2':
          commands.signup();
          break;
        case 'X':
          rl.close();
        default:
          console.log(chalk.hex('#e68209')('\nCommand not recognized\n'));
          start();
      }
    },
  );
}

module.exports = start;
