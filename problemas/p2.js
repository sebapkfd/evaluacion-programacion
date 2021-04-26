/**
 * Problema número 2.
 * 
 * Genera un script/algoritmo/función que sea capaz de transformar los datos de input-p2.csv
 * en un arból de estructura similar al problema de p1 utilizando la estructura de Nodo.js
 */

const Nodo = require("./src/Nodo");
let raiz = new Nodo("root", "Raíz");

// Para poder leer el archivo y convertir los datos a un formato manejable
const fs = require('fs'); 
const parse = require('csv-parse');

// csvrow es una arreglo con la información de cada oferta
// el algoritmo consulta si existe la Sede, Curso, Seccion y Oferta leída
// en caso de no existir alguno crea los nodos necesarios e inserta la oferta
fs.createReadStream('./src/input-p2.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        if (csvrow[0] === 'Sede') {
            return
        }
        let sede = raiz.hijos.find(hijo => hijo.nombre === csvrow[0]);
        if(!sede) {
            sede = new Nodo(csvrow[0], 'Sede');
            raiz.hijos.push(sede);
        }
        let curso = sede.hijos.find(hijo => hijo.nombre === csvrow[1]);
        if(!curso) {
            curso = new Nodo(csvrow[1], 'Curso');
            sede.hijos.push(curso);
        }
        let seccion = curso.hijos.find(hijo => hijo.nombre === csvrow[2]);
        if(!seccion) {
            seccion = new Nodo(csvrow[2], 'Seccion');
            curso.hijos.push(seccion);
        }
        let oferta = seccion.hijos.find(hijo => hijo.nombre === csvrow[3]);
        if(!oferta) {
            oferta = new Nodo(csvrow[3], 'Oferta');
        }
        seccion.hijos.push(oferta);
    })
    .on('end',function() {
        console.log(raiz);
});

//Agregar a raiz toda la estructura solicitada.
//...

// console.log(raiz.hijos);
