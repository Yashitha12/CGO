<template>
  <div class="row">
    <hr />
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/external_management.png">
                </div>
              </div>
            </div>

            <div class="alert alert-danger" v-if="this.items10 == []">
              Please complete possession of the vehicles. <br/> Note : This form should be filled by Data Verification Officer.
            </div>

            <div class="text-container2"><br>
              <h6>
                {{ itemLine1 }} {{ itemLine2 }} {{ itemLine3 }} {{ itemLine4 }} {{ itemLine5 }} {{ itemLine6 }} {{
                  itemLine7
                }}<br />
                <b>
                  <h3><b>{{ this.itemLine9 }} </b></h3>
                </b><br>
                {{ this.address }} - {{ this.city }}<br />
                {{ this.phone }}<br />
                {{ this.fax }}<br />
                {{ this.email }}<br />
              </h6>

              <br />
              <div class="alert alert-warning" role="alert">
                If your institution details mismatch, please contact Ministry of Finance IT Department (Tel : +94-11-2484600 Ext:1615).
              </div>
              <br>
              <router-link to="/entity/management/external/child/entity/management"><button class="btn btn-primary">View
                  Parent Institution & Child Institutions</button>
              </router-link>
              <br><br>
              <div class="row" style="display: inline-block;">
                <router-link to="/entity/management/external/entity/asset/management">
                  <button class="btn btn-success" v-on:click="showHide">Vehicles</button>
                </router-link>
                <router-link to="/Buildings">
                  <button class="btn btn-success" v-on:click="showHide">Buildings</button>
                </router-link>
                <router-link to="/lands">
                  <button class="btn btn-success" v-on:click="showHide">Lands</button>
                </router-link>
                <router-link to="/Structures">
                  <button class="btn btn-success" v-on:click="showHide">Structures</button>
                </router-link>
              </div>
              <br /><br />
              <div class="row" style="display: inline-block;">
                &nbsp;&nbsp;&nbsp;
                <router-link to="/Machinaries">
                  <button class="btn btn-success" v-on:click="showHide">Plant, Machinary & Equipment</button>
                </router-link>

                <router-link to="/Equipments">
                  <button class="btn btn-success" v-on:click="showHide">Furniture & Office Equipment </button>
                </router-link>
                <br><br>
                <button class="btn btn-primary" v-on:click="seen = !seen">View System Users</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>

  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <router-view name="helper"></router-view>
    </div>
  </div>

  <br />
  <hr />
  <br />
  <div class="row" v-if="seen">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="text-container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgoInternal/"'
                  class="btn-sm btn-link">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">System Users</li>
            </ol>
          </nav>
          <br />
          <table style="text-align: left;" class="table">
            <thead class="thead-dark">
              <tr>
                <th>Name</th>
                <th>Address </th>
                <th>NIC Number </th>
                <th>Contact Details </th>
              </tr>
            </thead>
            <tr v-for="item in entityUsers" :key="item">
              <td>
                {{ item.firstName }} {{ item.lastName }}
                <br /><br />
                <div v-if="item.status == 3">
                  <b class="alert alert-secondary" style="color:green;">Status : Active</b>
                </div>
                <div v-if="item.status == 0">
                  <b class="alert alert-secondary" style="color:red;">Status : InActive</b>
                </div>
                <div v-if="item.status == 2">
                  <b class="alert alert-secondary">Status : Resubmission State</b>
                </div>
                <div v-if="item.status == 2">
                  <b class="alert alert-secondary">Status : New Request</b>
                </div>
              </td>
              <td> {{ item.address }}</td>
              <td> {{ item.nicNumber }}</td>
              <td>
                {{ item.contactNumberMobile }} | {{ item.contactNumberMobile2 }} | {{ item.email }}
              </td>
            </tr>
          </table>
          <div class="alert alert-danger" role="alert" v-if="entityUsers == ''">No Data Found.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.5);
  display: flex;
  border-radius: 25px;
  position: relative;
  text-align: center;
  width: auto;
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
  font-size: 12px;
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
  background: #c8c2c2;
  height: 250px;
  width: 200px;
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

.text-container2 h3 {
  margin: 20px 0px 10px 0px;
  font-size: 28px;
}
</style>

<script>

import axios from 'axios';
//import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses


