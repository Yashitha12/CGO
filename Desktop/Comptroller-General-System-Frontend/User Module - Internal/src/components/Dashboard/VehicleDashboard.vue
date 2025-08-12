<template>
  <div class="row" id="dashboard" v-if="userProfileStatus == 3">
    <div style="display: inline-block">
      <router-link to="/dashboard/user" class="btn btn-link btn-sm"> Users Dashboard</router-link>
      <router-link to="/dashboard/vehicle" class="btn btn-link btn-sm"> Vehicles Dashboard</router-link>
      <router-link to="/dashboard/entity" class="btn btn-link btn-sm"> Institutions Dashboard</router-link>
    </div>

    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" v-if="this.currentUser">
      <div class="a-box2 align-self-center">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
              <img src="../../assets/img/asset/vehicle.jpg" />
            </div>
          </div>
        </div>
        <br /><br />
        <div class="text-container2" style="margin-bottom: 100px">
          <h5>VEHICLE DASHBOARD</h5>
          <br />
          <div v-if="this.dataParam != undefined">
            <br />{{ itemsEntity.name }}

            <br />{{ itemsEntity.address }}<br />{{ itemsEntity.contactNumberFixed }} /
            {{ itemsEntity.contactNumber }}
          </div>

          <hr />
          <div class="row">
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" @click="loadList('approve')" style="cursor: pointer">
              <h6>Approved Assets</h6>
              <br />
              <b style="font-size: 35px">{{ itemsApproved }} </b><br />
              (Both Basic information and Valuation information verified seperately as "verify".)
            </div>
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" @click="loadList('edit')" style="cursor: pointer">
              <h6>Edit Requests</h6>
              <br />
              <b style="font-size: 35px">{{ itemsEdits }} </b><br />
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" @click="loadList('disposed')" style="cursor: pointer">
              <h6>Disposed Assets</h6>
              <br />
              <b style="font-size: 35px">{{ itemsDisposed }} </b><br />
            </div>
            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" @click="loadList('reject')" style="cursor: pointer">
              <h6>Rejected Assets</h6>
              <br />
              <b style="font-size: 35px">{{ itemsRejected }} </b><br />
            </div>
          </div>
          <div>
            <hr />
            <div class="row">
              <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" style="cursor: pointer" @click="loadList('inprogress')"
                v-if="this.dataParam != undefined">
                <h6>Inprogress Assets</h6>
                <br />
                <b style="font-size: 35px">{{ itemsInprogress }} </b><br />
              </div>
              <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" @click="loadList('t_requested')"
                style="cursor: pointer">
                <h6>Transfer Requested Assets</h6>
                <br />
                <b style="font-size: 35px">{{ itemsTransferRequests }} </b><br />
              </div>
              <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" @click="loadList('t_accepted')"
                style="cursor: pointer">
                <h6>Transfer Accepted Assets</h6>
                <br />
                <b style="font-size: 35px">{{ itemsTransferAccepted }} </b><br />
              </div>
            </div>
            <hr />
            <div class="row" v-if="this.dataParam != undefined">
              <div class="col-sm-12 col-xs-12 col-md-6 col-lg-6" @click="loadList('valuationToBeVerified')"
                style="cursor: pointer">
                <h6>Valuation details to be verified</h6>
                <br />
                <b style="font-size: 35px">{{ itemsValuationToBeVerified }} </b><br />
              </div>
            </div>
          </div>
          <hr />
          <div v-if="!(this.dataParam == undefined)">
            <router-link :to="{ name: 'vehiclesDeleteRequests', params: { id: this.dataParam } }"
              class="btn btn-sm btn-success" style="margin: 5px"> View Institution Delete Requests </router-link>
          </div>

          <div v-if="this.dataParam == undefined">
            <router-link :to="{ name: 'vehiclesDeleteRequests', params: { id: 'all' } }" class="btn btn-sm btn-success"
              style="margin: 5px"> View All Delete Requests </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">{{ this.headingDashboard }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <table style="text-align: left" class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th>Registration Number</th>
                          <th>Vehicle Type</th>
                          <th>Model</th>
                          <th>Condition</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tr v-for="item in itemsDashboard" :key="item">
                        <td>{{ item.registerNumber }}</td>
                        <td>{{ item.vehicleType }}</td>
                        <td>{{ item.model }}</td>
                        <td>{{ item.currentCondition }}</td>
                        <td>
                          <router-link :to="{ name: 'ViewVehicleData', params: { id: item.id } }"> <a
                              class="btn btn-success btn-sm">View</a> </router-link>
                        </td>
                      </tr>
                    </table>
                    <div class="alert alert-danger" role="alert" v-if="itemsDashboard == [] || itemsDashboard == ''">No
                      Data Found.</div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
  margin-bottom: -200px;
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
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
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
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

