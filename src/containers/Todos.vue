<template>
  <div class="todos">
    <div class="todo">
      <label
          v-if="todos.length"
          for="toggle-all"
          class="todo__checkbox-label">
        <input
          class="todo__checkbox-input"
          type="checkbox"
          id="toggle-all"
          name="toggle-all"
          v-model="areAllChecked"
          @change="onChangeStatus">
      </label>
      <input
        ref="todo_input"
        class="todo__input"
        type="text"
        id="todo"
        name="todo"
        :value="newTodo"
        @input="onInput($event.target.value)"
        @keyup.enter="onPressEnter">
    </div>
    <div class="todos__main">
      <ul>
        <li
          v-for="todo in todos"
          :key="`todo--${todo.id}`">
          <Task
            :label="todo.label"
            :is-checked="todo.isComplete"
            @onCheckChange="onTodoCompleteChange($event, todo)"
            @onLabelChange="onTodoLabelChange($event, todo)"
            @onClickRemove="onRemoveTodo(todo)">
          </Task>
        </li>
      </ul>
    </div>
    <div
      v-if="todos.length"
      class="todos__footer">
      <p class="todos__footer__counter">
        <strong>{{activeTodos.length}}</strong>
        {{counterLabel}}
      </p>
      <Filters></Filters>
      <p
        v-if="completedTodos.length"
        class="todos__footer__clear"
        @click="clearTodos">Clear completed
      </p>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Task from '@/components/Task'
import Filters from "@/components/Filters.vue"
import { actionNames, getterNames } from '@/store'
import { mapGetters } from 'vuex'
import Todo from "@/types/Todo";

@Component({
  components: {
    Task,
    Filters
  },
  computed: {
    ...mapGetters({
      todos: getterNames.GET_ALL,
      areAllTodosCompleted: getterNames.ARE_ALL_TODOS_COMPLETED,
      activeTodos: getterNames.GET_ACTIVE,
      completedTodos: getterNames.GET_COMPLETED
    })
  }
})
export default class Todos extends Vue {
  newTodo = ''
  areAllChecked = false

  @Watch('areAllTodosCompleted', { immediate: true })
  onAllTodosChanges (newValue: boolean) {
    this.areAllChecked = newValue
  }

  get counterLabel (): string {
    return `item${this.activeTodos.length === 1 ? '' : 's'} left`
  }

  onInput(todo: string): void {
    this.newTodo = todo
  }

  async onPressEnter(): Promise<void> {
    if (this.newTodo) {
      await this.$store.dispatch(actionNames.POST_TODO, this.newTodo)
      this.newTodo = ''
    }
  }

  async onChangeStatus(): Promise<void> {
    await this.$store.dispatch(actionNames.PATCH_ALL_TODOS, this.areAllChecked)
  }

  async onTodoCompleteChange(isComplete: boolean, todo: Todo): Promise<void> {
    await this.$store.dispatch(actionNames.PATCH_TODO, { ...todo, isComplete })
  }

  async onTodoLabelChange(label: string, todo: Todo): Promise<void> {
    await this.$store.dispatch(actionNames.PATCH_TODO, { ...todo, label })
  }

  async onRemoveTodo(todo: Todo): Promise<void> {
    await this.$store.dispatch(actionNames.DELETE_TODO, todo)
  }

  async clearTodos(): Promise<void> {
    await this.$store.dispatch(actionNames.DELETE_COMPLETED_TODOS)
  }

  mounted(): void {
    this.$refs.todo_input.focus()
  }

}
</script>

<style scoped lang="scss">

.todos {
  box-shadow: 0 10px 40px rgba(black, .3);
  margin: 0 auto;
  width: 450px;

  &__footer {
    color: $c-black;
    display: grid;
    font-size: $fs-small;
    grid-template-columns: repeat(3, 1fr);
    padding: $gap-xxs + 2;

    &__counter {
      padding: ($gap-xxs - 4) $gap-xxs;
      text-align: left;
    }

    &__clear {
      padding: ($gap-xxs - 4) $gap-xxs;
      text-align: right;
    }
  }
}

</style>
