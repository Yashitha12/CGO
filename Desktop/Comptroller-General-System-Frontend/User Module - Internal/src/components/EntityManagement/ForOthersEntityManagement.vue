<template>
  <div class="row">
    <h1>INSTITUTION DETAILS</h1>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew">
              <img src="../../assets/img/lineupitems.png">
            </div>
          </div>
        </div>

        <div class="text-container">
          <div class="row">
            <router-link to="/entity/management/data/list" class="btn btn-success btn-lg">
              <font-awesome-icon icon="fa-user-circle-o" />
              External Institutions
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <br />
        <br />
        <router-view name="helper"></router-view>
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
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }, mounted() {
    //this method run when component load to the floating area
    this.changeMessage();
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
  },
};
</script>
