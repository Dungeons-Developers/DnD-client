'use strict';

jest.setTimeout(50000)

const charOptions = require('../readline/commands/charOptions/options.js');
const rl = require('../readline/readline.js');
const abilityScoreFunc = require('../readline/commands/charOptions/abilityScores.js');
const equipmentFunc = require('../readline/commands/charOptions/equipment.js');

describe('deity', () => {
  it('responds properly given valid input', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.deity();
    expect(response).toEqual('Auril, Goddes of Winter');
  });

  it('reprompts given invalid input', async () => {
    setTimeout(() => {
      rl.write('goose');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);

    let response = await charOptions.deity();
    expect(response).toEqual('Auril, Goddes of Winter');
  });
});

describe('equipment', () => {
  it('getArmor responds properly given valid input', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    }, 50);

    let response = await equipmentFunc.getArmor();
    expect(response).toBeDefined();
    expect(response).toBe('Padded');
  });

  it('getArmor reprompts given invalid input', async () => {
    setTimeout(() => {
      rl.write('garble');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);

    let response = await equipmentFunc.getArmor();
    expect(response).toBeDefined();
    expect(response).toBe('Padded');

  });

  it('getWeapons responds properly given valid input', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('2');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);

    let response = await equipmentFunc.getWeapons();
    expect(response).toBeDefined();
    expect(response.choice_1).toBe('Club');
    expect(response.choice_2).toBe('Dagger');

  });

  it('getWeapons reprompts given invalid input on first entry', async () => {
    setTimeout(() => {
      rl.write('try again');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });

        setTimeout(() => {
          rl.write('2');
          rl.write(null, { name: 'return' });
        }, 50);
      }, 50);
    }, 50);

    let response = await equipmentFunc.getWeapons();
    expect(response).toBeDefined();
    expect(response.choice_1).toBe('Club');
    expect(response.choice_2).toBe('Dagger');

  });

  it('getWeapons reprompts given invalid input on second entry', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('try again');
        rl.write(null, { name: 'return' });

        setTimeout(() => {
          rl.write('2');
          rl.write(null, { name: 'return' });
        }, 50);
      }, 50);
    }, 50);

    let response = await equipmentFunc.getWeapons();
    expect(response).toBeDefined();
    expect(response.choice_1).toBe('Club');
    expect(response.choice_2).toBe('Dagger');

  });

  it('getPack responds properly given proper input', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    }, 50);

    let response = await equipmentFunc.getPack();
    expect(response).toBeDefined();
    expect(response).toBe('Burglars Pack');
  });

  it('getPack reprompts when given invalid input', async () => {
    setTimeout(() => {
      rl.write('game of thrones season 8 was garbage');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);

    let response = await equipmentFunc.getPack();
    expect(response).toBeDefined();
    expect(response).toBe('Burglars Pack');

  });

});

describe('name', () => {
  it('makes a name', async () => {
    process.nextTick(() => {
      rl.write('Billy Bob');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.name();
    expect(response).toBe('Billy Bob');
  })
});

describe('race', () => {
  it('responds with the correct race given proper input', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.race();
    expect(response).toBe('Dragonborn');
  });

  it('reprompts when given invalid input, accepts second input if valid', async () => {
    setTimeout(() => {
      rl.write('qwerty');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('2');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);

    let response = await charOptions.race();
    expect(response).toBeDefined();
    expect(response).toBe('Dwarf');
  });
});

describe('alignment', () => {
  it('picks an alignment', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });
    
    let response = await charOptions.alignment();
    expect(response).toBe('Lawful Good');
  });

  it('reprompts when given invalid input, accepts second input if valid', async () => {
    setTimeout(() => {
      rl.write('123456789');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);
    
    let response = await charOptions.alignment();
    expect(response).toBe('Lawful Good');

  });
});

describe('class', () => {
  it('picks a class', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.classSelect();
    expect(response).toBe('Barbarian');
  });

  it('reprompts when given invalid input, accepts second input if valid', async () => {
    setTimeout(() => {
      rl.write('baaaaad');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });
      }, 50);
    }, 50);

    let response = await charOptions.classSelect();
    expect(response).toBe('Barbarian');
  });
})

  // abilityscores
  // skills
