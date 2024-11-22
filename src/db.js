import mongoose from "mongoose"; //dependencia de mongo del npm

export const ConnectDB = async () => { //coneccion de la bases de datos 
    try { //un Try catch para verificar errores si los hay
        await mongoose.connect("mongodb+srv://davidcorrea82212:iEL61vUh4AzqC3uo@habitos.x37tv.mongodb.net/"); //string de conexion
        console.log("Base de Datos Conectada");
    } catch (error){
        console.log(error);
    }
}
