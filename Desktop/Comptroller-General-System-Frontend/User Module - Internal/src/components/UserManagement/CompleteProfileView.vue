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
            <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgoInternal/"'
                class="btn-sm btn-link">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>

        <h3>{{ this.items.nameWithInitials }}</h3>
        <p>{{ this.items.firstName }} {{ this.items.lastName }}</p>
        <p>{{ this.items.nicNumber }}</p>
        <p>{{ this.items.address }} - {{ this.items.city }}</p>
        <p>{{ this.items.contactNumberMobile }} | {{ this.items.contactNumberMobile2 }}</p>
        <p>{{ this.items.email }}</p>
        <hr />

      <b>Access Roles :</b>
        <div v-for="item2 in items_details.roles" :key="item2">
          {{ item2.name }}
        </div>

        <br /><br />
      <b>Access Assets :</b>
        <div v-for="item2 in items_details.assets" :key="item2">
          {{ item2.name }}
        </div>

        <div class="row">
          <router-link to="/complete/profile/edit" class="btn btn-success btn-sm"> Edit Profile</router-link>
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
//import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses

export default {
  data() {
    return {
      user_name: "",
      items: "",
      btn: "",
      items_details: "",
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }, mounted() {
    //this method run when component load to the floating area
    this.changeMessage();
    this.getProfileStatus();
  },
  methods: {
    changeMessage() {
      let user = sessionStorage.getItem('userid');
      return axios
        .get(resources_files.backend_url_internal() + '/api/auth/restapi/get/one/user/profile/by/user/id/' + user)
        .then(response => {
          this.items = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    getProfileStatus() {
      let user = sessionStorage.getItem('userid');
      return axios
        .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/one/user/from/userid/' + user)
        .then(response => {
          this.items_details = response.data;
        }).catch(function (error) {
          return error;
        });
    },
  },
};
</script>
