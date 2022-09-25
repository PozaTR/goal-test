import AppStore, {createStore, getterNames, mutationNames} from '@/store/index'
import Todo from '@/types/Todo'


const fixtureTodo: Todo = {
    id: 1,
    label: 'test1',
    isComplete: false
}
const fixtureActiveTodo: Todo = {
    id: 2,
    label: 'test2',
    isComplete: false
}
const fixtureCompleteTodo: Todo = {
    id: 3,
    label: 'test3',
    isComplete: true
}

describe('Store', () => {
    describe('Mutations', () => {
        let store: typeof AppStore

        beforeEach(() => {
            store = createStore()
        })

        describe(mutationNames.INCREASE_LAST_TODO_ID, () => {
            it('should increase one number on lastTodoId', function () {
                store.state.lastTodoId = 1

                store.commit(mutationNames.INCREASE_LAST_TODO_ID)

                expect(store.state.lastTodoId).toBe(2)
            });
        })

        describe(mutationNames.CREATE_TODO, () => {
            it('should add the passed todo into state', function () {
                store.commit(mutationNames.CREATE_TODO, fixtureTodo)

                expect(store.state.todos).toEqual([fixtureTodo])
            })
        })

        describe(mutationNames.UPDATE_ALL_TODOS, () => {
            it('should upadate all todos', function () {
                store.state.todos = [
                    fixtureActiveTodo,
                    { ...fixtureActiveTodo, id: 6 }
                ]

                store.commit(mutationNames.UPDATE_ALL_TODOS, true)

                expect(store.state.todos[0].isComplete).toBeTruthy()
                expect(store.state.todos[1].isComplete).toBeTruthy()
            })
        })

        describe(mutationNames.UPDATE_TODO, () => {
            beforeEach(() => {
                store.state.todos = [
                    fixtureTodo,
                    fixtureActiveTodo,
                    fixtureCompleteTodo
                ]
            })

            it('update todo when exists', function () {
                const expectedTodo = {
                    ...fixtureActiveTodo,
                    label: 'newTodoLabel'
                }

                store.commit(mutationNames.UPDATE_TODO, expectedTodo)

                expect(store.state.todos[1]).toEqual(expectedTodo)
            })

            it('update todo when exists', function () {
                const expectedTodo = {
                    ...fixtureActiveTodo,
                    label: 'newTodoLabel',
                    id: 23
                }

                store.commit(mutationNames.UPDATE_TODO, expectedTodo)

                expect(store.state.todos).toEqual([
                    fixtureTodo,
                    fixtureActiveTodo,
                    fixtureCompleteTodo
                ])
            })
        })

        describe(mutationNames.REMOVE_TODO, () => {
            beforeEach(() => {
                store.state.todos = [
                    fixtureTodo,
                    fixtureActiveTodo,
                    fixtureCompleteTodo
                ]
            })

            it('delete todo passed when exists', function () {
                store.commit(mutationNames.REMOVE_TODO, fixtureActiveTodo)

                expect(store.state.todos).toEqual([
                    fixtureTodo,
                    fixtureCompleteTodo
                ])
            })

            it('keep todos as it were if does not exist', function () {
                store.commit(mutationNames.REMOVE_TODO, {
                    ...fixtureActiveTodo,
                    id: 23
                })

                expect(store.state.todos).toEqual([
                    fixtureTodo,
                    fixtureActiveTodo,
                    fixtureCompleteTodo
                ])
            })
        })
    })

    describe('Getters', () => {
        let store: typeof AppStore
        let mockTodos: Array<Todo>

        beforeEach(() => {
            store = createStore()
            mockTodos = [fixtureActiveTodo, fixtureCompleteTodo]
            store.state.todos = mockTodos
        })
        describe(getterNames.GET_ALL, () => {
            it('should return all todos', function () {
                expect(store.getters[getterNames.GET_ALL]).toEqual(mockTodos)
            });
        })

        describe(getterNames.GET_ACTIVE, () => {
            it('should return just active todos', function () {
                expect(store.getters[getterNames.GET_ACTIVE]).toEqual([fixtureActiveTodo])
            });
        })

        describe(getterNames.GET_COMPLETED, () => {
            it('should return just completed todos', function () {
                expect(store.getters[getterNames.GET_COMPLETED]).toEqual([fixtureCompleteTodo])
            });
        })

        describe(getterNames.ARE_ALL_TODOS_COMPLETED, () => {
            it('should return if are all todos completed true', function () {
                store.state.todos = [
                    {
                        id: 1,
                        label: 'test1',
                        isComplete: true
                    },
                    {
                        id: 2,
                        label: 'test2',
                        isComplete: true
                    }
                ]

                expect(store.getters[getterNames.ARE_ALL_TODOS_COMPLETED]).toBeTruthy()
            });
            it('should return if are all todos completed false', function () {
                expect(store.getters[getterNames.ARE_ALL_TODOS_COMPLETED]).toBeFalsy()
            });
        })
    })
})
