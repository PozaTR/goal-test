<template>
  <div>
    <p class="subtitle">Active</p>
    <Todos
      :todos="activeTodos"
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
      activeTodos: getterNames.GET_ACTIVE
    })
  }
})
export default class Active extends Vue {

}
</script>

<style scoped lang="scss">

</style>
