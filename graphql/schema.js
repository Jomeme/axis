const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type TodoQuery {
    allTodos: [String]
    getTodo(id: String!): String
    getTodoTitle(id: String!): String
  }

  type Query {
    todo(id: String): TodoQuery
  }
`);

module.exports = schema;