<template>
  <div id="header">
    <div class="contentData">
      <h3>Navigation</h3>
      <ul type="none">
        <li>
            <router-link to="/dashboard" tag="button" class="cont">
              <font-awesome-icon icon="fa-user-circle-o" /> Dashboard
            </router-link>
          </li>
        <li>
          <router-link to="/entity/management/external" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> Institution Details
          </router-link>
        </li>
        <div v-if="userRoles.includes('Data_Entry_Operator')">
          <li>
            <router-link to="/asset/management/external" tag="button" class="cont">
              <font-awesome-icon icon="fa-user-circle-o" /> Add Asset Information
            </router-link>
          </li>
        </div>
        <li>
          <router-link to="/asset/management/view/external" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> View Assets Information
          </router-link>
        </li>
        <li>
          <router-link to="/asset/management/report/generation" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> Report Generation
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#header {
  /*edit*/
  background: rgba(19, 0, 36, 1);
  color: white;
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
}

h3 {
  /* color: rgb(238, 173, 98); */
  color: rgb(223, 223, 211);
  font-weight: 400;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  letter-spacing: 2px;
}

.contentData {
  padding: 30px;
  line-height: 300%;
}

.cont:hover {
  box-shadow: inset 200px 0 0 0 #7086c4;
  color: rgba(19, 0, 36, 1);
  padding: 10px;
  opacity: 1;
}
</style>
  


<script>

export default {
  name: "completeProfile",
  data() {
    return {
      userRoles: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    //this method run when component load to the floating area
    this.getfilteringByRoles();
  },
  methods: {
    getfilteringByRoles() {
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.userRoles = user.roles;
    },
  },
};
</script>