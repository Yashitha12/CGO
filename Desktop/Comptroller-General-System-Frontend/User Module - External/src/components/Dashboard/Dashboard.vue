<template>
  <div class="row" v-if="userProfileStatus == 3">
      <div v-if="userAssets.includes('ASSET_STRUCTURES')">
        <router-view name="helper"></router-view>
        <router-view name="helper2"></router-view>
      </div>
  </div>
</template>

<style scoped>
#dashboard {
  margin: 30px;
}

.freelayoutstyle {
  margin: 50px;
}

.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: auto;
}

.text-container3 {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  background: #eeeeee;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  line-height: 19px;
  font-size: 14px;
}

.card {
  text-align: left;
}

.card {
  margin: 10px;
  padding: 10px;
  width: 100%;
  grid-template-rows: 20px 50px 1fr 50px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  background-color: rgba(40, 58, 90, 0.9);
}

.card_heading {
  color: black;
  text-align: left;
}


.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  line-height: 19px;
  font-size: 14px;
  cursor: pointer;
}

h4 {
  font-size: 17px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

h1 {
  font-size: 28px;
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;

}
</style>

<script>
import "jquery/dist/jquery.min.js";
import { RouterView } from "vue-router";

export default {
  data() {
    return {
      items: [],
      entity: sessionStorage.getItem("entityId"),
      itemsApproved: 0,
      itemsDashboard: [],
      showModal: false,
      userRoles: [],
      userAssets: [],
      userProfileStatus: 0,
      entityIdLog: " Checking...",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.userRoles = user.roles;
    this.userAssets = user.assets;
    let profile = sessionStorage.getItem('profile');
    this.userProfileStatus = profile;
  },
  methods: {},
  components: { RouterView }
};


</script>