<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div>
        <div class="a-box align-self-center">
          <div class="text-container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">possession of the Vehicles</li>
              </ol>
            </nav>
            <hr />
            <div style="text-align: left; display: block">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="userRoles.includes('Verification_Officer')">
                  <Form @submit="handleSave">
                    <div class="row">
                      <div class="col-lg-6 col-md-4 col-sm-6 col-xs-12">
                        <div class="form-group">
                          <label>Whether the Institution has Vehicles :</label>
                        </div>
                      </div>
                      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div class="form-group">
                          <label for="one">Yes</label>
                          <Field type="radio" name="availability" value="Yes" v-model="picked" />
                        </div>
                      </div>
                      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div class="form-group">
                          <label for="two">No</label>
                          <Field type="radio" name="availability" value="No" v-model="picked" />
                        </div>
                      </div>
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="form-group">
                          <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                      {{ message }}
                    </div>
                  </Form>
                  <hr />
                  <a href="https://systems.treasury.gov.lk/nfams/resources/Vehicle-Confirmation-NFAMS-V-02.pdf" tag="button"> <font-awesome-icon icon="fa-user-circle-o" />Download Vehicle Confirmation Form (CGO/NFAMS/V/02) </a>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <table style="text-align: left" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th></th>
                        <th>Condition</th>
                      </tr>
                    </thead>
                    <tr v-for="item in items2" :key="item">
                      <td>Whether the Institution has Vehicles :</td>
                      <td>{{ item.availability }}</td>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="items2 == []">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div>
        <div class="a-box align-self-center">
          <div class="text-container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Registration numbers of the vehicles owned by the institution and given to other institutions</li>
              </ol>
            </nav>
            <hr />

            <div style="text-align: left; display: block">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="userRoles.includes('Verification_Officer')">
                  <Form @submit="handleSave1" :validation-schema="schema">
                    <div class="row">
                      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="form-group">
                          <label style="text-align: justify">Registration No:</label>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div class="form-group">
                          <div class="form-group">
                            <Field name="regNo" type="text" class="form-control" placeholder="Type Registration Number " />
                            <ErrorMessage name="regNo" class="error-feedback" />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div class="form-group">
                          <label style="text-align: justify">Remark:</label>
                        </div>
                      </div>

                      <div class="col-lg-8 col-md-6 col-sm-6 col-xs-6">
                        <div class="form-group">
                          <div class="form-group">
                            <Field name="remark" type="text" as="textarea" class="form-control" placeholder="Type Remark if any " />
                            <ErrorMessage name="remark" class="error-feedback" />
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="form-group">
                          <button class="btn btn-primary btn-block" :disabled="loading1">
                            <span v-show="loading1" class="spinner-border spinner-border-sm"></span>
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-if="message1" class="alert" :class="successful1 ? 'alert-success' : 'alert-danger'">
                      {{ message1 }}
                    </div>
                  </Form>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <table style="text-align: left" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Vehicles Given to Other Institutions</th>
                        <th v-if="userRoles.includes('Verification_Officer')"></th>
                      </tr>
                    </thead>
                    <div v-for="item in items1" :key="item">
                      <tr v-if="item.status == 1">
                        <td style="width: 30%">{{ item.registrationNumber }}</td>
                        <td style="width: 60%">{{ item.remarks }}</td>
                        <td style="width: 20%" v-if="userRoles.includes('Verification_Officer')">
                          <button class="btn btn-danger" @click="deleteRemark(item.id_pk, item.registrationNumber, item.remarks, item.id)">Remove</button>
                        </td>
                      </tr>
                    </div>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="items1 == []">No Data Found.</div>
                </div>
              </div>
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
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import resources_files from "../../services/base_resources"; //this file contains base resourses
import vehicleService from "../../services/VehicleServices/vehicle_service";

export default {
  name: "upload-files",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      regNo: yup
        .string()
        .required("Registration number is required!")
        .matches(/^([A-Z0-9]{1,3}[-SRI]{1,3}[0-9]{4})*$/, "RMV Registered number should be in below pattern. Ex : CAA-0000, NB-0000, 1-0000, 10-0000, 100-0000, 1SRI0000, 10SRI0000")
        .max(10, "Must be maximum 10 characters!"),
      remark: yup
        .string()
        .required("Remark is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, "Please input valid characters.")
        .max(300, "Must be maximum 300 characters!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      successful1: false,
      loading1: false,
      message1: "",
      schema,
      items1: [],
      items2: [],
      userRoles: [],
      picked: "Yes",
    };
  },
  mounted() {
    this.getVehicleDetailsAvailability();
    this.getVehicleDetailsRemarks();
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.userRoles = user.roles;
  },
  methods: {
    handleSave(data) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, I confirm this!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            //** **//
            this.message = "";
            this.successful = false;
            this.loading = true;

            vehicleService.saveVehicleAvailability(data).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                this.getVehicleDetailsAvailability();
                this.getVehicleDetailsRemarks();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.successful = false;
                this.loading = false;
              }
            );
            //** **//
          }
        });
    },
    handleSave1(data) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, I confirm this!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            //** **//
            this.message1 = "";
            this.successful1 = false;
            this.loading1 = true;

            vehicleService.saveGivenVehicles(data).then(
              (response) => {
                this.message1 = response.message;
                this.successful1 = true;
                this.loading1 = false;
                this.getVehicleDetailsAvailability();
                this.getVehicleDetailsRemarks();
              },
              (error) => {
                this.message1 = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.successful1 = false;
                this.loading1 = false;
              }
            );
            //** **//
          }
        });
    },
    getVehicleDetailsAvailability() {
      let entityId = sessionStorage.getItem("entityId");
      return axios
        .get(resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/entity/related/common/vehicle/availability/" + entityId)
        .then((response) => {
          this.items2 = response.data;
        })
        .catch(function (error) {
          return error;
        });
    },
    getVehicleDetailsRemarks() {
      let entityId = sessionStorage.getItem("entityId");
      return axios
        .get(resources_files.backend_url_assert_1() + "/get/api/production/asset/vehicle/backend/restapi/get/all/entity/related/common/vehicle/remarks/" + entityId)
        .then((response) => {
          this.items1 = response.data;
        })
        .catch(function (error) {
          return error;
        });
    },
    deleteRemark(id_pk, regNo, remarks, id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, I confirm this!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            //** **//
            this.message1 = "";
            this.successful1 = false;
            this.loading1 = true;

            vehicleService.updateGivenVehicles(id_pk, regNo, remarks, id).then(
              (response) => {
                this.message1 = response.message;
                this.successful1 = true;
                this.loading1 = false;
                this.getVehicleDetailsAvailability();
                this.getVehicleDetailsRemarks();
              },
              (error) => {
                this.message1 = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.successful1 = false;
                this.loading1 = false;
              }
            );
            //** **//
          }
        });
    },
  },
};
</script>
