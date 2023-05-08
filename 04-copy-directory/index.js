const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.mkdir('./04-copy-directory/files-copy', { recursive: true })
  .then()
  .catch(error => console.error(error.message));

fs.readdir('./04-copy-directory/files', (error, files) => {
  if (error) return console.error(error.message);

  files.forEach(file => {
    const filesFolder = `./04-copy-directory/files/${file}`;
    const filesCopyFolder = `./04-copy-directory/files-copy/${file}`;

    fs.copyFile(filesFolder, filesCopyFolder, (error) => {
      if (error) return console.error(error.message);
    });

  });
});