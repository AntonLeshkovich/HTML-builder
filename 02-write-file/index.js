const fs = require('fs');
const process = require('process');

const writeStream = fs.createWriteStream('./02-write-file/text.txt');

console.log('\nHi, student! Please enter text:\n(If you want to exit, type "exit" or press "ctrl + c")\n');

process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    writeStream.end();
    console.log('\nInput terminated!\nGood luck!');
    process.exit();
  }
  writeStream.write(data);
});

process.on('SIGINT', () => {
  console.log('\nInput terminated!\nGood luck!');
  writeStream.end(() => process.exit());
});