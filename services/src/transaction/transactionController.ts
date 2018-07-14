import {ITransactionStore} from './transactionStore'
import express from "express";

import log4js from '../logger'
const logger = log4js.getLogger('transactionController')


export default function(transactionStore:ITransactionStore, app:express.Application) {

    app.get('/transaction/', (request, response) => { response.json(
        transactionStore.findAll({})
    )});

    app.get('/transaction/:id', (request, response) => response.json(
        transactionStore.findOne({ id: request.params.id })
    ));

    app.get('/account-transaction/:accountId', (request, response) => { response.json(
        transactionStore.findAll({ accountId: request.params.accountId })
    )});

    return app
}

