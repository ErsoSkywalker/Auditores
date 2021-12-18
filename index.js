const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectarDB = require("./db/config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
//Acá ya conectamos a la DB
conectarDB();

//Le damos al Apollo Server la configuración Necesaria
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRETA);
        return {
          user,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
});

//Empezamos la App
server.listen().then(({ url }) => {
  console.log(`El servidor está corriendo en la URL ${url}`);
});
