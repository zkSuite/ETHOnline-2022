const BigNumber = require('bignumber.js');
BigNumber.set({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber.ROUND_DOWN });

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Function to convert BigInt to tuple
const bigint_to_tuple = (x) => {
  let mod = BigNumber(2).pow(BigNumber(64));
  let ret = [BigNumber(0), BigNumber(0), BigNumber(0), BigNumber(0)];
  var x_temp = x;

  for (var idx = 0; idx < ret.length; idx++) {
    ret[idx] = BigNumber(x_temp).mod(mod).toString();
    x_temp = BigNumber(x_temp).dividedBy(mod);
  }
  return ret;
};

// Function to convert hex to decimal
const h2d = (hex) => {
  if (hex.length % 2) {
    hex = '0' + hex;
  }
  const bn = BigInt('0x' + hex);
  return bn.toString(10);
};

// Function to convert decimal to hex
const d2h = (dec) => {
  return BigInt(dec).toString(16);
};

// Function to fill array with a value
const fillArray = (arr, max, value) => {
  const length = arr.length;
  for (let i = length; i < max; i++) {
    arr[i] = value;
  }
  return arr;
};

module.exports = { generateRandomId, bigint_to_tuple, h2d, d2h, fillArray };
