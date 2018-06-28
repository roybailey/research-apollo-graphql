import { parse } from 'date-fns'
import express from "express";

import log4js from '../logger'
const logger = log4js.getLogger('auditController')

import { IAudit } from './auditType'
import { IAuditStore } from './auditStore'


export default function(auditStore:IAuditStore, app:express.Application) {

    app.get('/audit/event/', (request, response) => {
        response.json(auditStore.findAll())
    });
    app.get('/audit/event/:id', (request, response) => response.json(
        auditStore.findOne({ id: request.params.id })
    ));
    app.get('/audit/since/:timestamp', (request, response) => {
        logger.debug(request.params.timestamp)
        let search = parse(request.params.timestamp)
        let results = auditStore.findSince(search)
        logger.debug(`findSince returned\n`, results)
        response.json(results)
    });
    app.post('/audit/event/', (request, response) => response.json(
        auditStore.insert(request.body)
    ));
    
    app.use((err:any, req:any, res:any, next:any) => {
        logger.error(err)
        console.error(err);
        next(err);
    })
    return app
}
