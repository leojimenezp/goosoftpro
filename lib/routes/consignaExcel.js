const fs = require('fs');

const pdf = require('html-pdf');

const options = {
  format: 'Letter'
};
const html = ``;
pdf.create(html, options).toFile('./ejemplo.pdf', function (err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});