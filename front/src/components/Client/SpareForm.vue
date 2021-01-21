<template>
  <div class="row">
    <div class="col">
      <h4>
        Les joueurs disponibles
        <span class="badge badge-warning">{{ unSelectedItems.length }}</span>
      </h4>
      <div class="list-group">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          :class="{ disabled: disabled }"
          v-for="item in unSelectedItems"
          :key="item.id"
          @click="addOnSidelines(item)"
        >
          {{ item.poste }} - {{ item.number }} - {{ item.name }}
          <i
            v-if="sparePlayers.length < 6"
            class="float-right bi bi-caret-right"
          ></i>
        </button>
      </div>
    </div>
    <div class="col">
      <h4>
        Les remplaçants {{ sparePlayers.length }} / 6
        <small v-if="sparePlayers.length < 3" class="float-right text-danger"
          ><i class="bi bi-exclamation-triangle"></i> (3 joueurs minimum)</small
        >
        <small v-else-if="sparePlayers.length == 6" class="float-right"
          ><i class="bi bi-exclamation-circle"></i> (Maximum de
          remplaçants)</small
        >
        <small v-else class="float-right text-success"
          ><i class="bi bi-check"></i
        ></small>
      </h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="player in sparePlayers"
          :key="player.id"
          @click="removeSpare(player)"
        >
          {{ player.poste }} - {{ player.number }} - {{ player.name }}
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i class="bi bi-x text-danger"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpareForm",
  props: {
    numberOfPlayers: Number,
    sparePlayers: Array,
    unSelectedItems: Array,
  },
  data() {
    return {};
  },
  computed: {
    disabled: function () {
      return this.sparePlayers.length >= 6;
    },
  },
  methods: {
    addOnSidelines(item) {
      if (!this.disabled) {
        item.isSpare = true;
        this.$parent.players.push(item);
      }
    },
    removeSpare(item) {
      for (var i = 0; i < this.$parent.players.length; i++) {
        if (this.$parent.players[i].id === item.id) {
          item.isSpare = false;
          this.$parent.players.splice(i, 1);
          i--;
        }
      }
    },
  },
};
</script>


<style scoped>
.list-group {
  height: 350px;
  overflow-y: auto;
}
button:hover > .bi-caret-right:before {
  content: "\f21f";
}
</style>
