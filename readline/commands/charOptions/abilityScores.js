'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

/**
 * Prompts the user to choose between the default ability scores or rolling random scores using regular D&D rules.
 * Also calls the assign function with the correct array of scores.
 */
async function abilityScores() {
  return new Promise( async (resolve, reject) => {

    console.log(chalk.hex('#4298eb')('\nWe will now assign attribute scores...'));
    let defaultScores = [15, 14, 13, 12, 10, 8];

    let scoresArr = [roll4d6(), roll4d6(), roll4d6(), roll4d6(), roll4d6(), roll4d6()];

    // disclaimer about how randomly generated scores are created
    let generateRandomScoresStr = chalk.yellow('\nEach randomly generated score is created by "rolling" 4 d6, and adding the sum of the highest 3 rolls\n');

    let whichScores = await rl.ask(
      chalk.hex('#4298eb')('\nWould you like to use the default scores (15, 14, 13, 12, 10, 8)\nOr generate 6 random scores?\n') + generateRandomScoresStr,
      ['Default','Generate Random']
    );

    // input validation
    while(whichScores !== '1' && whichScores !== '2') {
      whichScores = rl.ask(chalk.red('That is not a valid option. Please try again.\n') + '- ');
    }

    let ability_scores;

    if (whichScores === '1') {
      ability_scores = await assign(defaultScores);
    } else {
      ability_scores = await assign(scoresArr);
    }

    resolve(ability_scores);
  })
}

/**
 * Ties ability score values to the newly created character object.
 * 
 * @param {Array} scores - This is an array of default integers or integers generated with the roll4d6 function
 */
async function assign(scores) {
  return new Promise( async (resolve, reject) => {
    let attrPrompt = '\nWhich attribute would you like to assign?\n';
    let attrErrorStr = '\nThat attribute does not exist. Please try again.\n';
    let scorePrompt = '\nPlease select from the following scores:\n';
    let scoreErrorStr = '\nInvalid selection. Please try again.\n';

    let attrArr = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

    // scores object for modifying and priting as well eventual shipment to charCreate function
    let ability_scores = {
      str: '-',
      dex: '-',
      con: '-',
      int: '-',
      wis: '-',
      cha: '-',
    };

    console.log(`Here are your scores:`);
    scores.forEach(score => {
      console.log(score);
    });

    while(attrArr[0]) {

      // prompt the user to choose which attribute they want to assign
      let attrChoice =  await getChoice(attrArr, attrPrompt, attrErrorStr);

      let attr = attrArr[attrChoice - 1];

      // prompt the user to choose which score to give the previously chosen attribute
      let scoreChoice = await getChoice(scores, scorePrompt, scoreErrorStr);

      let score = scores[scoreChoice - 1];

      ability_scores[attr.toLowerCase()] = score;

      // removes the score/attributet that was just used from the corresponding arrays
      attrArr.splice(attrChoice - 1, 1);
      scores.splice(scoreChoice - 1, 1);

      let scoreStr = '';
      console.log('\nCurrent scores:\n');
      let scoresToPrint = Object.entries(ability_scores);
      scoresToPrint.forEach((arr, index) => {
        scoreStr += `${arr[0].toUpperCase()}: ${arr[1]}`;
        if (index !== scoresToPrint.length - 1) scoreStr += ' | ';
      });
      console.log(scoreStr);
    }

    resolve(ability_scores);
  });
}

/**
 * Prompts the user with the given string to make a choice given an array of options
 * Reprompts with the errStr if user inputs an invalid selection
 * 
 * @param {Array} array - This is an array of options given to the user to select from
 * @param {String} prompt - This is the string that the user will be prompted with when asked to make a choice
 * @param {String} errStr - This is the string the user will be prompted with when they enter an invalid selection
 */
async function getChoice(array, prompt, errStr) {
  return new Promise( async ( resolve, reject ) => {
    let choice = await rl.ask(
      chalk.hex('#4298eb')(prompt),
      array
    );

    while(invalid(choice, array)) {
      choice = await rl.ask(chalk.red(errStr) + '- ');
    }

    resolve(choice);
  });
}

/**
 * Rolls 4 'd6' and returns the sum of the highest 3 rolls. This is the typical process used for creating ability scores in D&D.
 */
function roll4d6() {
  let arr = [];
  arr.push(Math.floor(Math.random() * 6) + 1);
  arr.push(Math.floor(Math.random() * 6) + 1);
  arr.push(Math.floor(Math.random() * 6) + 1);
  arr.push(Math.floor(Math.random() * 6) + 1);

  arr.sort((a, b) => {
    return b - a;
  });

  return arr[0] + arr[1] + arr[2];
}

module.exports = { abilityScores, roll4d6, getChoice, assign };