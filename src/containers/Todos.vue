<template>
  <div>
    <Task></Task>
    <Filters></Filters>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Task from '@/components/Task'
import Filters from "@/components/Filters.vue";

@Component({
  components: {
    Task,
    Filters
  }
})
export default class Todos extends Vue {

}
</script>

<style scoped lang="scss">

</style>
