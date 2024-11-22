import mongoose from "mongoose"; //Dependencia del moongose del npm

const userSchema = new mongoose.Schema({ // Esquema de mongo tipo Json para definir las variables 
    username:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    }
},{
    timestamps:true
})

export default mongoose.model('user', userSchema) //exportar el objecto user