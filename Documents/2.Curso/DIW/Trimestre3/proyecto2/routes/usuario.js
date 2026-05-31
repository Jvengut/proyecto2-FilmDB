const express = require('express');
const route = express.Router();
const Pelicula = require('../models/pelicula')

route.get('/',(req,res) => {
    let busqueda = req.query.busqueda || '';
    let genero = req.query.genero || '';
    let ordenar = req.query.ordenar || 'titulo';

    let filtro = {};
    if(busqueda){
        filtro.titulo = {$regex: busqueda, $options: 'i'}
    }
    if(genero){
        filtro.genero = genero;
    }

    Pelicula.find(filtro).sort(ordenar).then(resultado => {
        res.render('usuario/inicio.njk', {
            peliculas: resultado,
            busqueda: busqueda,
            genero: genero,
            ordenar: ordenar
        });
    }).catch(error => {
        res.render('error.njk', {error: "Error al buscar películas"});
    });
});

module.exports = route;