<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <img
        src="../assets/fff_logo.svg.png"
        width="50"
        height="50"
        class="d-inline-block align-top logo"
        alt="logo fff_cesi"
      />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ml-5" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li v-if="role == 'ADMIN'" class="nav-item">
            <router-link to="/gestion" class="nav-link btn btn-link"
              >Gestion</router-link
            >
          </li>
          <li v-if="role == 'USER'" class="nav-item">
            <router-link to="/matchsheet" class="nav-link btn btn-link"
              >Feuille de Match</router-link
            >
          </li>
        </ul>
        <span class="navbar-text mr-4"> Bienvenue {{ name }} </span>
        <button class="btn btn-outline-success my-2 my-sm-0" @click="logout">
          Logout
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    role: String,
    name: String,
  },
  created() {
    if (this.role == "ADMIN") {
      this.$router.push("/gestion").catch(() => {});
    } else if (this.role == "USER") {
      this.$router.push("/matchsheet").catch(() => {});
    }
  },
  methods: {
    logout() {
      this.$session.removeItem("token");
      this.$router.push("/login").catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>