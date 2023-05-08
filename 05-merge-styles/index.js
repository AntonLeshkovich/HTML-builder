const fs = require('fs');

fs.readdir('./05-merge-styles/styles', (error, files) => {
  if (error) return console.error(error.message);

  const cssFiles = files.filter(file => {
    return file.split('.')[1] === 'css';
  })

  const stylesContainer = [];

  cssFiles.forEach(file => {

    fs.readFile(`./05-merge-styles/styles/${file}`, 'utf8', (error, data) => {
      if (error) return console.error(error.message);

      stylesContainer.push(data);

      fs.writeFile('./05-merge-styles/project-dist/bundle.css', stylesContainer.join('\n'), 'utf8', error => {
        if (error) return console.error(error.message);
      });

    });
  });
});