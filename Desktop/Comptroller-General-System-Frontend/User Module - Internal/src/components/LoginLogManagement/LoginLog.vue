<template>
  <div class="a-box align-self-center">
    <div class="text-container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page"><a onclick='window.location.href = "/cgoInternal/"'
              class="btn-sm btn-link">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Login Logs</li>
        </ol>
      </nav>
      <hr />
      <div class="row">
        <table id="user-table" class="display table-bordered nowrap" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>IP Address</th>
              <th>User Name</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.freelayoutstyle {
  margin: 50px;
}

.a-box {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  width: auto;
}

.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  line-height: 19px;
  font-size: 14px;
}

.card {
  text-align: left;
}

.card {
  margin: 10px;
  padding: 10px;
  width: 100%;
  grid-template-rows: 20px 50px 1fr 50px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  background-color: #37517e;
}

.card_heading {
  color: black;
  text-align: left;
}
</style>

<script>
import axios from 'axios';
//import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";


export default {
  data() {
    return {
      user_name: "",
      i: "0",
      oneItem: [],
      dataTable: null,
      items: []
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
      let user = JSON.parse(sessionStorage.getItem('user'));

      return axios
        .get(resources_files.backend_url_internal() + '/api/auth/restapi/get/one/user/login/log/by/username/' + user.username)
        .then(response => {
          this.items = response.data;
          this.dataTable = $('#user-table').DataTable({
            dom: 'Bfrtip',
            buttons: [
              'copy', 'csv', 'print'
            ],
          });
          var tableClear = $('#user-table').DataTable();
          tableClear.clear().draw();
          $.fn.dataTable.ext.errMode = 'none';
          for (this.i; this.i <= this.items.length; this.i++) {
            this.oneItem = this.items[this.i];
            console.log(this.oneItem);
            this.dataTable.row.add([this.oneItem.ip_address, this.oneItem.user_id, this.oneItem.dateLog + " " + this.oneItem.timeLog]).draw(false);
          }
        }).catch(function (error) {
          return error;
        });
    },
  },
};
</script>