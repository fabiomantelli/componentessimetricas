// Instalei com o Node a biblioteca MathJS
const { complex, multiply, exp, abs, re, im, atan} = require('mathjs');

// arrow function (recebe um objeto chamado 'voltages')
var symmetricalComponents = voltages => {

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
        "vc": multiply(voltages.voltageB.mod, exp(multiply(angles.angleC, i)))
    }


    // vetor com as 3 fases na notação de Euler
    voltageABC = [ [complexVoltage.va], [complexVoltage.vb], [complexVoltage.vc]]

    // constante alpha para a transformada
    alpha = exp(multiply( (2/3)*Math.PI, i ))
   
    // matrix de transformação A
    var A = [1, alpha, multiply(alpha, alpha)]
    

    // Inversa da matriz de transformação A
    var invA = multiply((1/3), A)

    // calcula as tensões de sequência zero, positiva e negativa (v012)
    v012 = multiply(invA, voltageABC)

    return ({
        // Utilizar só a tensão de sequência positiva
        "positiveSequenceVoltage": {
            "mod": abs(v012[0]),
            "ang": v012[0].arg()*180/Math.PI
        }
    });
}

// 3 tensões como exemplo
voltages = {
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
// teste passando um objeto "tensoes" contendo as tensões A, B e C (módulo e ângulo)
var retorno = symmetricalComponents(voltages)
console.log(retorno.positiveSequenceVoltage)