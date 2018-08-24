# Apollo GraphQL React Project Playbook

* Show Micro-Services REST APIs in `postman`
  * Todo CRUD
  * User/Account/Transaction relationships
* Bring up `graphql-playground` and point workspace to cloned source folder (it should pick up connection details)
  * If not create a Workspace based on URL `http://localhost:7777/graphql`
* Show GraphQL
  * Schema definition in code
  * Schema in playground
  * Dinner query
  * Todo CRUD
  * User/Account/Transaction relationships
  * Events Subscriptions
* Show App
  * Dinner query
  * Todo CRUD
  * Events Subscriptions



## GraphQL samples


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
