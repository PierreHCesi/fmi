<template>
  <div class="containerCard">
    <div class="contentCard card">
      <span v-if="newPlayer.id" class="position-absolute badge">{{
        newPlayer.number
      }}</span>
      <div class="card-body">
        <div class="card-title">
          <div class="form-row">
            <div class="col">
              <select
                v-if="position.length > 1"
                class="form-control form-control-sm"
                name="position"
                @change="onChangePosition($event)"
              >
                <option value="" selected disabled>Poste</option>
                <option v-for="p in position" :value="p" :key="p">
                  {{ p }}
                </option>
              </select>

              <p v-else class="text-center font-weight-bold">
                {{ position[0] }}
              </p>
            </div>
            <div class="col">
              <select
                v-if="placement"
                class="form-control form-control-sm"
                name="placement"
                @change="onChangePlacment($event)"
              >
                <option value="" selected disabled>Placement</option>
                <option v-for="place in placement" :value="place" :key="place">
                  {{ place }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div
          v-if="!immutable"
          class="position-absolute delete"
          @click="deleteHandler"
        >
          <button class="btn btn-danger me-md-2" type="button">x</button>
        </div>

        <select
          class="form-control form-control-sm"
          name="gamer"
          @change="onChangePlayer()"
        >
          <option selected :value="null">
            {{ selected }}
          </option>
          <option
            v-for="item in unSelectedItems"
            :value="item.id"
            :key="item.id"
          >
            {{ item.poste }} -{{ item.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardForm",
  props: {
    position: Array,
    placement: Array,
    unSelectedItems: Array,
    immutable: Boolean,
  },
  data() {
    return {
      selected: "Sélectionner un joueur",
      newPlayer: {},
      positionPlayer: "",
      placementPlayer: "",
    };
  },
  created() {
    if (this.position.length == 1) {
      this.positionPlayer = this.position[0];
    }
  },
  methods: {
    deleteHandler(e) {
      if (this.newPlayer.id) {
        this.removeOldPlayer(this.newPlayer.id);
      }
      let parentOfEventElement = e.target.parentNode;
      let cardBody = parentOfEventElement.parentNode;
      let contentCard = cardBody.parentNode;
      let containerCard = contentCard.parentNode;
      let parentRoot = containerCard.parentNode;
      parentRoot.removeChild(containerCard);
      this.$parent.counterOfPlayers--;
    },
    removeOldPlayer(id) {
      for (var i = 0; i < this.$parent.players.length; i++) {
        if (this.$parent.players[i].id == id) {
          console.log("remove");
          this.$parent.players.splice(i, 1);
          i--;
        }
      }
    },
    sendPlayerOnParent() {
      this.newPlayer.placement = this.placementPlayer;
      this.newPlayer.position = this.positionPlayer;
      this.$parent.players.push(this.newPlayer);
    },
    clonePlayer() {
      for (var i = 0; i < this.$parent.unSelectedItems.length; i++) {
        if (this.$parent.unSelectedItems[i].id == event.target.value) {
          this.newPlayer = this.$parent.unSelectedItems[i];
          this.selected = this.newPlayer.name;
        }
      }
    },
    onChangePlayer() {
      if (this.newPlayer.id) {
        this.removeOldPlayer(this.newPlayer.id);
      }
      this.clonePlayer();
      this.sendPlayerOnParent();
    },
    onChangePosition(event) {
      this.positionPlayer = event.target.value;
      if (this.newPlayer.id) {
        for (var i = 0; i < this.$parent.players.length; i++) {
          if (this.$parent.players[i].id == this.newPlayer.id) {
            this.$parent.players[i].position = this.positionPlayer;
          }
        }
      }
    },
    onChangePlacment(event) {
      this.placementPlayer = event.target.value;
      if (this.newPlayer.id) {
        for (var i = 0; i < this.$parent.players.length; i++) {
          if (this.$parent.players[i].id == this.newPlayer.id) {
            this.$parent.players[i].placement = this.placementPlayer;
          }
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: #ffffff52;
}
.card-body {
  padding: 0.5rem;
}
.col,
.col-6 {
  display: flex;
  justify-content: center;
}

.containerCard {
  min-width: 258px;
  position: relative;
  z-index: 11;
  text-align: center;
  margin-bottom: 10px;
}

.contentCard {
  padding: 12px 20px 2px 2px;
  z-index: 10;
  background: linear-gradient(#64c8e6, #7d7d7d);
  color: #2c3e50;
  box-shadow: 0px 1px 20px 1px #353535;
}
.contentCard .form-control-sm {
  font-size: 0.75rem;
}
.badge {
  top: -10px;
  left: -10px;
  padding: 8px;
  color: #403f3f;
  background-color: #d8d8d8;
}
.delete {
  top: 0;
  right: 0;
}
.delete button {
  padding: 0 9px 3px 8px;
  line-height: unset;
  border-radius: 0px 0px 0px 20px;
}
</style>


