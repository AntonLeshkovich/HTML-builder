const fs = require('fs');
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');

fs.mkdir(projectDistPath, (error) => {
    if (error) return console.error(error.message);
});

const templatePath = './06-build-page/template.html';
const headerPath = './06-build-page/components/header.html';
const articlesPath = './06-build-page/components/articles.html';
const footerPath = './06-build-page/components/footer.html';
const indexPath = './06-build-page/project-dist/index.html';

fs.readFile(templatePath, 'utf8', (error, data) => {
  if (error) return console.error(error.message);

  const templateData = data;

  fs.readFile(headerPath, 'utf8', (error, header) => {
    if (error) return console.error(error.message);

    const templateHeader = templateData.replace('{{header}}', header);

    fs.readFile(articlesPath, 'utf8', (error, articles) => {
        if (error) return console.error(error.message);

        const templateHeaderArticles = templateHeader.replace('{{articles}}', articles);

        fs.readFile(footerPath, 'utf8', (error, footer) => {
            if (error) return console.error(error.message);

            const templateHeaderArticlesFooter = templateHeaderArticles.replace('{{footer}}', footer);

            fs.writeFile(indexPath, templateHeaderArticlesFooter, (error) => {
                if (error) return console.error(error.message);
            })
        })
    })
  })
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

fsPromises.mkdir('./06-build-page/project-dist/assets/fonts', { recursive: true })
  .then()
  .catch(error => console.error(error.message));

fs.readdir('./06-build-page/assets/fonts', (error, files) => {
  if (error) return console.error(error.message);

  files.forEach(file => {
    const fontsFolder = `./06-build-page/assets/fonts/${file}`;
    const fontsCopyFolder = `./06-build-page/project-dist/assets/fonts/${file}`;

    fs.copyFile(fontsFolder, fontsCopyFolder, (error) => {
      if (error) return console.error(error.message);
    });

  });
});

fsPromises.mkdir('./06-build-page/project-dist/assets/img', { recursive: true })
  .then()
.catch(error => console.error(error.message));

fs.readdir('./06-build-page/assets/img', (error, files) => {
  if (error) return console.error(error.message);

  files.forEach(file => {
    const imgFolder = `./06-build-page/assets/img/${file}`;
    const imgCopyFolder = `./06-build-page/project-dist/assets/img/${file}`;

    fs.copyFile(imgFolder, imgCopyFolder, (error) => {
      if (error) return console.error(error.message);
    });

  });
});

fsPromises.mkdir('./06-build-page/project-dist/assets/svg', { recursive: true })
  .then()
  .catch(error => console.error(error.message));

fs.readdir('./06-build-page/assets/svg', (error, files) => {
  if (error) return console.error(error.message);

    files.forEach(file => {
      const svgFolder = `./06-build-page/assets/svg/${file}`;
      const svgCopyFolder = `./06-build-page/project-dist/assets/svg/${file}`;

      fs.copyFile(svgFolder, svgCopyFolder, (error) => {
        if (error) return console.error(error.message);
      });

  });
});