<template>
  <div id="app">
    <div id="nav">
      <router-link class="link-margin" to="/">Home</router-link>
      <router-link class="link-margin" to="/admin">Admin</router-link>
      <router-link class="link-margin" to="/search">Search</router-link>
      <router-link class="link-margin" to="/analysis">Analysis</router-link>
    </div>
    <b-card>
    <router-view />
    </b-card>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.link-margin{
    margin-right: 50px;
}
</style>