import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "completeProfile",
  data() {
    return {
      successful: false,
      loading: false,
      message: "",
      seen: false,
      items: "",
      items1: "",
      items2: "",
      items3: "",
      items4: "",
      itemCount1: 0,
      itemCount2: 0,
      itemCount3: 0,
      itemCount4: 0,
      itemCount5: 0,
      objectDetails: [],
      items10: [],
      entityUsers: [],
      itemLine1: "",
      itemLine2: "",
      itemLine3: "",
      itemLine4: "",
      itemLine5: "",
      itemLine6: "",
      itemLine7: "",
      itemLine8: "",
      itemLine9: "",
      api_urlssss: "",
      address: "",
      city: "",
      phone: "",
      fax: "",
      email: "",
      file1: '',
      file2: '',
      entityIdLog: sessionStorage.getItem("entityId")
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }, mounted() {
    //this method run when component load to the floating area
    this.changeMessage_load_entity_log();
    this.getVehicleDetailsAvailability();
    this.search9(sessionStorage.getItem('entityId'));
    this.entityDataById();
  },
  methods: {
    changeMessage_load_entity_log() {
      let entityId = sessionStorage.getItem('entityId');
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entities/by/code/block/child/' + entityId)
        .then(response => {
          this.objectDetails = response.data;
          if (this.objectDetails != "") {
            if (this.objectDetails.lineItem1 != "") {
              this.search1(this.objectDetails.lineItem1);
            }
            if (this.objectDetails.lineItem2 != "") {
              this.search2(this.objectDetails.lineItem2);
            }
            if (this.objectDetails.lineItem3 != "") {
              this.search3(this.objectDetails.lineItem3);
            }
            if (this.objectDetails.lineItem4 != "") {
              this.search4(this.objectDetails.lineItem4);
            }
            if (this.objectDetails.lineItem5 != "") {
              this.search5(this.objectDetails.lineItem5);
            }
            if (this.objectDetails.lineItem6 != "") {
              this.search6(this.objectDetails.lineItem6);
            }
            if (this.objectDetails.lineItem7 != "") {
              this.search7(this.objectDetails.lineItem7);
            }
            if (this.objectDetails.lineItem8 != "") {
              this.search8(this.objectDetails.lineItem8);
            }
            if (this.objectDetails.lineItem9 != "") {
              this.search9(this.objectDetails.lineItem9);
            }
          }
        }).catch(function (error) {
          return error;
        });
    },
    search1(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/emsub0/' + data)
        .then(response => {
          this.itemLine1 = response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search2(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/emsub1/' + data)
        .then(response => {
          this.itemLine2 = " --- > " + response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search3(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/emsub2/' + data)
        .then(response => {
          this.itemLine3 = " --- > " + response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search4(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/emsub3/' + data)
        .then(response => {
          this.itemLine4 = " --- > " + response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search5(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/emsub4/' + data)
        .then(response => {
          this.itemLine5 = " --- > " + response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search6(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/emsub5/' + data)
        .then(response => {
          this.itemLine6 = " --- > " + response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search7(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/emsub6/' + data)
        .then(response => {
          this.itemLine7 = " --- > " + response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search8(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/entity/' + data)
        .then(response => {
          this.itemLine8 = response.data.name;
        }).catch(function (error) {
          return error;
        });
    },
    search9(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/entity/' + data)
        .then(response => {
          this.itemLine9 = response.data.name;
          this.address = response.data.address;
          this.city = response.data.city;
          this.phone = response.data.contactNumberFixed + " / " + response.data.contactNumber;
          this.fax = response.data.fax;
          this.email = response.data.email;
        }).catch(function (error) {
          return error;
        });
    },
    redirectpage() {
      let entityId = sessionStorage.getItem('entityId');
      const API_URL = resources_files.backend_url_system_management();
      this.api_urlssss = API_URL + "/get/api/production/system/management/backend/restapi/get/entity/from/qr/" + entityId;
      window.location.href = this.api_urlssss;
    },
    getVehicleDetailsAvailability() {
      let entityId = sessionStorage.getItem('entityId');
      return axios
        .get(resources_files.backend_url_assert_1() + '/get/api/production/asset/vehicle/backend/restapi/get/all/entity/related/common/vehicle/availability/' + entityId)
        .then(response => {
          this.items10 = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    entityDataById() {
      let entityId = sessionStorage.getItem('entityId');
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/profile/by/entity/id/' + entityId)
        .then(response => {
          this.entityUsers = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    showHide(){
      this.seen = false;
    }
  }
};

</script>