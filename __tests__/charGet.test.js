'use strict';

jest.setTimeout(50000)

const charGetFunc = require('../readline/commands/charGet.js');
const rl = require('../readline/readline.js');

describe('character selection', () => {
  let charArr = [
    {
      name: 'Test',
      race: 'Elf',
      class: 'Rogue'
    },
    {
      name: 'Another Test',
      race: 'Human',
      class: 'Wizard'
    }
  ]

  it('returns a character object given proper input', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    }, 50);


    let response = await charGetFunc.getCharSelection(charArr);

    expect(response).toBeDefined();
    expect(response.name).toBe('Test');
    expect(response.race).toBe('Elf');
    expect(response.class).toBe('Rogue');
  });

  it('reprompts user after invalid input, accepts input if response is valid', async () => {
    setTimeout(() => {
      rl.write('1234');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);


    let response = await charGetFunc.getCharSelection(charArr);

    expect(response).toBeDefined();
    expect(response.name).toBe('Test');
    expect(response.race).toBe('Elf');
    expect(response.class).toBe('Rogue');
    // rl.close();
  });
});

describe('print character list', () => {
  let list = [
    {
      name: 'Test',
      race: 'Elf',
      class: 'Rogue'
    },
    {
      name: 'Another Test',
      race: 'Human',
      class: 'Wizard'
    }
  ];

  it('logs all characters in the array', () => {
    const spy = jest.spyOn(console, 'log');

    const print = jest.fn(charGetFunc.printAllChar);

    print(list);

    expect(spy).toHaveBeenCalled();
  });
});

describe('print single character', () => {
  it('prints character details', () => {
    let character = {
      name: 'Test',
      race: 'Dwarf',
      class: 'Fighter',
      alignment: 'Neutral Good',
      deity: 'The Spaghetti Monster in the Sky',
      proficient_skills: {
        skill_1: 'Jumping',
        skill_2: 'Sewing'
      },
      equipment: {
        armor: 'Cashmere',
        weapons: {
          choice_1: 'Baton',
          choice_2: 'Frying pan'
        },
        adventure_packs: 'Supreme Limited Edition Backpack'
      },
      ability_scores: {
        str: 9000,
        dex: 9000,
        con: 9000,
        int: 10,
        wis: 10,
        cha: 9000
      }
    }
    const spy = jest.spyOn(console, 'log');
    const print = jest.fn(charGetFunc.printChar);
    
    print(character);
    
    expect(spy).toHaveBeenCalled();
  })
});

describe('full charGet function', () => {

  it('resolves the proper choice given valid input', async () => {
    setTimeout(() => {
      rl.write('25');
      rl.write(null, { name: 'return' });
    }, 2000);

    let response = await charGetFunc.charGet({username: 'u'});

    expect(response).toBeDefined();
    rl.close();
  });
});