<template>
  <div class="row" id="dashboard" v-if="userProfileStatus == 3">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="featuredPropBox">
          <h1>Management Console</h1>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="a-box align-self-center">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../../assets/img/user_profile.png">
              </div>
            </div>
          </div>
          <div class="text-container">
            <div class="row">
              <router-link to="/dashboard/user" class="btn btn-success btn-lg"> Users Dashboard</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="a-box align-self-center">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../../assets/img/external_management.png">
              </div>
            </div>
          </div>
          <div class="text-container">
            <div class="row">
              <router-link to="/dashboard/entity" class="btn btn-success btn-lg"> Institution
                Dashboard</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <br />
      <hr />
      <br />
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="featuredPropBox">
          <h1>Management - Assets</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div class="a-box align-self-center">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/asset/vehicle.jpg">
                </div>
              </div>
            </div>
            <div class="text-container">
              <hr />
              <div class="row">
                <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12 alert alert-primary">
                  <h6>Vehicle Registration / Serial Number</h6><br>
                  <input type="text" class="form form-control" v-model="this.regNo" @keyup="filerVehicle()"
                    placeholder=" Search Vehicle by Registration / Serial Number" />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
                  <table style="text-align: left;" class="table" v-if="itemsDashboardAdvancedFilter != ''">
                    <thead class="thead-dark">
                      <tr>
                        <th>Reg Number </th>
                        <th>Type </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsDashboardAdvancedFilter" :key="item">
                      <td> {{ item[1] }}</td>
                      <td> {{ item[2] }}</td>
                      <td> <router-link :to="{ name: 'ViewVehicleData', params: { id: item[0] } }"> <a
                            class="btn btn-success btn-sm">View</a>
                        </router-link>
                      </td>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsDashboardAdvancedFilter == []">No Data Found.
                  </div>
                </div>
              </div>


              <div class="row">
                <router-link to="/dashboard/vehicle" class="btn btn-success btn-lg"> Vehicles
                  Dashboard</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #021d75c4;
  Font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  font-weight: 400;
  margin-bottom: 45px;
  text-align: center;
  letter-spacing: 0px;
  font-size:1.5rem;
}
.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: auto;
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
</style>

<script>
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";


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
      itemsDashboardAdvancedFilter: [],
      userProfileStatus: 0,
    }
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
  methods: {
    filerVehicle() {
      if (this.regNo == '') {
        this.itemsDashboardAdvancedFilter = [];
      }
      if(this.regNo.length >= 3){
        return axios
          .get(resources_files.backend_url_assert_1() + '/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/reg/no/like/for/list/' + this.regNo)
          .then(response => {
            this.itemsDashboardAdvancedFilter = response.data;
          }).catch(function (error) {
            return error;
          });
      }
    }
  }
};


</script>