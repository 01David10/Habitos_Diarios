import mongoose from "mongoose"; // modulo de mongo

const habit = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true  // quita los espacios en blanco al inicio y al final
    },
    frecuency:{
        type: String,
        require: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // ObjectId del usuario
        ref: 'userSchema', // relacion con el esquema de usuario
        required: true
    },
},{
    timestamps:true // crea la fecha de creacion y actualizacion
})

export default mongoose.model('habit', habit) //exportar el objecto habit