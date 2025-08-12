<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div class="a-box align-self-center">
              <div class="text-container">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">List of External Users - New Requests
                    </li>
                  </ol>
                </nav>
                <div>
                  <br />
                  <div class="row">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">NIC</span>
                      </div>
                      <input type="text" class="form-control" placeholder="NIC Number"
                        v-model="pageAttributeNewRequestResubmisionState" v-on:keyup="NewRequestresubmissionList">
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Return</span>
                      </div>
                      <select class="form-control" v-model="pageLenthNewRequestResubmitionState"
                        v-on:change="NewRequestresubmissionList">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="50000">50000</option>
                      </select>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Rows</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />

                  <table style="text-align: left;" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Name with Initials </th>
                        <th>NIC Numnber </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsNewRequestResubmissionStatue" :key="item">
                      <td> {{ item.nameWithInitials }}</td>
                      <td> {{ item.nicNumber }}</td>
                      <router-link :to="{ name: 'UserManagementExternalView', params: { id: item.userId } }"
                        class="btn btn-sm btn-success" style="margin: 5px;"> View
                      </router-link>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsNewRequestResubmissionStatue == []">No Data
                    Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div class="a-box align-self-center">
              <div class="text-container">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">List of External Users - Resubmission State
                    </li>
                  </ol>
                </nav>
                <div>
                  <br />
                  <div class="row">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">NIC</span>
                      </div>
                      <input type="text" class="form-control" placeholder="NIC Number"
                        v-model="pageAttributeResubmisionState" v-on:keyup="resubmissionList">
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Return</span>
                      </div>
                      <select class="form-control" v-model="pageLenthResubmitionState" v-on:change="resubmissionList">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="50000">50000</option>
                      </select>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Rows</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />

                  <table style="text-align: left;" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Name with Initials </th>
                        <th>NIC Numnber </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsResubmissionStatue" :key="item">
                      <td> {{ item.nameWithInitials }}</td>
                      <td> {{ item.nicNumber }}</td>
                      <router-link :to="{ name: 'UserManagementExternalView', params: { id: item.userId } }"
                        class="btn btn-sm btn-success" style="margin: 5px;"> View
                      </router-link>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsResubmissionStatue == []">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div class="a-box align-self-center">
              <div class="text-container">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">List of External Users - Activated State</li>
                  </ol>
                </nav>
                <div>
                  <br />
                  <div class="row">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">NIC</span>
                      </div>
                      <input type="text" class="form-control" placeholder="NIC Number" v-model="pageAttributeActive"
                        v-on:keyup="activatedList">
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Return</span>
                      </div>
                      <select class="form-control" v-model="pageLenthActive" v-on:change="activatedList">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="50000">50000</option>
                      </select>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Rows</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />


                  <table style="text-align: left;" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Name with Initials </th>
                        <th>NIC Numnber </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsActive" :key="item">
                      <td> {{ item.nameWithInitials }}</td>
                      <td> {{ item.nicNumber }}</td>
                      <router-link :to="{ name: 'UserManagementExternalView', params: { id: item.userId } }"
                        class="btn btn-sm btn-success" style="margin: 5px;"> View
                      </router-link>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsActive == []">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div class="a-box align-self-center">
              <div class="text-container">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">List of External Users - InActive State</li>
                  </ol>
                </nav>
                <hr />
                <div>
                  <div class="row">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">NIC</span>
                      </div>
                      <input type="text" class="form-control" placeholder="NIC Number" v-model="pageAttributeInActive"
                        v-on:keyup="inactivatedList">
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Return</span>
                      </div>
                      <select class="form-control" v-model="pageLenthInActive" v-on:change="inactivatedList">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="50000">50000</option>
                      </select>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">Rows</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />

                  <table style="text-align: left;" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Name with Initials </th>
                        <th>NIC Numnber </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsInActive" :key="item">
                      <td> {{ item.nameWithInitials }}</td>
                      <td> {{ item.nicNumber }}</td>
                      <router-link :to="{ name: 'UserManagementExternalView', params: { id: item.userId } }"
                        class="btn btn-sm btn-success" style="margin: 5px;"> View
                      </router-link>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsInActive == []">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row"
        v-if="userRoles.includes('SUPER_ADMIN') || userRoles.includes('ADMIN') || userRoles.includes('USERS_MANAGEMENT_EXTERNAL_OFFICER')">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div class="a-box align-self-center">
              <div class="text-container" style="background-color: rgb(189, 189, 189);color: white;">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/systemManagement/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Password Reset to Default (External Users
                      Only)
                    </li>
                  </ol>
                </nav>
                <div>
                  <br />
                  <div class="row">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">NIC</span>
                      </div>
                      <input type="text" class="form-control" placeholder="NIC Number"
                        v-model="pageAttributepasswordResetToDefault_externalState"
                        v-on:keyup="passwordResetToDefault_external">
                    </div>
                  </div>
                  <hr />
                  <div style="text-align: left;color: black;" v-if="itemsPasswordResetToDefault_external != ''">
                    <table>
                      <tr>
                        <td> User Name </td>
                        <td>&nbsp; : &nbsp;</td>
                        <td>{{ itemsPasswordResetToDefault_external.username }}</td>
                      </tr>
                      <tr>
                        <td> Email </td>
                        <td>&nbsp; : &nbsp;</td>
                        <td>{{ itemsPasswordResetToDefault_external.email }}</td>
                      </tr>
                      <tr>
                        <td>
                          <div class="btn btn-sm btn-danger" style="margin: 5px;"
                            v-on:click="resetToDefaultPw(itemsPasswordResetToDefault_external.userId)"> Reset to Default
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="alert alert-danger" role="alert" v-if="itemsPasswordResetToDefault_external == ''">No Data
                    Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">

    </div>
  </div>
