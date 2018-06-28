import { AuditSink, IAudit } from '../audit/auditType';
import { ITodo, TodoStatus } from './todoType';
import { createTodoStore } from './todoStore';


describe('todo store', () => {

    let audit:IAudit[] = []

    let auditCapture = function (events:IAudit[]):IAudit[] {
        events.forEach(event => audit.push(event));
        return events;
    }
    const todos = createTodoStore(new AuditSink(auditCapture));

    const todosArray: ITodo[] = [{
        goal: 'Goal',
        id: 'some-id',
        status: TodoStatus.NOT_STARTED,
        steps: [],
        title: 'Title'
    }];

    const initialCount = todos.findAll().length

    it('created the todo', () => {
        const newTodo = todos.insert(todosArray)
        expect(newTodo).toMatchObject(todosArray)
        const sameTodo = todos.findOne({ id: todosArray[0].id })
        expect(newTodo[0]).toMatchObject(sameTodo)
        expect(audit).toHaveLength(1)
    });

    it('updated the todo status to IN_PROGRESS', () => {
        const testTodo = todos.findOne({ title: todosArray[0].title })
        expect(testTodo.status).toEqual(TodoStatus.NOT_STARTED)
        testTodo.status = TodoStatus.IN_PROGRESS
        const updatedTodo = todos.update(testTodo)
        expect(updatedTodo.status).toEqual(TodoStatus.IN_PROGRESS)
        expect(audit).toHaveLength(2)
    });

    it('delete the todo', () => {
        todosArray.map(todo => {
            const testTodo = todos.findOne({ title: todo.title })
            if(testTodo.id) {
                todos.remove(testTodo.id)
            } else {
                console.error(`delete failed, todo title not found : ${todo.title}`);
            }
        })
        expect(audit).toHaveLength(3)
    });

    const finalCount = todos.findAll().length
    expect(initialCount).toEqual(finalCount)
});
