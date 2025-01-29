const { gql } = require("apollo-server");

const typeDefs = gql`
scalar Date
# data de nascimento é de um tipo escalar customizado. tens de instalar graphql-scalars para usar Date
type Utilizador {
  utilizadorId: ID!
  username: String!
  password: String!
  role: Role
  dataNascimento: Date
  freqResultados: Frequencia!
}

type LoginResponse {
  token: String!
  message: String!
}

type EditProfileResponse {
  utilizador: Utilizador!
  message: String!
}

enum Frequencia {
  Semanal
  Quinzenal
  Mensal
}

enum Role {
  UTILIZADOR
  ADMIN
}


type Notificacao {
  id: ID!
  textoNotif: String!
}

type RegistoHumor {
  id: ID!
  data: Date!
  valorResposta: Int!
  textoPergunta: String!
  notasAdicionais: String
}

# Queries principais
type Query {
  perfil: Utilizador!
  utilizadores: [Utilizador!]!
  listarRegistos: [RegistoHumor]
  
}

# Input
input RespostaInput {
  valorResposta: Int!
  textoPergunta: String!
  notasAdicionais: String
}

# Mutações para administração
type Mutation {
  registar(username: String!, password: String!, dataNascimento: Date!, role: Role): Utilizador
  login(username: String!, password: String!): LoginResponse!
  editarPerfil(novoUsername: String, novaFreqResultados: Frequencia): EditProfileResponse
  novaResposta(input: RespostaInput!): RegistoHumor
  updateResposta(id: ID!, input: RespostaInput!): RegistoHumor
  removeResoposta(id: ID!): String
}

# Subscrições para alterações nos dados
type Subscription {
  novaNotificacao: Notificacao
}
`

module.exports = typeDefs;