</template>


<style scoped>
.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: auto;
}

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

.card_heading {
  color: black;
  text-align: left;
}

.dataTables {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.dataTables td,
.dataTables th {
  padding-top: 10px;
  padding-bottom: 10px;

}

.dataTables tr:nth-child(even) {
  background-color: #f2f2f2;
}

.dataTables tr:hover {
  background-color: #ddd;
}

.dataTables th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

.card__apply {
  margin-right: 20px;
  margin-left: 20px;
}
</style>




<script>
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses
import userservice from '../../services/Auth&UserServices/user.service';

export default {
  name: "completeProfile",
  components: {

  },
  data() {
    return {
      successful: false,
      loading: false,
      message: "",
      items: [],
      content: "",
      itemsActive: [],
      itemsInActive: [],
      itemsResubmissionStatue: [],
      itemsNewRequestResubmissionStatue: [],
      itemsPasswordResetToDefault_external: [],
      pageLenthActive: 10,
      pageAttributeActive: "",
      pageLenthInActive: 10,
      pageAttributeInActive: "",
      pageLenthResubmitionState: 10,
      pageLenthNewRequestResubmitionState: 10,
      pageAttributeResubmisionState: "",
      pageAttributeNewRequestResubmisionState: "",
      pageAttributepasswordResetToDefault_externalState: "",
      userRoles: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    //this method run when component load to the floating area
    this.activatedList();
    this.inactivatedList();
    this.resubmissionList();
    this.NewRequestresubmissionList();
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.userRoles = user.roles;
  },
  methods: {
    activatedList() {
      if (this.pageAttributeActive == "") {
        this.pageAttributeActive = "*";
      } else if (this.pageAttributeActive != "") {
        this.pageAttributeActive = this.pageAttributeActive.replace('*', '');
      }

      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/pagable/logs/' + this.pageAttributeActive + "/" + "3" + "/" + this.pageLenthActive)
        .then(response => {
          this.itemsActive = response.data;
          0;
        }).catch(function (error) {
          return error;
        });
    },
    inactivatedList() {
      if (this.pageAttributeInActive == "") {
        this.pageAttributeInActive = "*";
      } else if (this.pageAttributeActive != "") {
        this.pageAttributeInActive = this.pageAttributeInActive.replace('*', '');
      }


      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/pagable/logs/' + this.pageAttributeInActive + "/" + "0" + "/" + this.pageLenthInActive)
        .then(response => {
          this.itemsInActive = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    resubmissionList() {
      if (this.pageAttributeResubmisionState == "") {
        this.pageAttributeResubmisionState = "*";
      } else if (this.pageAttributeResubmisionState != "") {
        this.pageAttributeResubmisionState = this.pageAttributeResubmisionState.replace('*', '');
      }


      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/pagable/logs/' + this.pageAttributeResubmisionState + "/" + "2" + "/" + this.pageLenthResubmitionState)
        .then(response => {
          this.itemsResubmissionStatue = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    NewRequestresubmissionList() {
      if (this.pageAttributeNewRequestResubmisionState == "") {
        this.pageAttributeNewRequestResubmisionState = "*";
      } else if (this.pageAttributeNewRequestResubmisionState != "") {
        this.pageAttributeNewRequestResubmisionState = this.pageAttributeNewRequestResubmisionState.replace('*', '');
      }


      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/user/details/pagable/logs/' + this.pageAttributeNewRequestResubmisionState + "/" + "1" + "/" + this.pageLenthNewRequestResubmitionState)
        .then(response => {
          this.itemsNewRequestResubmissionStatue = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    passwordResetToDefault_external() {
      if (this.pageAttributepasswordResetToDefault_externalState == "") {
        this.pageAttributepasswordResetToDefault_externalState = "*";
      } else if (this.pageAttributepasswordResetToDefault_externalState != "") {
        this.pageAttributepasswordResetToDefault_externalState = this.pageAttributepasswordResetToDefault_externalState.replace('*', '');
      }

      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/by/username/' + this.pageAttributepasswordResetToDefault_externalState)
        .then(response => {
          this.itemsPasswordResetToDefault_external = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    resetToDefaultPw(id) {
      this.$swal.fire(
        {
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, I confirm this!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            //** **//
            this.message = "";
            this.successful = false;
            this.loading = true;

            userservice.resetToDefaultPW(id).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
              },
              (error) => {
                this.message =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.successful = false;
                this.loading = false;
              }
            );
            //** **//
          }
        }
        );
    }
  },
};
</script>