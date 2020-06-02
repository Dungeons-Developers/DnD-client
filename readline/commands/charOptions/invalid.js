'use strict';

function invalid(input, arr) {
  return !arr[parseInt(input) - 1];
};

module.exports = invalid;