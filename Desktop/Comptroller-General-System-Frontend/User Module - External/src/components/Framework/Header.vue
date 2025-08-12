<template>
  <header id="header">
    <div class="container d-flex align-items-center ">
      <div class="row">

        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="h-100 d-flex align-items-center justify-content-center">
            <div>
              <nav id="navbar" class="navbar">
                <ul>
                  <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div class="h-100 d-flex align-items-center justify-content-center">
                      <div>
                        <h1 style="font-size: 16px;" id="logo" class="logo me-auto"></h1>
                      </div>
                    </div>
                  </div>
                  <li>
                    <a id="headerLink" style="cursor: pointer;" onclick='window.location.href = "/cgo/"'
                      class="nav-link scrollto">| HOME</a>
                  </li>
                  <li class="d-none d-sm-block">
                    <a id="headerLink" class="nav-link scrollto" href="https://www.treasury.gov.lk/">| Ministry of
                      Finance, Economic Stabilization & National Policies
                    </a>
                  </li>
                  <div v-if="currentUser">
                    <li>
                      <div class="btn-group" id="headerLink">
                        <button type="button" class="btn btn-lin dropdown-toggle" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          <img src="../../assets/img/user-label.png" />
                          {{ profileUserNameDetails() }}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <div v-if="profileStatusDetails() !== '0' && profileStatusDetails() !== '4'">
                            <!-- WHEN USER PROFILE NOT COMPLETED,THE PROFILE VIEW PAGE WILL BLOCK -->
                            <div class="router">
                              <router-link to="/complete/profile/view" tag="button">
                                <font-awesome-icon icon="fa-user-circle-o" /> Profile
                              </router-link>
                            </div>
                          </div>
                          &nbsp;
                          <div class="router">
                            <router-link to="/change/password" tag="button">
                              <font-awesome-icon icon="fa-user-circle-o" /> Change Password
                            </router-link>
                          </div>
                          &nbsp;
                          <hr />
                          <div class="router">
                            <a href="https://systems.treasury.gov.lk/nfams/resources/NFAMS-Vehicle-Guidelines.pdf"
                              tag="button">
                              <font-awesome-icon icon="fa-user-circle-o" /> User Manual - Vehicle
                            </a>
                          </div>
                          &nbsp;
                          <div class="">
                            <a class="getstarted scrollto btn btn-danger" @click.prevent="logOut">
                              <font-awesome-icon icon="sign-out-alt" />&nbsp; LogOut
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <section id="hero" class="">

    <div class="container">

      <div class="row">
        <div class="col-lg-auto col-md-12 col-sm-12 col-xs-12">
          <img src="../../assets/img/gov_logo.png" class="govlogo"
            style="top:-50px; left: 250px; max-width: 100%; height: auto;">
        </div>

        <div class="col-lg-auto col-md-12 col-sm-12 col-xs-12 " data-aos="fade-up" data-aos-delay="200">
          <div v-if="!this.currentUser">
            <h1 style="color: white; font-weight: bold; font-size: 26px; line-height: 37px; letter-spacing: 1PX;">
              Government
              Non-Financial Asset Management System</h1>
          </div>

          <div v-if="this.currentUser">
            <h1 style="color: white; font-weight: bold; font-size: 26px; line-height: 37px; letter-spacing: 1PX;">
              Government
              Non-Financial Asset Management System</h1>
          </div>

          <div v-if="this.currentUser">
            <b style=" font-weight: bold; color:white"> Institution :&nbsp;{{ entityIdLog }} </b>
          </div>
          <hr />

          <div v-if="!this.currentUser">
            <router-link to="/register">
              <a class="animated-button1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </a>
            </router-link>
            <router-link to="/login">
              <a class="animated-button1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
              </a>
            </router-link>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 d-sm-none d-md-block d-none d-sm-block" data-aos="zoom-in"
          data-aos-delay="200" style="margin: auto">

        </div>
      </div>
    </div><br>
  </section>
  <!-- End Hero -->
</template>




<script>
import axios from 'axios';
//import axios from 'axios';
import baseServices from '../../services/base_resources';
import jQuery from 'jquery'
window.$ = jQuery

