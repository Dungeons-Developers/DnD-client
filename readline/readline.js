'use strict';

const readline = require('readline');

const chalk = require('chalk');

const gradient = require('gradient-string');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (command) => {
  switch (command.trim().toUpperCase()) {
    case '1':
      console.log('CHARACTERS');
      break;
    case '2':
      console.log('Entered character creator. \n');
      commands.createCharacter();
      break;
    case 'X':
      rl.close();
      break;
    default:
      console.log('Command not recognized');
  }
});

// promise/async questions function
rl.ask = (prompt, options = null) => {
  return new Promise((resolve, reject) => {
    if (options) {
      options.forEach((option, index) => {
        prompt += chalk.green(`\n${index + 1}. ${option}`);
      });
      prompt += '\n\n- ';
    }
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

// adds closure of current running thread
rl.on('close', () => {
  console.log(gradient.cristal('Thank you for using D&D Companion!'));
  process.exit();
});

module.exports = rl;
