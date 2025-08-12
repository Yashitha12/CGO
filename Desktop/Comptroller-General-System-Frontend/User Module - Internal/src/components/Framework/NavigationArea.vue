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
        <li
          v-if="userRoles.includes('ADMIN') || userRoles.includes('USERS_MANAGEMENT_INTERNAL_OFFICER') || userRoles.includes('USERS_MANAGEMENT_EXTERNAL_OFFICER')">
          <router-link to="/user/management" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> User Management
          </router-link>
        </li>
        <li v-if="userRoles.includes('ADMIN')">
          <router-link to="/news/management" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> News Management
          </router-link>
        </li>
        <hr />
        <li v-if="userRoles.includes('USERS_VIEWER_EXTERNAL_OFFICER')">
          <router-link to="/user/management" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> User Details
          </router-link>
        </li> 
        <li
          v-if="userRoles.includes('ADMIN') || userRoles.includes('REPORTS_GENERATOR') || userRoles.includes('AUDIT_OFFICER') || userRoles.includes('CGO_VIEWER')  || userRoles.includes('TRANSFER_ACCEPTANCE_OFFICER') || userRoles.includes('TRANSFER_APPROVAL_OFFICER') || userRoles.includes('EDIT_APPROVAL_OFFICER') || userRoles.includes('USERS_VIEWER_EXTERNAL_OFFICER')">
          <router-link to="/asset/management" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> Asset Details
          </router-link>
        </li>
        <li
          v-if="userRoles.includes('ADMIN') || userRoles.includes('REPORTS_GENERATOR') || userRoles.includes('AUDIT_OFFICER')  || userRoles.includes('CGO_VIEWER') ||  userRoles.includes('TRANSFER_ACCEPTANCE_OFFICER') || userRoles.includes('TRANSFER_APPROVAL_OFFICER') || userRoles.includes('EDIT_APPROVAL_OFFICER') || userRoles.includes('USERS_VIEWER_EXTERNAL_OFFICER')">
          <router-link to="/entity/management/data" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> Institution Details
          </router-link>
        </li>
        <li
          v-if="userRoles.includes('ADMIN') || userRoles.includes('REPORTS_GENERATOR') || userRoles.includes('AUDIT_OFFICER') || userRoles.includes('CGO_VIEWER') || userRoles.includes('USERS_VIEWER_EXTERNAL_OFFICER')">
          <router-link to="/report/generation" tag="button" class="cont">
            <font-awesome-icon icon="fa-user-circle-o" /> Reports Generation
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#header {
    background: rgba(19, 0, 36, 1);
  color: white;
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
}

h3 {
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