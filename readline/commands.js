'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// bcrypt is used to encrypt sensitive information
const bcrypt = require('bcrypt');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('./readline');

// const Model = require('../models/model');
// const userSchema = require('../models/users/users-schema');
// const UserModel = new Model(userSchema);

// menu is a modular function that displays application options to the user
const menu = require('./menu');

// function login
// prompts the user for login information: username, password.
// "mutes" the password by modifying the _writeToOutput method
// param - string - arbitrary string to interate upon

async function login() {
  let user;

  console.log(chalk.hex('#4298eb')('\nPlease log in.\n'));
  let username = await rl.ask('Username: ', false);
  let password = await rl.ask('Password: ', true);

  try {
    let response = await superagent
      .post('https://cf-dnd-character-creator.herokuapp.com/v1/api/user')
      .send({ username, password });

    user = response.body;

    if (!user.username) {
      console.log(chalk.hex('#f0190a')('\nInvalid credentials.'));
      login();
    } else {
      console.log(`\n\nWelcome, ${username}!\n`);
      menu(user);
    }
  } catch (e) {
    console.log('ERROR', e);
  }
}

// function signup
// prompts the user for username/password to create a new account
// param - string - arbitrary string to interate upon

async function signup(passMute = '1') {
  let username;
  let password;

  console.log(chalk.hex('#4298eb')('\nPlease sign up.\n'));
  rl.question('Username: ', (input) => {
    username = input;

    rl[passMute] = true;

    rl.question('Password: ', async (input) => {
      password = await bcrypt.hash(input, 10);

      // prompt to confirm password
      let response = await superagent
        .post('https://cf-dnd-character-creator.herokuapp.com/v1/api/signup')
        .send({ username, password });

      let user = response.body;

      rl[passMute] = false;

      if (!user.username) {
        console.log('That username already exists. Please try again.');
        // LOOP BACK
        signup(passMute + '1');
      } else {
        console.log(`\nWelcome, ${username}!\n`);
        menu(user);
      }
    });

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (rl[passMute]) rl.output.write('*');
      else rl.output.write(stringToWrite);
    };
  });
}

module.exports = { login, signup };