h1 {
  font-size: 28px;
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
}

::placeholder {
  text-align: center;
  font-size: 14px;
}
</style>

<script>
import axios from "axios";
import resources_files from "../../services/base_resources"; //this file contains base resourses
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data() {
    return {
      items: [],
      entity: sessionStorage.getItem("entityId"),
      itemsInprogress: 0,
      itemsApproved: 0,
      paramitemsApproved: "",
      paramitemsApprovedList: "",
      itemsEdits: 0,
      paramitemsEdits: "",
      paramitemsEditsList: "",
      itemsDisposed: 0,
      paramitemsDisposed: "",
      paramitemsDisposedList: "",
      itemsRejected: 0,
      paramitemsRejected: "",
      paramitemsRejectedList: "",
      itemsTransferRequests: 0,
      paramitemsTransferRequests: "",
      paramitemsTransferRequestsList: "",
      paramitemsInprogressList: "",
      paramitemsvaluationToBeVerifiedList: "",
      itemsTransferAccepted: 0,
      paramitemsTransferAccepted: "",
      paramitemsTransferAcceptedList: "",
      itemsValuationToBeVerified: 0,
      itemsValuationNotVerified: 0,
      itemsDashboard: [],
      showModal: false,
      userRoles: [],
      itemsEntity: [],
      userProfileStatus: 0,
      dataParam: "",
      regNo: "",
      checkAll: true,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.itemsApprovedCount();
    this.itemsEditsCount();
    this.itemsDisposedCount();
    this.itemsRejectedCount();
    this.itemsTransferRequestsCount();
    this.itemsTransferAcceptedCount();

    if (this.dataParam != undefined) {
      this.countValuationToBeVerified();
      this.filterByStatusInprogress();
    }

    let user = JSON.parse(sessionStorage.getItem("user"));
    this.userRoles = user.roles;

    let profile = sessionStorage.getItem("profile");
    this.userProfileStatus = profile;

    if (this.dataParam == undefined) {
      this.checkAll = false;
    } else {
      this.checkAll = true;
      this.checkEntityName();
    }
  },
  methods: {
    checkEntityName() {
      this.dataParam = this.$route.params.id;

      return axios
        .get(resources_files.backend_url_system_management() + "/get/api/production/system/management/backend/restapi/get/one/entity/" + this.dataParam)
        .then((response) => {
          this.itemsEntity = response.data;
        })
        .catch(function (error) {
          return error;
        });
    },
    itemsApprovedCount() {
      this.dataParam = this.$route.params.id;
      if (this.dataParam == undefined) {
        this.paramitemsApproved = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/size/1/1";
      } else {
        this.dataParam == this.$route.params.id;
        this.paramitemsApproved = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/size/" + this.dataParam + "/1/1";
      }
      return axios
        .get(this.paramitemsApproved)
        .then((response) => {
          this.itemsApproved = response.data;
          if (this.itemsApproved == "") {
            this.itemsApproved = 0;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    itemsEditsCount() {
      this.dataParam = this.$route.params.id;
      if (this.dataParam == undefined) {
        this.paramitemsEdits = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/all/3";
      } else {
        this.dataParam == this.$route.params.id;
        this.paramitemsEdits = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/" + this.dataParam + "/3";
      }

      return axios
        .get(this.paramitemsEdits)
        .then((response) => {
          this.itemsEdits = response.data;
          if (this.itemsEdits == "") {
            this.itemsEdits = 0;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    itemsDisposedCount() {
      this.dataParam = this.$route.params.id;
      if (this.dataParam == undefined) {
        this.paramitemsDisposed = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/all/13";
      } else {
        this.dataParam == this.$route.params.id;
        this.paramitemsDisposed = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/" + this.dataParam + "/13";
      }

      return axios
        .get(this.paramitemsDisposed)
        .then((response) => {
          this.itemsDisposed = response.data;
          if (this.itemsDisposed == "") {
            this.itemsDisposed = 0;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    itemsRejectedCount() {
      this.dataParam = this.$route.params.id;
      if (this.dataParam == undefined) {
        this.paramitemsRejected = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/all/2";
      } else {
        this.dataParam == this.$route.params.id;
        this.paramitemsRejected = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/" + this.dataParam + "/2";
      }

      return axios
        .get(this.paramitemsRejected)
        .then((response) => {
          this.itemsRejected = response.data;
          if (this.itemsRejected == "") {
            this.itemsRejected = 0;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    itemsTransferRequestsCount() {
      this.dataParam = this.$route.params.id;
      if (this.dataParam == undefined) {
        this.paramitemsTransferRequests = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/count/transfer/status/1";
      } else {
        this.dataParam == this.$route.params.id;
        this.paramitemsTransferRequests = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/join/transfer/entity/with/status/" + this.dataParam + "/1";
      }

      return axios
        .get(this.paramitemsTransferRequests)
        .then((response) => {
          this.itemsTransferRequests = response.data.length;
          if (this.itemsTransferRequests == "") {
            this.itemsTransferRequests = 0;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    itemsTransferAcceptedCount() {
      this.dataParam = this.$route.params.id;
      if (this.dataParam == undefined) {
        this.paramitemsTransferAccepted = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/count/transfer/status/3";
      } else {
        this.dataParam == this.$route.params.id;
        this.paramitemsTransferAccepted = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/join/transfer/entity/with/status/" + this.dataParam + "/3";
      }

      return axios
        .get(this.paramitemsTransferAccepted)
        .then((response) => {
          this.itemsTransferAccepted = response.data.length;
          if (this.itemsTransferAccepted == "") {
            this.itemsTransferAccepted = 0;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    countValuationToBeVerified() {
      this.dataParam = this.$route.params.id;
      return axios
        .get(resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/todolist/for/entity/sub/items/not/complete/" + this.dataParam + "/valuation/0")
        .then((response) => {
          this.itemsValuationToBeVerified = response.data.length;
        })
        .catch(function (error) {
          return error;
        });
    },
    filterByStatusInprogress() {
      this.dataParam = this.$route.params.id;
      return axios
        .get(resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/size/inprogress/" + this.dataParam)
        .then((response) => {
          this.itemsInprogress = response.data;
          if (this.itemsInprogress == "") {
            this.itemsInprogress = 0;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    loadList(param) {
      if (param == "approve") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Approved Vehicles (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsApprovedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/with/valuation/1/1/10";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsApprovedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/with/valuation/" + this.dataParam + "/1/1/10";
        }

        return axios
          .get(this.paramitemsApprovedList)
          .then((response) => {
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      if (param == "edit") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Edit Requests (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsEditsList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/all/3/10";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsEditsList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/" + this.dataParam + "/3/10";
        }

        return axios
          .get(this.paramitemsEditsList)
          .then((response) => {
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      if (param == "disposed") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Disposed Assets (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsDisposedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/all/13/10";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsDisposedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/" + this.dataParam + "/13/10";
        }

        return axios
          .get(this.paramitemsDisposedList)
          .then((response) => {
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      if (param == "reject") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Rejected Assets (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsRejectedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/all/2/10";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsRejectedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/" + this.dataParam + "/2/10";
        }

        return axios
          .get(this.paramitemsRejectedList)
          .then((response) => {
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      if (param == "inprogress") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Inprogress Items (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsInprogressList = "";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsInprogressList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/asset/vehicle/details/for/dashboard/list/inprogress/" + this.dataParam;
        }

        return axios
          .get(this.paramitemsInprogressList)
          .then((response) => {
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      if (param == "valuationToBeVerified") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Valuations To Be Verified (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsvaluationToBeVerifiedList = "";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsvaluationToBeVerifiedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/todolist/for/entity/sub/items/not/complete/" + this.dataParam + "/valuation/0";
        }

        return axios
          .get(this.paramitemsvaluationToBeVerifiedList)
          .then((response) => {
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      if (param == "t_requested") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Transfer Requested Assets (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsTransferRequestsList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/count/transfer/status/1";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsTransferRequestsList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/join/transfer/entity/with/status/" + this.dataParam + "/1";
        }

        return axios
          .get(this.paramitemsTransferRequestsList)
          .then((response) => {
            console.log(response);
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      if (param == "t_accepted") {
        this.itemsDashboard = [];
        this.headingDashboard = "List of Transfer Accepted Assets (10 Most Recent Items)";
        this.showModal = true;

        this.dataParam = this.$route.params.id;
        if (this.dataParam == undefined) {
          this.paramitemsTransferAcceptedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/count/transfer/status/3";
        } else {
          this.dataParam == this.$route.params.id;
          this.paramitemsTransferAcceptedList = resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/vehicle/by/join/transfer/entity/with/status/" + this.dataParam + "/3";
        }

        return axios
          .get(this.paramitemsTransferAcceptedList)
          .then((response) => {
            this.itemsDashboard = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }
    },
  },
};
</script>
