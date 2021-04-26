/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */

const data = require("./src/input-p1.json");
// console.log(data);

// 1. Retornar todos los nodos que no tienen hijos.

const checkNode = (array, dataObject) => {
    if ('hijos' in dataObject) {
        if(dataObject['hijos'].length === 0) {
            array.push(dataObject);
        }
        else{
            dataObject['hijos'].forEach(element => {
                checkNode(array, element);
            });
        }
    }
}

const getEndNode = (data) => {
    const nodosFinales = [];
    checkNode(nodosFinales, data);
    return nodosFinales
}

console.log(getEndNode(data));


// 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos

const findParents = (array, dataObject, value) => {
    if ('hijos' in dataObject) {
        if(dataObject['hijos'].length === value) {
            array.push(dataObject);
        }
        else if (dataObject['hijos'].length > 0){
            dataObject['hijos'].forEach(element => {
                findParents(array, element, value);
            });
        }
    }
}

const getParentNodes = (data, val) => {
    const parentNodes = [];
    findParents(parentNodes, data, val);
    return parentNodes;
}

// console.log(getParentNodes(data, 8));


// 3. Contabilizar la cantidad de nodos totales

const countNodes = (dataObject, counter) => {
    counter.push('');
    if ('hijos' in dataObject && dataObject['hijos'].length > 0) {
        dataObject['hijos'].forEach(element => {
            countNodes(element, counter);
        });
    }
}

const getCount = (data) => {
    let counter = [];
    countNodes(data, counter);
    return counter.length;
}

// console.log(getCount(data));


// 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*

const checkCampuses = (data, selectedCampuses) => {
    if('tipo' in data && data['tipo'] === 'Raiz'){
        data['hijos'].forEach(campus => {
            let fourthGrade = campus.hijos.find(grade => grade.nombre = '4 Medio')
            if (fourthGrade && fourthGrade.hijos.length > 0) {
                let sectionA = fourthGrade.hijos.find(section => section.nombre = 'A');
                if (sectionA && sectionA.hijos.length > 0) {
                    let subject = sectionA.hijos.find(sub => sub.nombre = 'Tecnología');
                    if(subject) {
                        selectedCampuses.push(campus)
                    }
                }
            }
        });
    }
}

const findCampuses = (data) => {
    const selectedCampuses = [];
    checkCampuses(data, selectedCampuses);
    return selectedCampuses;
}

// console.log(findCampuses(data));
