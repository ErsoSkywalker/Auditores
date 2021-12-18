const { gql } = require("apollo-server");
//Aquí definiremos los tipos, es como una analogía a los objetos o las Entidades en Hibernate,
//algo así lo entiendo yo
const typeDefs = gql`
  type Tienda {
    id: ID
    nombre: String
    nombreGerente: String
  }

  type Resultados {
    id: ID
    Usuario: ID
    Tienda: ID
    Respuestas: [String]
    HoraInicio: String
    HoraFinal: String
    tipo: Int
  }

  type User {
    id: ID
    nombre: String
    apellido: String
    email: String
    password: String
  }

  type Token {
    token: String
  }

  input resultadosInput {
    Tienda: ID
    Respuestas: [String]
    HoraFinal: String
    tipo: Int
  }

  input Credentials {
    email: String!
    password: String!
  }

  input UserInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
  }

  input TiendaInput {
    nombre: String!
    nombreGerente: String!
  }

  type Query {
    getVersionAPI: String
    getResultadosTienda(id: ID!): [Resultados]
    getResultados(id: ID!): Resultados
  }

  type Mutation {
    insertTienda(input: TiendaInput!): Tienda
    insertUser(input: UserInput!): User
    autenticarUsuario(input: Credentials!): Token
    insertResultados(input: resultadosInput!): Resultados
    modificarResultados(id: ID!, input: resultadosInput!): Resultados
  }
`;

module.exports = typeDefs;
