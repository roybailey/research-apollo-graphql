// the data access storage interfaces for our micro-service domains
import {IAudit, AuditSink} from './audit/auditType'
import {createAuditStore} from './audit/auditStore'
import {createTodoStore} from './todo/todoStore'
import {createUserStore} from './user/userStore'
import {createAccountStore} from './account/accountStore'
import {createTransactionStore} from './transaction/transactionStore'

// initialization data for stores
import initialTodoData from './todo/todoStore.data'
import initialUserData from './user/userStore.data'
import initialAccountData from './account/accountStore.data'

// rest controller mappings for our micro-service domains
import auditService from './audit/auditController'
import todoService from './todo/todoController'
import userService from './user/userController'
import accountService from './account/accountController'
import transactionService from './transaction/transactionController'

// helper to initialize standard micro-service express application
import createMicroService from './apiCreator'
import initialTransactionData from './transaction/transactionStore.data'

// environment variables types
declare var process: {
    env: {
        NODE_ENV: string,
        AUDIT_SERVICE_PORT: number,
        TODO_SERVICE_PORT: number,
        USER_SERVICE_PORT: number,
        PRODUCT_SERVICE_PORT: number,
        ACCOUNT_SERVICE_PORT: number,
        TRANSACTION_SERVICE_PORT: number,
        COMMS_SERVICE_PORT: number,
    }
}

// create our micro-service stores...
const auditStore = createAuditStore()
const todoStore = createTodoStore(new AuditSink((events: IAudit[]) => auditStore.insert(events)))
const userStore = createUserStore()
const accountStore = createAccountStore()
const transactionStore = createTransactionStore()

// load seed data...
let loadedTodos = todoStore.insert(initialTodoData)
let loadedUsers = userStore.insert(initialUserData)
let loadedAccounts = accountStore.createAccounts(initialAccountData.map(account => {
    return Object.assign(account, {userId: userStore.findOne({name: account.userId}).id})
}))
let loadedTransactions = transactionStore.createTransactions(initialTransactionData.map(tx => {
    return Object.assign(tx, {accountId: accountStore.findOne({number: tx.accountId}).id})
}))

// create our micro-service rest APIs...
export const auditApi = auditService(auditStore, createMicroService('Audit Service', process.env.AUDIT_SERVICE_PORT || 9220));
export const todoApi = todoService(todoStore, createMicroService('Todo Service', process.env.TODO_SERVICE_PORT || 9221));
export const userApi = userService(userStore, createMicroService('User Service', process.env.USER_SERVICE_PORT || 9222));
export const accountApi = accountService(accountStore, createMicroService('Account Service', process.env.ACCOUNT_SERVICE_PORT || 9223));
export const transactionApi = transactionService(transactionStore, createMicroService('Transaction Service', process.env.TRANSACTION_SERVICE_PORT || 9224));
export const commsApi = createMicroService('Comms Service', process.env.COMMS_SERVICE_PORT || 9225);

