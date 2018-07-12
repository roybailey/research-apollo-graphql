import {IAccountStore} from './accountStore'
import express from "express";


export default function(accountStore:IAccountStore, app:express.Application) {

    app.get('/account/', (request, response) => { response.json(
        accountStore.findAll()
    )});

    return app
}

