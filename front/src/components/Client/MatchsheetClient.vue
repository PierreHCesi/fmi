<template>
  <div class="matchsheet">
    <form id="match-sheet" @submit.prevent="submit">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h2 class="display-4">Etape 1</h2>
          <hr />
          <p class="lead">
            Veuillez indiquer les joueurs titulaires pour le match en
            renseignant pour chacun le poste et le placement sur le terrain.
          </p>
          <p>
            Joueurs restant à sélectionner:
            {{ 11 - this.holderPlayers.length }}
          </p>
          <hr />
          <div
            id="terrain"
            class="container-fluid position-relative d-flex flex-column terrain"
            :style="{
              'background-image':
                'url(' + require('@/assets/terrain.png') + ') ',
            }"
          >
            <div id="first" ref="container" class="row">
              <CardForm
                v-for="index in counterOfFirstRow"
                :key="index"
                :placement="placement"
                :position="positionFirstRow"
                :unSelectedItems="unSelectedItems"
              />
              <button
                type="button"
                class="btn btn-info addFormCard"
                @click="addFirstRowCard"
              >
                Ajouter
              </button>
            </div>

            <div id="second" class="row">
              <CardForm
                v-for="index in counterOfMiddleRow"
                :key="index"
                :placement="placement"
                :position="positionMiddleRow"
                :unSelectedItems="unSelectedItems"
              />
              <button
                type="button"
                class="btn btn-info addFormCard"
                @click="addMiddleRowCard"
              >
                +
              </button>
            </div>

            <div id="third" class="row">
              <CardForm
                v-for="index in counterOfBackRow"
                :key="index"
                :placement="placement"
                :position="positionBackRow"
                :unSelectedItems="unSelectedItems"
              />
              <button
                type="button"
                class="btn btn-info addFormCard"
                @click="addBackRowCard"
              >
                +
              </button>
            </div>
            <div id="goal" class="row">
              <CardForm
                :immutable="true"
                :placement="null"
                :position="positionGoal"
                :unSelectedItems="unSelectedItems"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="jumbotron jumbotron-fluid bg-white">
        <div class="container">
          <h2 class="display-4">Etape 2</h2>
          <hr />
          <p class="lead">
            En fonction de la liste de votre équipe (officielle ligue 1),
            veuillez renseigner vos remplaçants. Le nombre de vos joueurs sur le
            banc doit être compris entre trois et six maximum.
          </p>

          <hr />
          <SpareForm
            :numberOfPlayers="18"
            :unSelectedItems="unSelectedItems"
            :sparePlayers="sparePlayers"
          />
        </div>
      </div>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h2 class="display-4">Etape 3</h2>
          <hr />
          <p class="lead">
            Il s'agit dans cette dernière étape de nommer le capitaine du match
            ainsi que son suppléant. Finaliser la feuille de match en cliquant
            sur valider.
          </p>
          <hr />
          <div class="form-group row">
            <label
              for="colFormLabelCapt"
              class="col-sm-4 col-form-label col-form-label-sm"
              >Sélectionner le capitaine:
            </label>
            <div class="col-sm-8">
              <select
                class="form-control form-control-sm"
                id="colFormLabelCapt"
                @change="onChangeCaptain($event)"
              >
                <option selectedCaptain :value="null">
                  {{ selectedCaptain }}
                </option>
                <option
                  v-for="item in this.holderPlayersAndNotSecond"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label
              for="colFormLabelSecond"
              class="col-sm-4 col-form-label col-form-label-sm"
              >Sélectionner le capitaine suppléant:
            </label>
            <div class="col-sm-8">
              <select
                class="form-control form-control-sm"
                id="colFormLabelSecond"
                @change="onChangeCaptainSecond($event)"
              >
                <option selectedCaptainSecond :value="null">
                  {{ selectedCaptainSecond }}
                </option>
                <option
                  v-for="item in this.holderPlayersAndNotCaptain"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="jumbotron jumbotron-fluid bg-white">
        <div class="container">
          <h2 class="display-4">Etape 4</h2>
          <hr />
          <p class="lead">Finaliser la feuille de Match</p>
          <hr />
          <button type="submit" class="btn btn-primary">Valider</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CardForm from "./CardForm";
import SpareForm from "./SpareForm";

