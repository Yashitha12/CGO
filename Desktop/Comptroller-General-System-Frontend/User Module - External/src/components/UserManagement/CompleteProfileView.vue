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

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgo/"'
                class="btn-sm btn-link">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
        <h3>{{ this.items.nameWithInitials }}</h3>
        <br/>{{ this.items.firstName }} {{ this.items.lastName }}
        <br/>{{ this.items.nicNumber }}
        <br/>{{ this.items.address }} - {{ this.items.city }}
        <br/>{{ this.items.contactNumberMobile }} | {{ this.items.contactNumberMobile2 }}
        <br/>{{ this.items.email }}

        <hr />
        <div class="alert alert-success">
          <p><b>{{ entityData.name }}</b></p>
          <p>{{ entityData.address }}</p>
          <p>{{ entityData.contactNumberFixed }} {{ entityData.contactNumber }} {{ entityData.email }}</p>
        </div>
        <hr />
        <a v-bind:href="url2" class="btn btn-primary">Office ID</a>
        <br/><br/>
        <a v-bind:href="url1" class="btn btn-primary">Registration Form (CGO/NFAMS/G/01)</a>
        
        <hr />
        <br/>
        <div class="row">
          <router-link to="/complete/profile/edit" class="btn btn-success"> Edit Profile</router-link>
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
  width: 800px;
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
}

.text-container h3 {
  margin: 20px 0px 10px 0px;
  font-size: 28px;
}
</style>



<script>
import axios from 'axios';
//import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses

export default {
  data() {
    return {
      user_name: "",
      items: "",
      btn: "",
      url1: "",
      url2: "",
      entityData: [],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }, mounted() {
    //this method run when component load to the floating area
    this.changeMessage();
    this.changeMessage3();
  },
  methods: {
    changeMessage() {
      let user = sessionStorage.getItem('userid');
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/one/user/profile/by/user/id/' + user)
        .then(response => {
          this.items = response.data;
          this.url1 = "https://systems.treasury.gov.lk/external/" + this.items.attachmentRequestLetter;
          this.url2 = "https://systems.treasury.gov.lk/external/" + this.items.attachmentOfficeId;
        }).catch(function (error) {
          return error;
        });
    },
    changeMessage3() {
    let entityId = sessionStorage.getItem('entityId');
    return axios
      .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/entity/' + entityId)
      .then(response => {
        this.entityData = response.data;
      }).catch(function (error) {
        return error;
      });
  },
  },
};
</script>
