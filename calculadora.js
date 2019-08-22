'use strict'

var params = process.argv.slice(2);

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

 var plantilla = `
suma = ${(numero1 +numero2)}
resta = ${numero1 - numero2}
multiplicacion= ${(numero1 * numero2)}
division = ${(numero1 / numero2)}
`
console.log(plantilla);

console.log(params);

// npm init 
// npm install express --save
// npm install body-parser --save
// npm install connect-multiparty --save
// npm install mongoose --save
// npm install nodemon --save
