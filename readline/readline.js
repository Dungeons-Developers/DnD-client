'use strict';

const readline = require('readline');

const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (command) => {
  switch (command.trim()) {
    case '1':
      console.log('CHARACTERS');
      break;
    case '2':
      console.log('Entered character creator. \n');
      commands.createCharacter();
      break;
    case 'exit':
      rl.close();
      process.exit();
      break;
    default:
      console.log('Command not recognized');
  }
});

rl.ask = (prompt, secret) => {
  return new Promise((resolve, reject) => {
    rl.secret = secret;
    rl.question(prompt, (answer) => {
      rl.secret = false;
      resolve(answer);
    });
  });
};

// modifying rl write function to be able to hide password
rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.secret) rl.output.write('*');
  else rl.output.write(stringToWrite);
};

// adds closure of current running thread
rl.on('close', () => {
  console.log(chalk.hex('#4298eb')('Thank you for using D&D Companion!'));
  process.exit();
});

module.exports = rl;
