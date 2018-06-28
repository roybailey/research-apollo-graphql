import LogFactory from '../logger'
import createGraphQL from '../test.base'
import { ITodo, ITodoStep, TodoStatus } from './todo'

const logger = LogFactory.getLogger('todo.test')
const graphql = createGraphQL(logger)

//
// This test expects the default server and micro-services to be running
// Integration test to help development of graphQL schema/resolvers against micro-services
//

describe('test todo graphQL', () => {

  let todos:ITodo[]
  let createdTodoId:string

  it('should return todo list', async () => {

      const QueryAllTodos = `
        {
          allTodos {
            id
            title
            status
          }
        }
      `;

      const response = await graphql(QueryAllTodos)

      let actual = response.body
      logger.debug('allTodos response',actual);
      expect(response.status).toBe(200);

      todos = actual.data.allTodos
      expect(todos.length).toBeGreaterThan(0)
      expect(todos[0].id).not.toBeNull()
      expect(todos[0].title).not.toBeNull()
      expect(todos[0].status).not.toBeNull()
    });

    it('should return todo by id', async () => {

      const QueryTodoByIdWithVariable = `
        query getTodoWithIdVariable($varTodoId: ID!) {
          getTodo(id: $varTodoId) {
            id
            title
            status
          }
        }
      `;

      const response = await graphql(QueryTodoByIdWithVariable, { 
        varTodoId: todos[0].id
      })
 
      let actual = response.body
      logger.debug('getTodo response',actual);
      expect(response.status).toBe(200);

      let todo = actual.data.getTodo
      expect(todo.id).not.toBeNull()
      expect(todo.title).not.toBeNull()
      expect(todo.status).not.toBeNull()
    });

    it('should create todo', async () => {

      const CreateTodoMutation = `
        mutation createTodo($varTitle:String!, $varCompleted:Boolean!) {
          createTodo(content: $varTitle, isCompleted: $varCompleted) {
            id
            title
            status
          }
        }
      `

      const response = await graphql(CreateTodoMutation, { 
        varTitle: "Integration New",
        varCompleted: false
      })

      let actual = response.body
      logger.debug('createTodo response', actual);
      expect(response.status).toBe(200);

      let todo = actual.data.createTodo
      expect(todo.id).not.toBeNull()
      expect(todo.title).toEqual("Integration New")
      expect(todo.status).toEqual(TodoStatus.NOT_STARTED)

      createdTodoId = todo.id
    });

    it('should update todo', async () => {

      const UpdateTodoMutation = `
        mutation updateTodo($varTodoId:ID!, $varTitle:String!, $varCompleted:Boolean!) {
          updateTodo(id: $varTodoId, content: $varTitle, isCompleted: $varCompleted) {
            id
            title
            status
          }
        }
      `

      const response = await graphql(UpdateTodoMutation, { 
        varTodoId: createdTodoId,
        varTitle: "Updated Title",
        varCompleted: true
      })

      let actual = response.body
      logger.debug('createTodo response', actual);
      expect(response.status).toBe(200);

      let todo = actual.data.updateTodo
      expect(todo.id).not.toBeNull()
      expect(todo.title).toEqual("Updated Title")
      expect(todo.status).toEqual(TodoStatus.COMPLETE)
    });

    it('should delete todo', async () => {

      const UpdateTodoMutation = `
        mutation deleteTodo($varTodoId:ID!) {
          deleteTodo(id: $varTodoId) {
            id
            title
            status
          }
        }
      `

      const response = await graphql(UpdateTodoMutation, { 
        varTodoId: createdTodoId
      })

      let actual = response.body
      logger.debug('createTodo response', actual);
      expect(response.status).toBe(200);

      let todo = actual.data.deleteTodo
      expect(todo.id).not.toBeNull()
      expect(todo.title).toEqual("Updated Title")
      expect(todo.status).toEqual(TodoStatus.COMPLETE)
    });
});

