<template>
  <div class="row">
    <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
      <homeFile></homeFile>
    </div>
    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
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
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <div class="form-group">
                  <label for="nameWithInitials">Name with Initials</label>
                  <Field name="nameWithInitials" type="text" class="form-control" />
                  <ErrorMessage name="nameWithInitials" class="error-feedback" />
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <div class="form-group">
                  <label for="nicNumber">NIC Number</label>
                  <Field name="nicNumber" type="text" class="form-control" v-model="this.nic" readonly='true' />
                  <ErrorMessage name="nicNumber" class="error-feedback" />
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
                  <label for="contactNumberMobile">Contact Number - Direct Number</label>
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
            <div class="form-group row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label for="email">Email</label>
                  <Field name="email" type="text" class="form-control" v-model="this.emailaddress" readonly='true' />
                  <ErrorMessage name="email" class="error-feedback" />
                </div>
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

//import axios from 'axios';

//import resources_files from '../../services/base_resources'; //this file contains base resourses

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
        .min(3, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .typeError("Please Input Valid Data."),
      lastName: yup
        .string()
        .required("This is required!")
        .min(3, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .typeError("Please Input Valid Data."),
      nameWithInitials: yup
        .string()
        .required("This is required!")
        .min(5, "Must be at least 5 characters!")
        .max(100, "Must be maximum 100 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .typeError("Please Input Valid Data."),
      nicNumber: yup
        .string()
        .required("This is required!")
        .min(10, "Must be at least 10 characters!")
        .max(12, "Must be maximum 12 characters!")
        .matches(/^$|^[0-9]{9}[0-9VXvx]+$/, "Please provide NIC Number in proper format.")
        .typeError("Please Input Valid Data."),
      address: yup
        .string()
        .required("This is required!")
        .min(10, "Must be at least 10 characters!")
        .max(200, "Must be maximum 200 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .typeError("Please Input Valid Data."),
      city: yup
        .string()
        .required("This is required!")
        .min(2, "Must be at least 2 characters!")
        .max(50, "Must be maximum 50 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
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
      email: yup
        .string()
        .required("This is required!")
        .email("Email is invalid!")
        .min(10, "Must be at least 10 characters!")
        .max(100, "Must be maximum 100 characters!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .typeError("Please Input Valid Data."),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      outputData: "",
      nic: "",
      emailaddress: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.nic = user.username;
    this.emailaddress = user.email;
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

            userservice.saveProfile(data).then(
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