export default {
  data() {
    return {
      entityIdLog: " Checking...",
      userRoles: [],
      isDataFeeder: false,
      isVerificationOfficer: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.getfilteringByRoles();
    if (this.$store.state.auth.user != null) {
      this.profileUserEntityDetails();
      //entity details load when user is authenticated
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    profileStatusDetails() {
      return baseServices.profileStatusDetails();
    },
    profileUserNameDetails() {
      return baseServices.profileUserNameDetails();
    },
    profileUserEntityDetails() {
      let entityId = sessionStorage.getItem('entityId');
      return axios
        .get(baseServices.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/one/entity/' + entityId)
        .then(response => {
          this.entityIdLog = response.data.name;
          sessionStorage.setItem('entityDetails', response.data.name);
          return response.data;
        }).catch(function (error) {
          return error;
        });
    },
    getfilteringByRoles() {
      let user = JSON.parse(sessionStorage.getItem('user'));
      if (user != null) {
        this.userRoles = user.roles;
        this.isDataFeeder = this.userRoles.includes("Data_Entry_Operator");
        this.isVerificationOfficer = this.userRoles.includes("Verification_Officer");
      }
    },
  }
};
</script>

<style>
#headerLink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 30px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
  transition: 2s;
}

.userProfile {
  margin-left: 20px;
  border: none;
  background: none;
}



.logout {
  background-color: red;
  padding: 8px 24px;
  border-radius: 12px;

}

.userProfile :hover {
  border: none;
  background: none;
}

#header {
  background: linear-gradient(90deg, rgba(19, 0, 36, 1) 28%, rgba(6, 133, 159, 1) 100%);
  padding-bottom: 0px;
}

#hero {
  background: linear-gradient(90deg, rgba(19, 0, 36, 1) 28%, rgba(6, 133, 159, 1) 100%);
  padding-top: 0px;
  height: auto;
  padding-bottom: 0px;
}

#hero .container {
  padding-top: 50px;
}

.reg-log {
  border-color: aliceblue;
  background-color: rgba(240, 248, 255, 0);
  color: aliceblue;
}

.reg-log:hover {
  border-color: aliceblue;
  background-color: rgb(240, 248, 255);
  color: rgb(6, 56, 100);
  padding: 12px;
  transition-duration: 1s;
}

.action {
  position: fixed;
  top: 20px;
  right: 100px;
}

.action .profile {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 90%;
  overflow: hidden;
  cursor: pointer;
}

.action .profile img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-menu {
  /* background-color: rgba(80, 78, 78, 0.116);*/
  background-color: #02183d;
  color: white;
  padding: 20px;
  border-radius: 30px;
  min-width: 15em;
  /* Will be AT LEAST 20em wide */
}

#headerLink .btn-lin {
  color: white;
  border: none;
  outline: none;
}

#headerLink .btn-lin:hover {
  color: white;
  border: none;
  outline: none;
  background-color: rgba(19, 0, 36, 1);

}

#headerLink .btn-lin:focus {
  color: white;
  border: none;
  outline: none;
  background-color: rgba(19, 0, 36, 1);
}

.userArea {
  color: white;
}

.dropdown-menu li {
  padding: 5px;
  margin-left: 20px;
  margin-right: 20px;
  width: 200px;
}

