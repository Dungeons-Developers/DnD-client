'use strict';

// chalk is for customizing terminal text
const chalk = require('chalk');

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

        console.log('Your Selected Character:', charList[charSelect-1]);
        resolve(charList[charSelect-1]);
        return;

      } else {
        console.log('Your party is empty. Please try making a character!');
      }
  
    } catch(e){
      console.log(e);
    }
    console.log('END OF THE GET FUNCTION');
    // resolve();
  })

  
};


module.exports = charGet;