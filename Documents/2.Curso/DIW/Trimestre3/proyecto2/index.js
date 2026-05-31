const express = require('express');
const nunjucks = require('nunjucks')
const mongoose = require('mongoose');
const rutaPeliculas = require('./routes/pelicula.js')
const rutaUsuario = require('./routes/usuario.js')

const app = express();

//Configuración del Nunjucks
nunjucks.configure('views',{
        autoescape: true,
        express: app
    }
)

//Middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto2')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error:',err))


//Rutas


app.use('/admin', rutaPeliculas);

app.use('/',rutaUsuario)

//Arrancar servidor
app.listen(3000,() =>{
    console.log('Servidor en http://localhost:3000');
})