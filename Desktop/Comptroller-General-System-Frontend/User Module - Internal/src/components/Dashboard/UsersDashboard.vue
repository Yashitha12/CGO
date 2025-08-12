<template>
  <div class="row" id="dashboard" v-if="userProfileStatus == 3">

    <div style="display: inline-block;">
      <router-link to="/dashboard/user" class="btn btn-link btn-sm"> Users Dashboard</router-link>
      <router-link to="/dashboard/vehicle" class="btn btn-link btn-sm"> Vehicles Dashboard</router-link>
      <router-link to="/dashboard/entity" class="btn btn-link btn-sm"> Institutions Dashboard</router-link>
    </div>

    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" v-if="this.currentUser">
      <div class="a-box2 align-self-center">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
              <img src="../../assets/img/user_profile.png">
            </div>
          </div>
        </div>
        <br><br>
        <div class="text-container2">
          <h5>USER DASHBOARD</h5>
          <hr />
          <div class="row">
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6">
              <h6>Internal Users - Active </h6><br>
              <b style="font-size: 35px;">{{ countInternalActive }} </b><br />
            </div>
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6">
              <h6>Internal Users - Inactive</h6><br>
              <b style="font-size: 35px;">{{ countInternalInActive }} </b><br />
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6">
              <h6>External Users - Active</h6><br>
              <b style="font-size: 35px;">{{ countExternalActive }} </b><br />
            </div>
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6">
              <h6>External Users - Inactive</h6><br>
              <b style="font-size: 35px;">{{ countExternalInActive }} </b><br />
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6">
              <h6>New Requests</h6><br>
              <b style="font-size: 35px;">{{ countNewRequests }} </b><br />
            </div>
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6">
              <h6>External Users - Resubmit</h6><br>
              <b style="font-size: 35px;">{{ countResubmits }} </b><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.5);
  display: flex;
  flex-direction: row;
  border-radius: 25px;
  position: relative;
  text-align: center;
  width: auto;
  height: 85%;

}

.card h2 {
  margin: 0;
  padding: 0 1rem;
}

.card .title {
  padding: 1rem;
  text-align: right;
  color: green;
  font-weight: bold;
  font-size: 12px;
}

.card .desc {
  padding: 0.5rem 1rem;
  font-size: 13px;
  text-align: justify;
  /* height: 140px;
  overflow-wrap: break-word; */
}

.img-avatar {
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  border: 6px solid white;
  background-image: linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);
  top: 15px;
  left: 85px;
}

.card-text {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.title-total {
  padding: 2.5em 1.5em 1.5em 1.5em;
  width: auto;
}

.portada {
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-image: url(../../assets/img/swat.png);
  background-position: bottom center;
  background-size: cover;
}

.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: 60%;
}


.a-box2 {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
}


.img-container {
  height: 230px;
  width: 200px;
  overflow: hidden;
  border-radius: 0px 0px 20px 20px;
  display: inline-block;
}

.img-container img {
  transform: skew(0deg, -13deg);
  height: 250px;
  margin: -35px 0px 0px -70px;
}

.inner-skew {
  display: inline-block;
  border-radius: 20px;
  overflow: hidden;
  padding: 0px;
  transform: skew(0deg, 13deg);
  font-size: 0px;
  margin: 30px 0px 0px 0px;
  background: white;
  height: 250px;
  width: 200px;
}

.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin: -120px 0px 0px 0px;
  line-height: 19px;
  font-size: 14px;
}

.text-container2 {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 120px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin: -120px 0px 0px 0px;
  line-height: 19px;
  font-size: 14px;
}

.text-container h3 {
  margin: 20px 0px 10px 0px;
  font-size: 28px;
}

.text-container2 h3 {
  margin: 20px 0px 10px 0px;
  font-size: 22px;
  font-weight: 600;
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

.modal-mask{
  z-index: 30;
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
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data() {
    return {
      entity: sessionStorage.getItem("entityId"),
      countInternalActive: 0,
      countInternalInactive: 0,
      countExternalActive: 0,
      countExternalInActive: 0,
      countNewRequests: 0,
      countResubmits: 0,
      userRoles: [],
      userProfileStatus: 0,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.countInternalActiveDisplay();
    this.countInternalInActiveDisplay();
    this.countExternalActiveDisplay();
    this.countExternalInActiveDisplay();
    this.countNewRequestsDisplay();
    this.countResubmitsDisplay();
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.userRoles = user.roles;

    let profile = sessionStorage.getItem('profile');
    this.userProfileStatus = profile;
  },
  methods: {
    countInternalActiveDisplay() {
      return axios
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/user/details/for/dashboard/3')
        .then(response => {
          this.countInternalActive = response.data;
          if (this.countInternalActive == "") {
            this.countInternalActive = 0;
          }
        }).catch(function (error) {
          return error;
        });
    },
    countInternalInActiveDisplay() {
        return axios
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/user/details/for/dashboard/0')
        .then(response => {
          this.countInternalInActive = response.data;
          if (this.countInternalInActive == "") {
            this.countInternalInActive = 0;
          }
        }).catch(function (error) {
          return error;
        });
    },
    countExternalActiveDisplay() {
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/for/dashboard/3')
        .then(response => {
          this.countExternalActive = response.data;
          if (this.countExternalActive == "") {
            this.countExternalActive = 0;
          }
        }).catch(function (error) {
          return error;
        });
    },
    countExternalInActiveDisplay() {
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/for/dashboard/0')
        .then(response => {
          this.countExternalInActive = response.data;
          if (this.countExternalInActive == "") {
            this.countExternalInActive = 0;
          }
        }).catch(function (error) {
          return error;
        });
    },
    countNewRequestsDisplay() {
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/for/dashboard/1')
        .then(response => {
          this.countNewRequests = response.data;
          if (this.countNewRequests == "") {
            this.countNewRequests = 0;
          }
        }).catch(function (error) {
          return error;
        });
    },
    countResubmitsDisplay() {
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/for/dashboard/2')
        .then(response => {
          this.countResubmits = response.data;
          if (this.countResubmits == "") {
            this.countResubmits = 0;
          }
        }).catch(function (error) {
          return error;
        });
    },

  },
};


</script>