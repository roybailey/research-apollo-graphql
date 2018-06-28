import request from 'supertest'
import { todoApi } from '../apiServices'
import { TodoStatus } from './todoType';


describe('test todo api', () => {

    const todosArray = [{
        goal: 'test api',
        title: 'test api'
    }];

    let id = 0

    it('should GET todo list', async () => {
        const response = await request(todoApi).get('/todo');
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.title).toEqual('do something useful')
        expect(actual.id).not.toBeNull()
        id = actual.id
    });

    it('should GET todo by id', async () => {
        const response = await request(todoApi).get(`/todo/${id}`);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.title).toEqual('do something useful')
        expect(actual.id).toEqual(id)
    });

    it('should POST new todo', async () => {
        const response = await request(todoApi).post(`/todo`).send(todosArray);
        expect(response.status).toBe(200);
        let actual = response.body[0]
        expect(actual.title).toEqual('test api')
        expect(actual.id).not.toBeNull()
        id = actual.id
    });

    it('should POST todo full update', async () => {
        const fetch = await request(todoApi).get(`/todo/${id}`);
        expect(fetch.status).toBe(200);
        let todo = fetch.body
        todo.title = 'something new'
        const response = await request(todoApi).post(`/todo/${id}`).send(todo);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.title).toEqual('something new')
        expect(actual.id).toEqual(todo.id)
    });

    it('should POST todo partial update', async () => {
        const partialTodoUpdate = {
            id: id,
            status: TodoStatus.IN_PROGRESS
        }
        const response = await request(todoApi).post(`/todo/${id}`).send(partialTodoUpdate);
        expect(response.status).toBe(200);
        let actual = response.body
        expect(actual.id).toEqual(partialTodoUpdate.id)
        expect(actual.status).toEqual(TodoStatus.IN_PROGRESS)
        expect(actual.title).toEqual('something new')
    });

    it('should DELETE todo', async () => {
        const fetch = await request(todoApi).delete(`/todo/${id}`);
        expect(fetch.status).toBe(200);
    });

})
