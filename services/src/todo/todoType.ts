
export enum TodoStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE',
}

export interface ITodoStep {
    id: string,
    title: string,
    details: string
}

export interface ITodoTemplate {
    id?: string,
    title?: string,
    status?: TodoStatus,
    steps?: ITodoStep[],
    goal?: string,
}

export interface ITodo {
    id: string,
    title: string,
    status: TodoStatus,
    steps?: ITodoStep[],
    goal?: string,
}

