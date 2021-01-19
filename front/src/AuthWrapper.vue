<template>
  <div>
    <App v-if="auth" :user="user" />
    <LoginForm v-else-if="!auth" :errorMessage="errorMessage" @submit="login" />
  </div>
</template>

<script>
import App from "./App";
import LoginForm from "./LoginForm";

export default {
  components: { App, LoginForm },
  data() {
    return {
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
    }
  },
  methods: {
    login({ username, password }) {
      console.log(username, password);
      this.$api
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
    },
  },
};
</script>