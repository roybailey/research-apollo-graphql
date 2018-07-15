# Apollo GraphQL React Project

Motivation: to familiarize myself with:
    
* static typing using Typescript
* apollo-client, as a means of handling requests to a GraphQL backend for Front End service
* graphql-yoga, as a GraphQL server implementation backed by REST micro-services


## Getting Started

* Start the micro-service simulator
  * `cd services`
  * `npm install`
  * `npm start`
* Start the GraphQL server
  * `cd graphql`
  * `npm install`
  * `npm start`
* Start the React Application
  * `cd app`
  * `npm install`
  * `npm start`


#### React Apollo Client Application

A fully operational React single page application using Apollo-Client for data fetching.

* (DONE) Basic React Boilerplate, inc. router, global styling, webpack build
* (DONE) Dinner Page using apollo-client GraphQL query
* (DONE) Todo List using apollo-client GraphQL query
* (DONE) Todo Form using apollo-client GraphQL mutation
* (DONE) Todo Update using apollo-client GraphQL mutation on selection
* (DONE) Todo Delete using apollo-client GraphQL mutation
* (DONE) Audit View using apollo-client GraphQL query with subscription
* (todo) User Page using apollo-client GraphQL query with nested data


#### TypeScript GraphQL Server

A fully operational GraphQL server using graphql-yoga.

* (DONE) Basic Server Boilerplate, inc. simple query for in-memory data
* (DONE) Todo Query supported by REST call to extenal micro-service
* (DONE) Todo Mutations supported by REST call to extenal micro-service
* (DONE) Audit Query supported by REST call to extenal micro-service
* (DONE) Audit Mutations supported by REST call to extenal micro-service
* (DONE) Audit Subscriptions supported by REST call to extenal micro-service
* (DONE) User query to aggregate data from multiple micro-services


#### TypeScript Micro-Service Simulators

A collection of micro-services simulators for various domains providing typical CRUD features over REST.

* (DONE) Basic Micro-Service Boilerplate, inc. in-memory data storage
* (DONE) Todo Query supported by REST call to extenal micro-service
* (DONE) Todo CRUD supported by REST call to extenal micro-service
* (DONE) Audit Query supported by REST call to extenal micro-service
* (DONE) Audit CRUD supported by REST call to extenal micro-service
* (DONE) Audit Events supported by REST call to extenal micro-service
* (DONE) Basic User micro-service and sample data
* (DONE) Basic Account micro-service and sample data
* (DONE) Basic Transaction micro-service and sample data

## GraphQL step through

Bring up `graphql-playground` and point workspace to cloned source folder (it should pick up connection details)

If not create a Workspace based on URL `http://localhost:7777/graphql`


#### Start with the most basic hello GraphQL query

```$json
{
  whatsForDinner
}
```


#### Basic query which gets data from REST api 

```$json
{
  allTodos {
    id
    title
    status
  }
}
```


#### Basic mutation to create a new TODO record

```$json
mutation($varTitle: String!, $varCompleted:Boolean!) {
  createTodo(content: $varTitle, isCompleted: $varCompleted) {
    id
    title
    status
  }
}
```

```$json
{
  "varTitle": "Todo Created in Playground",
  "varCompleted": false
}
```


#### Basic mutation to update a TODO record

```
mutation($varID:ID!, $varTitle: String!, $varCompleted:Boolean!) {
  updateTodo(id:$varID, content: $varTitle, isCompleted: $varCompleted) {
    id
    title
    status
  }
}
```

```$json
{
  "varID": "<previously created todo id value>",
  "varTitle": "Todo Updated in Playground",
  "varCompleted": true
}
```


#### Basic mutation to delete a TODO record

```
mutation($varID:ID!, $varTitle: String!, $varCompleted:Boolean!) {
  updateTodo(id:$varID, content: $varTitle, isCompleted: $varCompleted) {
    id
    title
    status
  }
}
```

```$json
{
  "varID": "<previously created todo id value>",
  "varTitle": "Todo Updated in Playground",
  "varCompleted": true
}
```


#### Nested data access through single query

```$json
query {
  allUsers {
    id
    name
    email
    accounts {
      id
      number
      bankCode
      transactions {
        id
        amount
        date
      }
    }
  }
}
```

#### Subscription

```$json
subscription {
  event {
    id
    namespace
    event
    type
    timestamp
    payload
  }
}
```
