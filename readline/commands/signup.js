'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

// menu is a modular function that displays application options to the user
const menu = require('../menu').menu;

/**
 * Signs up a new user and creates a user object to hold all that user's data. Prompts the user for username/password to create new account. 
 * 
 * @param {*} mute - This parameter is used as a hacky workaround. We needed an iterative parameter to mute the character display as the user inputs their password. The way the function is structured, we called the function recursively and any iteration past the first would cause issues with displaying the password due to the boolean 'rl[mute]' losing its place. So this parameter gives you a new boolean for each time the function is called. 
 */
async function signup(mute = '1') {
  console.log(chalk.hex('#4298eb')('\nPlease sign up.\n'));

  let username = await rl.ask('Username: ');
  let password;

  rl[mute] = true;
  rl.question('Password: ', async (input) => {
    password = input;

    rl[mute] = false;

    try {
      let response = await superagent
        .post('https://cf-dnd-character-creator.herokuapp.com/v1/api/signup')
        .send({ username, password });

      let user = response.body;

      if (!user.username) {
        console.log(chalk.hex('#f0190a')('\nInvalid credentials.'));
        signup(mute + '1');
      } else {
        console.log(`\n\nWelcome, ${username}!\n`);
        menu(user);
      }
    } catch (e) {
      console.log('ERROR', e);
    }
  });
  rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl[mute]) rl.output.write('*');
    else rl.output.write(stringToWrite);
  };
}

module.exports = signup;
