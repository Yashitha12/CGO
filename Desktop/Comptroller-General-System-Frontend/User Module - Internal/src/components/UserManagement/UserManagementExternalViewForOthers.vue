<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                  <li class="breadcrumb-item active" aria-current="page">View User - External</li>
                </ol>
              </nav>

              <h3>{{ this.items.nameWithInitials }}</h3>
              <p>{{ this.items.firstName }} {{ this.items.lastName }}</p>
              <p>{{ this.items.nicNumber }}</p>
              <p>{{ this.items.address }} - {{ this.items.city }}</p>
              <p>{{ this.items.contactNumberMobile }} | {{ this.items.contactNumberMobile2 }}</p>
              <p>{{ this.items.email }}</p>
              <a v-bind:href="url2" class="btn btn-success">View Office ID</a>
              &nbsp; 
              <br>
              <br>
              <a v-bind:href="url1" class="btn btn-success">Registration Form (CGO/NFAMS/G/01)</a>
              <hr />

              <br />
              <div class="alert alert-success">
                <p><b>{{ entityData.name }}</b></p>
                <p>{{ entityData.address }}</p>
                <p>{{ entityData.contactNumberFixed }} {{ entityData.contactNumber }} {{ entityData.email }}</p>
              </div>

              <br /><br /><br />
              Updated date : {{ this.items.dateLog }} {{ this.items.timeLog }}
            </div>
          </div>
          <hr>

          <div v-if="message2" class="alert" :class="successful2 ? 'alert-success' : 'alert-danger'">
            {{ message2 }}
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
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses

export default {
  name: "completeProfile",
  data() {
    return {
      successful: false,
      loading: false,
      message: "",
      successful1: false,
      loading1: false,
      message1: "",
      successful2: false,
      loading2: false,
      message2: "",
      items: [],
      items2: [],
      url1: "",
      url2: "",
      userRoles: [],
      entityData: [],
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
    changeMessage() {
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/profile/by/user/id/' + this.dataParam)
        .then(response => {
          this.items = response.data;
          this.url1 = "https://systems.treasury.gov.lk/external/" + this.items.attachmentRequestLetter;
          this.url2 = "https://systems.treasury.gov.lk/external/" + this.items.attachmentOfficeId;
          this.changeMessage3(this.items.entityId);
        }).catch(function (error) {
          return error;
        });
    },
    changeMessage2() {
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/by/id/' + this.dataParam)
        .then(response => {
          this.items2 = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    changeMessage3(data) {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/entity/' + data)
        .then(response => {
          this.entityData = response.data;
        }).catch(function (error) {
          return error;
        });
    },
  },
};

</script>

