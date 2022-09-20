<template>
  <div>
    <p>Página de todos activos</p>
    <router-link to="/completed">Ir a la vista de todos completados</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Active extends Vue {

}
</script>

<style scoped lang="scss">

</style>
