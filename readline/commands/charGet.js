'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

// superagent is used to make requests to external APIs
const superagent = require('superagent');

// the readline module allows you to prompt users and capture input
const rl = require('../readline');

async function charGet(username) {
  console.log(
    chalk.green(
      'Here are your previously created characters.',
    ),
  );

  try {
    let response = await superagent.get(`https://cf-dnd-character-creator.herokuapp.com/v1/api/${username}/characters`);
    
    let charList = response.body;
  
    if(charList.length){
      charList.forEach( (characters, index) => {
      
        console.log(
          chalk.green(
            `${index+1}. ${characters.name} - ${characters.race} ${characters.class} \n`,
          ),
        );
    
      });
    } else {
      console.log('Your party is empty. Please try making a character!');
    }
  } catch(e){
    console.log(e);
  }

};


module.exports = charGet;