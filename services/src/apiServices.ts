import express, { Application as MicroService } from "express";
import bodyParser from "body-parser";

// the data access storage interfaces for our micro-service domains
import { IAudit, AuditSink } from "./audit/auditType"
import { IAuditStore, createAuditStore } from "./audit/auditStore"
import { ITodoStore, createTodoStore } from "./todo/todoStore"
import { IUserStore, createUserStore } from "./user/userStore"

// initialization data for stores
import initialUserData from "./user/userStore.data"
import initialTodoData from "./todo/todoStore.data"

// rest controller mappings for our micro-service domains
import auditService from "./audit/auditController"
import todoService from "./todo/todoController"
import userService from "./user/userController"

// helper to initialize standard micro-service express application
import createMicroService from "./apiCreator"

// environment variables types
declare var process : {
  env: {
    NODE_ENV: string,
    AUDIT_SERVICE_PORT: number,
    TODO_SERVICE_PORT: number,
    USER_SERVICE_PORT: number,
    PRODUCT_SERVICE_PORT: number,
    PORTFOLIO_SERVICE_PORT: number,
    COMMS_SERVICE_PORT: number,
  }
}

// create our micro-service stores...
const auditStore = createAuditStore()
const todoStore = createTodoStore(new AuditSink((events:IAudit[])=> auditStore.insert(events)))
const userStore = createUserStore()

// load seed any data...
todoStore.insert(initialTodoData)
userStore.insert(initialUserData)


// create our micro-service rest APIs...
export const auditApi = auditService(auditStore, createMicroService("Audit Service", process.env.AUDIT_SERVICE_PORT || 9220));
export const todoApi = todoService(todoStore, createMicroService("Todo Service", process.env.TODO_SERVICE_PORT || 9221));
export const userApi = userService(userStore, createMicroService("User Service", process.env.USER_SERVICE_PORT || 9222));
export const portfolioApi = createMicroService("Portfolio Service", process.env.PORTFOLIO_SERVICE_PORT || 9223);
export const commsApi = createMicroService("Comms Service", process.env.COMMS_SERVICE_PORT || 9224);

