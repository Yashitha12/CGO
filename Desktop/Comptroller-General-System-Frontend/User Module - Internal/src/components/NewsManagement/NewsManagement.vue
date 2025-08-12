<template>
  <h1>NEWS MANAGEMENT</h1><br>
  <div class="row">
    <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div class="a-box align-self-center">
              <div class="text-container">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">List of News Items - Activated news</li>
                  </ol>
                </nav>
                <hr />
                <div>
                  <table style="text-align: left;" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Headline News</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsactive" :key="item">
                      <td> {{ item.heading }}</td>
                      <router-link :to="{ name: 'NewsManagementView', params: { id: item.id } }"
                        class="btn btn-sm btn-success" style="margin: 5px;">
                        View
                      </router-link>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsactive == []">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div class="a-box align-self-center">
              <div class="text-container">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page"><a
                        onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">List of News Items - Archived news</li>
                  </ol>
                </nav>
                <hr />
                <div class="row">
                  <div class="input-group">
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">Return</span>
                    </div>
                    <select class="form-control" v-model="paramLenthInactive" v-on:change="changeMessageInActive">
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
                <div>

                  <table style="text-align: left;" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Headline News</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsinactive" :key="item">
                      <td> {{ item.heading }}</td>
                      <router-link :to="{ name: 'NewsManagementView', params: { id: item.id } }"
                        class="btn btn-sm btn-success" style="margin: 5px;">
                        View
                      </router-link>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsinactive == []">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="card card-container" style="padding-top:20px;">
          <img id="profile-img" src="../../assets/img/hero-img.png" class="profile-img-card" />
          <Form @submit="handleSave" :validation-schema="schema">
            <div v-if="!successful">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page"><a
                      onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Add News</li>
                </ol>
              </nav>
              <hr />
              <div class="form-group row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="newsHeading">Headline News</label>
                    <Field name="newsHeading" type="text" class="form-control" />
                    <ErrorMessage name="newsHeading" class="error-feedback" />
                  </div>
                </div>
              </div>


              <div class="form-group row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="newsContentData">News Content</label>
                    <Field name="newsContentData" type="hidden" class="form-control" v-model="this.content" />
                    <textarea v-model="this.content" type="text" class="form-control"></textarea>
                    <ErrorMessage name="newsContentData" class="error-feedback" />
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
  </div>
</template>


<style scoped>

h1 {
  color: #021d75c4;
  Font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  font-weight: 400;
  margin-bottom: 45px;
  text-align: center;
  letter-spacing: 0px;
  font-size:1.5rem;
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

.card__apply {
  margin-right: 20px;
  margin-left: 20px;
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
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      itemsactive: [],
      itemsinactive: [],
      content: "",
      paramLenthInactive: 10
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    //this method run when component load to the floating area
    this.changeMessageActive();
    this.changeMessageInActive();
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

            newsservice.saveNews(data).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                this.changeMessageActive();
                this.changeMessageInActive();
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
    changeMessageActive() {
      return axios
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/all/news/by/pagable/1/1000')
        .then(response => {
          this.itemsactive = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    changeMessageInActive() {
      return axios
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/all/news/by/pagable/0/' + this.paramLenthInactive)
        .then(response => {
          this.itemsinactive = response.data;
        }).catch(function (error) {
          return error;
        });
    },
  },
};

</script>

