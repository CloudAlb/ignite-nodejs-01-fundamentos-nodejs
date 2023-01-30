import { Readable, Transform, Writable } from 'node:stream'

// reescrita de uma Stream (de leitura - readable)
// só consigo ler os dados dela
class OneToHundredStream extends Readable {
    index = 1

    _read() { // método obrigatório de toda stream de leitura
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf) // esse método aceita Buffer, não tipos primitivos
            }
        }, 1000)
    }
}

// reescrita de uma stream (de transformação - transform)
// serve como uma stream intermediária
// obrigatoriamente lê dados de algum lugar e escreve os dados em outro lugar
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * - 1

        callback(null, Buffer.from(String(transformed)))
    }
}

// reescrita de uma stream (de escrita - writable)
// só consigo escrever os dados para ela
class MultiplyByTenStream extends Writable {
    // streams nunca retornam algo

    // método obrigatório de streams de escrita
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream()) // cria uma stream e a transfere a stream de MultiplyByTen