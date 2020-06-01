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
        'Please fill out the following information about your character:',
      ),
    );
  
    let name = await rl.ask(chalk.blue('\nWhat is your characters name? '));
  
    let input = await rl.ask(
      chalk.blue(
        '\nWhat is your characters race? \n1. Dragonborn \n2. Dwarf \n3. Elf \n4. Gnome \n5. Half-Elf \n6. Half-Orc \n7. Halfling \n8. Human \n9. Tiefling \n',
      ),
    );
  
    let race = charDB.races[input - 1].name;
  
    input = await rl.ask(
      chalk.blue(
        '\nWhat is your characters class? \n1. Barbarian \n2. Bard \n3. Cleric \n4. Druid \n5. Fighter \n6. Monk \n7. Paladin \n8. Ranger \n9. Rogue \n10. Sorcerer \n11. Warlock \n12. Wizard \n'
      )
    );
    let charClass = charDB.classes[input - 1];

    let skillChoice_1 = await rl.ask(
      chalk.blue(
        '\nPlease choose a skill (1/2) \n1. Acrobatics \n2. Animal Handling \n3. Arcana \n4. Athletics \n5. Deception \n6. History \n7. Insight \n8. Intimidation \n9. Investigation \n10. Medicine \n11. Nature \n12. Perception \n13. Performance \n14. Persuasion \n15. Religion \n16. Sleight of Hand \n17. Stealth \n18. Survival \n'
      )
    );
    let skillChoice_2 = await rl.ask(
      chalk.blue('\nPlease choose another skill (2/2)\n')
    );

    let skill_1 = charDB.skills[skillChoice_1 - 1];
    let skill_2 = charDB.skills[skillChoice_2 - 1];

    // attach name, race, skills
    let newChar = {...charDB.pre_made_Characters[charClass.toLowerCase()], name, race, user: user.username, proficient_skills: { skill_1, skill_2 }};
  
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
