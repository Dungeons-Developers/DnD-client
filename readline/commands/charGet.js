"use strict";

// chalk is for customizing terminal text
const chalk = require("chalk");

// gradient is an add-on to chalk to customize terminal text
const gradient = require("gradient-string");

// superagent is used to make requests to external APIs
const superagent = require("superagent");

// the readline module allows you to prompt users and capture input
const rl = require("../readline");

const invalid = require("./charOptions/invalid.js");

/**
 * Gets all the previously created characters for a given user.
 *
 * @param {*} user - user object for the logged-in user
 * @return {charList} - returns a formatted list of character objects
 */
async function charGet(user) {
  return new Promise(async (resolve, reject) => {
    console.log(
      chalk.green("\nHere are your previously created characters:\n")
    );

    try {
      let response = await superagent.get(
        `https://cf-dnd-character-creator.herokuapp.com/v1/api/${user.username}/characters`
      );

      let charList = response.body;

      if (charList.length) {
        printAllChar(charList);

        let selection = await getCharSelection(charList);

        if (selection === "M") {
          resolve();
          return;
        } else {
          console.log(gradient.cristal("\nYour Selected Character:"));
          printChar(selection);
          resolve(selection);
          return;
        }
      } else {
        console.log("Your party is empty. Please try making a character!");
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
}

/**
 * Prints a list of the characters belonging to the user
 *
 * @param {Array} list - this is an array of user's characters
 */

function printAllChar(list) {
  list.forEach((characters, index) => {
    console.log(
      chalk.green(
        `${index + 1}. ${characters.name} - ${characters.race} ${
          characters.class
        }`
      )
    );
  });
}

/**
 * Prompts the user for a selection of previously displayed options
 *
 * @param {Array} list - this is an array of the options presented to the user
 */
async function getCharSelection(list) {
  return new Promise(async (resolve, reject) => {
    let charSelect = await rl.ask(
      chalk.hex("#4298eb")(
        'Select a character to see more details or type "M" to go back to the main menu.\n'
      ) + "- "
    );

    while (invalid(charSelect, list)) {
      if (charSelect.toUpperCase() === "M") {
        console.log("\nReturning to main menu...\n");
        resolve("M");
        return;
      }
      charSelect = await rl.ask(
        chalk.red("\nInvalid selection. Please try again.\n") + "- "
      );
    }

    resolve(list[charSelect - 1]);
    return;
  });
}

/**
 * Outputs the selected character object in a nicely formatted way.
 *
 * @param {*} selection - this param is the selected character
 */
function printChar(selection) {
  let regexGood = /\b(\w*Good\w*)\b/gim;
  let regexEvil = /\b(\w*Evil\w*)\b/gim;


  console.log(gradient.cristal("Name -"), selection.name);
  console.log(gradient.cristal("Race -"), selection.race);
  console.log(gradient.cristal("Class -"), selection.class);

  if (regexEvil.test(selection.alignment)) {
    console.log(
      gradient.cristal("Alignment -"),
      chalk`{hex('#FF0000') ${selection.alignment}}`
    );
  } else if (regexGood.test(selection.alignment)) {
    console.log(
      gradient.cristal("Alignment -"),
      chalk`{hex('#008000') ${selection.alignment}}`
    );
  } else {
    console.log(
      gradient.cristal("Alignment -"),
      chalk`{hex('#4298eb') ${selection.alignment}}`
    );
  }

  console.log(gradient.cristal("Deity -"), selection.deity);
  console.log(
    gradient.cristal("Proficiencies -"),
    `\n\t${selection.proficient_skills.skill_1} \n\t${selection.proficient_skills.skill_2}`
  );
  console.log(
    gradient.cristal("Equipment - \n\tArmor: "),
    selection.equipment.armor,
    gradient.cristal("\n\tAdventure Pack: "),
    selection.equipment.adventure_packs,
    gradient.cristal("\n\tWeapons -\n\t\t 1: "),
    selection.equipment.weapons.choice_1,
    gradient.cristal("\n\t\t 2: "),
    selection.equipment.weapons.choice_2
  );
  console.log(
    gradient.cristal("Ability Scores - \n\tSTR: "),
    selection.ability_scores.str,
    gradient.cristal(" | DEX: "),
    selection.ability_scores.dex,
    gradient.cristal(" | CON: "),
    selection.ability_scores.con,
    gradient.cristal(" | INT: "),
    selection.ability_scores.int,
    gradient.cristal(" | WIS: "),
    selection.ability_scores.wis,
    gradient.cristal(" | CHA: "),
    selection.ability_scores.cha,
    "\n"
  );
}

module.exports = { charGet, getCharSelection, printAllChar, printChar };
