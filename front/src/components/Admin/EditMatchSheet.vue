<template>
  <div>
    <h2 class="title-form">Les feuilles de match</h2>
    <vue-good-table
      :columns="columns"
      :rows="matchsheet"
      theme="black-rhino"
      :search-options="{
        enabled: true,
        placeholder: 'Rechercher ...',
      }"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'date', type: 'desc' },
      }"
      @on-row-click="onRowClick"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'homeName'">
          <div class="d-flex align-items-center">
            <img :src="props.row.homeLogo" class="mr-3 logo" alt="..." />
            <span style="font-weight: bold; color: #37a55e">{{
              props.row.homeName
            }}</span>
          </div>
        </span>
        <span v-else-if="props.column.field == 'visitorName'">
          <div class="d-flex align-items-center justify-content-end">
            <span style="font-weight: bold; color: tomato">{{
              props.row.visitorName
            }}</span>
            <img :src="props.row.visitorLogo" class="ml-3 logo" alt="..." />
          </div>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <b-modal id="bv-modal-detail" size="xl" hide-footer>
      <template #modal-title>Feuille de Match</template>
      <div class="d-block text-center">
        <DetailMatchSheet :data="data" />
      </div>
      <button
        class="btn btn-secondary mt-3"
        block
        @click="$bvModal.hide('bv-modal-detail')"
      >
        Fermer
      </button>
    </b-modal>
  </div>
</template>

<script>
import DetailMatchSheet from "./DetailMatchSheet";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "EditMatchSheet",
  components: {
    VueGoodTable,
    DetailMatchSheet,
  },
  data() {
    return {
      matchsheet: [],
      data: null,
      columns: [
        {
          label: "ID",
          field: "id",
          type: "number",
        },
        {
          label: "Domicile",
          field: "homeName",
        },
        {
          label: "Extérieur",
          field: "visitorName",
        },
        {
          label: "Lieu",
          field: "location",
        },
        {
          label: "Statut",
          field: "status",
        },
        {
          label: "Date",
          field: "date",
          type: "date",
          dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
          dateOutputFormat: "dd / MM / yyyy",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    onRowClick(params) {
      this.data = params.row;
      this.$bvModal.show("bv-modal-detail");
    },
    async loadData() {
      const getMatchSheet = await this.$api.find({
        resource: "matchsheet/clubs",
      });
      this.matchsheet = getMatchSheet.data;
    },
  },
};
</script>


<style scoped>
.title-form {
  text-align: left;
  margin-top: 25px;
  margin-bottom: 0;
  background: #d8d8d8;
  padding: 9px;
}
.logo {
  width: 40px;
  height: 35px;
}
@media (min-width: 576px) {
  .modal-dialog .modal-md {
    max-width: 85vw !important;
  }
}
</style>