<template>
  <div class="todos">
    <p class="todos__title">todos</p>
    <div class="todos__header">
      <label
          v-if="todoList.length"
          for="toggle-all"
          class="todos__header__checkbox-label">
        <input
          class="todos__header__checkbox-input"
          type="checkbox"
          id="toggle-all"
          name="toggle-all">
      </label>
      <input
        ref="todo_input"
        class="todos__header__input"
        type="text"
        id="todo"
        name="todo"
        :value="newTodo"
        @input="onInput($event.target.value)"
        @keyup.enter="onPressEnter()">
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Task from '@/components/Task'
import Filters from "@/components/Filters.vue"
import { actionNames } from '@/store'
import Todo from "@/types/Todo";

@Component({
  components: {
    Task,
    Filters
  }
})
export default class Todos extends Vue {
  newTodo = ''
  todoList: Array<Todo> = []

  onInput(todo: string): void {
    this.newTodo = todo
  }

  async onPressEnter(): Promise<void> {
    if (this.newTodo) {
      await this.$store.dispatch(actionNames.POST_TODO, this.newTodo)
      this.newTodo = ''
    }
  }

  mounted(): void {
    this.$refs.todo_input.focus()
  }

}
</script>

<style scoped lang="scss">

.todos {
  $checkboxSize: 16px;

  box-shadow: 0 10px 40px rgba(black, .3);
  margin: 0 auto;
  width: 450px;

  &__title {
    color: $c-primary;
    font-size: $fs-x-large;
    font-weight: $fw-bold;
    margin: 0 0 $gap-m;
  }

  &__header {
    align-items: center;
    background-color: $c-white;
    border: 1px solid $c-background;
    height: 48px;
    padding: $gap-xxs $gap-xxs $gap-xxs (2 * $gap-xxs + $checkboxSize);
    position: relative;

    &__checkbox-label {
      border: 1px solid $c-border;
      border-radius: 2px;
      bottom: 0;
      height: $checkboxSize;
      left: $gap-xxs;
      margin: auto;
      position: absolute;
      top: 0;
      width: $checkboxSize;

      &:before {
        content: 'v';
        color: $c-active;
        font-weight: $fw-heavy;
        position: absolute;
        display: block;
        height: 14px;
        font-size: 14px;
        line-height: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity .3s;
      }

      &:has(input:checked):before {
        opacity: 1;
      }
    }

    &__checkbox-input {
      display: none;
    }

    &__input {
      border: none;
      flex-grow: 1;
      font-size: $fs-medium;
      height: 100%;
      line-height: 1;
      padding: $gap-xxs;
      width: 100%;
    }
  }
}

</style>
