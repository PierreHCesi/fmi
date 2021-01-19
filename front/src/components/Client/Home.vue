<template>
  <div class="hello">
    <h1 class="m-5 text-center">
      Feuille de match <span v-if="hasMatchsheet">n°{{ matchsheetId }}</span>
    </h1>

    <div v-if="hasMatchsheet">
      <MatchSheetClient
        :items="players"
        :matchsheetId="matchsheetId"
        :token="token"
      />
    </div>
    <div v-else class="blocEmpty">
      <p>Vous n'avez pas de feuille de match en cours</p>
    </div>
  </div>
</template>

<script>
import MatchSheetClient from "./MatchsheetClient";

export default {
  name: "HomeClient",
  components: {
    MatchSheetClient,
  },
  props: {
    clubId: Number,
    token: String,
  },
  data() {
    return {
      hasMatchsheet: false,
      players: [],
      matchsheetId: 0,
    };
  },
  created() {
    this.getMatchsheetProgressAndPlayersClub();
  },
  computed: {},
  methods: {
    getMatchsheetProgressAndPlayersClub() {
      this.$api
        .find({
          resource: `/matchsheet/inprogress/${this.clubId}`,
        })
        .then((response) => {
          if (response.data.length > 0) {
            if (response.data[0].home_club_id == this.clubId) {
              this.hasMatchsheet =
                response.data[0].candidate_home != 0 ? false : true;
            } else if (response.data[0].visitor_club_id == this.clubId) {
              this.hasMatchsheet =
                response.data[0].candidate_visitor != 0 ? false : true;
            }
            if (this.hasMatchsheet) {
              this.matchsheetId = response.data[0].id;
              this.$api
                .find({
                  resource: `/clubs/${this.clubId}/players`,
                })
                .then((response) => {
                  this.players = response.data[0].people;
                });
            }
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocEmpty {
  height: 70vh;
}
</style>