describe('ability scores', () => {
  it('roll4d6 defined', () => {
    let scores = abilityScoreFunc.roll4d6();
    expect(scores).toBeDefined();
  })

  it('assigns numbers', async () => {
    let defaultScores = [15, 14, 13, 12, 10, 8];

    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });

        setTimeout(() => {
          rl.write('1');
          rl.write(null, { name: 'return' });

          setTimeout(() => {
            rl.write('1');
            rl.write(null, { name: 'return' });
      
            setTimeout(() => {
              rl.write('1');
              rl.write(null, { name: 'return' });
              
              setTimeout(() => {
                rl.write('1');
                rl.write(null, { name: 'return' });

                setTimeout(() => {
                  rl.write('1');
                  rl.write(null, { name: 'return' });
            
                  setTimeout(() => {
                    rl.write('1');
                    rl.write(null, { name: 'return' });
            
                    setTimeout(() => {
                      rl.write('1');
                      rl.write(null, { name: 'return' });

                      setTimeout(() => {
                        rl.write('1');
                        rl.write(null, { name: 'return' });
                  
                        setTimeout(() => {
                          rl.write('1');
                          rl.write(null, { name: 'return' });
                          
                          setTimeout(() => {
                            rl.write('1');
                            rl.write(null, { name: 'return' });
                          },50)
                        },50)
                      },50)
                    },50)
                  },50)
                },50)
              },50)
            },50)
          },50)
        },50)
      },50)
    },50);

    let whatEver = await abilityScoreFunc.assign(defaultScores);

    console.log('=======whatever=======', whatEver.str);

    expect(whatEver).toBeDefined();
    expect(whatEver.str).toBeDefined();
    expect(whatEver.dex).toBeDefined();
    expect(whatEver.con).toBeDefined();
    expect(whatEver.int).toBeDefined();
    expect(whatEver.wis).toBeDefined();
    expect(whatEver.cha).toBeDefined();
  });

  it('getChoice reprompts when given invalid input, accepts second input if valid', async () => {
    let defaultScores = [15, 14, 13, 12, 10, 8];
    let prompt = 'I am a string';
    let errStr = ' I am an error';

    setTimeout(() => {
      rl.write('12');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('2');
        rl.write(null, {name: 'return' });
      }, 100);
    }, 100);

    let answer = await abilityScoreFunc.getChoice(defaultScores, prompt, errStr);

    expect(answer).toBe('2');
  })
});

describe('skills', () => {
  it('selects a skill given proper input', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('2');
        rl.write(null, { name: 'return' });
      }, 100);
    }, 100);

    let response = await charOptions.skills();

    expect(response).toBeDefined();
    expect(response.skill_1).toBe('Acrobatics');
    expect(response.skill_2).toBe('Animal Handling');
  });

  it('reprompts when invalid input is given as first selection', async () => {
    setTimeout(() => {
      rl.write('qwerty');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });

        setTimeout(() => {
          rl.write('2');
          rl.write(null, { name: 'return' });
        }, 100);
      }, 100);
    }, 100);

    let response = await charOptions.skills();

    expect(response).toBeDefined();
    expect(response.skill_1).toBe('Acrobatics');
    expect(response.skill_2).toBe('Animal Handling');
  });

  it('reprompts when invalid input is given as second selection', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('qwerty');
        rl.write(null, { name: 'return' });

        setTimeout(() => {
          rl.write('2');
          rl.write(null, { name: 'return' });
        }, 100);
      }, 100);
    }, 100);

    let response = await charOptions.skills();

    expect(response).toBeDefined();
    expect(response.skill_1).toBe('Acrobatics');
    expect(response.skill_2).toBe('Animal Handling');
  });

  it('reprompts when duplicate selection is made', async () => {
    setTimeout(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('1');
        rl.write(null, { name: 'return' });

        setTimeout(() => {
          rl.write('2');
          rl.write(null, { name: 'return' });
        }, 100);
      }, 100);
    }, 100);

    let response = await charOptions.skills();

    expect(response).toBeDefined();
    expect(response.skill_1).toBe('Acrobatics');
    expect(response.skill_2).toBe('Animal Handling');
    rl.close();
  });
});
