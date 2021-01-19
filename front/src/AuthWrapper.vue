<template>
  <div>
    <div v-if="!loading">
      <App v-if="auth" :user="user" />
      <LoginForm
        v-else-if="!auth"
        :errorMessage="errorMessage"
        @submit="login"
      />
    </div>
    <div v-else class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import App from "./App";
import LoginForm from "./LoginForm";

export default {
  components: { App, LoginForm },
  data() {
    return {
      loading: true,
      auth: null,
      user: null,
      token: null,
      errorMessage: "",
    };
  },
  mounted() {
    if (this.$session.getItem("token")) {
      this.login({
        username: this.$session.getItem("username"),
        password: this.$session.getItem("password"),
      });
    } else {
      this.auth = false;
      this.loading = false;
    }
  },
  methods: {
    login({ username, password }) {
      console.log(username, password);
      let api = this.$api
        .create({
          resource: `users`,
          data: {
            username: username,
            password: password,
          },
        })
        .then((response) => {
          if (!response.data) {
            this.errorMessage =
              "Le nom d'utilisateur ou le mot de passe est incorrect";
          } else {
            this.auth = true;
            this.user = response.data.user;
            this.$session.setItem("token", response.data.accesstoken);
            this.$session.setItem("username", response.data.user.username);
            this.$session.setItem("password", response.data.user.password);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      api.then(() => (this.loading = false));
    },
  },
};
</script>