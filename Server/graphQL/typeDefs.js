import { gql } from 'apollo-server-express';

export const typeDefs = gql`
# data de nascimento é de um tipo escalar customizado. tens de instalar graphql-scalars para usar Date
type Utilizador {
  id: ID!
  username: String!
  password: String!
  role: Cargo
  dataNascimento: Date
  freqResultados: Frequencia!
}

enum Frequencia {
  SEMANAL
  QUINZENAL
  MENSAL
}

enum Cargo {
  UTILIZADOR
  ADMIN
}


type Notificacao {
  id: ID!
  tipoNotif: String!
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
  me: User
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
  registo(username: String!, password: String!): User
  login(username: String!, password: String!): String!
  novaResposta(input: RespostaInput!): RegistoHumor
  updateResposta(id: ID!, input: RespostaInput!): RegistoHumor
  removeResoposta(id: ID!): String
}

# Subscrições para alterações nos dados
type Subscription {
  novaNotificacao: Notificacao
}
`