
<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div>
        <div class="a-box align-self-center">
          <div class="text-container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgo/"'
                    class="btn-sm btn-link">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Relevent Entity list</li>
              </ol>
            </nav>
            <hr />
            <h6 class="headerRowD">Parent Institution </h6>
            <br>
            <div class="alert alert-danger" role="alert" v-if="itemsChildParent.name == null">Not mapped any parent
              entity.<br />For more information please contact Ministry of Finance IT Department.</div>

            <h4>{{ itemsChildParent.name }} </h4>
            <br />
            <hr />
            <br />
            <h6 class="headerRowD">Child Institutions </h6>
            <hr />
            <table style="text-align: left;" class="table">
              <thead class="thead-dark">
                <tr>
                  <th>Institution Name </th>
                  <th>Address </th>
                  <th>Contact Details </th>
                </tr>
              </thead>
              <tr v-for="item in itemsChild" :key="item">
                <td> {{ item.name }}</td>
                <td> {{ item.address }}</td>
                <td> {{ item.contactNumberFixed }} / {{ item.email }}</td>
              </tr>
            </table>
            <div class="alert alert-danger" role="alert" v-if="itemsChild == []">Not mapped any child entities.<br />
              For more information please contact Ministry of Finance IT Department.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.displayArea {
  text-align: left;
  color: white;
}

.headerRowD {
  background: linear-gradient(90deg, rgba(19, 0, 36, 1) 28%, rgba(6, 133, 159, 1) 100%);
  color: aliceblue;
  padding: 10px;
}
</style>

<script>
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses


export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      itemsactive: [],
      itemsactivesub: [],
      itemsactivesubfinalized: [],
      itemsgivenIndex: [],
      itemsChildParent: "None",
      itemsChild: [],
      countChild: 0
    };
  },
  mounted() {
    this.getSubDetails();
    this.getParentList();
    this.getChildList();
  },
  methods: {
    getSubDetails() {
      let entityId = sessionStorage.getItem('entityId');
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/code/entity/details/by/code/' + entityId)
        .then(response => {
          this.itemsactive = response.data;
          this.itemsactivesub = this.itemsactive.data;
          for (let i = 0; i < this.itemsactivesub.length; i++) {
            this.getSubDetailsByEntity(this.itemsactivesub[i].entityid);
          }
        }).catch(function (error) {
          return error;
        });
    },
    getSubDetailsByEntity(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/entity/' + data)
        .then(response => {
          this.itemsactiveData = response.data;
          this.itemsactivesubfinalized.push(this.itemsactiveData);
        }).catch(function (error) {
          return error;
        });
    },
    getParentList() {
      let entityId = sessionStorage.getItem('entityId');
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entity/pattern/management/by/child/' + entityId)
        .then(response => {
          this.itemsChildParent = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    getChildList() {

      let entityId = sessionStorage.getItem('entityId');

      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entity/pattern/management/by/parent/' + entityId)
        .then(response => {
          this.itemsChild = response.data;
        }).catch(function (error) {
          return error;
        });
    },
  },
};
</script>