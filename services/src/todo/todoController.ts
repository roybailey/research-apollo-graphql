import { ITodoStore } from './todoStore'
import express from "express";

export default function(todoStore:ITodoStore, app:express.Application) {

    app.get('/todo/', (request, response) => {
        response.json(todoStore.findAll())
    });
    app.get('/todo/:id', (request, response) => response.json(
        todoStore.findOne({ id: request.params.id })
    ));
    app.post('/todo', (request, response) => response.json(
        todoStore.insert(request.body)
    ));
    app.post('/todo/:id', (request, response) => response.json(
        todoStore.update(request.body)
    ));
    app.delete('/todo/:id', (request, response) => response.json(
        todoStore.remove(request.params['id'])
    ));

    return app
}
