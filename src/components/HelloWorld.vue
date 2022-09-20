<template>
  <div>
    <p>Componente 1</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  value: string = 'test'

  @Prop() private msg!: string;

  get computadisima (): boolean {
    return !!this.value
  }

  metodazo () {

  }
}
</script>

<style scoped lang="scss">

</style>
