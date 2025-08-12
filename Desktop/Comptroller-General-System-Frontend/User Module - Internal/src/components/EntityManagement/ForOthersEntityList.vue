<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="text-container" style="padding-top: 20px;">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgoInternal/"'
                  class="btn-sm btn-link">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">List of Registered Institutions - Active Status</li>
            </ol>
          </nav>
          <hr />
          <div class="row">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Institution</span>
              </div>
              <input type="text" class="form-control" placeholder="Institution Name" v-model="param"
                v-on:keyup="searchPagable">
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Return</span>
              </div>
              <select class="form-control" v-model="paramLenth" v-on:change="searchPagable">
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
                <th>Institution Name</th>
                <th>Address </th>
                <th> </th>
              </tr>
            </thead>
            <tr v-for="item in items" :key="item">
              <td> {{ item.name }}</td>
              <td> {{ item.address }}</td>
              <router-link :to="{ name: 'EntityViewForOthers', params: { id: item.id } }" class="btn btn-sm btn-success"
                style="margin: 5px"> View
              </router-link>
            </tr>
          </table>
          <div class="alert alert-danger" role="alert" v-if="items == []">No Data Found.</div>
        </div>
      </div>

      <hr />
      <div class="a-box align-self-center">
        <div class="text-container" style="padding-top: 20px;">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgoInternal/"'
                  class="btn-sm btn-link">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">List of Registered Entities - Inactive Status</li>
            </ol>
          </nav>
          <hr />
          <div class="row">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Institution</span>
              </div>
              <input type="text" class="form-control" placeholder="Institution Name" v-model="paramInactive"
                v-on:keyup="searchPagableInactive">
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Return</span>
              </div>
              <select class="form-control" v-model="paramLenthInactive" v-on:change="searchPagableInactive">
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

          <div class="alert alert-danger" role="alert" v-if="itemsInactive == []">No Data Found.</div>

          <table class="dataTables" style="overflow-x:auto;">
            <tr v-for="item in itemsInactive" :key="item">
              <td>
                <p class="card__apply">
                  <router-link :to="{ name: 'EntityViewForOthers', params: { id: item.id } }"
                    class="btn btn-sm btn-success">
                    View
                  </router-link>
                </p>
              </td>
              <td>
                <h6 class="card_heading"><b> {{ item.name }}</b> </h6>
                <h6 class="card_heading"> {{ item.address }} </h6>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
.freelayoutstyle {
  margin: 50px;
}

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

.text-align-left {
  text-align: left;
}
</style>

<script>

import axios from 'axios';
//import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses
import entity_services from '../../services/ExternalServices/entity.service'; //this file contains base resourses


import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "completeProfile",
  data() {

    return {
      successful: false,
      loading: false,
      message: "",
      user_name: "",
      i_e: "0",
      oneItem_e: [],
      dataTable_e: null,
      items_e: [],
      items: [],
      itemsInactive: [],
      itemsgivenIndex: [],
      param: "",
      paramLenth: 100,
      paramInactive: "",
      paramLenthInactive: 100,
      entitysearch: "",
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      fileInfos: [],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }, mounted() {
    //this method run when component load to the floating area
    this.searchPagable();
    this.searchPagableInactive();
  },
  methods: {
    handleSave(data) {

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

            entity_services.saveEntity(data).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                this.searchPagable();
                this.searchPagableInactive();
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
    },
    searchPagable() {
      if (this.param == "") {
        this.param = "*";
      } else if (this.param != "") {
        this.param = this.param.replace('*', '');
      }

      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entities/like/pagable/' + this.param + "/" + "1" + "/" + this.paramLenth)
        .then(response => {
          this.items = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    searchPagableInactive() {
      if (this.paramInactive == "") {
        this.paramInactive = "*";
      } else if (this.paramInactive != "") {
        this.paramInactive = this.paramInactive.replace('*', '');
      }

      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entities/like/pagable/' + this.paramInactive + "/" + "0" + "/" + this.paramLenthInactive)
        .then(response => {
          this.itemsInactive = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    searchPagablegivenIndex() {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entities/like/pagable/' + this.entitysearch + "/" + "1" + "/3")
        .then(response => {
          this.itemsgivenIndex = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    upload() {
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
            this.progress = 0;
            this.currentFile = this.selectedFiles.item(0);
            entity_services.upload(this.currentFile, event => {
              this.progress = Math.round((100 * event.loaded) / event.total);
            })
              .then(response => {
                this.message = response.data.message;
                return entity_services.getFiles();
              })
              .then(files => {
                this.fileInfos = files.data;
              })
              .catch(() => {
                this.progress = 0;
                this.message = "Could not upload the file!";
                this.currentFile = undefined;
              });
            this.selectedFiles = undefined;
            //** **//
          }
        }
        );
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
  }
};


</script>