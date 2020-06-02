'use strict';

const readline = require('readline');

const chalk = require('chalk');

const gradient = require('gradient-string');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * This function is used throughout our application in order to resolve a promise. This way we don't have to use callbacks. We previously had lots of callbacks with nested functions within functions and it became messy. This function is built around the .question method that Readline comes with.
 *  
 * @param {string} prompt - This is a string displayed to the user. It prompts them to make a choice.
 * @param {string} options - This is a series of options to show the user all possible decisions
 * @param {*} resolve - This is a built-in method that returns out of the promise. You can pass parameters through the resolve in order to move data between functions. You can also pass nothing. It's primary purpose is to close the promise.
 * @param reject - This is a built-in method that serves as error-handling for any .ask.
 */
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

/**
 * This (.on) is a built-in method that triggers on an event.
 * 
 * @param {string} close - This is a built-in event that triggers when the application is closed.
 */
rl.on('close', () => {
  console.log(chalk.hex('#4298eb')('Thank you for using D&D Companion!'));
  // process.exit();
});

module.exports = rl;
