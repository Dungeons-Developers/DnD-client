'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

// const Model = require('../models/model');
// const userSchema = require('../models/users/users-schema');
// const UserModel = new Model(userSchema);

// menu is a modular function that displays application options to the user
const menu = require('../menu');

// function login
// prompts the user for login information: username, password.
// "mutes" the password by modifying the _writeToOutput method
// param - string - arbitrary string to interate upon
async function login(mute = '1') {
  console.log(chalk.hex('#4298eb')('\nPlease log in.\n'));

  let username = await rl.ask('Username: ');
  let password;

  rl[mute] = true;
  rl.question('Password: ', async (input) => {
    password = input;

    rl[mute] = false;

    try {
      let response = await superagent
        .post('https://cf-dnd-character-creator.herokuapp.com/v1/api/user')
        .send({ username, password });

      let user = response.body;

      if (!user.username) {
        console.log(chalk.hex('#f0190a')('\nInvalid credentials.'));
        login(mute + '1');
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

module.exports = login;
