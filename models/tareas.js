const {v4: uuidv4} = require('uuid');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = Object.values(this._listado);
        /*Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });*/

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        //console.log(tareas.find(tarea => tarea.id));
        //const tarea = Object.values(tareas);
        //this._listado[tareas] = tarea;
        //console.log(this._listado);
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        let num = 1;
        console.log('');
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ?
                'Completada'.green : 'Pendiente'.red;

            console.log(`${num.toString().green}. ${desc} :: ${estado}`);
            /*if (tarea.completadoEn !== null){
                console.log(`${num.toString().green}. ${tarea.desc} :: ${'Completada'.green}  `);
            }else{
                console.log(`${num.toString().green}. ${tarea.desc} :: ${'Pendiente'.red}  `);
            }*/
            num++;
        });
        console.log('');
    }

    listarPendientesCompletadas(completadas = true) {
        let num = 0;
        console.log('');
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ?
                'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    num++;
                    console.log(`${num.toString().green}. ${desc} :: ${estado} con fecha ${completadoEn}`);
                }
            } else {
                if (!completadoEn) {
                    num++;
                    console.log(`${num.toString().green}. ${desc} :: ${estado}`);
                }
            }

            /*if (tarea.completadoEn !== null){
                console.log(`${num.toString().green}. ${tarea.desc} :: ${'Completada'.green}  `);
            }else{
                console.log(`${num.toString().green}. ${tarea.desc} :: ${'Pendiente'.red}  `);
            }*/
        });
        console.log('');

    }

}

module.exports = Tareas;