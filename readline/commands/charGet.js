'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

const gradient = require('gradient-string');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

async function charGet(user) {
  return new Promise( async (resolve, reject ) => {
    console.log(
      chalk.green(
        'Here are your previously created characters.',
      ),
    );
  
    try {
      let response = await superagent.get(`https://cf-dnd-character-creator.herokuapp.com/v1/api/${user.username}/characters`);
      
      let charList = response.body;
    
      if(charList.length){
        charList.forEach( (characters, index) => {
        
          console.log(
            chalk.green(
              `${index+1}. ${characters.name} - ${characters.race} ${characters.class} \n`,
            ),
          );
      
        });

        let charSelect = await rl.ask(chalk.hex('#4298eb')('Select a character to see more details or type "M" to go back to the main menu.'));

        
        if (charSelect.toUpperCase() === 'M') {
          console.log('Returning to main menu...');
          resolve();
          return;
        }

        if (charSelect > charList.length) {
          console.log('That character does not exist! Returning to main menu...');
          resolve();
          return;
        }

        let selection = charList[charSelect-1];
        console.log(gradient.cristal('Your Selected Character:'));
        printChar(selection);
       
          
        // Object.entries(charList[charSelect-1]).forEach(pair => {

        // });

        resolve(selection);
        return;

      } else {
        console.log('Your party is empty. Please try making a character!');
      }
  
    } catch(e){
      console.log(e);
    }
  });
};

function printChar(selection) {
  let regexGood = /\b(\w*Good\w*)\b/gmi;
  let regexEvil = /\b(\w*Evil\w*)\b/gmi;

   console.log(gradient.cristal('Name -'), selection.name);
   console.log(gradient.cristal('Race -'), selection.race);
   console.log(gradient.cristal('Class -'), selection.class);

  //  console.log(`Name - ${selection.name}`);
  //  console.log(`Race - ${selection.race}`);
  //  console.log(`Class - ${selection.class}`);

  if (regexEvil.test(selection.alignment)) { 
    console.log(gradient.cristal('Alignment -'), chalk`{redBright ${selection.alignment}}`);
  } else if (regexGood.test(selection.alignment)) {
    console.log(gradient.cristal('Alignment -'), chalk`{greenBright ${selection.alignment}}`);
  } else {
    console.log(gradient.cristal('Alignment -'), chalk`{blueBright ${selection.alignment}}`);
  }

  console.log(gradient.cristal('Deity -'), selection.deity);
  console.log(gradient.cristal('Proficiencies -'), `\n\t${selection.proficient_skills.skill_1} \n\t${selection.proficient_skills.skill_2}`);
  console.log(gradient.cristal('Equipment - ', '\n\tArmor: '), selection.equipment.armor, gradient.cristal('\n\tAdventure Pack: '), selection.equipment.adventure_packs, gradient.cristal('\n\tWeapons -\n\t\t 1: '), selection.equipment.weapons.choice_1, gradient.cristal('\n\t\t 2: '), selection.equipment.weapons.choice_2);
  console.log(gradient.cristal('Ability Scores - \n\tSTR: '), selection.ability_scores.str, gradient.cristal(' | DEX: '), selection.ability_scores.dex, gradient.cristal(' | CON: '), selection.ability_scores.con, gradient.cristal(' | INT: '), selection.ability_scores.int, gradient.cristal(' | WIS: '), selection.ability_scores.wis, gradient.cristal(' | CHA: '), selection.ability_scores.cha)

  //  console.log(`Deity - ${selection.deity}`);
  //  console.log(`Proficiencies - \n\t${selection.proficient_skills.skill_1} \n\t${selection.proficient_skills.skill_2}`);
  //  console.log(`Equipment - \n\tArmor: ${selection.equipment.armor}\n\tAdventure Pack: ${selection.equipment.adventure_packs}\n\tWeapons -\n\t\t 1: ${selection.equipment.weapons.choice_1}\n\t\t 2: ${selection.equipment.weapons.choice_2}`);
  //  console.log(`Ability Scores - \n\tSTR: ${selection.ability_scores.str} | DEX: ${selection.ability_scores.dex} | CON: ${selection.ability_scores.con} | INT: ${selection.ability_scores.int} | WIS: ${selection.ability_scores.wis} | CHA: ${selection.ability_scores.cha}`);
}


module.exports = charGet;