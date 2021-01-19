<template>
  <Home v-if="user.role == 'USER'" :clubId="user.club_id" />
</template>

<script>
import Home from "../components/Client/Home";
export default {
  name: "MatchSheetClient",
  components: {
    Home,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.$parent.user;
  },
};
</script>

<style>
</style>