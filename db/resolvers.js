//Importamos Apollo Server
const { ApolloServer } = require("apollo-server");

const bcryptjs = require("bcryptjs");
//Importamos variables de entorno
require("dotenv").config({ path: "variables.env" });
//Importamos el Web Token
const jwt = require("jsonwebtoken");
const Usuarios = require("./models/Usuarios");
const Resultados = require("./models/Resultados");
const Tienda = require("./models/Tiendas");
//creamos funcion para generar Tokens
const crearToken = (usuario, secret, expiresIn) => {
  const { id, email, nombre, apellido, creado } = usuario;
  return jwt.sign({ id, email, nombre, apellido, creado }, secret, {
    expiresIn,
  });
};

const resolvers = {
  Query: {
    getVersionAPI: async () => {
      return "Hola Mundo";
    },
    getResultadosTienda: async (_, { id }) => {
      try {
        const resultados = await Resultados.find({ Tienda: id });
        return resultados;
      } catch (error) {
        console.log(error);
      }
    },
    getResultados: async (_, { id }) => {
      try {
        const resultados = await Resultados.findById(id);
        return resultados;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    insertTienda: async (_, { input }, ctx) => {
      try {
        const newTienda = new Tienda(input);
        await newTienda.save();

        return newTienda;
      } catch (error) {
        console.log(error);
      }
    },
    insertUser: async (_, { input }, ctx) => {
      const { email, password } = input;
      const existeUser = await Usuarios.findOne({ email });
      if (existeUser) throw new Error("Ya existe una cuenta con ese correo");

      const salt = await bcryptjs.genSalt(10);
      //Tomaremos el objeto de input y modificaremos solo el password
      input.password = await bcryptjs.hash(password, salt);

      try {
        const newUser = new Usuarios(input);
        await newUser.save();
        return newUser;
      } catch (error) {
        console.log(error);
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;
      const existeUsuario = await Usuarios.findOne({ email });
      if (!existeUsuario) {
        throw new Error("Este usuario no existe");
      }
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );
      if (!passwordCorrecto) {
        throw new Error("Este password es incorrecto");
      }
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "24h"),
      };
    },
    insertResultados: async (_, { input }, ctx) => {
      try {
        input.Usuario = ctx.user.id;
        const newResultados = new Resultados(input);
        await newResultados.save();
        return newResultados;
      } catch (error) {
        console.log(error);
      }
    },
    modificarResultados: async (_, { id, input }, ctx) => {
      const existeResultados = await Resultados.findOne({
        _id: id,
      });
      if (!existeResultados)
        throw new Error("No existe el formulario que buscas");
      try {
        const updatedResult = await Resultados.findOneAndUpdate(
          { _id: id },
          input,
          { new: true }
        );
        return updatedResult;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
