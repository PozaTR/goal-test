<template>
  <div class="todos">
    <p class="todos__title">todos</p>
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
      areAllTodosCompleted: getterNames.ARE_ALL_TODOS_COMPLETED
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

  &__title {
    color: $c-primary;
    font-size: $fs-x-large;
    font-weight: $fw-bold;
    margin: 0 0 $gap-m;
  }
}

</style>
