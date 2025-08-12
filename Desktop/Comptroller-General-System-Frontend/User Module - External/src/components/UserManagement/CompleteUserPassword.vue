<template>
  <div>
    <div class="a-box align-self-center">
      <div class="img-container">
        <div class="img-inner">
          <div class="inner-skew">
            <img src="../../assets/img/user_profile.png">
          </div>
        </div>
      </div>
      <div class="text-container">
        <Form @submit="handleSave" :validation-schema="schema">
          <div v-show="hidden">
            <div class="form-group">
              <label for="username">User Name</label>
              <Field name="username" type="text" class="form-control" v-model="this.items.username" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="id">ID</label>
              <Field name="id" type="text" class="form-control" v-model="this.items.id" />
              <ErrorMessage name="id" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="userId">User ID</label>
              <Field name="userId" type="text" class="form-control" v-model="this.items.userId" />
              <ErrorMessage name="userId" class="error-feedback" />
            </div>
          </div>

          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgo/"'
                  class="btn-sm btn-link">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Update Password</li>
            </ol>
          </nav>
          <div class="form-group row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="email" class="form-control" v-model="this.items.email" />
                <ErrorMessage name="email" class="error-feedback" />
              </div>
            </div>
          </div>

          <div class="alert alert-info" role="alert">
            <div class="form-group row centreRow">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label for="currentpassword">Your Current Password</label>
                  <Field name="currentpassword" type="password" class="form-control" />
                  <ErrorMessage name="currentpassword" class="error-feedback" />

                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div class="form-group">
                <label for="password">New Password</label>
                <Field name="password" v-model="password_first" type="password" class="form-control"
                  v-on:keyup="checkValidity()" />
                <ErrorMessage name="password" class="error-feedback" />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div class="form-group">
                <label for="password2">Confirm Password</label>
                <Field name="password2" v-model="password_second" type="password" class="form-control"
                  v-on:keyup="checkValidity()" />
                <ErrorMessage name="password" class="error-feedback" />
              </div>
            </div>
          </div>
          <hr />

          <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
            {{ message }}
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Update
            </button>
          </div>
        </Form>

      </div>
    </div>
  </div>
</template>


<style scoped>
.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: 600px;
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

.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 120px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin: -120px 0px 0px 0px;
  line-height: 19px;
  font-size: 14px;
  text-align: left;
}

.text-container h3 {
  margin: 20px 0px 10px 0px;
  font-size: 28px;
}

.centreRow {
  margin: auto;
}
</style>



<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import userservice from '../../services/Auth&UserServices/user.service';

import axios from 'axios';

import resources_files from '../../services/base_resources'; //this file contains base resourses
import jQuery from 'jquery';
window.$ = jQuery;


export default {
  name: "completeUserPassWord",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      userId: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(9, "Must be at least 9 characters!")
        .max(50, "Must be maximum 50 characters!"),
      id: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(1, "Must be at least 3 characters!")
        .max(30, "Must be maximum 30 characters!"),
      username: yup
        .string()
        .required("This is required!")
        .min(10, "Must be at least 10 characters!")
        .max(13, "Must be maximum 13 characters!")
        .matches(/^$|^[0-9]{9}[0-9VXvx]+$/, "Please provide NIC Number in proper format."),
      email: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 30 characters!"),
      password: yup
        .string()
        .required("This is required!")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      password2: yup
        .string()
        .required("This is required!")
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      items: "",
      password_first: "",
      password_second: "",
      messageValue: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    this.changeMessage();
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

            userservice.updateLoginProfile(data).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                this.$store.dispatch('auth/logout');
                this.$router.push('/');
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
    checkValidity() {
      this.messageValue = "";


      if (this.password_first == "") {
        this.message = "";
        return false;
      }

      if (this.password_second == "") {
        this.message = "";
        return false;
      }



      if (!(this.password_first === this.password_second)) {
        this.message = "Password Mismatch.";
        this.successful = false;
        this.loading = false;
        return false;
      } else {
        this.message = "Password Match.";
        this.successful = true;
        this.loading = false;
        return true;
      }
    },
    changeMessage() {

      let user = sessionStorage.getItem('userid');
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/by/id/' + user)
        .then(response => {
          this.items = response.data;
        }).catch(function (error) {
          return error;
        });
    },
  },
};
</script>
