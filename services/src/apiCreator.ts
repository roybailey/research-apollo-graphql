import express, { Application as MicroService, Request, Response } from "express"
import bodyParser from "body-parser"

import log4js from './logger'

function createMicroService(name:string, port:number):MicroService {
    const app:MicroService = express();

    app.use(bodyParser.json())
    
    app.use((req: any, res: any, next: any) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next()
    });
    
    const title = `MicroService Simulator ${name} on port ${port}`

    app.get('/', (req: any, res: any) => {
        res.json(title)
    });
    
    if (process.env.NODE_ENV !== 'test') {
        app.listen(port);
        console.log(title);
    } else {
        // console.log(title + ' - TEST MODE NOT LISTENING');
    }
    return app
}

export default createMicroService

