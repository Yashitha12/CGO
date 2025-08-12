<template>
  <div id="app">
    <div class="row">
      <headerFile></headerFile>
    </div>
    <div class="row">
      <newsFile></newsFile>
    </div>

    <div v-if="currentUser">
      <div v-if="profileStatusDetails() === '0'">
        <!-- This code block execute when profile complition is not done or not authorize-->
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <router-view />
          </div>
        </div>
      </div>
      <div v-else-if="profileStatusDetails() === '1'">
        <!-- This code block execute when profile complition is not done or not authoriz-->
        <hr />
        <div class="row" style="text-align: center;">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="alert alert-success" role="alert">
              <h1>Your account is under review. </h1>
              It will take 24 hours(One Working Day) to activate. Please Logout and come back later.
              <br /> For more details please contact CGO.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <router-view />
          </div>
        </div>
      </div>
      <div v-else-if="profileStatusDetails() === '2'">
        <!-- This code block execute when profile complition done and authorize-->
        <hr />
        <div class="row" style="text-align: center;">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="alert alert-danger" role="alert">
              <h1>Your account is not approved.</h1>
              Please resubmit the profile.
            </div>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <router-view />
          </div>
        </div>
      </div>
      <div v-else-if="profileStatusDetails() === '3'">
        <!-- This code block execute when profile complition done and authorize-->
        <div class="row">
          <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <navigationBar></navigationBar>
          </div>
          <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <router-view />
          </div>
        </div>
      </div>

      <div v-else-if="profileStatusDetails() === '4'">
        <!-- This code block execute when profile complition done and authorize-->
        <div class="row" style="text-align: center;">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="alert alert-danger" role="alert">
              <h1>Your password has reset by the administrator as per your request.</h1>
              Please change your password into your own one before proceeding.
            </div>
            <router-link to="/change/password" tag="button" class="cont">
              <button class="btn btn-primary">Change Password</button>
            </router-link>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <router-view />
          </div>
        </div>
      </div>


    </div>
    <div v-else>
      <!-- This code block execute when user not logged into the system-->
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <router-view />
        </div>
      </div>
    </div>

    <div class="row">
      <footterFile></footterFile>
    </div>

  </div>
</template>


<script>

import baseServices from '../src/services/base_resources';
import jQuery from 'jquery'
window.$ = jQuery

export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    profileStatusDetails() {
      return baseServices.profileStatusDetails();
    },
  }
};

function idleLogout() {
  var t;
  window.onload = resetTimer;
  window.onmousemove = resetTimer;
  window.onmousedown = resetTimer;  // catches touchscreen presses as well      
  window.ontouchstart = resetTimer; // catches touchscreen swipes as well      
  window.ontouchmove = resetTimer;  // required by some devices 
  window.onclick = resetTimer;      // catches touchpad clicks as well
  window.onkeydown = resetTimer;
  window.addEventListener('scroll', resetTimer, true); // improved; see comments

  function yourFunction() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('UserName');
    window.location.href = "/cgo/";
  }

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(yourFunction, 800000);  // time is in milliseconds
  }
}
idleLogout();



</script>
