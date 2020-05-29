'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

const menuPlus = require('../menuPlus');

const charDB = require('../../data/db.json');

async function createCharacter(user) {

  return new Promise(async (resolve, reject) => {

    console.log(
      chalk.green(
        'Please fill out the following information about your character:',
      ),
    );
  
    let charName = await rl.ask(chalk.blue('\nWhat is your characters name? '));
  
    let input = await rl.ask(
      chalk.blue(
        '\nWhat is your characters race? \n1. Human \n2. Elf \n3. Half-Orc\n',
      ),
    );
  
    let charRace;
    switch (input) {
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
  
    input = await rl.ask(
      chalk.blue(
        '\nWhat is your characters class? \n1. Barbarian \n2. Bard \n3. Cleric \n4. Fighter\n',
      ),
    );
    let charClass;
    switch (input) {
      case '1':
        charClass = 'Barbarian';
        break;
      case '2':
        charClass = 'Bard';
        break;
      case '3':
        charClass = 'Cleric';
        break;
      case '4':
        charClass = 'Fighter';
        break;
      default:
        break;
    }
  
    let equipment = charDB.pre_made_Characters[charClass.toLowerCase()].equipment;
    let abilityScores = charDB.pre_made_Characters[charClass.toLowerCase()].ability_scores;
    let skills = charDB.pre_made_Characters[charClass.toLowerCase()].proficient_skills;
    let alignment = charDB.pre_made_Characters[charClass.toLowerCase()].alignment;
    let deity = charDB.pre_made_Characters[charClass.toLowerCase()].deity;
  
    let response = await superagent
      .post('https://cf-dnd-character-creator.herokuapp.com/v1/api/character')
      .send({ user: user.username, name: charName, class: charClass, race: charRace, alignment: alignment, deity: deity, skills: skills, equipment: equipment, abilityScores: abilityScores});
  
    console.log(
      chalk.green(
        `\nYou have created a ${response.body.race} ${response.body.class} named ${response.body.name}!`,
      ),
    );
    resolve();
  });

  // write a transition here!
  // menuPlus(user);
}

module.exports = createCharacter;
