<template>
  <div>
    <Todos></Todos>
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
