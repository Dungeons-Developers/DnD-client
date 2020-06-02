'use strict';

const rl = require('../../readline');
const charDB = require('../../../data/db.json');
const chalk = require('chalk');

const invalid = require('./invalid.js');

// prompts the user to choose between default scores or rolling random scores
// calls the assign function with the correct array of scores
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

// prompts the user to assign select an attribute and give it a score
async function assign(scores) {
  return new Promise( async (resolve, reject) => {
    let attrArr = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

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
      let attrChoice = await rl.ask(
        chalk.hex('#4298eb')('\nWhich attribute would you like to assign?\n'),
        attrArr
      );

      while(invalid(attrChoice, attrArr)) {
        attrChoice = await rl.ask(chalk.red('\nThat attribute does not exist. Please try again.\n') + '- ');
      }

      let attr = attrArr[attrChoice - 1];

      let scoreChoice = await rl.ask(
        chalk.hex('#4298eb')('\nPlease select from the following scores:\n'),
        scores
      );

      while(invalid(scoreChoice, scores)) {
        scoreChoice = await rl.ask(chalk.red('\nInvalid select. Please try again.\n') + '- ');
      }

      let score = scores[scoreChoice - 1];

      ability_scores[attr.toLowerCase()] = score;

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

// rolls 4 "d6" and returns the sum of the highest 3 rolls
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

module.exports = abilityScores;