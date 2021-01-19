<template>
  <div class="jumbotron jumbotron-fluid py-3 px-1">
    <h4 class="mb-1">Evènements du Match</h4>
    <div v-for="item in metadatas" :key="item.id + item.name + item.valueTime">
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

    <form @submit.prevent="submit">
      <div class="form-row mt-4">
        <div class="form-group col-md-6">
          <label for="inputPlayer">Joueurs</label>
          <select
            id="inputPlayer"
            class="form-control form-control-sm"
            name="player"
            v-model="formMetadata.playerSelected"
          >
            <option disabled value="">Joueurs</option>
            <option
              v-for="player in players"
              :value="player.person_id"
              :key="player.id"
            >
              {{ player.name }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputEvent">Evènement</label>
          <select
            id="inputEvent"
            class="form-control form-control-sm"
            name="eventKey"
            v-model="formMetadata.eventSelected"
          >
            <option disabled value="">Event</option>
            <option v-for="key in enumKey" :value="key" :key="key">
              {{ key }}
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
  },
  data() {
    return {
      metadatas: [],
      players: [],
      enumKey: ["BUT", "YELLOW_CARD", "RED_CARD", "INPUT", "OUTPUT"],
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
        });
      await this.$api
        .find({
          resource: `matchsheet/${this.matchsheetId}/player`,
        })
        .then((response) => {
          this.players = response.data;
        });
    },
    deleteHandler(id) {
      this.$api
        .destroy({
          resource: `matchsheet/metadata/delete`,
          id: id,
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
</style>