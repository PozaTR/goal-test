<template>
  <div class="page">
    <div class="page__card">
      <p class="page__card__title">todos</p>
      <Todos></Todos>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Todos  from '@/containers/Todos'

@Component({
  components: {
    Todos
  }
})
export default class All extends Vue {

}
</script>

<style scoped lang="scss">

</style>
