<template>
  <div id="app">
    <Navigation :role="role" :name="user.username" />
    <router-view id="main" />
    <footer class="text-muted">
      <div class="container">
        <p class="float-right">
          <a href="#">Remonter</a>
        </p>
        <p>Projet web © FFF CESI - RIL 19</p>
        <p>Benjamin - Pierre</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    Navigation,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      role: null,
    };
  },
  created() {
    this.role = this.user.role;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #dadada;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav {
  background-color: #343a40 !important;
}

footer {
  background: #343a40;
  padding-top: 3rem;
  padding-bottom: 3rem;
  bottom: 0;
  width: 100%;
}
</style>
