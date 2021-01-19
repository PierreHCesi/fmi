<template>
  <div id="testHtml">
    <h4>Lieu et date de la rencontre</h4>
    <p>{{ data.location }} le {{ data.date | moment("dddd Do MMMM YYYY") }}</p>
    <ArbiterDetailOfMatchSheet ref="detailsArbiters" :matchsheetId="data.id" />
    <hr />
    <div class="row">
      <div class="col-sm-6 split">
        <h4>
          <img :src="data.homeLogo" class="logo mr-2" alt="logo club home" />{{
            data.homeName
          }}
        </h4>
        <p>
          (Domicile) - <span>{{ butHome }}</span>
        </p>
        <hr />
        <p>
          <span class="font-weight-bold">Entraineur:</span>
          {{ homeStaff_coach | capitalize }}
          <span class="font-weight-bold ml-5">Adjoint:</span>
          {{ homeStaff_second | capitalize }}
        </p>
        <hr />
        <PlayerDetailHome
          id="detailsPlayerHome"
          ref="detailsPlayerHome"
          :matchsheetId="data.id"
        />
      </div>
      <div class="col-sm-6">
        <h4>
          {{ data.visitorName
          }}<img
            :src="data.visitorLogo"
            class="logo ml-2"
            alt="logo club visitor"
          />
        </h4>
        <p>
          <span>{{ butVisitor }}</span> - (Extérieur)
        </p>
        <hr />
        <p>
          <span class="font-weight-bold">Entraineur:</span>
          {{ visitorStaff_coach | capitalize }}
          <span class="font-weight-bold ml-5"> Adjoint: </span>
          {{ visitorStaff_second | capitalize }}
        </p>
        <hr />
        <PlayerDetailVisitor
          ref="detailsPlayerVisitor"
          :matchsheetId="data.id"
        />
      </div>
    </div>
    <hr />

    <Metadata ref="detailsMetadata" :matchsheetId="data.id" />
    <hr />
    <PdfExport :references="$refs" />
    <button
      type="button"
      @click="updateStatus"
      class="btn btn-dark mr-3"
      v-if="this.data.status != 'CLOSE'"
    >
      Fermer la feuille de match
    </button>
    <button type="button" @click="deleteMatchSheet" class="btn btn-danger">
      Supprimer la feuille de match
    </button>
  </div>
</template>

<script>
import ArbiterDetailOfMatchSheet from "./ArbiterDetailOfMatchSheet";
import PlayerDetailHome from "./PlayerDetailHome";
import PlayerDetailVisitor from "./PlayerDetailVisitor";
import Metadata from "./Metadata";
import PdfExport from "./PdfExport";

export default {
  name: "DetailMatchSheet",
  components: {
    ArbiterDetailOfMatchSheet,
    PlayerDetailHome,
    PlayerDetailVisitor,
    Metadata,
    PdfExport,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      homeStaff_coach: null,
      homeStaff_second: null,
      visitorStaff_coach: null,
      visitorStaff_second: null,
      arbiters: [],
      butHome: 0,
      butVisitor: 0,
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    getButHome() {
      let but = 0;
      let playerHome = this.$refs.detailsMetadata.metadatas.filter(
        (player) => player.home_club_id == player.club_id
      );
      playerHome.map((p) => {
        if (p.key_metadata_field == "BUT") {
          but++;
        }
      });
      return but;
    },
    getButVisitor() {
      let but = 0;
      let visitorHome = this.$refs.detailsMetadata.metadatas.filter(
        (player) => player.visitor_club_id == player.club_id
      );
      visitorHome.map((p) => {
        if (p.key_metadata_field == "BUT") {
          but++;
        }
      });
      return but;
    },
  },
  methods: {
    async loadData() {
      await this.$api
        .find({
          resource: `clubs/${this.data.home_club_id}/staffs`,
        })
        .then((e) => {
          this.homeStaff_coach = this.getCoach(e.data[0].people);
          this.homeStaff_second = this.getSecond(e.data[0].people);
        });
      await this.$api
        .find({
          resource: `clubs/${this.data.visitor_club_id}/staffs`,
        })
        .then((e) => {
          this.visitorStaff_coach = this.getCoach(e.data[0].people);
          this.visitorStaff_second = this.getSecond(e.data[0].people);
        });
      await this.$api
        .find({
          resource: `matchsheet/${this.data.id}/arbiter`,
        })
        .then((response) => {
          this.arbiters = response.data;
        });
      this.butHome = this.getButHome;
      this.butVisitor = this.getButVisitor;
    },
    getCoach(array) {
      let coach = null;
      for (let c in array) {
        if (array[c].role == "coach") {
          coach = array[c].name;
        }
      }
      return coach;
    },
    getSecond(array) {
      let coach = null;
      for (let c in array) {
        if (array[c].role == "second_coach") {
          coach = array[c].name;
        }
      }
      return coach;
    },
    updateStatus() {
      let data = {};
      data.date = this.data.date;
      data.home_club_id = this.data.home_club_id;
      data.visitor_club_id = this.data.visitor_club_id;
      data.status = "CLOSE";
      data.candidate_home = this.data.candidate_home;
      data.candidate_visitor = this.data.candidate_visitor;
      this.$api
        .update({
          resource: "matchsheet/edit",
          id: this.data.id,
          data: data,
          token: this.$session.getItem("token"),
        })
        .then((e) => {
          console.log(e);
          this.data.status = "CLOSE";
        });
    },
    deleteMatchSheet() {
      this.$api
        .destroy({
          resource: `matchsheet/delete`,
          id: this.data.id,
          token: this.$session.getItem("token"),
        })
        .then((response) => {
          if (response.status == 200) {
            this.$bvModal.hide("bv-modal-detail");
            this.$parent.$parent.$parent.loadData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      var splitStr = value.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(" ");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.split {
  border-right: 3px solid #888888 !important;
}
.logo {
  width: 35px;
  height: 35px;
}
</style>