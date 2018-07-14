import loki from 'lokijs'
import { IAudit, AuditSink } from '../audit/auditType'
import { ITodo, ITodoStep, ITodoTemplate, TodoStatus } from './todoType'
import sequence from '../identity'
const uuid = sequence('TODO')


export interface ITodoStore {

    insert(todos:ITodoTemplate[]):ITodo[]
    findAll():ITodo[]
    find(id:string):ITodo
    findOne(query:any):ITodo
    update(data:ITodo):ITodo
    remove(id:string):ITodo
}


class InMemoryTodoStore implements ITodoStore {

    db = new loki('todo.db');
    todos = this.db.addCollection('todos') as Collection<ITodo>;
    emitter:AuditSink;

    constructor(sink:AuditSink) {
        this.emitter = sink
    }

    insert(todoset:ITodoTemplate[]):ITodo[] {
        // console.log(JSON.stringify(todos));
        let result = todoset.map(it=>this.todos.insert({
            id: uuid().toString(),
            title: it.title || '',
            status: it.status || TodoStatus.NOT_STARTED,
            steps: it.steps || [],
            goal: it.goal || ''
        })) as ITodo[]
        this.emitter.raise('todo', 'insert', '', result);
        // console.log(JSON.stringify(result));
        return result
    }

    findAll():ITodo[] {
        return this.todos.find()
    }

    find(id:string):ITodo {
        return this.findOne({ id })
    }

    findOne(query:any):ITodo {
        let found = this.todos.findOne(query) as ITodo;
        return found;
    }

    update(data:ITodo):ITodo {
        if(!data.id) {
            throw Error(`todo update must provide id ${JSON.stringify(data)}`)
        }
        let record = this.find(data.id)
        record.title = data.title || record.title
        record.goal = data.goal || record.goal
        record.steps = data.steps || record.steps
        record.status = data.status || record.status
        let result = this.todos.update(record);
        this.emitter.raise('todo', 'update', data.id || '', result);
        return result;
    }

    remove(id:string):ITodo {
        let data:ITodo = this.find(id)
        this.todos.remove(data);
        this.emitter.raise('todo', 'delete', id || '', data);
        return data;
    }
}


export function createTodoStore(sink:AuditSink):ITodoStore {
    const todoStore = new InMemoryTodoStore(sink)
    return todoStore;
}

export default createTodoStore;
