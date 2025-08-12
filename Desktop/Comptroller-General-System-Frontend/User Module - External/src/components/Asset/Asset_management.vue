<template>
  <div class="featuredPropBox">
    <h1>ASSET INFORMATION</h1>
    <div v-if="addAssetsOwn == 0">
        <div class="alert alert-danger" role="alert">
          This function is disabled by the administrator. Please contact CGO for more information.
        </div>
      </div>
    <div v-if="userAssets.includes('NONE')">
      <div class="alert alert-danger" role="alert">
        You don't have any privilege to add assets. Please contact CGO for more details.
      </div>
    </div>
    <ul v-if="addAssetsOwn == 1">
      <li v-if="userAssets.includes('ASSET_VEHICLE')">
        <router-link to="/add/asset/vehicle/external">
          <div class="fplogo"><i class="fa fa-bus" aria-hidden="true"></i>&nbsp; ADD VEHICLE</div>
          <div class="fptext">
            <p>You choose the vehicle asset</p>
          </div>
        </router-link>
      </li>
      <li v-if="userAssets.includes('ASSET_LAND')">
        <router-link to="/add/land">
          <div class="fplogo"><i class="fa fa-bandcamp" aria-hidden="true"></i>&nbsp; ADD LAND</div>
          <div class="fptext">
            <p>You choose the land asset</p>
          </div>
        </router-link>
      </li>
      <li v-if="userAssets.includes('ASSET_BUILDING')">
        <router-link to="/add/bullding">
          <div class="fplogo"><i class="fa fa-building-o" aria-hidden="true"></i>&nbsp; ADD BUILDING</div>
          <div class="fptext">
            <p>You choose the building asset</p>
          </div>
        </router-link>

      </li>
      <li v-if="userAssets.includes('ASSET_STRUCTURES')">
        <router-link to="/add/structure">
          <div class="fplogo"> <i class="fa fa-building" aria-hidden="true"></i>&nbsp; ADD STRUCTURES</div>
          <div class="fptext">
            <p>You choose the structure asset</p>
          </div>
        </router-link>
      </li>
      <li v-if="userAssets.includes('ASSET_OFFICE_FURNITURE')">
        <router-link to="/add/Furniture">
          <div class="fplogo"><i class="fa fa-bed" aria-hidden="true"></i>&nbsp; ADD FURNITURE</div>
          <div class="fptext">
            <p>You choose the furniture asset</p>
          </div>
        </router-link>
      </li>
      <li v-if="userAssets.includes('ASSET_MACHINERIES')">
        <router-link to="/add/plantandmachinary">
          <div class="fplogo"> <i class="fa fa-wrench" aria-hidden="true"></i>&nbsp; ADD MACHINERY</div>
          <div class="fptext">
            <p>You choose the machinery asset</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');

body {
  font-family: 'Open Sans', sans-serif;
}

a:hover {
  text-decoration: none;
}

.np {
  padding: 0px;
}

.featuredPropBox {
  margin: 65px 0;
}

.featuredPropBox h1 {
  color: #021d75c4;
  Font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  font-weight: 400;
  margin-bottom: 45px;
  text-align: center;
  letter-spacing: 0px;
}

.featuredPropBox ul {
  display: flex;
  flex-wrap: wrap;
  list-style: outside none none;
  padding: 0;

}

.featuredPropBox ul li {
  background-color: #eeeeee;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: block;
  height: 250px;
  margin: 5px;
  width: 32%;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;

}

.featuredPropBox ul li:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(22, 22, 22, 0.6);
  transition: all 0.3s;
}

.featuredPropBox ul li:nth-child(1) {
  background-image: url('../../assets/img/asset/vehicle.jpg');
}

.featuredPropBox ul li:nth-child(2) {
  background-image: url('../../assets/img/asset/building.jpg');
}

.featuredPropBox ul li:nth-child(3) {
  background-image: url('../../assets/img/asset/land.jpg');
}

.featuredPropBox ul li:nth-child(4) {
  background-image: url('../../assets/img/asset/construction.jpg');
}

.featuredPropBox ul li:nth-child(5) {
  background-image: url('../../assets/img/asset/furniture.jpg');
}

.featuredPropBox ul li:nth-child(6) {
  background-image: url('../../assets/img/asset/plant.jpg');
}



.featuredPropBox ul li .fplogo {
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  z-index: 1;
  transition: all 0.3s;
}

.featuredPropBox ul li .fplogo img {
  width: 100%;
}

.featuredPropBox ul li .fptext {
  display: none;
  font-size: 16px;
  left: 50%;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease 0s;
  width: 65%;
  z-index: 1;
}

.featuredPropBox ul li .fptext p {
  color: #fff;
  margin: 0px;
}

.featuredPropBox ul li:hover {
  box-shadow: 0 0 0 25px rgba(0, 0, 0, 0.2) inset;
}

.featuredPropBox ul li:hover:after {
  background-color: rgba(22, 22, 22, 0.3);
}

.featuredPropBox ul li:hover .fplogo {
  display: none;
}

.featuredPropBox ul li:hover .fptext {
  display: block;
}

.fplogo {
  color: #fff;
  font-size: 20px;

}

h1 {
  font-size: 28px;
  font-family: serif;

}
</style>


<script>
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses

export default {
  name: "completeProfile",
  data() {
    return {
      addAssetsOwn: 1,
      entityIdLog: sessionStorage.getItem("entityId"),
      userAssets: ""
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }, mounted() {
    //this method run when component load to the floating area
    this.changeMessage();
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.userAssets = user.assets;
  },
  methods: {
    changeMessage() {
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/cgo/rules/by/id/' + this.entityIdLog)
        .then(response => {
          this.addAssetsOwn = response.data.addAssetsOwn;
        }).catch(function (error) {
          return error;
        });
    },
  }
};
</script>