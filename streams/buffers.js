// guarda informações de forma binária na memória com dígitos hexadecimais
// é mais rápido que guardar strings, que são bem mais pesadas
const buf = Buffer.from("okk")
console.log(buf)