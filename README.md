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


## React Apollo Client Application

A fully operational React single page application using Apollo-Client for data fetching.

* (DONE) Basic React Boilerplate, inc. router, global styling, webpack build
* (todo) Dinner Page using apollo-client GraphQL query
* (todo) Todo List using apollo-client GraphQL query
* (todo) Todo Form using apollo-client GraphQL mutation
* (todo) Todo Delete using apollo-client GraphQL mutation
* (todo) Audit View using apollo-client GraphQL query with subscription


## TypeScript GraphQL Server

A fully operational GraphQL server using graphql-yoga.

* (DONE) Basic Server Boilerplate, inc. simple query for in-memory data
* (DONE) Todo Query supported by REST call to extenal micro-service
* (DONE) Todo Mutations supported by REST call to extenal micro-service
* (DONE) Audit Query supported by REST call to extenal micro-service
* (DONE) Audit Mutations supported by REST call to extenal micro-service
* (DONE) Audit Subscriptions supported by REST call to extenal micro-service


## TypeScript Micro-Service Simulators

A collection of micro-services simulators for various domains providing typical CRUD features over REST.

* (DONE) Basic Micro-Service Boilerplate, inc. in-memory data storage
* (DONE) Todo Query supported by REST call to extenal micro-service
* (DONE) Todo CRUD supported by REST call to extenal micro-service
* (DONE) Audit Query supported by REST call to extenal micro-service
* (DONE) Audit CRUD supported by REST call to extenal micro-service
* (DONE) Audit Events supported by REST call to extenal micro-service

