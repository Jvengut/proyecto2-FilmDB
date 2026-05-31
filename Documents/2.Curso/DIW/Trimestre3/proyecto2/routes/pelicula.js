const express = require('express');
const route = express.Router();
const Pelicula = require('../models/pelicula');
const pelicula = require('../models/pelicula');

//Listado de todas las peliculas
route.get('/',(req,res) => {
    Pelicula.find().then(resultado => {
        res.render('admin/lista.njk',{peliculas: resultado});
    }).catch(error => {
        res.render('error.njk',{error: "Error cargando películas"});
    });
});

//Mostrar formulario de nueva película
route.get('/nueva',(req,res) => {
    res.render('admin/nueva.njk');
});

//Guardado de nuevas películas
route.post('/',(req,res) => {
    let pelicula = new Pelicula({
        titulo: req.body.titulo,
        director: req.body.director,
        anio: req.body.anio,
        genero: req.body.genero,
        sinopsis: req.body.sinopsis,
        imagen: req.body.imagen
    });

    pelicula.save().then(resultado => {
        res.redirect('/admin');
    }).catch(error => {
        res.render('admin/nueva.njk', {error: "Error guardando la película"})
    });
});

//Mostrar formulario de edición
route.get('/editar/:id', (req,res) => {
    Pelicula.findById(req.params.id).then(resultado => {
        if(resultado){
            res.render('admin/editar.njk', {pelicula:resultado});
        } else {
            res.render('error.njk', {error: "Película no encontrada"});
        }
    }).catch(error => {
        res.render('error.njk', {error: "Erroo al buscar la película"});
    });
});

//Guardar los cambios de edición
route.post('/editar/:id',(req,res) => {
    Pelicula.findByIdAndUpdate(req.params.id, {
        $set:{
            titulo: req.body.titulo,
            director: req.body.director,
            anio: req.body.anio,
            genero: req.body.genero,
            sinopsis: req.body.sinopsis,
            imagen: req.body.imagen
        }
    }).then(resultado => {
        res.redirect('/admin');
    }).catch(error => {
        res.render('error.njk', {error: "Error al editar la película"});
    });
});

//Borrar las películas
route.post('/borrar/:id', (req,res) => {
    Pelicula.findByIdAndDelete(req.params.id).then(resultado => {
        res.redirect('/admin');
    }).catch(error => {
        res.render('error.njk', {error: "Error al borrar la película"});
    });
});

module.exports = route;