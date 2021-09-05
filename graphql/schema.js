const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Todo {
    id: String!
    name: String!
    date: String!
    picture: String!
    createdBy: Int!
    createdAt: String!
    updatedAt: String!
    subTasks: [Task!]!
  }

  type Task {
    id: Int!
    title: String!
    createdAt: String!
    updatedAt: String!
    todoId: Int!
  }

  type TodoQuery {
    allTodos: [Todo!]!
    getTodo(id: String!): Todo
    getTodoName(id: String!): String
    getTodoDate(id: String!): String
    getTodoPicture(id: String!): String
    getTodoSubTasks(id: String!): [Task!]!
  }

  type Query {
    todos(id: String): TodoQuery
  }
`);

module.exports = schema;