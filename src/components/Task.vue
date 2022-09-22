<template>
  <div class="task todo">
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
    <input
      ref="todo_input"
      :class="[
        'todo__input',
        {
          'todo__input--completed': isTodoChecked
        }
      ]"
      type="text"
      :id="`input-${id}`"
      :name="`input-${id}`"
      :value="label"
      @input="onInput($event.target.value)"
      @keyup.enter="onPressEnter()">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Task extends Vue {
  newTodo = ''
  isTodoChecked = false

  @Prop() label?: string
  @Prop() isChecked?: boolean

  @Watch('isChecked', { immediate: true })
  onAllTodosChecked (newValue: boolean) {
    this.isTodoChecked = newValue
  }

  get id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onInput(todo: string): void {
    this.newTodo = todo
  }

  async onPressEnter(): Promise<void> {
    if (this.label) {
      this.$emit('onLabelChange', this.newTodo)
      this.newTodo = ''
    }
  }

  onCheckChange(): void {
    this.$emit('onCheckChange', this.isTodoChecked)
  }

}
</script>

<style scoped lang="scss">

</style>
