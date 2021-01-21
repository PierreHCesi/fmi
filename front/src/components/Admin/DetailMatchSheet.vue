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

    <div v-if="status == 'CLOSE'">
      <Metadata ref="detailsMetadata" :matchsheetId="data.id" :isClose="true" />
      <div v-if="this.data.status == 'CLOSE'">
        <PdfExport :references="$refs" />
      </div>
      <button
        type="button"
        @click="deleteMatchSheet"
        class="btn btn-danger my-3 w-25"
      >
        Supprimer la feuille de match
      </button>
    </div>

    <div
      v-if="
        status == 'BEFORE' || (status == 'IN_PROGRESS' && status != 'CLOSE')
      "
    >
      <button
        v-if="status == 'BEFORE' && isRun == false && isCandidate == true"
        type="button"
        @click="runMatch"
        class="btn btn-success my-3 mr-3"
      >
        Lancer le match
      </button>

      <div v-if="status == 'IN_PROGRESS' || isRun">
        <Metadata
          ref="detailsMetadata"
          :matchsheetId="data.id"
          :isClose="false"
        />
        <hr />
        <div class="d-flex justify-content-center">
          <button
            type="button"
            @click="updateStatus"
            class="btn btn-dark my-3 w-25"
            v-if="this.data.status != 'CLOSE'"
          >
            Fermer la feuille de match
          </button>
        </div>
      </div>

      <button
        type="button"
        @click="deleteMatchSheet"
        class="btn btn-danger my-3 w-25"
      >
        Supprimer la feuille de match
      </button>
    </div>
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
      metadatas: null,
      butHome: 0,
      butVisitor: 0,
      status: null,
      isCandidate: false,
      isRun: false,
    };
  },
  created() {
    this.loadData();
    this.checkMatchsheetIsCandidate();
  },
  methods: {
    checkMatchsheetIsCandidate() {
      this.$api
        .find({
          resource: `matchsheet/${this.data.id}/`,
        })
        .then((matchsheet) => {
          if (matchsheet.data) {
            this.status = matchsheet.data.status;
            if (
              matchsheet.data.candidate_home == 1 &&
              matchsheet.data.candidate_visitor == 1 &&
              matchsheet.data.status == "BEFORE"
            ) {
              this.isCandidate = true;
            }
          }
        });
    },
    runMatch() {
      this.isRun = true;
      //change state match in-progress
      this.$api
        .update({
          resource: "matchsheet/edit/status",
          id: this.data.id,
          data: { status: "IN_PROGRESS" },
          token: this.$session.getItem("token"),
        })
        .then(() => {
          this.data.status = "IN_PROGRESS";
        });
    },
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
        .then(() => {
          this.data.status = "CLOSE";
          this.status = "CLOSE";
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
            setTimeout(window.location.reload(), 1000);
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