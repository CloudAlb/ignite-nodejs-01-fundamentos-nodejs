import { Readable } from 'node:stream'

// reescrita de uma Stream (de leitura)
class OneToHundredStream extends Readable {
    index = 1

    _read() { // método obrigatório de toda Stream de Leitura
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

new OneToHundredStream().pipe(process.stdout) // cria uma stream e a transfere a stream de saída do terminal