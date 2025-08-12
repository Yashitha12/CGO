<template>
  <div class="row">
    <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12">
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
                  <li class="breadcrumb-item active" aria-current="page">View User - Internal</li>
                </ol>
              </nav>

              <h3>{{ this.items.nameWithInitials }}</h3>
              <p>{{ this.items.firstName }} {{ this.items.lastName }}</p>
              <p>{{ this.items.nicNumber }}</p>
              <p>{{ this.items.address }} - {{ this.items.city }}</p>
              <p>{{ this.items.contactNumberMobile }} | {{ this.items.contactNumberMobile2 }}</p>
              <p>{{ this.items.email }}</p>
              <br /><br /><br />
              Updated date : {{ this.items.dateLog }} {{ this.items.timeLog }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-7 col-md-12 col-sm-12 col-xs-12">
      <div class="card card-container" style="padding-top: 20px;">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgoInternal/"'
                class="btn-sm btn-link">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Access Details</li>
          </ol>
        </nav>
        <Form @submit="handleRegister" :validation-schema="schema">
          <div v-if="!successful1">
            <div class="form-group row">
              <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <label for="email">Email</label>
                <Field name="email" type="email" class="form-control" v-model="items2.email" readonly="true" />
                <ErrorMessage name="email" class="error-feedback" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label for="username">User Name</label>
                <Field name="username" type="text" class="form-control" v-model="items2.username" readonly="true" />
                <ErrorMessage name="username" class="error-feedback" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12">
                <label for="accessroles">Current Access Roles</label>
                <div v-for="item in items2.roles" :key="item">
                  - {{ item.name }}
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <label for="accessroles">Current Access Assets</label>
                <div v-for="item in items2.assets" :key="item">
                  - {{ item.name }}
                </div>
              </div>
            </div>
            <hr />

            <div class="alert alert-primary" role="alert">
              <div class="alert alert-danger" role="alert">
                You can update access roles and accessible assets types from here.
              </div>

              <div class="form-group row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="role">Access Role</label>
                    <Field name="role" class="form-control" as="select" multiple size="8" v-model="items2.roles">
                      <option value="ADMIN">ADMIN</option>
                      <option value="USERS_MANAGEMENT_INTERNAL_OFFICER">USERS MANAGEMENT INTERNAL OFFICER</option>
                      <option value="USERS_MANAGEMENT_EXTERNAL_OFFICER">USERS MANAGEMENT EXTERNAL OFFICER</option>
                      <option value="USERS_VIEWER_EXTERNAL_OFFICER">USERS VIEWER EXTERNAL OFFICER</option>
                      <option value="TRANSFER_ACCEPTANCE_OFFICER">TRANSFER ACCEPTANCE OFFICER</option>
                      <option value="TRANSFER_APPROVAL_OFFICER">TRANSFER APPROVAL OFFICER</option>
                      <option value="EDIT_APPROVAL_OFFICER">EDIT APPROVAL OFFICER</option>
                      <option value="REPORTS_GENERATOR">REPORTS GENERATOR</option>
                      <option value="CGO_VIEWER">CGO VIEWER</option>
                      <option value="AUDIT_OFFICER">AUDIT OFFICER</option>
                    </Field>
                    <ErrorMessage name="role" class="error-feedback" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="asset">Access Unit</label>
                    <Field name="asset" class="form-control" as="select" multiple size="8" v-model="items2.assets">
                      <option value="" disabled>Select</option>
                      <option value="ASSET_LAND">LAND</option>
                      <option value="ASSET_BUILDING">BUILDING</option>
                      <option value="ASSET_VEHICLE">VEHICLE</option>
                      <option value="ASSET_STRUCTURES">STRUCTURES</option>
                      <option value="ASSET_OFFICE_FURNITURE">OFFICE FURNITURE</option>
                      <option value="ASSET_MACHINERIES">MACHINERIES</option>
                    </Field>
                    <ErrorMessage name="asset" class="error-feedback" />
                  </div>
                </div>
              </div>
              <div class="form-group"
                v-if="userRoles.includes('SUPER_ADMIN') || userRoles.includes('ADMIN') || userRoles.includes('USERS_MANAGEMENT_INTERNAL_OFFICER')">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading1" class="spinner-border spinner-border-sm"></span>
                  Update
                </button>
              </div>
            </div>
          </div>
        </Form>

        <div v-if="message1" class="alert" :class="successful1 ? 'alert-success' : 'alert-danger'">
          {{ message1 }}
        </div>
      </div>
      <div>
        <div class="a-box align-self-center">
          <div class="card card-container" style="padding-top: 20px;">
            <Form @submit="handleSave" :validation-schema="schema1">
              <Field name="id" type="hidden" class="form-control" v-model="items.id" />
              <Field name="userId" type="hidden" class="form-control" v-model="items.userId" />
              <div v-if="!successful">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Profile Update - {{ items.firstName }}
                      {{ items.lastName }}</li>
                  </ol>
                </nav>
                <hr />

                <div class="form-group row d-none">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                      <label for="firstName">First Name</label>
                      <Field name="firstName" type="text" class="form-control" v-model="items.firstName"
                        readonly="true" />
                      <ErrorMessage name="firstName" class="error-feedback" />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                      <label for="lastName">Last Name</label>
                      <Field name="lastName" type="text" class="form-control" v-model="items.lastName"
                        readonly="true" />
                      <ErrorMessage name="lastName" class="error-feedback" />
                    </div>
                  </div>
                </div>

                <div class="form-group row d-none">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <div class="form-group">
                      <label for="nameWithInitials">Name with Initials</label>
                      <Field name="nameWithInitials" type="text" class="form-control" v-model="items.nameWithInitials"
                        readonly="true" />
                      <ErrorMessage name="nameWithInitials" class="error-feedback" readonly="true" />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <div class="form-group">
                      <label for="nicNumber">NIC Number</label>
                      <Field name="nicNumber" type="text" class="form-control" v-model="items.nicNumber"
                        readonly="true" />
                      <ErrorMessage name="nicNumber" class="error-feedback" />
                    </div>
                  </div>
                </div>

                <div class="form-group row d-none">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                    <div class="form-group">
                      <label for="address">Address</label>
                      <Field name="address" type="text" class="form-control" v-model="items.address" readonly="true" />
                      <ErrorMessage name="address" class="error-feedback" />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <div class="form-group">
                      <label for="city">City</label>
                      <Field name="city" type="text" class="form-control" v-model="items.city" readonly="true" />
                      <ErrorMessage name="city" class="error-feedback" />
                    </div>
                  </div>
                </div>

                <div class="form-group row d-none">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                      <label for="contactNumberMobile">Contact Number - Direct</label>
                      <Field name="contactNumberMobile" type="text" class="form-control"
                        v-model="items.contactNumberMobile" readonly="true" />
                      <ErrorMessage name="contactNumberMobile" class="error-feedback" />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                      <label for="contactNumberMobile2">Contact Number - Mobile </label>
                      <Field name="contactNumberMobile2" type="text" class="form-control"
                        v-model="items.contactNumberMobile2" readonly="true" />
                      <ErrorMessage name="contactNumberMobile2" class="error-feedback" />
                    </div>
                  </div>
                </div>
                <div class="form-group row d-none">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <Field name="email" type="text" class="form-control" v-model="items.email" readonly="true" />
                      <ErrorMessage name="email" class="error-feedback" />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label for="status">Status</label>
                      <Field name="status" class="form-control" as="select" v-model="items.status">
                        <option value="3">ACTIVE</option>
                        <option value="0">INACTIVE</option>
                      </Field>
                      <ErrorMessage name="status" class="error-feedback" />
                    </div>
                  </div>
                </div>
                <div class="form-group"
                  v-if="userRoles.includes('SUPER_ADMIN') || userRoles.includes('ADMIN') || userRoles.includes('USERS_MANAGEMENT_INTERNAL_OFFICER')">
                  <button class="btn btn-primary btn-block" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    Update
                  </button>
                </div>
              </div>
            </Form>


            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
              {{ message }}
            </div>
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
</style>




<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from '../../services/Auth&UserServices/user.service';

import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses

export default {
  name: "completeProfile",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      role: yup
        .array().min(1)
        .required("This is required!"),
      asset: yup
        .array().min(1)
        .required("This is required!"),
    });

    const schema1 = yup.object().shape({
      status: yup
        .string(),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      successful1: false,
      loading1: false,
      message1: "",
      schema,
      schema1,
      items: [],
      items2: [],
      userRoles: [],
      dataParam: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    //this method run when component load to the floating area
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.userRoles = user.roles;

    this.dataParam = this.$route.params.id;
    this.changeMessage();
    this.changeMessage2();
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

            UserService.updateProfileSuperAdmin(data).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                this.changeMessage();
                this.changeMessage2();
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
    changeMessage() {
      return axios
        .get(resources_files.backend_url_internal() + '/api/auth/restapi/get/one/user/profile/by/user/id/' + this.dataParam)
        .then(response => {
          this.items = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    changeMessage2() {
      return axios
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/one/user/from/userid/' + this.dataParam)
        .then(response => {
          this.items2 = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    handleRegister(user) {
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
            this.message1 = "";
            this.successful1 = false;
            this.loading1 = true;

            this.$store.dispatch("auth/updatePermissionsInternal", user).then(
              (data) => {
                this.message1 = data.message;
                this.successful1 = true;
                this.loading1 = false;
              },
              (error) => {
                this.message1 =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.successful1 = false;
                this.loading1 = false;
              }
            );
            //** **//
          }
        }
        );
    },
  },
};

</script>
