<template>
  <div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="a-box align-self-center">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/external_management.png">
                </div>
              </div>
            </div>

            <div class="text-container">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page"><a
                      onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">View Institution</li>
                </ol>
              </nav>
              <h3><b>{{ this.items.name }}</b></h3>
              <b>{{ itemLine1 }} {{ itemLine2 }} {{ itemLine3 }} {{ itemLine4 }} {{ itemLine5 }} {{ itemLine6 }} {{
                itemLine7
                }}</b>

              <hr />
              {{ this.items.address }} - {{ this.items.city }}<br />
              {{ this.items.contactNumberFixed }} - {{ this.items.contactNumber }}<br />
              {{ this.items.email }}<br />
              {{ this.items.fax }}<br />

              <p v-if="this.items.status == '1'"> Status : Active</p>
              <p v-if="this.items.status == '0'" style="color: red;"><b> Status : Inactive</b></p>
              Created date : {{ this.items.dateLog }} {{ this.items.timeLog }}

              <br />
              <hr />
              <br />
              <h6 style="text-align: left;"><b>CGO Institution Rules</b></h6>
              <table style="text-align: left;">
                <tr>
                  <th>&nbsp;&nbsp;</th>
                  <th>&nbsp;&nbsp;</th>
                  <th>
                    Existing Rule&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                </tr>
                <tr>
                  <td>Add assets to own institution</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>&nbsp; {{ addAssetsOwnView }} &nbsp;</td>
                </tr>
                <tr>
                  <td>Add assets from parent institution</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>&nbsp; {{ addAssetsFromParentView }} &nbsp;</td>
                </tr>
                <tr>
                  <td>Get own assets reports</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>&nbsp; {{ getOwnReportsView }} &nbsp;</td>
                </tr>
                <tr>
                  <td>Get assets reports from parent institution</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>&nbsp; {{ getAssetsReportFromParentView }} &nbsp;</td>
                </tr>
                <tr>
                  <td>Assets Approved by</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>&nbsp; {{ authorizeOfficerview }} &nbsp;</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="a-box align-self-center">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/user_profile.png">
                </div>
              </div>
            </div>

            <div class="text-container">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page"><a
                      onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Users</li>
                </ol>
              </nav>
              <br />
              <table style="text-align: left;" class="table">
                <thead class="thead-dark">
                  <tr>
                    <th style="width: 60%;">Name</th>
                    <th>Mobile No</th>
                    <th>Email </th>
                    <th></th>
                  </tr>
                </thead>
                <tr v-for="item in entityUsers" :key="item">
                  <td @mouseenter="loadList(item.userId)" data-toggle="modal" data-target="#exampleModal"
                    style="cursor: pointer;"> {{
                    item.firstName }} {{ item.lastName }} <br /> {{
                    item.nicNumber }}
                    <br />
                    <div v-if="item.status == 3">
                      <b class="alert alert-secondary" style="color:green;">Active</b>
                    </div>
                    <div v-if="item.status == 0">
                      <b class="alert alert-secondary" style="color:red;">InActive</b>
                    </div>
                    <div v-if="item.status == 2">
                      <b class="alert alert-secondary">Resubmit</b>
                    </div>
                    <div v-if="item.status == 1">
                      <b class="alert alert-secondary">New Request</b>
                    </div>
                    <div v-if="item.status == 4">
                      <b class="alert alert-secondary">Password Reset</b>
                    </div>
                  </td>
                  <td>
                    {{ item.contactNumberMobile }} {{ item.contactNumberMobile2 }}
                  </td>
                  <td>
                    {{ item.email }}
                  </td>
                  <td>
                    <router-link :to="{ name: 'UserManagementExternalView', params: { id: item.userId } }"
                      class="btn btn-sm btn-success bg-background" style="margin: 5px;"> View
                    </router-link>
                  </td>
                </tr>
              </table>
              <div class="alert alert-danger" role="alert" v-if="entityUsers == ''">No Data Found.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <h6 class="modal-title" id="exampleModalLabel"><b>User Access Roles</b></h6>
              {{ this.accessRoleDetails }}
              <br /><br />
              <h6 class="modal-title" id="exampleModalLabel"><b>User Access Assets</b></h6>
              {{ this.accessAssetDetails }}
            </div>
          </div>
        </div>
      </div>
      <br />

      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <hr />
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <router-link :to="{ name: 'EntityAssetPosessionVehicle' }" class="btn btn-md btn-success">
              Posession of the Vehicles
            </router-link>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <router-link to="/Lands" class="btn btn-md btn-success">
              Posession of the &nbsp; Lands
            </router-link>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <router-link to="/Buildings" class="btn btn-success">
              Posession of the Buildings
            </router-link>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <router-link to="/Structures" class="btn btn-success">
              Posession of the Structures
            </router-link>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <router-link to="/Furniture" class="btn btn-success">
              Posession of the Furniture
            </router-link>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <router-link to="/Machinaries" class="btn btn-success">
              Posession of the Machinaries
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <router-view name="helper2"></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="a-box align-self-center">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../../assets/img/tree-view.png">
              </div>
            </div>
          </div>

          <div class="text-container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page"><a
                    onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Parent Institution</li>
              </ol>
            </nav>
            <br />
            <h4>{{ itemsChildParent.name }}</h4>
            <div class="alert alert-warning" role="alert" v-if="itemsChildParent.name == null">Not mapped any parent
              entity.<br />For more information please contact "Information Technology Management Department."</div>
          </div>
        </div>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="a-box align-self-center">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../../assets/img/tree-view.png">
              </div>
            </div>
          </div>

          <div class="text-container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page"><a
                    onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Child Institutions</li>
              </ol>
            </nav>
            <br />

            <div class="alert alert-warning" role="alert" v-if="itemsChild == []">Not mapped any child
              Institutions.<br />
              For more information please contact "Information Technology Management Department."
            </div>

            <table style="overflow-x:auto;" v-for="item in itemsChild" :key="item">
              <tr>
                <td>
                  <h6 class="card_heading"><b>* {{ item.name }}</b> </h6>
                </td>
              </tr>
              <tr>
                <h6 class="card_heading"> {{ item.address }} ({{ item.contactNumberFixed }} / {{ item.contactNumber }})
                </h6>
              </tr>
              <tr>
                <br />
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
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
  background-color: #37517e;
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

