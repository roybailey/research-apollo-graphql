import {ITransactionStore} from './transactionStore'
import express from "express";


export default function(transactionStore:ITransactionStore, app:express.Application) {

    app.get('/transaction/', (request, response) => { response.json(
        transactionStore.findAll()
    )});

    return app
}

