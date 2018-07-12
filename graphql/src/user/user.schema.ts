import fetch from 'node-fetch'
import { IResolvers } from 'graphql-yoga/dist/types'


export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    allUsers: [User!]!
    getUser(id: ID!): User!
  }
`;


export const resolvers:IResolvers = {
  
  Query: {
    allUsers: () => {
      console.log("allUsers()")
      return fetch(`http://localhost:9222/user`).then(res => res.json())
    },
    getUser: (_:any, { id }:any) => {
      console.log(`getUser(${id})`)
      return fetch(`http://localhost:9222/user/${id}`).then(res => res.json());
    }
  }
}
