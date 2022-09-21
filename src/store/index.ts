import Vue from 'vue'
import Vuex from 'vuex'
import Todo from '@/types/Todo'

Vue.use(Vuex)

export const actionNames = {
  POST_TODO: 'create_todo'
}

export const mutationNames = {
  CREATE_TODO: 'create_todo'
}

export class StoreState {
  todos: Array<Todo>

  constructor() {
    this.todos = []
  }
}

export default new Vuex.Store({
  state: new StoreState(),
  actions: {
    [actionNames.POST_TODO]: async ({commit}, todo: string) => {
      commit(mutationNames.CREATE_TODO, todo)
    }
  },
  mutations: {
    [mutationNames.CREATE_TODO]: (state: StoreState, todo: string) => {
      state.todos.push({
        label: todo,
        isComplete: false
      })
    }
  },
  getters: {
  },
  modules: {
  }
})
