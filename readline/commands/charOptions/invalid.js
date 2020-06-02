'use strict';

/**
 * Tests to see if a given input exists in a given array.
 * 
 * @param {*} input - input data 
 * @param {*} arr - array that may or may not hold input data
 * @return {boolean} - returns true if the input is not found in the array
 */
function invalid(input, arr) {
  return !arr[parseInt(input) - 1];
};

module.exports = invalid;