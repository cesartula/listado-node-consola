require('colors');

const mostrarMenu = () => {

    return new Promise ( resolve => {
    console.clear()
    console.log('============================='.green)
    console.log('  Seleccione una option '.green)    
    console.log('=============================\n'.green)

    console.log(`${ '1.'.green } crear una tarea`)
    console.log(`${ '2.'.green } listar tareas`)
    console.log(`${ '3.'.green } listar tarea completadas`)
    console.log(`${ '4.'.green } listar tarea pendientes`)
    console.log(`${ '5.'.green } completar tarea`)
    console.log(`${ '6.'.green } Borrar tarea`)
    console.log(`${ '0.'.green } completar tarea tarea`)

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('seleccione una option: ', (opt) => {
        readline.close();
        resolve(opt);
    })
    })

}

const pausa = () => {

    return new Promise ( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPreione ${'ENTER'.blue} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    })
}

module.exports = {
    mostrarMenu,
    pausa
}