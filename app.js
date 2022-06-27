require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTaresBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { // cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
        // Establecer las tareas 
    }

    do {
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear option
                const desc = await leerInput('description: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3': //listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': //listar las pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': //completado || pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr )
                tareas.toggleCompletadas( ids );
                break;
            case '6': //borrar tarea
                const id = await listadoTaresBorrar(tareas.listadoArr)
                const ok = await confirmar('estas seguro?');
                if (ok) {
                    tareas.borrarTarea(id);
                    console.log('tarea borrada');
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();