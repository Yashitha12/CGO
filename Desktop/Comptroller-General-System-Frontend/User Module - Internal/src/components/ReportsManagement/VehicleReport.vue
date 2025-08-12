<template>
  <div class="row align-self-center">
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="text-container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">
                <a onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Vehicles Report</li>
            </ol>
          </nav>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h1>Vehicles Report</h1>
              <div class="a-box align-self-center">
                <div class="img-container">
                  <div class="img-inner">
                    <div class="inner-skew">
                      <img src="../../../src/assets/img/asset/vehicle.jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div class="row text-align-left">
            <div class="card-body">
              <div class="form-group row">
                <label>Generate report by vehicle status</label>
                <div class="col-lg-12">
                  <div class="input-group md-form form-sm form-1 pl-0">
                    <select id="Status" name="status" class="form-control" required="" v-model="searchParameterStatus">
                      <option value="" selected="" disabled hidden>Select status</option>
                      <option value="0">Inprogress</option>
                      <option value="2">Rejected</option>
                      <option value="3">Waiting for the approval of CGO to data edit</option>
                      <option value="4">Edit function enabled</option>
                      <option value="5">Edit function blocked</option>
                      <option value="13">Disposed</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-5">
                  <button class="btn btn-primary" @click="findAllStatus">Generate Report</button>
                </div>
              </div>
              <hr />
              <div class="row">
                <button class="btn btn-primary btn-block" @click="findAll">Generate All Vehicles Report</button>
              </div>
            </div>

            <h6 style="color: red">Note : Reports will be downloaded to your default download path. It will take some time.</h6>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="text-container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">
                <a onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Vehicles Report</li>
            </ol>
          </nav>
          <br />
          <div class="text-align-left">
            <h4><b>Based on the time period</b></h4>
            <div class="card-body">
              <div class="row">
                <div class="Row">
                  <div class="col-lg-12">
                    <div class="input-group md-form form-sm form-1 pl-0">
                      Start Date&nbsp;
                      <input type="date" class="form-control" v-model="sDatePeriodNotStatus" v-on:change="filtersDatePeriodNotStatus" />
                    </div>
                  </div>
                  <br />
                  <div class="col-lg-12">
                    <div class="input-group md-form form-sm form-1 pl-0">
                      End Date&nbsp;&nbsp;
                      <input type="date" class="form-control" v-model="eDatePeriodNotStatus" v-on:change="filtereDatePeriodNotStatus" />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <button class="btn btn-primary btn-block" @click="findAllBasicAndValuationVerified">Approved Vehicles</button>
                <button class="btn btn-primary btn-block" @click="findAllBasicAndValuationVerifiedOneRupee">Approved Vehicles with one rupee</button>
                <button class="btn btn-primary btn-block" @click="findAllOnlyBasicVerified">Only Basic Verified</button>
                <button class="btn btn-primary btn-block" @click="findAllRejected">Rejected Vehicles</button>
                <button class="btn btn-primary btn-block" @click="findAllDisposed">Disposed Vehicles</button>
                <hr />
                <!-- <hr />
                <button class="btn btn-primary btn-block" @click="findAllDateAdded">
                  Vehicle Added Date
                </button> -->
              </div>
            </div>
            <h6 style="color: red">Note : Reports will be downloaded to your default download path. It will take some time.</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.h1,
h1 {
  font-size: 1.5rem;
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
  margin-right: auto;
  margin-left: auto;
  width: 100%;
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
  background: #e8eaec;
  height: 250px;
  width: 200px;
}

.text-container2 {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin: 0px 0px 0px 0px;
  line-height: 19px;
  font-size: 14px;
}

.text-container2 h3 {
  margin: 20px 0px 10px 0px;
  font-size: 28px;
}

h1 {
  color: #021d75c4;
  /* Font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif; */
  font-weight: 400;
  margin-bottom: 45px;
  text-align: center;
  letter-spacing: 0px;
  font-size: 30px;
}

h5 {
  text-align: center;
  font-size: 26px;
}

button {
  height: 40px;
  line-height: normal;
  text-transform: unset !important;
  font-weight: 400;
}
</style>

