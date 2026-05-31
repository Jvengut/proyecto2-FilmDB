const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    director: { 
        type: String, 
        required: true 
    },
    anio: { 
        type: Number, 
        required: true 
    },
    genero: { 
        type: String, 
        required: true 
    },
    sinopsis: { 
        type: String, 
        required: true 
    },
    imagen: { 
        type: String, 
        default: 'https://via.placeholder.com/300x400?text=Sin+imagen' 
    }
});

module.exports = mongoose.model('Pelicula', peliculaSchema);