import fetch from 'node-fetch'
import {IResolvers} from 'graphql-yoga/dist/types'


export const typeDefs = `
  type Transaction {
    id: ID!
    amount: Float!
    date: String!
  }
  type Account {
    id: ID!
    number: String!
    bankCode: String!
    transactions: [Transaction]
  }
  type User {
    id: ID!
    name: String!
    email: String!
    accounts: [Account]
  }
  type Query {
    allUsers: [User!]!
    getUser(id: ID!): User!
  }
`;

export const resolvers: IResolvers = {

    Query: {
        allUsers: () => {
            console.log("allUsers()")
            return fetch(`http://localhost:9222/user`).then(res => res.json())
        },
        getUser: (_: any, {id}: any) => {
            console.log(`getUser(${id})`)
            return fetch(`http://localhost:9222/user/${id}`)
                .then(res => res.json())
        },
    },
    User: {
        accounts: (parent: any, args: any) => {
            console.log(`getAccounts(${JSON.stringify(parent)})`)
            return fetch(`http://localhost:9223/user-account/${parent.id}`)
                .then(res => res.json())
        }
    },
    Account: {
        transactions: (parent: any, args: any) => {
            console.log(`getTransactions(${JSON.stringify(parent)})`)
            return fetch(`http://localhost:9224/account-transaction/${parent.id}`)
                .then(res => res.json())
        }
    }
}
