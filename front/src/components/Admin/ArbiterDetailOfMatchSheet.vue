<template>
  <div>
    <h4>Arbitres</h4>
    <div class="card-deck">
      <div class="card" v-for="arbiter in arbiters" :key="arbiter.id">
        <div class="card-body">
          <h5 class="card-title">Arbitre {{ arbiter.type }}</h5>
          <p class="card-text">
            {{ arbiter.person.name }} -
            {{ arbiter.person.country.alpha_3_code }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArbiterDetailOfMatchSheet",
  props: {
    matchsheetId: Number,
  },
  data() {
    return {
      arbiters: [],
    };
  },
  async created() {
    await this.$api
      .find({
        resource: `matchsheet/${this.matchsheetId}/arbiter`,
      })
      .then((response) => {
        this.arbiters = response.data;
      });
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>