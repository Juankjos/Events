const express = require('express')
const cors = require('cors')
const {connectionDb} = require('../db/db');

class Server {
    
    constructor(){
        //Construye lo necesario para los métodos
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.eventPath = '/api/event';
        this.db_conect();
        this.middlewares();
        this.routes();

    }

    async db_conect(){
        await connectionDb();
    }

    middlewares(){
        //Trae los archivos por la carpeta de public y cors para la parte superficial de protección
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        //Trae las rutas de la carpeta routes, con el controlador de usuarios 
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.eventPath, require('../routes/event'));
    }

    listen(){
        //Muestra en qué puerto se está corriendo el proyecto
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en:', this.port);
        });
    }
}

//Hace que esta clase pueda ser usada en diferentes partes del proyecto si es mandada a llamar
module.exports = Server;