<template>
  <div>
    <p class="subtitle">All</p>
    <Todos
      :todos="todos">
    </Todos>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Todos  from '@/containers/Todos'
import { mapGetters } from 'vuex'
import { getterNames } from '@/store'

@Component({
  components: {
    Todos
  },
  computed: {
    ...mapGetters({
      todos: getterNames.GET_ALL
    })
  }
})
export default class All extends Vue {

}
</script>

<style scoped lang="scss">

</style>
