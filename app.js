require('colors');

const {inquirerMenu,
    pausa,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoChecklist} = require('./helpers/inquirer');

const {guardarDB,
    leerDB,
    } = require('./helpers/guardarArchivo');

const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB){
        //console.log(tareasDB);
        tareas.cargarTareasFromArray(tareasDB);
        //establecer las tareas

    }
    await pausa();

    do{
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                //console.log(desc);

                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas(true);
                break;

            case '4':
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':
                const id = await listadoTareaBorrar(tareas.listadoArr);
                if (id !== '0'){
                    const ok = await confirmar('¿Esta seguro?');
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('tarea borrada');
                    }
                }
                break;

        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0'){
            await pausa();
        }
    } while (opt !== '0');
}

main();