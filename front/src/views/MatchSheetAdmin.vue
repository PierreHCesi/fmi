<template>
  <div v-if="user.role == 'ADMIN'">
    <div class="row mr-0">
      <div class="col-sm-2 nav-admin">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <p class="nav-admin-title">Feuille de Match</p>
          <a
            class="nav-link active"
            id="v-pills-home-tab"
            data-toggle="pill"
            href="#v-pills-home"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
            >Ajouter</a
          >
          <a
            class="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            href="#v-pills-profile"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
            >Editer</a
          >
          <p class="nav-admin-title">Utilisateurs</p>
          <a
            class="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#v-pills-messages"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
            >Ajouter</a
          >
          <a
            class="nav-link"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="#v-pills-settings"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
            >Edition</a
          >
        </div>
      </div>
      <div class="col-sm-10 container">
        <div class="tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <AddMatchSheet />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <EditMatchSheet />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
            <h2 class="title-form">Utilisateur</h2>
            <div class="jumbotron">
              <p>Ajouter un utilisateur</p>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            <h2 class="title-form">Utilisateur</h2>
            <div class="jumbotron">
              <p>Editer un utilisateur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddMatchSheet from "../components/Admin/AddMatchSheet";
import EditMatchSheet from "../components/Admin/EditMatchSheet";

export default {
  name: "MatchSheetAdmin",
  components: {
    AddMatchSheet,
    EditMatchSheet,
  },
  data() {
    return {
      user: null,
      token: null,
    };
  },
  created() {
    this.user = this.$parent.user;
  },
};
</script>

<style>
.nav-admin-title {
  color: #ffffff;
  padding: 5px;
  border-bottom: 1px solid #5f5f5f;
  font-size: larger;
  background: #191818;
  margin: 0;
}
.nav-admin {
  background-color: #343a40;
  height: 100vh;
  padding-right: 0 !important;
  border-top: 2px solid #5f5f5f;
}
.nav-admin .nav-link {
  border-radius: 0 !important;
  color: #ffffff;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #4a4b4c !important;
}
.title-form {
  text-align: left;
  margin-top: 25px;
  margin-bottom: 0;
  background: #d8d8d8;
  padding: 9px;
}
</style>