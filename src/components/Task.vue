<template>
  <div :class="[
      'task',
      'todo',
      {'todo--hidden': !isTaskDisabled}
    ]">
    <label
      :for="`checkbox-${id}`"
      class="todo__checkbox-label">
      <input
        class="todo__checkbox-input"
        type="checkbox"
        :id="`checkbox-${id}`"
        :name="`checkbox-${id}`"
        v-model="isTodoChecked"
        @change="onCheckChange">
    </label>
    <div
      :class="[
          'task__wrapper',
          'todo__wrapper',
          { 'todo__wrapper--completed': isTodoChecked}
        ]">
      <label
          :class="[
          'task__label',
            {
              'task__label--hidden': !isTaskDisabled
            }
          ]"
          @dblclick="dobleClickLabel"
      >{{label}}</label>
      <input
          ref="todo_input"
          class="todo__input"
          type="text"
          :id="`input-${id}`"
          :name="`input-${id}`"
          :value="label"
          @input="onInput($event.target.value)"
          @keyup.enter="onPressEnter"
          @keyup.esc="onPressEscape"
          @blur="onBlur">
    </div>
    <span class="task__remove" @click="onClickRemove"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Task extends Vue {
  newTodo = ''
  isTodoChecked = false
  counter = 0
  isTaskDisabled = true

  @Prop() label: string
  @Prop() isChecked?: boolean

  @Watch('isChecked', { immediate: true })
  onAllTodosChecked (newValue: boolean) {
    this.isTodoChecked = newValue
  }

  @Watch('label', { immediate: true })
  onLabelChange (newValue: string) {
    this.newTodo = newValue
  }

  get id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onInput(todo: string): void {
    this.newTodo = todo
  }

  onPressEnter(): void {
    this.$refs.todo_input.blur()
  }

  onBlur(): void {
    if (this.newTodo) {
      this.$emit('onLabelChange', this.newTodo)
      this.newTodo = ''
      this.isTaskDisabled = true
    } else {
      this.onClickRemove()
    }
  }

  onPressEscape(): void {
    this.newTodo = this.label
    this.$refs.todo_input.blur()
  }

  onCheckChange(): void {
    this.$emit('onCheckChange', this.isTodoChecked)
  }

  dobleClickLabel(): void {
    this.isTaskDisabled = false
    this.$refs.todo_input.focus()
  }

  onClickRemove(): void {
    this.$emit('onClickRemove')
  }

}
</script>

<style scoped lang="scss">

.task {
  &__wrapper {
    position: relative;
    height: 100%;
  }

  &__label {
    font-size: $fs-medium;
    height: 100%;
    line-height: 1;
    padding: ($gap-xxs - 1px) $gap-xxs $gap-xxs;
    position: absolute;
    text-align: left;
    top: 0;
    width: 100%;

    &--hidden {
      display: none;
    }
  }

  &__remove {
    background-color: $c-primary;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    height: 22px;
    line-height: 1;
    padding: $gap-xxs - 4;
    position: absolute;
    right: $gap-s;
    top: 12px;
    width: 24px;

    &:before {
      content: '';
      background-image: url('~@/assets/cross.svg');
      background-size: cover;
      position: absolute;
      display: block;
      height: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
    }
  }

  &:hover {
    .task__remove {
      display: block;
    }
  }
}

.todo--hidden {
  .task__remove {
    display: none !important;
  }
}

</style>
