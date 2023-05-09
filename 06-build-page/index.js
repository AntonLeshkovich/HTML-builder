const fs = require('fs');
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');

fs.mkdir(projectDistPath, (error) => {
    if (error) return console.error(error.message);
});

const templatePath = './06-build-page/template.html';
const componentsPath = './06-build-page/components';
const indexPath = './06-build-page/project-dist/index.html';



fs.readFile(templatePath, 'utf8', (error, data) => {
  if (error) return console.error(error.message);

  const templateData = data;
  const pattern = /{{(.*?)}}/g;
  const matches = templateData.match(pattern);
  const patternNames = matches.map(el => el.replace(/[{}]/g, ''));

  fs.readdir(componentsPath, (error, files) => {
    if (error) return console.error(error.message);

    let newTemplateData = templateData;

    files.forEach(file => {

      if (patternNames.includes(file.split('.')[0])) {
        fs.readFile(`./06-build-page/components/${file}`, 'utf8', (error, fileContent) => {
          if (error) return console.error(error.message);
          const index = matches.indexOf(`{{${file.split('.')[0]}}}`)

          newTemplateData = newTemplateData.replace(`${matches[index]}`, fileContent);

          fs.writeFile(indexPath, newTemplateData, (error) => {
            if (error) return console.error(error.message);
          })

        });
      }

    });
  });
});

fs.readdir('./06-build-page/styles', (error, files) => {
  if (error) return console.error(error.message);

  const cssFiles = files.filter(file => {
    return file.split('.')[1] === 'css';
  });

  const stylesContainer = [];

  cssFiles.forEach(file => {

    fs.readFile(`./06-build-page/styles/${file}`, 'utf8', (error, data) => {
      if (error) return console.error(error.message);

      stylesContainer.push(data);

      fs.writeFile('./06-build-page/project-dist/style.css', stylesContainer.join('\n'), 'utf8', error => {
        if (error) return console.error(error.message);
      });

    });
  });
});

const fsPromises = fs.promises;

fsPromises.mkdir('./06-build-page/project-dist/assets', { recursive: true })
  .then()
  .catch(error => console.error(error.message));

fs.readdir('./06-build-page/assets', (error, folders) => {
  if (error) return console.error(error.message);

  folders.forEach(folder => {

    fsPromises.mkdir(`./06-build-page/project-dist/assets/${folder}`, { recursive: true })
      .then()
      .catch(error => console.error(error.message));

    fs.readdir(`./06-build-page/assets/${folder}`, (error, files) => {
      if (error) return console.error(error.message);

      files.forEach(file => {
        const filesFolder = `./06-build-page/assets/${folder}/${file}`;
        const filesCopyFolder = `./06-build-page/project-dist/assets/${folder}/${file}`;

        fs.copyFile(filesFolder, filesCopyFolder, (error) => {
          if (error) return console.error(error.message);
        });

      });
    });
  });
});