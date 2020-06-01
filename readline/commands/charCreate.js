'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

const charDB = require('../../data/db.json');

async function createCharacter(user) {

  return new Promise(async (resolve, reject) => {

    console.log(
      chalk.green(
        'Please provide the following information about your character:\n',
      ),
    );
  
    let name = await rl.ask(chalk.blue('What is your characters name? '));
  
    let input = await rl.ask(
      chalk.blue(
        '\nWhat is your characters race?\n \n1. Dragonborn \n2. Dwarf \n3. Elf \n4. Gnome \n5. Half-Elf \n6. Half-Orc \n7. Halfling \n8. Human \n9. Tiefling \n\n- ',
      ),
    );
  
    let race = charDB.races[input - 1].name;
  
    input = await rl.ask(
      chalk.blue('\nWhat is your characters class?\n'),
      charDB.classes
    );

    let charClass = charDB.classes[input - 1];

    let alignmentChoice = await rl.ask(
      chalk.blue('\nWHat is your characters alignment?\n'),
      charDB.alignment
    );

    let alignment = charDB.alignment[alignmentChoice - 1];

    let skillChoice_1 = await rl.ask(
      chalk.blue('\nPlease choose a skill (1/2)\n'),
      charDB.skills
    );

    let skillChoice_2 = await rl.ask(
      chalk.blue('\nPlease choose another skill (2/2)\n- ')
    );

    let skill_1 = charDB.skills[skillChoice_1 - 1];
    let skill_2 = charDB.skills[skillChoice_2 - 1];

    let deityChoice = await rl.ask(
      chalk.blue('\nWhich Deity will your character worship?\n'),
      charDB.deity
    );

    let deity = charDB.deity[deityChoice - 1];

    let armorChoice;
    let weaponChoice_1;
    let weaponChoice_2;
    let packChoice;


    armorChoice = await rl.ask(
      chalk.blue('\nNext we will choose your characters equipment...\n\nPlease choose your armor.\n'),
      charDB.armor
    );

    let armor = charDB.armor[armorChoice - 1];

    weaponChoice_1 = await rl.ask(
      chalk.blue('\nPlease choose a weapon (1/2)\n'),
      charDB.weapons
    );
    weaponChoice_2 = await rl.ask(
      chalk.blue('\nPlease choose another weapon (2/2)\n- ')
    );

    let weapons = { 
      choice_1: charDB.weapons[weaponChoice_1], 
      choice_2: charDB.weapons[weaponChoice_2] 
    }

    packChoice = await rl.ask(
      chalk.blue('\nPlease choose your adventuring pack\n'),
      charDB.adventuring_packs
    );

    let adventure_packs = charDB.adventuring_packs[packChoice - 1];

    let equipment = {
      armor,
      weapons,
      adventure_packs
    }

    // attach name, race, skills
    let newChar = {...charDB.pre_made_Characters[charClass.toLowerCase()], name, race, user: user.username, proficient_skills: { skill_1, skill_2 }, deity, equipment, alignment};
  
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