<script>
import * as yup from "yup";
import resources_files from "../../services/base_resources"; //this file contains base resourses

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "completeProfile",
  data() {
    const schema = yup.object().shape({});

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      searchParameterStatus: "",
      sDatePeriodNotStatus: "",
      eDatePeriodNotStatus: "",
    };
  },
  computed: {},
  mounted() {
    //this method run when component load to the floating area
  },
  methods: {
    findAll() {
      window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/get/all/vehicles/details/list");
    },
    findAllStatus() {
      if (this.searchParameterStatus == "") {
        alert("Please select staus.");
      } else {
        window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/get/all/vehicles/details/list/vehicle/by/status/" + this.searchParameterStatus);
      }
    },

    findAllOnlyBasicVerified() {
      if (this.sDatePeriodNotStatus == "") {
        alert("Please select start date.");
      } else if (this.eDatePeriodNotStatus == "") {
        alert("Please select end date.");
      } else {
        window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/asset-vehicle/restapi/get/excel/by/only/basic/vehicle/verified/with/verified/date/" + this.sDatePeriodNotStatus + "/" + this.eDatePeriodNotStatus);
      }
    },

    findAllBasicAndValuationVerified() {
      if (this.sDatePeriodNotStatus == "") {
        alert("Please select start date.");
      } else if (this.eDatePeriodNotStatus == "") {
        alert("Please select end date.");
      } else {
        window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/asset-vehicle/restapi/get/excel/by/basic/valuation/with/added/date/" + this.sDatePeriodNotStatus + "/" + this.eDatePeriodNotStatus);
      }
    },

    findAllBasicAndValuationVerifiedOneRupee() {
      if (this.sDatePeriodNotStatus == "") {
        alert("Please select start date.");
      } else if (this.eDatePeriodNotStatus == "") {
        alert("Please select end date.");
      } else {
        window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/asset-vehicle/restapi/get/excel/by/basic/valuation/onerupee/with/added/date/" + this.sDatePeriodNotStatus + "/" + this.eDatePeriodNotStatus);
      }
    },

    findAllRejected() {
      if (this.sDatePeriodNotStatus == "") {
        alert("Please select start date.");
      } else if (this.eDatePeriodNotStatus == "") {
        alert("Please select end date.");
      } else {
        window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/asset-vehicle/restapi/get/excel/by/main/status/added/date/Vehicle rejected/" + this.sDatePeriodNotStatus + "/" + this.eDatePeriodNotStatus);
      }
    },

    findAllDisposed() {
      if (this.sDatePeriodNotStatus == "") {
        alert("Please select start date.");
      } else if (this.eDatePeriodNotStatus == "") {
        alert("Please select end date.");
      } else {
        window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/asset-vehicle/restapi/get/excel/by/main/status/added/date/Disposed details accepted/" + this.sDatePeriodNotStatus + "/" + this.eDatePeriodNotStatus);
      }
    },

    findAllDateAdded() {
      if (this.sDatePeriodNotStatus == "") {
        alert("Please select start date.");
      } else if (this.eDatePeriodNotStatus == "") {
        alert("Please select end date.");
      } else {
        window.open(resources_files.backend_url_report_generation() + "/get/api/production/reporting/backend/asset-vehicle/restapi/get/excel/by/added/date/" + this.sDatePeriodNotStatus + "/" + this.eDatePeriodNotStatus);
      }
    },

    filtersDatePeriod() {
      const futureDate = new Date(this.sDatePeriod);
      futureDate.setDate(futureDate.getDate() + 7);

      this.eDatePeriod = futureDate.toISOString().substring(0, 10);
    },

    filtereDatePeriod() {
      // let date1 = new Date(this.sDatePeriod);
      // let date2 = new Date(this.eDatePeriod);
      // let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
      // if (diffDays > 14) {
      //   alert("You can only choose a date within two week range.");
      //   const futureDate = new Date(this.sDatePeriod);
      //   futureDate.setDate(futureDate.getDate() + 7);
      //   this.eDatePeriod = futureDate.toISOString().substring(0, 10);
      // }
    },

    filtersDatePeriodNotStatus() {
      const futureDate = new Date(this.sDatePeriodNotStatus);
      futureDate.setDate(futureDate.getDate() + 7);

      this.eDatePeriodNotStatus = futureDate.toISOString().substring(0, 10);
    },

    filtereDatePeriodNotStatus() {
      // let date1 = new Date(this.sDatePeriodNotStatus);
      // let date2 = new Date(this.eDatePeriodNotStatus);
      // let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
      // if (diffDays > 14) {
      //   alert("You can only choose a date within two week range.");
      //   const futureDate = new Date(this.sDatePeriodNotStatus);
      //   futureDate.setDate(futureDate.getDate() + 7);
      //   this.eDatePeriodNotStatus = futureDate.toISOString().substring(0, 10);
      // }
    },
  },
};
</script>
