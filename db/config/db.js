//Importamos Mongoose, es el ORM para manejar la BD
const mongoose = require("mongoose");
//Buscamos el archivo de las variables de entorno
require("dotenv").config({ path: "variables.env" });

//Empezamos la conexión a la Base de Datos, con try catch para manejar errores
const conectarDB = async () => {
  try {
    //Usamos una conexión con el ORM, debo investigar que es await
    await mongoose.connect(process.env.DB_MONGO, {
      //Investigar todo esto
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Lo logramos");
  } catch (error) {
    console.log(error);
    //Acabamos la app
    proccess.exit(1);
  }
};

module.exports = conectarDB;
