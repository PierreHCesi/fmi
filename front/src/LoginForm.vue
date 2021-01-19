<template>
  <div class="bg-login">
    <img
      alt="background login terrain"
      class="bg-img-login"
      src="./assets/terrlog.jpg"
    />
    <div class="parallelogramme"></div>
    <h1 class="title-co">FFF CESI - Connexion</h1>
    <div class="container jumbotron container-login">
      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
      <form @submit.prevent="submit()">
        <div class="form-group">
          <label for="username">Nom utilisateur</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            id="username"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  props: {
    errorMessage: {
      type: String,
      default: "",
    },
  },
  methods: {
    submit() {
      this.$emit("submit", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.error {
  color: tomato;
}
.bg-login {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.bg-img-login {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.parallelogramme {
  position: absolute;
  left: 16%;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #006699d1;
  -webkit-transform: skew(180deg);
  -moz-transform: skew(180deg);
  -o-transform: skew(180deg);
  transform: skew(180deg);
}
.container-login {
  background-color: #383838;
  color: aliceblue;
  z-index: 10;
  margin-right: 1rem;
}
.title-co {
  color: antiquewhite;
  margin-right: 2rem;
}
</style>