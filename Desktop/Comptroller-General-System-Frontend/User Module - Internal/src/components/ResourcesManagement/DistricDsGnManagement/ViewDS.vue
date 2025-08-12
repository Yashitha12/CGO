<template>
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
                    <li class="breadcrumb-item active" aria-current="page">View Divisional Secretariats</li>
                  </ol>
                </nav>
                <hr />
                <div>

                  <h4> {{ this.itemsdsName }} - Divisional Secretariat </h4>
                  <hr />

                  <table style="text-align: left;" class="table">
                    <thead class="thead-dark">
                      <tr>
                        <th>Grama Niladari</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tr v-for="item in itemsgn" :key="item">
                      <td> {{ item.gn }}</td>
                      <router-link :to="{ name: 'gnUpdate', params: { id: item.id, id2: item.id_pk, id3: item.gn } }"
                        class="btn btn-sm btn-danger" style="margin: 5px;"> Update
                      </router-link>
                    </tr>
                  </table>
                  <div class="alert alert-danger" role="alert" v-if="itemsgn == []">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center text-align-left">
        <div class="card card-container">
          <Form @submit="handleSave" :validation-schema="schema">
            <div v-if="!successful">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page"><a
                      onclick='window.location.href = "/cgoInternal/"' class="btn-sm btn-link">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Add Grama Niladhari</li>
                </ol>
              </nav>
              <Field name="id" type="hidden" class="form-control" v-model="this.$route.params.id" />
              <div class="form-group row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <label for="name">Grama Niladhari division Name</label>
                    <Field name="name" type="text" class="form-control" />
                    <ErrorMessage name="name" class="error-feedback" />
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
import district_ds_gn_service from '../../../services/ExternalServices/district_ds_gn.service';

import axios from 'axios';
import resources_files from '../../../services/base_resources'; //this file contains base resourses

export default {
  name: "completeProfile",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("This is required!")
        .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 100 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      itemsdistrict: [],
      itemsdsName: "",
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

            district_ds_gn_service.saveGN(data).then(
              (response) => {
                this.message = response.message;
                this.successful = true;
                this.loading = false;
                this.changeMessageActive();
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
      this.dataParam = this.$route.params.id;

      return axios
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/one/contds/' + this.dataParam)
        .then(response => {
          this.itemsObject = response.data;
          this.itemsgn = this.itemsObject.data;
          this.itemsdsName = response.data.ds;
        }).catch(function (error) {
          return error;
        });
    },
  },
};

</script>

