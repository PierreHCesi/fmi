<template>
  <div>
    <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div>
      <img alt="Vue logo" src="../assets/fff_logo.svg.png" />
      <h1 class="goodbye">
        Au revoir <span>{{ user.username | capitalize }}</span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.$parent.user;
    setTimeout(() => window.location.reload(), 3000);
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>


<style scoped>
.spinner-grow {
  position: relative;
  margin-top: 3%;
  bottom: -30rem;
}
img {
  height: 500px;
}
.goodbye {
  font-size: 6rem;
}
.goodbye span {
  color: #88cbef;
}
</style>