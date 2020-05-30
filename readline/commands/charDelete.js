'use strict';

const chalk = require('chalk');

const superagent = require('superagent');

const rl = require('../readline');

async function deleteCharacter(character) {
  return new Promise( async (resolve, reject) => {
    try {
      let response = await superagent.delete(`https://cf-dnd-character-creator.herokuapp.com/v1/api/character/${character._id}`);
      console.log(`Your character, ${character.name}, has been claimed by ${character.deity}!`);
      resolve();
    }
    catch(e){
      console.log(e);
    }
  });
};


module.exports = deleteCharacter;
