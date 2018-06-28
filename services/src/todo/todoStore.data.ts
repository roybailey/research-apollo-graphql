import { ITodo, TodoStatus, ITodoTemplate } from './todoType'

const initialTodoData:ITodoTemplate[] = [
    { title : 'do something useful', goal: 'get off my butt and do something productive', status: TodoStatus.NOT_STARTED, steps: [{
        id: '1', title: 'get off couch', details: 'lift body into standing position using arms and legs'
    }] }
]

export default initialTodoData

