const { complex, add, multiply, sin, sqrt, pi, equal, sort, format, exp, matrix, abs, re, im, atan2} = require('mathjs');

mod_va = 5;
mod_vb = 7;
mod_vc = 7;
angle_va = 53;
angle_vb = -164;
angle_vc = 105;

angle_va1 = angle_va*pi/180
angle_vb1 = angle_vb*pi/180
angle_vc1 = angle_vc*pi/180

const i = complex('0+i')
console.log(i)

expa = multiply(angle_va1, i)
expb = multiply(angle_vb1, i)
expc = multiply(angle_vc1, i)

va = multiply(mod_va, exp(expa))
vb = multiply(mod_vb, exp(expb))
vc = multiply(mod_vc, exp(expc))
console.log('va: ', va)

vabc = [ [va], [vb], [vc]]

// exponente
valor = multiply( (2/3)*Math.PI, i )
// alpha
alpha = exp(valor)
console.log('alpha: ', alpha)
alpha_quadrado = multiply(alpha, alpha)
// matrix
let A = matrix([
    [1, 1, 1], 
    [1, alpha, multiply(alpha, alpha)],
    [1, multiply(alpha, alpha), alpha]
])

let inv_A = multiply((1/3), A)

v012 = multiply(inv_A, vabc)
console.log('v012: ', v012.valueOf([1, 0]))

