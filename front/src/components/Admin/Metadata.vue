<template>
  <div class="jumbotron jumbotron-fluid py-3 px-1">
    <h4 class="mb-1">Evènements du Match</h4>
    <div v-if="isClose">
      <div
        v-for="item in metadatas"
        :key="item.id + item.name + item.valueTime"
      >
        <div
          v-if="item.home_club_id == item.club_id"
          class="list-group-event text-left"
        >
          <span
            v-html="render(item.key_metadata_field)"
            class="icon-metadata"
          />
          {{ item.name }} {{ item.valueTime }}' min.
        </div>
        <div
          v-else
          class="list-group-item text-right metadata-visitor metaClose"
        >
          <span
            v-html="render(item.key_metadata_field)"
            class="icon-metadata"
          />
          {{ item.name }} {{ item.valueTime }}' min.
        </div>
      </div>
    </div>
    <div
      v-else
      v-for="item in metadatas"
      :key="item.id + item.name + item.valueTime"
    >
      <div
        v-if="item.home_club_id == item.club_id"
        class="list-group-event text-left"
      >
        <button
          class="btn btn-danger btn-sm mr-1"
          @click="deleteHandler(item.id)"
          type="button"
        >
          x
        </button>
        <span v-html="render(item.key_metadata_field)" class="icon-metadata" />
        {{ item.name }} {{ item.valueTime }}' min.
      </div>
      <div v-else class="list-group-item text-right metadata-visitor">
        <span v-html="render(item.key_metadata_field)" class="icon-metadata" />
        {{ item.name }} {{ item.valueTime }}' min.
        <button
          class="btn btn-danger btn-sm btn-delete-visitor"
          @click="deleteHandler(item.id)"
          type="button"
        >
          x
        </button>
      </div>
    </div>

    <form v-if="!isClose" @submit.prevent="submit">
      <div class="form-row mt-4">
        <div class="form-group col-md-6">
          <label for="inputPlayer">Joueurs</label>
          <select
            id="inputPlayer"
            class="form-control form-control-sm"
            name="player"
            v-model="formMetadata.playerSelected"
          >
            <optgroup
              v-for="(club, name) in groupPlayers"
              :label="name"
              :key="name"
            >
              <option
                v-for="player in club"
                :value="player.person_id"
                :key="player.person_id"
              >
                {{ player.number }} - {{ player.name }}
              </option>
            </optgroup>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputEvent">Evènements</label>
          <select
            id="inputEvent"
            class="form-control form-control-sm"
            name="eventKey"
            v-model="formMetadata.eventSelected"
          >
            <option disabled value="">Evènements</option>
            <option v-for="key in enumKey" :value="key" :key="key">
              <slot v-if="key == 'BUT'">But</slot>
              <slot v-if="key == 'YELLOW_CARD'">Carton Jaune</slot>
              <slot v-if="key == 'RED_CARD'">Carton Rouge</slot>
              <slot v-if="key == 'INPUT'">Entrée</slot>
              <slot v-if="key == 'OUTPUT'">Sortie</slot>
              <slot v-if="key == 'CSC'">But contre son camp</slot>
            </option>
          </select>
        </div>
        <div class="form-group col-md-2 sm">
          <label for="time">Temps</label>
          <input
            type="number"
            class="form-control form-control-sm"
            id="time"
            v-model.number="formMetadata.timeSelected"
          />
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Ajouter l'évènement</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Metadata",
  components: {},
  props: {
    matchsheetId: Number,
    isClose: Boolean,
  },
  data() {
    return {
      metadatas: [],
      players: [],
      groupPlayers: {
        domicile: [],
        visiteur: [],
      },
      enumKey: ["BUT", "YELLOW_CARD", "RED_CARD", "INPUT", "OUTPUT", "CSC"],
      formMetadata: {
        playerSelected: null,
        eventSelected: null,
        timeSelected: null,
      },
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    svgGoal() {
      return require("@/assets/svgGoal.svg");
    },
  },
  methods: {
    async loadData() {
      await this.$api
        .find({
          resource: `matchsheet/${this.matchsheetId}/metadata`,
        })
        .then((response) => {
          this.metadatas = response.data;
          this.computeScore(response.data);
        });
      await this.$api
        .find({
          resource: `matchsheet/${this.matchsheetId}/player`,
        })
        .then((response) => {
          this.players = response.data;
          if (this.groupPlayers.domicile.length == 0) {
            this.players.map((player) => {
              if (player.club_id == player.home_club_id) {
                this.groupPlayers.domicile.push(player);
              } else {
                this.groupPlayers.visiteur.push(player);
              }
            });
          }
        });
    },
    computeScore(metadatas) {
      if (metadatas != null) {
        this.$parent.butHome = 0;
        this.$parent.butVisitor = 0;
        let playerHome = metadatas.filter(
          (player) => player.home_club_id == player.club_id
        );
        playerHome.map((p) => {
          if (p.key_metadata_field == "BUT") {
            this.$parent.butHome += 1;
          } else if (p.key_metadata_field == "CSC") {
            this.$parent.butVisitor += 1;
          }
        });

        let visitorHome = metadatas.filter(
          (player) => player.visitor_club_id == player.club_id
        );
        visitorHome.map((p) => {
          if (p.key_metadata_field == "BUT") {
            this.$parent.butVisitor += 1;
          } else if (p.key_metadata_field == "CSC") {
            this.$parent.butHome += 1;
          }
        });
      }
    },
    deleteHandler(id) {
      this.$api
        .destroy({
          resource: `matchsheet/metadata/delete`,
          id: id,
          token: this.$session.getItem("token"),
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.loadData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    render(enumKey) {
      let html = "";
      if (enumKey == "BUT") {
        html = `<img src="${this.svgGoal}" style="width:17px;"/>`;
      } else if (enumKey == "YELLOW_CARD") {
        html = `<i class="bi bi-file-fill text-warning"></i>`;
      } else if (enumKey == "RED_CARD") {
        html = `<i class="bi bi-file-fill text-danger"></i>`;
      } else if (enumKey == "INPUT") {
        html = `<i class="bi bi-box-arrow-in-up"></i>`;
      } else if (enumKey == "OUTPUT") {
        html = `<i class="bi bi-box-arrow-down"></i>`;
      } else if (enumKey == "CSC") {
        html = `<img src="${this.svgGoal}" style="width:17px;"/> <span>(contre son camp)</span>`;
      }
      return html;
    },
    submit() {
      this.$api
        .create({
          resource: `matchsheet/metadata/create`,
          data: {
            person_id: this.formMetadata.playerSelected,
            match_sheet_id: this.matchsheetId,
            key_metadata_field: this.formMetadata.eventSelected,
            valueTime: this.formMetadata.timeSelected,
          },
          token: this.$session.getItem("token"),
        })
        .then((response) => {
          if (response.status == 200) {
            this.loadData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-event {
  padding: 0.25rem 0.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.metadata-visitor {
  padding-right: 35px;
}
.btn-delete-visitor {
  position: absolute;
  right: 5px;
}
.icon-metadata {
  vertical-align: top;
}
.metaClose {
  padding: 0.4rem;
}
</style>