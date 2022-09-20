<template>
  <div>
    <p>Página principal de todos</p>
    <router-link to="/active">Ir a la vista de todos activos</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class All extends Vue {

}
</script>

<style scoped lang="scss">

</style>
