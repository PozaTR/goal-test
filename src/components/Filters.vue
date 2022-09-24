<template>
  <ul class="filters">
    <li
      :class="[
        'filters__item',
        {'filters__item--active': $route.path === filter.path}
      ]"
      v-for="(filter, idx) in filters"
      :key="`filter--${idx}`">
      <router-link
        :to="filter.path"
        class="filters__item__link">
        {{filter.label}}
      </router-link>

    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Filters extends Vue {
  filters = [
    {
      label: 'All',
      path: '/'
    },
    {
      label: 'Active',
      path: '/active'
    },
    {
      label: 'Completed',
      path: 'completed'
    }
  ]
}
</script>

<style scoped lang="scss">

.filters {
  display: flex;
  justify-content: space-around;

  &__item {
    border: 1px solid transparent;
    padding: ($gap-xxs - 4) $gap-xxs;

    &--active {
      background-color: rgba($c-primary, 0.4);
      border-color: rgba($c-black, 0.4);
    }

    &__link {
      color: $c-black;
      text-decoration: none;
    }
  }
}

</style>
