'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

const charDB = require('../../data/db.json');

const charOptions = require('./charOptions/options.js');

async function createCharacter(user) {

  return new Promise(async (resolve, reject) => {

    console.log(
      chalk.green(
        'Please provide the following information about your character:\n',
      ),
    );
  
    let name = await rl.ask(chalk.hex('#4298eb')('What is your characters name? '));
  
    let input = await rl.ask(
      chalk.green(
        '\nWhat is your characters race?\n \n1. Dragonborn \n2. Dwarf \n3. Elf \n4. Gnome \n5. Half-Elf \n6. Half-Orc \n7. Halfling \n8. Human \n9. Tiefling \n\n- ',
      ),
    );
  
    let race = charDB.races[input - 1].name;
  
    input = await rl.ask(
      chalk.hex('#4298eb')('\nWhat is your characters class?\n'),
      charDB.classes
    );

    let charClass = charDB.classes[input - 1];

    let alignmentChoice = await rl.ask(
      chalk.hex('#4298eb')('\nWHat is your characters alignment?\n'),
      charDB.alignment
    );

    let alignment = charDB.alignment[alignmentChoice - 1];

    let { skill_1, skill_2 } = await charOptions.skills();

    let deity = await charOptions.deity();

    let equipment = await charOptions.equipment();

    let ability_scores = await charOptions.abilityScores();

    // attach name, race, skills
    let newChar = {...charDB.pre_made_Characters[charClass.toLowerCase()], name, race, user: user.username, proficient_skills: { skill_1, skill_2 }, deity, equipment, alignment, ability_scores};
  
    let response = await superagent
      .post('https://cf-dnd-character-creator.herokuapp.com/v1/api/character')
      .send(newChar);
  
    console.log(
      chalk.green(
        `\nYou have created a ${response.body.race} ${response.body.class} named ${response.body.name}!`,
      ),
    );
    resolve();
  });

}

module.exports = createCharacter;
