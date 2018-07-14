import {IAccountStore} from './accountStore'
import express from "express";


export default function(accountStore:IAccountStore, app:express.Application) {

    app.get('/account/', (request, response) => { response.json(
        accountStore.findAll({})
    )});

    app.get('/account/:id', (request, response) => response.json(
        accountStore.findOne({ id: request.params.id })
    ));

    app.get('/user-account/:id', (request, response) => { response.json(
        accountStore.findAll({ userId: request.params.id })
    )});

    return app
}

