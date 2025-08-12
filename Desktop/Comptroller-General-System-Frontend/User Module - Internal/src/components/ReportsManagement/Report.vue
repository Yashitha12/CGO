<template>
  <h1>REPORT GENERATION</h1><br>
  <div class="featuredPropBox"><br>
    <div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="a-box2 align-self-center2 ">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/lineupitems.png" style="margin-left: -20px; padding-top: 0px;">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br>
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/entity">Institution Report</router-link>
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/user_profile.png" style="margin-right: -18px; padding-top: 10px;">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br>
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/user">User Report</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr><br>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-if="userAssets.includes('ASSET_VEHICLE')">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/asset/vehicle.jpg" style="margin-left: -20px;">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br>
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/vehicle">Vehicle Report</router-link>
              </button>
            </div>
          </div>
        </div>


        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-if="userAssets.includes('ASSET_BUILDING')">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/asset/building.jpg" style="margin-left: -30px; padding-top: 0px;">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br />
              <!-- <h4>Under Construction</h4><br /> -->
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/building/under/development">Building Report</router-link>
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-if="userAssets.includes('ASSET_LAND')">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/asset/land.jpg" style="margin-left: -20px; padding-top: 0px;">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br />
              <!-- <h4>Under Construction</h4><br /> -->
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/land/under/development">Land Report</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-if="userAssets.includes('ASSET_STRUCTURES')">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/asset/construction.jpg">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br />
              <!-- <h4>Under Construction</h4><br /> -->
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/structure/under/development">Structure Report</router-link>
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-if="userAssets.includes('ASSET_OFFICE_FURNITURE')">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/asset/furniture.jpg">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br />
              <!-- <h4>Under Construction</h4><br /> -->
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/furniture/under/development">Furniture Report</router-link>
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-if="userAssets.includes('ASSET_MACHINERIES')">
          <div class="a-box2 align-self-center2">
            <div class="img-container">
              <div class="img-inner">
                <div class="inner-skew">
                  <img src="../../assets/img/asset/plant.jpg" style="margin-left: -20px; padding-top: 0px;">
                </div>
              </div>
            </div>
            <div class="text-container2">
              <br />
              <br />
              <!-- <h4>Under Construction</h4><br /> -->
              <button class="btn btn-success btn-block">
                <router-link to="/report/generation/machinary/under/development">Machinary Report</router-link>
              </button>
            </div>
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

.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.5);
  display: flex;
  border-radius: 25px;
  position: relative;
  text-align: center;
  width: auto;
}

.card h2 {
  margin: 0;
  padding: 0 1rem;
}

.card .title {
  padding: 1rem;
  text-align: right;
  color: green;
  font-weight: bold;
  font-size: 12px;
}

.card .desc {
  padding: 0.5rem 1rem;
  font-size: 12px;
}

.img-avatar {
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  border: 6px solid white;
  background-image: linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);
  top: 15px;
  left: 85px;
}

.card-text {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.title-total {
  padding: 2.5em 1.5em 1.5em 1.5em;
  width: auto;
}

.portada {
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-image: url(../../assets/img/swat.png);
  background-position: bottom center;
  background-size: cover;
}

.a-box2 {
  text-align: center;
  align-items: center;
  margin-bottom: auto;
}

.img-container {
  height: 130px;
  width: 150px;
  overflow: hidden;
  border-radius: 0px 0px 20px 20px;
  display: inline-block;
}

.img-container img {
  transform: skew(0deg, -13deg);
  height: 150px;
  margin: -25px 0px 0px -70px;
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
  width: 160px;
}

.text-container2 {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 120px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin: -140px 0px 20px 0px;
  line-height: 19px;
  font-size: 14px;
}

.text-container2 h3 {
  margin: 20px 0px 10px 0px;
  font-size: 28px;
}

select {
  font-size: 14px;
  text-align: left;
}

h4 {
  font-weight: 700;
  color: red;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h5 {
  text-align: center;
  font-size: 26px;
}



</style>

<script>

// import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses


export default {
  components: {
    // Form,
    // Field,
    // ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({

    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      listOfVehicles: [],
      userAssets: "",
      reportsLock: "",
      entityIdLog: sessionStorage.getItem("entityId"),

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
    this.userAssets = user.assets;
    this.changeMessage();
  },
  methods: {

    findall() {
      return axios
        .get(resources_files.backend_url_external() + '/api/auth/restapi/get/all/external/personaldetails/profile')
        .then(response => {
          this.listOfVehicles = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    changeMessage() {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/cgo/rules/by/id/' + this.entityIdLog)
        .then(response => {
          this.reportsLock = response.data.reportsLock;
        }).catch(function (error) {
          return error;
        });
    },
  }
};

</script>
