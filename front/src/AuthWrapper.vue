<template>
  <div>
    <div v-if="!loading">
      <App v-if="auth" :user="user" />
      <LoginForm v-else :errorMessage="errorMessage" @submit="login" />
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
      user: {
        username: null,
        role: null,
      },
      errorMessage: "",
    };
  },
  created() {
    if (this.$session.getItem("token")) {
      this.auth = true;
      this.user.role = this.$session.getItem("role");
      this.user.username = this.$session.getItem("username");
      this.user.club_id = this.$session.getItem("clubId");
    } else {
      this.auth = false;
    }
    this.loading = false;
  },
  methods: {
    login({ username, password }) {
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
            this.$session.setItem("role", response.data.user.role);
            this.$session.setItem("clubId", response.data.user.club_id);
            if (this.user.role == "ADMIN") {
              this.$router.push("/gestion").catch(() => {});
            } else if (this.user.role == "USER") {
              this.$router.push("/matchsheet").catch(() => {});
            }
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