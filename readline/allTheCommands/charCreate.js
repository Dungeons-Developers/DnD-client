'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');


async function createCharacter(username) {
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

    rl.question(chalk.blue('\nWhat is your characters race? \n1. Human \n2. Elf \n3. Half-Orc\n'), async (input) => {
      
      switch(input) {
        case '1':
          charRace = 'Human';
          break;
        case '2':
          charRace = 'Elf';
          break;
        case '3':
          charRace = 'Half-Orc';
          break;
        default:
          break;
      }


      rl.question(
        chalk.blue('\nWhat is your characters class? \n1. Bard \n2. Paladin \n3. Cleric\n'), async (input) => {

          switch(input) {
            case '1':
              charClass = 'Bard';
              break;
            case '2':
              charClass = 'Paladin';
              break;
            case '3':
              charClass = 'Cleric';
              break;
            default:
              break;
          }

          
          let response = await superagent.post('https://cf-dnd-character-creator.herokuapp.com/v1/api/character').send({ user: username, name: charName, class: charClass, race: charRace });
          
          console.log(
            chalk.green(
              `\nYou have created a ${response.body.race} ${response.body.class} named ${response.body.name}!`,
            ),
          );
          
          // write a transition here!
        },
      );
    });
  });
}

module.exports = createCharacter;