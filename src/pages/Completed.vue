<template>
  <div>
    <p class="subtitle">Completed</p>
    <Todos
      :todos="completedTodos"
    ></Todos>
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
      completedTodos: getterNames.GET_COMPLETED
    })
  }
})
export default class Completed extends Vue {

}
</script>

<style scoped lang="scss">

</style>
