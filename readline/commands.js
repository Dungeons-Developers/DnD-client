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

const commands = {
  login: async () => {
    let username;
    let password;

    console.log(chalk.hex('#4298eb')('\nPlease log in.\n'));
    rl.question('Username: ', async (input) => {
      username = input;
      
      // setting boolean for when to hide password input
      rl.loginPassMute = true;
      
      rl.question('Password: ', async (input) => {
        password = input;
        let response = await superagent.post('https://cf-dnd-character-creator.herokuapp.com/v1/api/user').send({ username, password });

        let user = response.body;

        rl.loginPassMute = false;

        if (!user.username) {
          console.log(chalk.hex('#f0190a')('\nInvalid credentials.'));
          // while(!user.username) {

          // }
        } else {
          console.log(`\n\nWelcome, ${username}!\n`);
          menu();
        }
      });
      
      // modifying rl write function to be able to hide password
      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.loginPassMute) rl.output.write('*');
        else rl.output.write(stringToWrite);
      };
    });
  },

  signup: async () => {
    let username;
    let password;

    console.log(chalk.hex('#4298eb')('\nPlease sign up.\n'));
    rl.question('Username: ', (input) => {
      username = input;

      rl.signupPassMute = true;

      rl.question('Password: ', async (input) => {
        password = await bcrypt.hash(input, 10);
        
        // prompt to confirm password
        let response = await superagent.post('https://cf-dnd-character-creator.herokuapp.com/v1/api/createuser').send({username, password});
        
        let user = response.body;
        
        rl.signupPassMute = false;

        if (!user.username) {
          console.log('That username already exists. Please try again.');
          // LOOP BACK
        } else {
          console.log(`\nWelcome, ${username}!\n`);
          menu();
        }

      });

      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.signupPassMute) rl.output.write('*');
        else rl.output.write(stringToWrite);
      };
    });
  },

  createCharacter: () => {
    console.log(
      chalk.green(
        'Please fill out the following information about your character:',
      ),
    );
    let charName;
    let charRace;
    let charClass;

    rl.question(chalk.blue('\nWhat is your characters name? '), (name) => {
      charName = name;

      rl.question(chalk.blue('\nWhat is your characters race? '), (race) => {
        charRace = race;

        rl.question(
          chalk.blue('\nWhat is your characters class? '),
          (characterClass) => {
            charClass = characterClass;

            console.log(
              chalk.green(
                `\nYou have created a ${charRace} ${charClass} named ${charName}!`,
              ),
            );
          },
        );
      });
    });
  },
};

async function loginLoop() {
  let username;
  let password;
  let passed = false;
}

          // while (!match) {
          //   rl.question('Username: ', async (input) => {
          //     username = input;

          //     let response = await UserModel.readByQuery({ username });
          //     console.log('response', response);

          //     let user;
          //     if (response[0]){
          //       user = response[0];
          //     }

          //     rl.loginPassMute = true;

          //     rl.question('Password: ', async (input) => {
          //       password = input;

          //       if (!user) {
          //         console.log(chalk.hex('#f0190a')('\nInvalid credentials.'));
          //       } else {
          //         match = await bcrypt.compare(password, user.password);
          //       }
          //     });
          //   });
          // }


module.exports = commands;
