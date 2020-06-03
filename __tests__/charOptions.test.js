'use strict';

jest.setTimeout(50000)

const charOptions = require('../readline/commands/charOptions/options.js');
const rl = require('../readline/readline.js');
const abilityScoreFunc = require('../readline/commands/charOptions/abilityScores.js');

xdescribe('deity', () => {
  it('does something', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.deity();
    expect(response).toEqual('Auril, Goddes of Winter');
  });
});

xdescribe('equipment', () => {
  it('does something', async () => {
    setTimeout(() => {
      rl.write('2');
      rl.write(null, { name: 'return' });

      setTimeout(() => {
        rl.write('2');
        rl.write(null, { name: 'return' });

        setTimeout(() => {
          rl.write('2');
          rl.write(null, { name: 'return' });

          setTimeout(() => {
            rl.write('2');
            rl.write(null, { name: 'return' });
          }, 500);
        }, 500);
      }, 500);
    }, 500);

    let response = await charOptions.equipment();
    expect(response.weapons).toBeDefined();
    expect(response.armor).toBeDefined();
    expect(response.adventure_packs).toBeDefined();
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

xdescribe('race', () => {
  it('does some work', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.race();
    expect(response).toBe('Dragonborn');
  })
});

xdescribe('alignment', () => {
  it('picks an alignment', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });
    
    let response = await charOptions.alignment();
    expect(response).toBe('Lawful Good');
  });
});

xdescribe('class', () => {
  it('picks a class', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.classSelect();
    expect(response).toBe('Barbarian');
  });
})

  // abilityscores
  // skills
xdescribe('ability scores', () => {
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
                          },100)
                        },100)
                      },100)
                    },100)
                  },100)
                },100)
              },100)
            },100)
          },100)
        },100)
      },100)
    },100);

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

  it('get choice unhappy', async () => {
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
    rl.close();
  })
});

xdescribe('skills', () => {


});
