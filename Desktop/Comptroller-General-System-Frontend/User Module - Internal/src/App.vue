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
        <!-- This code block execute when profile complition is not done or not authorize by the Staff-->
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <router-view />
          </div>
        </div>
      </div>
      <div v-else-if="profileStatusDetails() === '3'">
        <!-- This code block execute when profile complition done and authorize by the Staff-->
        <div class="row">
          <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <navigationBar></navigationBar>
          </div>
          <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12" >
            <router-view />
          </div>
        </div>
      </div>
      <div v-else>
        <!-- This code block execute when profile complition is not done or not authorize by the Staff-->
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="alert alert-success" role="alert">
              Profile is under review or rejected by the CGO.Please contact CGO for more details.
            </div>
          </div>
        </div>
        <div class="row">
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
      this.$router.push('/login');
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
    window.location.href = "/cgoInternal/";
  }

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(yourFunction, 800000);  // time is in milliseconds
  }
}
idleLogout();



</script>
