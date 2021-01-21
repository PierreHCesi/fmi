<template>
  <button type="button" class="btn btn-info" @click="generate">
    Export PDF
  </button>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export default {
  name: "PdfExport",
  props: {
    references: Object,
  },
  data() {
    return {
      doc: new jsPDF(),
    };
  },
  methods: {
    flattenObject(obj, parent, res = {}) {
      for (let key in obj) {
        let propName = parent ? parent + "_" + key : key;
        if (typeof obj[key] == "object") {
          this.flattenObject(obj[key], propName, res);
        } else {
          res[propName] = obj[key];
        }
      }
      return res;
    },
    flatMapArbiters() {
      let arbiters = this.references.detailsArbiters.arbiters;
      let newAr = [];
      arbiters.map((arbiter) => {
        let objt = this.flattenObject(arbiter.person);
        objt.type = arbiter.type;
        newAr.push(objt);
      });
      return newAr;
    },
    computeSpare(arrayPlayers) {
      let newAr = [];
      arrayPlayers.map((player) => {
        let objt = {};
        objt.number = player.number;
        objt.name = player.name;
        if (player.placement == null) {
          objt.placement = "Remplaçant";
          objt.position = "Remplaçant";
        } else {
          objt.placement = player.placement;
          objt.position = player.position;
          if (player.is_captain) {
            objt.name = "(Capt.) " + player.name;
          } else if (player.is_second_captain) {
            objt.name = "(Capt. suppléant) " + player.name;
          }
        }
        newAr.push(objt);
      });
      return newAr;
    },
    columns() {
      return [
        { header: "Num.", dataKey: "number" },
        { header: "Nom", dataKey: "name" },
        { header: "Placement", dataKey: "placement" },
        { header: "Position", dataKey: "position" },
      ];
    },

    generate() {
      let customData = this.references.detailsPlayerHome.$parent.data;
      let arbiters = this.flatMapArbiters();

      //Titre
      this.doc.setFontSize(16);
      this.doc.text(
        "Feuille de Match - " +
          moment(customData.date).format("dddd Do MMMM YYYY"),
        14,
        5
      );
      this.doc.setFontSize(12);
      this.doc.text(
        customData.homeName +
          " (domicile) " +
          this.references.detailsPlayerHome.$parent.butHome +
          " - " +
          this.references.detailsPlayerHome.$parent.butVisitor +
          " " +
          customData.visitorName +
          " (visiteur) ",
        14,
        9
      );

      //Arbiter Data
      this.doc.setFontSize(8);
      this.doc.text("Arbitres:", 14, 18);
      this.doc.setFontSize(6);
      this.doc.autoTable({
        columnStyles: { europe: { halign: "center" } }, // European countries centered
        body: arbiters,
        columns: [
          { header: "Nom", dataKey: "name" },
          { header: "Nationalité", dataKey: "country_nationality" },
          { header: "Type", dataKey: "type" },
        ],
        styles: {
          fontSize: 6,
          lineHeight: 0.5,
        },
        startY: 20,
      });

      //Equipe home
      this.doc.text(
        customData.homeName + ": ",
        14,
        this.doc.lastAutoTable.finalY + 5
      );
      this.doc.text(
        "Entraineur: " +
          this.references.detailsPlayerHome.$parent.homeStaff_coach +
          " - Adjoint: " +
          this.references.detailsPlayerHome.$parent.homeStaff_second,
        40,
        this.doc.lastAutoTable.finalY + 5
      );
      this.doc.autoTable({
        body: this.computeSpare(this.references.detailsPlayerHome.players),
        columns: this.columns(),
        startY: this.doc.lastAutoTable.finalY + 6,
        styles: {
          maxCellHeight: 1,
          fontSize: 6,
        },
      });

      //Equipe visitor
      this.doc.text(
        customData.visitorName,
        14,
        this.doc.lastAutoTable.finalY + 5
      );
      this.doc.text(
        "Entraineur: " +
          this.references.detailsPlayerVisitor.$parent.visitorStaff_coach +
          " - Adjoint: " +
          this.references.detailsPlayerVisitor.$parent.visitorStaff_second,
        40,
        this.doc.lastAutoTable.finalY + 5
      );
      this.doc.autoTable({
        body: this.computeSpare(this.references.detailsPlayerVisitor.players),
        columns: this.columns(),
        startY: this.doc.lastAutoTable.finalY + 6,
        styles: {
          maxCellHeight: 1,
          fontSize: 4,
        },
      });

      //Metadata
      this.doc.text(
        "Evènements du match",
        14,
        this.doc.lastAutoTable.finalY + 5
      );
      this.doc.autoTable({
        body: this.references.detailsMetadata.metadatas,
        columns: [
          { header: "Nom du joueur", dataKey: "name" },
          { header: "Type", dataKey: "key_metadata_field" },
          { header: "Temps", dataKey: "valueTime" },
        ],
        startY: this.doc.lastAutoTable.finalY + 6,
        styles: {
          fontSize: 6,
        },
      });

      this.doc.save("table.pdf");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>