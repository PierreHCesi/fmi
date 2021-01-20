<template>
  <div>
    <h2 class="title-form">Ajouter une feuille de match</h2>
    <form id="match-sheet" class="jumbotron" @submit.prevent="submit">
      <p>Sélection des équipes</p>
      <div class="form-group row">
        <label for="inputHome" class="col-sm-2 col-form-label">Domicile</label>
        <div class="col-sm-10">
          <select
            id="inputHome"
            class="form-control"
            v-model="data.home_club_id"
            required
          >
            <option v-for="item in clubs" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputVisit" class="col-sm-2 col-form-label"
          >Extérieur</label
        >
        <div class="col-sm-10">
          <select
            id="inputVisit"
            class="form-control"
            v-model="data.visitor_club_id"
            required
          >
            <option v-for="item in clubs" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <hr />
      <p>Sélection des arbitres</p>
      <div class="form-group row">
        <label for="inputArbi1" class="col-sm-2 col-form-label"
          >Principal</label
        >
        <div class="col-sm-10">
          <select
            id="inputArbi1"
            class="form-control"
            v-model="data.arbiterOne"
            required
          >
            <option v-for="item in arbiters" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputArbi2" class="col-sm-2 col-form-label"
          >Assitant n° 1</label
        >
        <div class="col-sm-10">
          <select
            id="inputArbi2"
            class="form-control"
            v-model="data.arbiterTwo"
            required
          >
            <option v-for="item in arbiters" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputArbi3" class="col-sm-2 col-form-label"
          >Assitant n° 2</label
        >
        <div class="col-sm-10">
          <select
            id="inputArbi3"
            class="form-control"
            v-model="data.arbiterThree"
            required
          >
            <option v-for="item in arbiters" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <hr />
      <div class="form-group row">
        <label for="inputDate" class="col-sm-2 col-form-label"
          >Choisir une date</label
        >
        <div class="col-sm-10">
          <datepicker
            id="inputDate"
            v-model="data.date"
            :language="fr"
            format="d MMMM yyyy"
          >
          </datepicker>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mb-2">Enregistrer</button>
      <span class="form-control is-valid" v-if="id != null"
        >Ajout de la feuille de Match {{ id }}</span
      >
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { fr } from "vuejs-datepicker/dist/locale";
export default {
  name: "AddMatchSheet",
  components: {
    Datepicker,
  },
  data() {
    return {
      id: null,
      clubs: [],
      arbiters: [],
      data: {
        visitor_club_id: null,
        home_club_id: null,
        arbiterOne: null,
        arbiterTwo: null,
        arbiterThree: null,
        date: new Date(),
      },
      fr: fr,
    };
  },
  async created() {
    const clubs = await this.$api.find({
      resource: "clubs",
    });
    const arbiter = await this.$api.find({
      resource: "persons/arbiter",
    });
    this.clubs = clubs.data;
    this.arbiters = arbiter.data;
  },
  methods: {
    createrArbiter(arbiter_id, arbiter_match_id, arbiter_type) {
      let data = {};
      data.person_id = arbiter_id;
      data.match_sheet_id = arbiter_match_id;
      data.type = arbiter_type;
      return data;
    },
    submit() {
      this.id = null;
      let arbiterOneID = this.data.arbiterOne;
      let arbiterTwoID = this.data.arbiterTwo;
      let arbiterThreeID = this.data.arbiterThree;
      let callbackCreateArbiter = this.createrArbiter;
      let api = this.$api
        .create({
          resource: "matchsheet/create",
          data: this.data,
          token: this.$session.getItem("token"),
        })
        .then((result) => {
          this.id = result.data.id;
          this.$api.create({
            resource: "matchsheet/arbiter/create",
            data: callbackCreateArbiter(
              arbiterOneID,
              result.data.id,
              "PRINCIPAL"
            ),
            token: this.$session.getItem("token"),
          });
          this.$api.create({
            resource: "matchsheet/arbiter/create",
            data: callbackCreateArbiter(
              arbiterTwoID,
              result.data.id,
              "ASSISTANT"
            ),
            token: this.$session.getItem("token"),
          });
          this.$api.create({
            resource: "matchsheet/arbiter/create",
            data: callbackCreateArbiter(
              arbiterThreeID,
              result.data.id,
              "ASSISTANT"
            ),
            token: this.$session.getItem("token"),
          });
        });
      api.then(() => setTimeout(window.location.reload(), 2000));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-form {
  text-align: left;
  margin-top: 25px;
  margin-bottom: 0;
  background: #d8d8d8;
  padding: 9px;
}
</style>