const fs = require('fs');

fs.readdir('./03-files-in-folder/secret-folder', (error, files) => {
  if (error) return console.error(error.message);

  console.log('\nFolder files:\n');

  files.forEach(file => {

    fs.stat(`./03-files-in-folder/secret-folder/${file}`, (error, stats) => {
      if (error) return console.error(error.message);

      if (stats.isFile()) {
        console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${stats.size / 1024}kb`);
      }

    });
  });
});