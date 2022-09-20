<template>
  <div class="todos">
    <p class="todos__title">todos</p>
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

.todos {
  background-color: $c-background;

  &__title {
    color: $c-primary;
    font-size: $fs-x-large;
    font-weight: $fw-bold;
  }
}

</style>