export default {
  name: "MatchsheetClient",
  components: {
    CardForm,
    SpareForm,
  },
  props: {
    items: Array,
    matchsheetId: Number,
  },
  data() {
    return {
      players: [],
      selectedCaptain: "",
      selectedCaptainId: null,
      selectedCaptainSecond: "",
      selectedCaptainSecondId: null,
      counterOfPlayers: 11,
      counterOfFirstRow: 2,
      counterOfMiddleRow: 4,
      counterOfBackRow: 4,
      placement: ["GAUCHE", "CENTRE", "DROIT"],
      positionFirstRow: ["AVANT", "AILIER"],
      positionMiddleRow: ["MILIEU_OFF", "MILIEU", "MILIEU_DEF"],
      positionBackRow: ["ARRIERE"],
      positionGoal: ["GARDIEN"],
    };
  },
  computed: {
    unSelectedItems: function () {
      return this.items.filter(
        ({ id: id1 }) => !this.players.some(({ id: id2 }) => id2 === id1)
      );
    },
    holderPlayers: function () {
      return this.players.filter((item) => !item.isSpare);
    },
    holderPlayersAndNotCaptain: function () {
      return this.players.filter(
        (item) => !item.isSpare && !(item.id == this.selectedCaptainId)
      );
    },
    holderPlayersAndNotSecond: function () {
      return this.players.filter(
        (item) => !item.isSpare && !(item.id == this.selectedCaptainSecondId)
      );
    },
    sparePlayers: function () {
      return this.players.filter((item) => item.isSpare);
    },
  },
  methods: {
    onChangeCaptain(event) {
      this.selectedCaptainId = event.target.value;
      console.log(this.selectedCaptainId);
    },
    onChangeCaptainSecond(event) {
      this.selectedCaptainSecondId = event.target.value;
      console.log(this.selectedCaptainSecondId);
    },
    addRoleCaptainToPlayer(idCaptain, idSecondCaptain) {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id == idCaptain) {
          this.players[i].iscaptain = true;
        } else if (this.players[i].id == idSecondCaptain) {
          this.players[i].issecondcaptain = true;
        }
      }
    },
    addFirstRowCard() {
      this.counterOfFirstRow++;
      this.counterOfPlayers++;
    },
    addMiddleRowCard() {
      this.counterOfMiddleRow++;
      this.counterOfPlayers++;
    },
    addBackRowCard() {
      this.counterOfBackRow++;
      this.counterOfPlayers++;
    },
    sanitizeForEntities(arrayPlayers) {
      let sanitizeArrayEntities = [];
      arrayPlayers.map((player) => {
        let playerEntities = {};
        playerEntities.person_id = player.id;
        playerEntities.match_sheet_id = this.matchsheetId;
        playerEntities.position = player.position ? player.position : null;
        playerEntities.placement = player.placement ? player.placement : null;
        playerEntities.is_captain = player.iscaptain == true ? true : false;
        playerEntities.is_second_captain =
          player.issecondcaptain == true ? true : false;
        playerEntities.is_spare = player.isSpare ? player.isSpare : false;
        sanitizeArrayEntities.push(playerEntities);
      });
      return sanitizeArrayEntities;
    },
    submit() {
      this.addRoleCaptainToPlayer(
        this.selectedCaptainId,
        this.selectedCaptainSecondId
      );
      //persitance entities
      this.$api
        .create({
          resource: `/matchsheet/player/create`,
          data: this.sanitizeForEntities(this.players),
          token: this.$session.getItem("token"),
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        });
      //Update candidate
      this.$api
        .find({
          resource: `/matchsheet/inprogress/${this.$parent.clubId}`,
        })
        .then((response) => {
          console.log(response);
          if (response.data.length > 0) {
            console.log("ici");
            console.log(response.data[0].home_club_id, this.$parent.clubId);
            if (response.data[0].home_club_id == this.$parent.clubId) {
              this.$api
                .update({
                  resource: `/matchsheet/edit/candidate/home`,
                  id: this.matchsheetId,
                  data: { candidate_home: 1 },
                  token: this.$session.getItem("token"),
                })
                .then((d) => console.log(d));
            } else if (
              response.data[0].visitor_club_id == this.$parent.clubId
            ) {
              this.$api
                .update({
                  resource: `/matchsheet/edit/candidate/visitor`,
                  id: this.matchsheetId,
                  data: { candidate_visitor: 1 },
                  token: this.$session.getItem("token"),
                })
                .then((d) => console.log(d));
            }
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.terrain {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 800px;
}

.addFormCard {
  position: absolute;
  left: 99.9%;
  font-size: 23px;
  background-color: #2196f3;
  border-color: #477e19;
  border-radius: 0 15px 15px 0;
}

.card {
  background-color: #ffffff52;
}
.card-body {
  padding: 0.5rem;
}
.row,
#first,
#second,
#third {
  height: -webkit-fill-available;
  justify-content: space-evenly;
  align-items: center;
}
</style>
