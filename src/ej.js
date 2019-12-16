var pdf = require('html-pdf');
var contenido = `
    <h1>Test para html-pdf</h1>
    <p>Estamos creando un archivo PDF con este código HTML sencillo</p>
`;
pdf.create(contenido).toFile('./salida.pdf', (err, res) => {
    if (err) console.log(err);
    else console.log(res);
});