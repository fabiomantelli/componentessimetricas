// Instalei com o Node a biblioteca MathJS
const { complex, multiply, exp, abs, re, im, atan} = require('mathjs');

// arrow function (recebe um objeto chamado 'voltages')
let symmetricalComponents = voltages => {
    
    // os 3 ângulos são convertidos para radianos
    angles = {
        "angleA": voltages.voltageA.ang * Math.PI/180,
        "angleB": voltages.voltageB.ang * Math.PI/180,
        "angleC": voltages.voltageC.ang * Math.PI/180
    }

    // número i (imaginário)
    const i = complex('0+i')

    // transforma as tensÕes na notação de Euler
    complexVoltage = {
        "va": multiply(voltages.voltageA.mod, exp(multiply(angles.angleA, i))),
        "vb": multiply(voltages.voltageB.mod, exp(multiply(angles.angleB, i))),
        "vc": multiply(voltages.voltageC.mod, exp(multiply(angles.angleC, i)))
    }

    // vetor com as 3 fases na notação de Euler
    voltageABC = [ [complexVoltage.va], [complexVoltage.vb], [complexVoltage.vc]]

    // constante alpha para a transformada
    alpha = exp(multiply( (2/3)*Math.PI, i ))
   
    // vetor de transformação A
    let A = [1, alpha, multiply(alpha, alpha)]
    

    // multiplica o vetor de transformação A por 1/3
    let invA = multiply((1/3), A)

    // calcula a tensão de sequência positiva
    positiveVoltage = multiply(invA, voltageABC)

    return ({
        // Utilizar só a tensão de sequência positiva
        "positiveSequenceVoltage": {
            "mod": abs(positiveVoltage[0]),
            "ang": positiveVoltage[0].arg()*180/Math.PI
        }
    });
}

// 3 tensões como exemplo
voltages_uta = {
    "voltageA": {
        "mod": 223.584412,
        "ang": -157.5626
    },
    "voltageB": {
        "mod": 223.167679,
        "ang": 81.67616
    },
    "voltageC": {
        "mod": 0.002005902,
        "ang": 44.5263634
    }
}

/*
voltages_ufro = {
    "voltageA": {
        "mod": 231.914001,
        "ang": -154.093002
    },
    "voltageB": {
        "mod": 234.434006,
        "ang": 86.084900
    },
    "voltageC": {
        "mod": 235.162003,
        "ang": -33.801601
    }
}*/

// teste passando um objeto "voltages" contendo as tensões A, B e C (módulo e ângulo)
// e retorna a tensão de sequência positiva
let uta = symmetricalComponents(voltages_uta)
console.log('uta: ', uta)

// let ufro = symmetricalComponents(voltages_ufro)
// console.log('ufro: ', ufro)

// ang_ref = uta.positiveSequenceVoltage.ang

// ufro_ang = ang_ref - ufro.positiveSequenceVoltage.ang
// console.log('angle ufro: ', ufro_ang)
//let teste = symmetricalComponents(voltages_teste)
//console.log('teste: ', teste)