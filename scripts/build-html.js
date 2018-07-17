const fs = require('fs');
const Mustache = require('mustache');

const template = fs.readFileSync('src/html/index.mustache', 'utf8');
const view = require('../src/html/app.data.js');

const partials = fs.readdirSync('src/html/partials/').reduce((partials, file) => {
  const partialName = file.substring(0, file.length - '.mustache'.length);
  partials[partialName] = fs.readFileSync('src/html/partials/' + file, 'utf8');
  return partials;
}, {});

const html = Mustache.render(template, view, partials);

fs.writeFile("src/html/dist/index.html", html, 'utf8', err => {
  if (err) return console.log(err);
});
