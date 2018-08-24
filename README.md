# Apollo GraphQL React Project

#### Motivation

_to familiarize myself with..._
    
* Static typing using **Typescript**
* **`apollo-client`**, as a means of handling requests to a GraphQL backend for Front End service
* **`graphql-yoga`**, as a GraphQL server implementation backed by REST micro-services

...and is not considered production quality code.

#### Project Structure

This is a mono-repo with three distinct projects.

1. `services` contains a typescript **Micro-Services Simulator** 
2. `graphql` contains a **GraphQL Server** written in typescript using `graphql-yoga`
3. `app` contains a **React/Apollo UI Application** using typescript and Ant Design components 

The services project creates a number of simple micro-services to represent some sample business data domains.
The purpose is to provide the GraphQL server with numerous isolated REST APIs where
demonstrating querying, mutations (CRUD operations) and data joining across domains into a single schema. 


## Getting Started

#### 1. Micro-Service Simulator

  * `cd services`
  * `yarn`
  * `yarn start`

`yarn test` is setup as _unit_ test, and therefore needs nothing to be running to verify it works.

#### 2. GraphQL Server

  * `cd graphql`
  * `yarn`
  * `yarn start`

`yarn test` is setup as _integration_ test,
and therefore needs both the services and graphql server to be running for tests to pass.
  
#### 3. React/Apollo Application

  * `cd app`
  * `yarn`
  * `yarn start`


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