.animated-button {
  background: linear-gradient(-30deg, #0b1b3d 50%, #08142b 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #d4e0f7;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #8592ad;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button:hover::before {
  opacity: 0.2;
}

.animated-button span {
  position: absolute;
}

.animated-button span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(8, 20, 43, 0)), to(#2662d9));
  background: linear-gradient(to left, rgba(8, 20, 43, 0), #2662d9);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@-webkit-keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(8, 20, 43, 0)), to(#2662d9));
  background: linear-gradient(to top, rgba(8, 20, 43, 0), #2662d9);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@-webkit-keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(8, 20, 43, 0)), to(#2662d9));
  background: linear-gradient(to right, rgba(8, 20, 43, 0), #2662d9);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@-webkit-keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(8, 20, 43, 0)), to(#2662d9));
  background: linear-gradient(to bottom, rgba(8, 20, 43, 0), #2662d9);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@-webkit-keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button1 {
  background: linear-gradient(-30deg, #3d0b0b 50%, #2b0808 50%);
  padding: 15px 25px;
  margin-left: 25px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #f7d4d4;
  font-size: 15px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  width: 135px;
}

.animated-button1::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #ad8585;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button1:hover::before {
  opacity: 0.2;
}

.animated-button1 span {
  position: absolute;
}

.animated-button1 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to left, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button1 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to top, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button1 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to right, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button1 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 8, 8, 0)), to(#d92626));
  background: linear-gradient(to bottom, rgba(43, 8, 8, 0), #d92626);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button2 {
  background: linear-gradient(-30deg, #3d240b 50%, #2b1a08 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #f7e6d4;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button2::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #ad9985;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button2:hover::before {
  opacity: 0.2;
}

.animated-button2 span {
  position: absolute;
}

.animated-button2 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(43, 26, 8, 0)), to(#d98026));
  background: linear-gradient(to left, rgba(43, 26, 8, 0), #d98026);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button2 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(43, 26, 8, 0)), to(#d98026));
  background: linear-gradient(to top, rgba(43, 26, 8, 0), #d98026);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button2 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(43, 26, 8, 0)), to(#d98026));
  background: linear-gradient(to right, rgba(43, 26, 8, 0), #d98026);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button2 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 26, 8, 0)), to(#d98026));
  background: linear-gradient(to bottom, rgba(43, 26, 8, 0), #d98026);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button3 {
  background: linear-gradient(-30deg, #3d3d0b 50%, #2b2b08 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #f7f7d4;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button3::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #adad85;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button3:hover::before {
  opacity: 0.2;
}

.animated-button3 span {
  position: absolute;
}

.animated-button3 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(43, 43, 8, 0)), to(#d9d926));
  background: linear-gradient(to left, rgba(43, 43, 8, 0), #d9d926);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button3 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(43, 43, 8, 0)), to(#d9d926));
  background: linear-gradient(to top, rgba(43, 43, 8, 0), #d9d926);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button3 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(43, 43, 8, 0)), to(#d9d926));
  background: linear-gradient(to right, rgba(43, 43, 8, 0), #d9d926);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button3 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 43, 8, 0)), to(#d9d926));
  background: linear-gradient(to bottom, rgba(43, 43, 8, 0), #d9d926);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button4 {
  background: linear-gradient(-30deg, #243d0b 50%, #1a2b08 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #e6f7d4;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button4::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #99ad85;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button4:hover::before {
  opacity: 0.2;
}

.animated-button4 span {
  position: absolute;
}

.animated-button4 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(26, 43, 8, 0)), to(#80d926));
  background: linear-gradient(to left, rgba(26, 43, 8, 0), #80d926);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button4 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(26, 43, 8, 0)), to(#80d926));
  background: linear-gradient(to top, rgba(26, 43, 8, 0), #80d926);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button4 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(26, 43, 8, 0)), to(#80d926));
  background: linear-gradient(to right, rgba(26, 43, 8, 0), #80d926);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button4 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(26, 43, 8, 0)), to(#80d926));
  background: linear-gradient(to bottom, rgba(26, 43, 8, 0), #80d926);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button5 {
  background: linear-gradient(-30deg, #0b3d0b 50%, #082b08 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #d4f7d4;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button5::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #85ad85;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button5:hover::before {
  opacity: 0.2;
}

.animated-button5 span {
  position: absolute;
}

.animated-button5 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(8, 43, 8, 0)), to(#26d926));
  background: linear-gradient(to left, rgba(8, 43, 8, 0), #26d926);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button5 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(8, 43, 8, 0)), to(#26d926));
  background: linear-gradient(to top, rgba(8, 43, 8, 0), #26d926);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button5 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(8, 43, 8, 0)), to(#26d926));
  background: linear-gradient(to right, rgba(8, 43, 8, 0), #26d926);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button5 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(8, 43, 8, 0)), to(#26d926));
  background: linear-gradient(to bottom, rgba(8, 43, 8, 0), #26d926);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button6 {
  background: linear-gradient(-30deg, #0b3d24 50%, #082b1a 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #d4f7e6;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button6::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #85ad99;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button6:hover::before {
  opacity: 0.2;
}

.animated-button6 span {
  position: absolute;
}

.animated-button6 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(8, 43, 26, 0)), to(#26d980));
  background: linear-gradient(to left, rgba(8, 43, 26, 0), #26d980);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button6 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(8, 43, 26, 0)), to(#26d980));
  background: linear-gradient(to top, rgba(8, 43, 26, 0), #26d980);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button6 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(8, 43, 26, 0)), to(#26d980));
  background: linear-gradient(to right, rgba(8, 43, 26, 0), #26d980);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button6 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(8, 43, 26, 0)), to(#26d980));
  background: linear-gradient(to bottom, rgba(8, 43, 26, 0), #26d980);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button7 {
  background: linear-gradient(-30deg, #0b3d3d 50%, #082b2b 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #d4f7f7;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button7::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #85adad;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button7:hover::before {
  opacity: 0.2;
}

.animated-button7 span {
  position: absolute;
}

.animated-button7 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(8, 43, 43, 0)), to(#26d9d9));
  background: linear-gradient(to left, rgba(8, 43, 43, 0), #26d9d9);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button7 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(8, 43, 43, 0)), to(#26d9d9));
  background: linear-gradient(to top, rgba(8, 43, 43, 0), #26d9d9);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button7 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(8, 43, 43, 0)), to(#26d9d9));
  background: linear-gradient(to right, rgba(8, 43, 43, 0), #26d9d9);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button7 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(8, 43, 43, 0)), to(#26d9d9));
  background: linear-gradient(to bottom, rgba(8, 43, 43, 0), #26d9d9);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button8 {
  background: linear-gradient(-30deg, #0b243d 50%, #081a2b 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #d4e6f7;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button8::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #8599ad;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button8:hover::before {
  opacity: 0.2;
}

.animated-button8 span {
  position: absolute;
}

.animated-button8 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(8, 26, 43, 0)), to(#2680d9));
  background: linear-gradient(to left, rgba(8, 26, 43, 0), #2680d9);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button8 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(8, 26, 43, 0)), to(#2680d9));
  background: linear-gradient(to top, rgba(8, 26, 43, 0), #2680d9);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button8 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(8, 26, 43, 0)), to(#2680d9));
  background: linear-gradient(to right, rgba(8, 26, 43, 0), #2680d9);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button8 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(8, 26, 43, 0)), to(#2680d9));
  background: linear-gradient(to bottom, rgba(8, 26, 43, 0), #2680d9);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button9 {
  background: linear-gradient(-30deg, #0b0b3d 50%, #08082b 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #d4d4f7;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button9::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #8585ad;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button9:hover::before {
  opacity: 0.2;
}

.animated-button9 span {
  position: absolute;
}

.animated-button9 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(8, 8, 43, 0)), to(#2626d9));
  background: linear-gradient(to left, rgba(8, 8, 43, 0), #2626d9);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button9 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(8, 8, 43, 0)), to(#2626d9));
  background: linear-gradient(to top, rgba(8, 8, 43, 0), #2626d9);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button9 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(8, 8, 43, 0)), to(#2626d9));
  background: linear-gradient(to right, rgba(8, 8, 43, 0), #2626d9);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button9 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(8, 8, 43, 0)), to(#2626d9));
  background: linear-gradient(to bottom, rgba(8, 8, 43, 0), #2626d9);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button10 {
  background: linear-gradient(-30deg, #240b3d 50%, #1a082b 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #e6d4f7;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button10::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #9985ad;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button10:hover::before {
  opacity: 0.2;
}

.animated-button10 span {
  position: absolute;
}

.animated-button10 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(26, 8, 43, 0)), to(#8026d9));
  background: linear-gradient(to left, rgba(26, 8, 43, 0), #8026d9);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button10 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(26, 8, 43, 0)), to(#8026d9));
  background: linear-gradient(to top, rgba(26, 8, 43, 0), #8026d9);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button10 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(26, 8, 43, 0)), to(#8026d9));
  background: linear-gradient(to right, rgba(26, 8, 43, 0), #8026d9);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button10 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(26, 8, 43, 0)), to(#8026d9));
  background: linear-gradient(to bottom, rgba(26, 8, 43, 0), #8026d9);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button11 {
  background: linear-gradient(-30deg, #3d0b3d 50%, #2b082b 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #f7d4f7;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button11::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #ad85ad;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.alert {
  position: relative;
  padding: 8px 18px;

  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}


.animated-button11:hover::before {
  opacity: 0.2;
}

.animated-button11 span {
  position: absolute;
}

.animated-button11 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(43, 8, 43, 0)), to(#d926d9));
  background: linear-gradient(to left, rgba(43, 8, 43, 0), #d926d9);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button11 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(43, 8, 43, 0)), to(#d926d9));
  background: linear-gradient(to top, rgba(43, 8, 43, 0), #d926d9);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button11 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(43, 8, 43, 0)), to(#d926d9));
  background: linear-gradient(to right, rgba(43, 8, 43, 0), #d926d9);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button11 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 8, 43, 0)), to(#d926d9));
  background: linear-gradient(to bottom, rgba(43, 8, 43, 0), #d926d9);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}

.animated-button12 {
  background: linear-gradient(-30deg, #3d0b24 50%, #2b081a 50%);
  padding: 20px 40px;
  margin: 12px;
  display: inline-block;
  -webkit-transform: translate(0%, 0%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #f7d4e6;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button12::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #ad8599;
  opacity: 0;
  -webkit-transition: .2s opacity ease-in-out;
  transition: .2s opacity ease-in-out;
}

.animated-button12:hover::before {
  opacity: 0.2;
}

.animated-button12 span {
  position: absolute;
}

.animated-button12 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, right top, left top, from(rgba(43, 8, 26, 0)), to(#d92680));
  background: linear-gradient(to left, rgba(43, 8, 26, 0), #d92680);
  -webkit-animation: 2s animateTop linear infinite;
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button12 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left bottom, left top, from(rgba(43, 8, 26, 0)), to(#d92680));
  background: linear-gradient(to top, rgba(43, 8, 26, 0), #d92680);
  -webkit-animation: 2s animateRight linear -1s infinite;
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}

.animated-button12 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: -webkit-gradient(linear, left top, right top, from(rgba(43, 8, 26, 0)), to(#d92680));
  background: linear-gradient(to right, rgba(43, 8, 26, 0), #d92680);
  -webkit-animation: 2s animateBottom linear infinite;
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}

.animated-button12 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 8, 26, 0)), to(#d92680));
  background: linear-gradient(to bottom, rgba(43, 8, 26, 0), #d92680);
  -webkit-animation: 2s animateLeft linear -1s infinite;
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
</style>
