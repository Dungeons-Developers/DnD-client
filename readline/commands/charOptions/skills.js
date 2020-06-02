'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

/**
 * Adds 2 skills to a newly created character object
 */
async function skills() {
  return new Promise( async (resolve, reject) => {
    let choice_1 = await skillOne();

    while( invalid(choice_1, charDB.skills) ) {
      console.log('\nThat skill is not listed. Try again.\n');
      choice_1 = await skillOne();
    }

    let choice_2 = await skillTwo();

    while ( choice_1 === choice_2 || invalid(choice_2, charDB.skills) ) {
      if (choice_1 === choice_2) {
        console.log(chalk.red('\nCannot choose two of the same skill.'));
      } else {
        console.log(chalk.red('\nThat skill is not listed. Try again.'))
      }
      choice_2 = await skillTwo();
    }

    resolve(
      { 
        skill_1: charDB.skills[choice_1 - 1],
        skill_2: charDB.skills[choice_2 - 1]
      }
    );
  });
}

/**
 * Adds the first skill to a newly created character object
 */
async function skillOne() {
  return new Promise( async (resolve, reject) => {
    let choice_1 = await rl.ask(
      chalk.hex('#4298eb')('\nPlease choose a skill (1/2)\n'),
      charDB.skills
    );

    resolve(choice_1);
  });
}

/**
 * Adds the second skill to a newly created character object
 */
async function skillTwo() {
  return new Promise( async (resolve, reject) => {
    let choice_2 = await rl.ask(
      chalk.hex('#4298eb')('\nPlease choose another skill (2/2)\n') + '- '
    );

    resolve(choice_2);
  });
}

module.exports = skills;
