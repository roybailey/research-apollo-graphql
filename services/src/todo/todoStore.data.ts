import { ITodo, TodoStatus, ITodoTemplate } from './todoType'
import faker from 'faker'

const initialTodoData:ITodoTemplate[] = [
    { title : 'do something useful', goal: 'get off my butt and do something productive', status: TodoStatus.NOT_STARTED, steps: [{
        id: '1', title: 'get off couch', details: 'lift body into standing position using arms and legs'
    }] },
    { title : 'Phone '+faker.name.findName(), goal: 'Sell them something for loads of money', status: TodoStatus.NOT_STARTED, steps: [{
            id: '1', title: 'pick up phone', details: 'lift phone, dial number, move phone to ear'
    }] },
    { title : faker.lorem.words(), goal: faker.lorem.sentence(), status: TodoStatus.NOT_STARTED, steps: [] },
]

export default initialTodoData

