<template>
  <div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="a-box align-self-center">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/news.png">
                </div>
              </div>
            </div>

            <div class="text-container">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page"><a
                      onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">View News</li>
                </ol>
              </nav>

              <h3>{{ this.items.heading }}</h3>
              <hr />
              <h5>{{ this.items.content }}</h5>

              <br /><br /><br />
              posted date : {{ this.items.dateLog }} {{ this.items.timeLog }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div>
        <div class="a-box align-self-center">
          <div class="card card-container" style="padding-top:20px;">
            <img id="profile-img" src="../../assets/img/hero-img.png" class="profile-img-card" />
            <Form @submit="handleSave" :validation-schema="schema">
              <Field name="id" type="hidden" class="form-control" v-model="this.items.id" />
              <div v-if="!successful">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Update News</li>
                  </ol>
                </nav>
                <hr />
                <div class="form-group row">
                  <div class="col-lg-12 col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                      <label for="newsHeading">News Heading</label>
                      <Field name="newsHeading" type="text" class="form-control" v-model="this.items.heading" />
                      <ErrorMessage name="newsHeading" class="error-feedback" />
                    </div>
                  </div>
                </div>


                <div class="form-group row">
                  <div class="col-lg-12 col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                      <label for="newsContentData">News Content</label>
                      <Field name="newsContentData" type="hidden" class="form-control" v-model="this.items.content" />
                      <textarea v-model="this.items.content" type="text" class="form-control"></textarea>
                      <ErrorMessage name="newsContentData" class="error-feedback" />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label for="status">Status</label>
                      <Field name="status" class="form-control" as="select" v-model="this.items.status">
                        <option value="1">ACTIVE</option>
                        <option value="0">INACTIVE</option>
                      </Field>
                      <ErrorMessage name="status" class="error-feedback" />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-danger btn-block" :disabled="loading">
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
  font-size: 20px;
}

.text-container h5 {
  margin: 20px 0px 10px 0px;
  font-size: 14px;
}

</style>




<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import newsservice from '../../services/ExternalServices/news.service';

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
      newsHeading: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 100 characters!"),
      newsContentData: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(10, "Must be at least 10 characters!")
        .max(1000, "Must be maximum 1000 characters!"),
      status: yup
        .string()
        .required("This is required!")
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      items: [],
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
    this.dataParam = this.$route.params.id;
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

            newsservice.updateNews(data).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                this.changeMessage();
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
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/one/news/' + this.dataParam)
        .then(response => {
          this.items = response.data;
        }).catch(function (error) {
          return error;
        });
    },
  },
};
</script>

