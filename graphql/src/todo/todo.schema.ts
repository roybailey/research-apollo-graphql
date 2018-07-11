import fetch from 'node-fetch'
import { IResolvers } from 'graphql-yoga/dist/types'
import { ITodo, ITodoStep, TodoStatus } from './todo'


export const typeDefs = `
  type Todo {
    id: ID!
    title: String!
    status: String!
  }
  type Query {
    allTodos: [Todo!]!
    getTodo(id: ID!): Todo!
  }
  type Mutation {
    createTodo(content: String!, isCompleted: Boolean!): Todo!
    updateTodo(id: ID!, content: String, isCompleted: Boolean): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;


export const resolvers:IResolvers = {
  
  Query: {
    allTodos: () => {
      console.log("allTodos()")
      return fetch(`http://localhost:9221/todo`).then(res => res.json())
    },
    getTodo: (_:any, { id }:any) => {
      console.log(`getTodo(${id})`)
      return fetch(`http://localhost:9221/todo/${id}`).then(res => res.json());
    }
  },
  Mutation: {

    createTodo: (_:any, { content, isCompleted }:any) => {
      console.log(`createTodo(${content}, ${isCompleted})`)
      const newTodo:ITodo = {
        title: content,
        status: isCompleted? TodoStatus.COMPLETE : TodoStatus.NOT_STARTED
      }
      return fetch(`http://localhost:9221/todo`, {
          body: JSON.stringify([newTodo]),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(result => result[0]);
    },

    updateTodo: (_:any, { id, content, isCompleted }:any) => {
        console.log(`updateTodo(${content}, ${isCompleted})`)
      const updateTodo:ITodo = {
        id: id,
        title: content,
        status: isCompleted? TodoStatus.COMPLETE : TodoStatus.NOT_STARTED
      }
      return fetch(`http://localhost:9221/todo/${id}`, {
          body: JSON.stringify(updateTodo),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(result => result)
        .catch(error => console.error('Error:', error))
    },

    deleteTodo: (_:any, { id }:any) => {
      return fetch(`http://localhost:9221/todo/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          method: 'DELETE',
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(result => result);
    }
  }
}
