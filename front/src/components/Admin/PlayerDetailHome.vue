<template>
  <div class="row">
    <div class="col">
      <h4>Titulaires</h4>
      <hr />

      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="item in attcks" :key="item.id">
          <span class="badge badge-secondary ml-1">{{ item.number }}</span>
          {{ item.name }} - {{ item.position }} {{ item.placement }}
          <i v-if="item.is_captain" class="bi bi-star-fill"></i>
          <i v-if="item.is_second_captain" class="bi bi-star-half"></i>
        </li>
        <li class="list-group-item" v-for="item in mids" :key="item.id">
          <span class="badge badge-secondary ml-1">{{ item.number }}</span>
          {{ item.name }} - {{ item.position }} {{ item.placement }}
          <i v-if="item.is_captain" class="bi bi-star-fill"></i>
          <i v-if="item.is_second_captain" class="bi bi-star-half"></i>
        </li>
        <li class="list-group-item" v-for="item in defs" :key="item.id">
          <span class="badge badge-secondary ml-1">{{ item.number }}</span>
          {{ item.name }} - {{ item.position }} {{ item.placement }}
          <i v-if="item.is_captain" class="bi bi-star-fill"></i>
          <i v-if="item.is_second_captain" class="bi bi-star-half"></i>
        </li>
        <li class="list-group-item" v-for="item in goal" :key="item.id">
          <span class="badge badge-secondary ml-1">{{ item.number }}</span>
          {{ item.name }} - {{ item.position }} {{ item.placement }}
          <i v-if="item.is_captain" class="bi bi-star-fill"></i>
          <i v-if="item.is_second_captain" class="bi bi-star-half"></i>
        </li>
      </ul>
    </div>
    <div class="col">
      <h4>Remplaçants</h4>
      <hr />
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="item in spare" :key="item.id">
          <span class="badge badge-secondary ml-1">{{ item.number }}</span>
          {{ item.name }} - {{ item.poste }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerDetailHome",
  props: {
    matchsheetId: Number,
  },
  data() {
    return {
      players: [],
    };
  },
  async created() {
    await this.$api
      .find({
        resource: `matchsheet/${this.matchsheetId}/player/home`,
      })
      .then((response) => {
        this.players = response.data;
      });
  },
  computed: {
    attcks: function () {
      return this.players.filter(
        (player) => player.poste == "ATTAQUANT" && player.is_spare == 0
      );
    },
    mids: function () {
      return this.players.filter(
        (player) => player.poste == "MILIEU" && player.is_spare == 0
      );
    },
    defs: function () {
      return this.players.filter(
        (player) => player.poste == "DEFENSEUR" && player.is_spare == 0
      );
    },
    goal: function () {
      return this.players.filter(
        (player) => player.poste == "GARDIEN" && player.is_spare == 0
      );
    },
    spare: function () {
      return this.players.filter((player) => player.is_spare == 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group {
  font-size: 13px;
}
.list-group-item {
  text-align: left;
  padding: 0.25rem 0.25rem;
}
.bi {
  position: absolute;
  top: 0;
  right: 0;
}
</style>