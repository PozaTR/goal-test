<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $c-background;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
