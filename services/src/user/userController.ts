import { createUserStore, IUserStore, IUser } from './userStore'
import express from "express";


export default function(userStore:IUserStore, app:express.Application) {

    app.get('/user/', (request, response) => { response.json(
        userStore.findAll()
    )});
    app.get('/user/:id', (request, response) => response.json(
        userStore.findOne({ id: request.params.id })
    ));

    return app
}