.bg-background {
  background-color: green;
}
</style>




<script>
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses

export default {
  name: "completeProfile",
  data() {
    return {
      successful: false,
      loading: false,
      message: "",
      items: [],
      itemsChild: [],
      itemsChildParent: "",
      objectDetails: [],
      entityUsers: [],
      dataParam: "",
      parentEntity: "",
      itemLine1: "",
      itemLine2: "",
      itemLine3: "",
      itemLine4: "",
      itemLine5: "",
      itemLine6: "",
      itemLine7: "",
      itemLine8: "",
      itemLine9: "",
      addAssetsFromParentView: '',
      addAssetsOwnView: '',
      getOwnReportsView: '',
      getAssetsReportFromParentView: '',
      authorizeOfficerview: '',
      accessRoleDetails: '',
      accessAssetDetails: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    //this method run when component load to the floating area
    this.dataParam = this.$route.params.id;
    this.changeMessage();
    this.getChildList();
    this.getParentList();
    this.changeMessage_load_entity_log();
    this.entityDataById();
    this.entityRules();
  },
  methods: {
    changeMessage() {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/entity/' + this.dataParam)
        .then(response => {
          this.items = response.data;
          console.log(this.items);
        }).catch(function (error) {
          return error;
        });
    },
    getChildList() {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entity/pattern/management/by/parent/' + this.dataParam)
        .then(response => {
          this.itemsChild = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    getParentList() {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entity/pattern/management/by/child/' + this.dataParam)
        .then(response => {
          this.itemsChildParent = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    reloadData(data) {
      this.dataParam = data;
      this.changeMessage();
      this.getChildList();
      this.getParentList();
    },
    changeMessage_load_entity_log() {
      let entityId = this.$route.params.id;

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
    entityDataById() {
      let entityId = this.$route.params.id;
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/profile/by/entity/id/' + entityId)
        .then(response => {
          this.entityUsers = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    entityRules() {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/cgo/rules/by/id/' + this.dataParam)
        .then(response => {
          this.idPK = response.data.idPK;


          this.addAssetsOwnView = response.data.addAssetsOwn;
          if (this.addAssetsOwnView == "1") {
            this.addAssetsOwnView = "Yes";
          } else if (this.addAssetsOwnView == "0") {
            this.addAssetsOwnView = "No";
          } else {
            this.addAssetsOwnView = "Not Mentioned";
          }

          this.addAssetsFromParentView = response.data.addAssetsFromParent;
          if (this.addAssetsFromParentView == "1") {
            this.addAssetsFromParentView = "Yes";
          } else if (this.addAssetsFromParentView == "0") {
            this.addAssetsFromParentView = "No";
          } else {
            this.addAssetsFromParentView = "Not Mentioned";
          }

          this.getOwnReportsView = response.data.getOwnReports;
          if (this.getOwnReportsView == "1") {
            this.getOwnReportsView = "Yes";
          } else if (this.getOwnReportsView == "0") {
            this.getOwnReportsView = "No";
          } else {
            this.getOwnReportsView = "Not Mentioned";
          }

          this.getAssetsReportFromParentView = response.data.getAssetsReportFromParent;
          if (this.getAssetsReportFromParentView == "1") {
            this.getAssetsReportFromParentView = "Yes";
          } else if (this.getAssetsReportFromParentView == "0") {
            this.getAssetsReportFromParentView = "No";
          } else {
            this.getAssetsReportFromParentView = "Not Mentioned";
          }

          this.authorizeOfficerview = response.data.authorizeOfficer;
          if (this.authorizeOfficerview == "1") {
            this.authorizeOfficerview = "Self";
          } else if (this.authorizeOfficerview == "0") {
            this.authorizeOfficerview = "Parent";
          } else {
            this.authorizeOfficerview = "Not Mentioned";
          }
          this.task = true;
        }).catch(function (error) {
          return error;
        });
    },
    loadList(username) {
      this.accessRoleDetails = '';
      this.accessAssetDetails = '';
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/by/id/' + username)
        .then(response => {
          for (let i = 0; i < response.data.roles.length; i++) {
            this.accessRoleDetails = this.accessRoleDetails + "    "+response.data.roles[i].name ;
          }

          for (let i = 0; i < response.data.assets.length; i++) {
            this.accessAssetDetails = this.accessAssetDetails + "    " + response.data.assets[i].name;
          }
        }).catch(function (error) {
          return error;
        });
    }
  },
};

</script>