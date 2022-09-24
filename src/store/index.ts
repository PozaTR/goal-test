import Vue from 'vue'
import Vuex from 'vuex'
import Todo from '@/types/Todo'

Vue.use(Vuex)

export const actionNames = {
  POST_TODO: 'create_todo',
  PATCH_ALL_TODOS: 'patch_all_todos',
  PATCH_TODO: 'patch_todo',
  DELETE_TODO: 'delete_todo',
  DELETE_COMPLETED_TODOS: 'delete_completed_todos'
}

export const mutationNames = {
  INCREASE_LAST_TODO_ID: 'increase_last_todo_id',
  CREATE_TODO: 'create_todo',
  UPDATE_ALL_TODOS: 'update_all_todos',
  UPDATE_TODO: 'update_todo',
  REMOVE_TODO: 'remove_todo'
}

export const getterNames = {
  GET_ALL: 'get_all',
  GET_ACTIVE: 'get_active',
  GET_COMPLETED: 'get_completed',
  ARE_ALL_TODOS_COMPLETED: 'are_all_todos_completed'
}

export class StoreState {
  todos: Array<Todo>
  lastTodoId: number

  constructor() {
    this.todos = []
    this.lastTodoId = 0
  }
}

export default new Vuex.Store({
  state: new StoreState(),
  actions: {
    [actionNames.POST_TODO]: async ({commit, state}, label: string) => {
      const todo: Todo = {
        id: state.lastTodoId,
        label,
        isComplete: false
      }
      commit(mutationNames.CREATE_TODO, todo)
      commit(mutationNames.INCREASE_LAST_TODO_ID)
    },
    [actionNames.PATCH_ALL_TODOS]: async ({commit}, isComplete: boolean) => {
      commit(mutationNames.UPDATE_ALL_TODOS, isComplete)
    },
    [actionNames.PATCH_TODO]: async ({commit}, todo: Todo) => {
      commit(mutationNames.UPDATE_TODO, todo)
    },
    [actionNames.DELETE_TODO]: async ({commit}, todo:Todo) => {
      commit(mutationNames.REMOVE_TODO, todo)
    },
    [actionNames.DELETE_COMPLETED_TODOS]: async ({ dispatch, getters }, todo:Todo) => {
      const completedTodos: Array<Todo> = getters[getterNames.GET_COMPLETED]
      completedTodos.forEach(todo => {
        dispatch(actionNames.DELETE_TODO, todo)
      })
    }
  },
  mutations: {
    [mutationNames.INCREASE_LAST_TODO_ID]: (state: StoreState) => {
      state.lastTodoId++
    },
    [mutationNames.CREATE_TODO]: (state: StoreState, todo: Todo) => {
      state.todos.push(todo)
    },
    [mutationNames.UPDATE_ALL_TODOS]: (state: StoreState, isComplete: boolean) => {
      state.todos = state.todos.map(todo => ({
        ...todo,
        isComplete
      }))
    },
    [mutationNames.UPDATE_TODO]: (state: StoreState, todo: Todo) => {
      const todoIndex = state.todos.findIndex(_todo => _todo.id === todo.id)

      if (todoIndex >= 0) {
        Vue.set(state.todos, todoIndex, todo)
      }
    },
    [mutationNames.REMOVE_TODO]: (state: StoreState, todo: Todo) => {
      const todoIndex = state.todos.findIndex(_todo => _todo.id === todo.id)

      if (todoIndex >= 0) {
        state.todos.splice(todoIndex, 1)
      }
    },
  },
  getters: {
    [getterNames.GET_ALL]: (state: StoreState): Array<Todo> => state.todos,
    [getterNames.GET_ACTIVE]: (state: StoreState): Array<Todo> => state.todos.filter(todo => !todo.isComplete),
    [getterNames.GET_COMPLETED]: (state: StoreState): Array<Todo> => state.todos.filter(todo => todo.isComplete),
    [getterNames.ARE_ALL_TODOS_COMPLETED]: (state: StoreState): boolean => state.todos.every(todo => todo.isComplete)
  },
  modules: {
  }
})
