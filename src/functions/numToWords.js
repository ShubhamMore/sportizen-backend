let converter = require('number-to-words');
let capitalize = require('capitalize');
const numToWords = async (num) => {
  const numToWords = converter.toWords(parseInt(num)).replace(',', '').replace('-', ' ').split(' ');
  const arr = new Array();
  numToWords.forEach((curNum) => {
    arr.push(capitalize(curNum));
  });
  return arr.join(' ');
};

module.exports = numToWords;
