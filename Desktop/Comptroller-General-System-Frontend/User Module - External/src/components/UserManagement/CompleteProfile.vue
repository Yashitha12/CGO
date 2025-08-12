<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="card card-container">
        <img id="profile-img" src="../../assets/img/profile_update_png.png" class="profile-img-card" />
        <Form @submit="handleSave" :validation-schema="schema">
          <div v-if="!successful">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Home</li>
                <li class="breadcrumb-item active" aria-current="page">Profile Complete</li>
              </ol>
            </nav>
            <hr />

            <div class="form-group row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <Field name="firstName" type="text" class="form-control" />
                  <ErrorMessage name="firstName" class="error-feedback" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <Field name="lastName" type="text" class="form-control" />
                  <ErrorMessage name="lastName" class="error-feedback" />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label for="nameWithInitials">Name with Initials</label>
                  <Field name="nameWithInitials" type="text" class="form-control" />
                  <ErrorMessage name="nameWithInitials" class="error-feedback" />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <div class="form-group">
                  <label for="address">Address</label>
                  <Field name="address" type="text" class="form-control" />
                  <ErrorMessage name="address" class="error-feedback" />
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <div class="form-group">
                  <label for="city">City</label>
                  <Field name="city" type="text" class="form-control" />
                  <ErrorMessage name="city" class="error-feedback" />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="contactNumberMobile">Contact Number - Direct</label>
                  <Field name="contactNumberMobile" type="text" class="form-control" />
                  <ErrorMessage name="contactNumberMobile" class="error-feedback" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="contactNumberMobile2">Contact Number - Mobile</label>
                  <Field name="contactNumberMobile2" type="text" class="form-control" />
                  <ErrorMessage name="contactNumberMobile2" class="error-feedback" />
                </div>
              </div>
            </div>

            ------Reminder ------<br />
            1.Type your institution(Organization) name.<br />
            2.Choose your institution from the dropdown list.<br />
            3.Click on "select" button.<br /><br />

            <div class="form-group row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label for="entityId">Institution (Organization)</label>
                  <Field name="entityId" type="hidden" class="form-control" v-model="this.entitysearchRealValue" />
                  <input type="text" class="form-control" v-on:keyup="searchPagablegivenIndex"
                    v-model="this.entitysearch2" />
                  <ErrorMessage name="entityId" class="error-feedback" />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div v-for="item in itemsgivenIndex" :key="item">
                  <div class="alert alert-primary" role="alert">
                    <p>
                      <b>{{ item.name }}</b>
                      <br />
                      <button class="btn btn-success btn-sm" @click="getID(item.id, item.name)">Select
                      </button>
                    </p>
                    {{ item.address }} <br /> {{ item.email }}
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div class="form-group row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <a href="https://systems.treasury.gov.lk/nfams/resources/NFAMS-G-01.pdf" class="font-weight-bold">Download
                  User Registration Form <br> (CGO/NFAMS/G/01)</a>
              </div>
            </div>
            <hr />

            <div class="form-group row">
              <b style="color:red;">Please upload PDF Files only.</b>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="fileData1">User's Office ID</label>
                  <input type="file" name="fileData1" @change="handleFileUpload1($event)" />
                </div>
                <ErrorMessage name="fileData1" class="error-feedback" />
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div class="form-group">
                  <label for="fileData2">User Registration Form (CGO/NFAMS/G/01)</label>
                  <input type="file" name="fileData2" @change="handleFileUpload2($event)" />
                </div>
                <ErrorMessage name="fileData2" class="error-feedback" />
              </div>
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                Save
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
</template>



<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import userservice from '../../services/Auth&UserServices/user.service';

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
      firstName: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(3, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!")
        .typeError("Please Input Valid Data."),
      lastName: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(3, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!")
        .typeError("Please Input Valid Data."),
      nameWithInitials: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(5, "Must be at least 5 characters!")
        .max(100, "Must be maximum 100 characters!")
        .typeError("Please Input Valid Data."),
      address: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(10, "Must be at least 10 characters!")
        .max(200, "Must be maximum 200 characters!")
        .typeError("Please Input Valid Data."),
      city: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(2, "Must be at least 2 characters!")
        .max(50, "Must be maximum 50 characters!")
        .typeError("Please Input Valid Data."),
      contactNumberMobile: yup
        .string()
        .required("This is required!")
        .min(10, "Must be add proper contact number!")
        .max(10, "Must be add proper contact number!")
        .matches(/^\d+$/, "Enter numbers only.")
        .typeError("Please Input Valid Data."),
      contactNumberMobile2: yup
        .string()
        .min(10, "Must be add proper contact number!")
        .max(10, "Must be add proper contact number!")
        .matches(/^\d+$/, "Enter numbers only.")
        .typeError("Please Input Valid Data."),
      entityId: yup
        .string()
        .required("This is required!")
        .max(40, "Must be maximum 40 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .typeError("Please Input Valid Data."),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      outputData: [],
      file1: '',
      file2: '',
      nic: "",
      emailaddress: "",
      entitysearchRealValue: "",
      itemsgivenIndex: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {

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

            if (this.file1 == '') {
              this.message = "Please upload relevent documents.";
              this.successful = false;
              this.loading = false;
              return "Please upload file";
            }

            if (this.file2 == '') {
              this.message = "Please upload relevent documents.";
              this.successful = false;
              this.loading = false;
              return "Please upload file";
            }

            userservice.saveProfile(data, this.file1, this.file2).then(
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
    },
    handleFileUpload1(event) {
      this.file1 = event.target.files[0];
    },
    handleFileUpload2(event) {
      this.file2 = event.target.files[0];
    },
    searchPagablegivenIndex() {

      this.entitysearchRealValue = "";


      this.entityIdSub = "";
      this.id2 = "";
      this.address2 = "";
      this.city2 = "";
      this.contactnumber2 = "";
      this.fax2 = "";
      this.email2 = "";

      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entities/like/pagable/' + this.entitysearch2 + "/" + "1" + "/100")
        .then(response => {
          this.itemsgivenIndex = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    getID(message, name) {
      this.entitysearchRealValue = message;
      this.itemsgivenIndex = [];
      this.entitysearch2 = name;

    },
  },
};

</script>




