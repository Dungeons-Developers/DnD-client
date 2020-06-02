'use strict';

const charOptions = require('../readline/commands/charOptions/options.js');
const rl = require('../readline/readline.js');

describe('deity', () => {
  it('does something', async () => {
    process.nextTick(() => {
      rl.write('1');
      rl.write(null, { name: 'return' });
    });

    let response = await charOptions.deity();
    expect(response).toEqual('Auril, Goddes of Winter');
    rl.close();
  });
});

describe('equipment', () => {
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
    rl.close();
  });
});