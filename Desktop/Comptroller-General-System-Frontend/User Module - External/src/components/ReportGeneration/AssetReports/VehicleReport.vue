<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="text-container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">
                <a onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Vehicle Reports
              </li>
            </ol>
          </nav>
          <br>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="a-box align-self-center">
                <h1>Vehicle Reports</h1>
                <div class="img-container">

                  <div class="img-inner">
                    <div class="inner-skew">
                      <img src="../../../assets/img/asset/vehicle.jpg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <br>


          <div style="text-align: left; display: block" class="alert alert-primary" v-if="itemsChild != ''">
            <div>
              <div class="row">
                <h5>Report Generation </h5>
                <br /><br />
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  <div class="form-group">
                    <input type="radio" id="one" value="o" v-model="picked" @change="getSelected" />
                    <label for="one">My Institution</label>
                  </div>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  <div class="form-group">
                    <input type="radio" id="two" value="c" v-model="picked" @change="getSelected" />
                    <label for="two"> Child Institution</label>
                  </div>
                </div>
              </div>
              <hr />
              <div v-if="this.itemsChild != []">
                <div v-if="uC == true">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div class="form-group">
                        <label for="category1">Child Institutions</label>
                        <Field name="category1" class="form-control" as="select" v-model="valC" @change="changeValC">
                          <option value="" disabled selected hidden>
                            Choose
                          </option>
                          <option v-for="item in itemsChild" :key="item" :value="item.id">
                            {{ item.name }}
                          </option>
                        </Field>
                        <ErrorMessage name="category1" class="error-feedback" />
                      </div>
                    </div>
                    <p><b>Note : Only the permission granted subordinate institutions shown in the dropdown. </b></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br><br>

          <input class="form-control my-0 py-1" type="hidden" placeholder="Entity Id" v-model="this.inputEntityId"
            aria-label="Search">

          <div class="row text-align-left">
            <div>
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="assetCode">Asset Code</label>
                    <Field name="assetCode" class="form-control" as="select" v-model="this.selectAssetCode"
                      @change="checkValues">
                      <option value="" selected disabled hidden>Choose</option>
                      <option value="*">Any</option>
                      <option value="6112101 - Passenger Vehicles">6112101 - Passenger Vehicles</option>
                      <option value="6112102 - Cargo Vehicles">6112102 - Cargo Vehicles</option>
                      <option value="6112103 - Agriculture Vehicles">6112103 - Agriculture Vehicles</option>
                      <option value="6112104 - Industrial Vehicles">6112104 - Industrial Vehicles</option>
                      <option value="6112105 - Ambulances">6112105 - Ambulances</option>
                      <option value="6112106 - Ships">6112106 - Ships</option>
                      <option value="6112107 - Railway locomotives or Rolling stock">6112107 - Railway locomotives / Rolling stock</option>
                      <option value="6112108 - Aircrafts">6112108 - Aircrafts</option>
                      <option value="6112109 - Motor Cycles or Bicycles">6112109 - Motor Cycles / Bicycles</option>
                      <option value="6112110 - Trailers or Semi Trailers">6112110 - Trailers / Semi Trailers</option>
                      <option value="6112111 - Fire fighting Vehicles">6112111 - Fire fighting Vehicles</option>
                      <option value="6112112 - Other">6112112 - Other (not specified above)</option>
                    </Field>
                    <ErrorMessage name="assetCode" class="error-feedback" />
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="rmv_registered">RMV/DMT Registered</label>
                    <Field name="rmv_registered" class="form-control" as="select" v-model="this.rmv_registeredCheck"
                      @change="checkValues">
                      <option value="" selected disabled hidden> Choose</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="*">
                        Any
                      </option>
                    </Field>
                    <ErrorMessage name="rmv_registered" class="error-feedback" />
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="typeOfFuel">Fuel Type </label>
                    <Field name="typeOfFuel" class="form-control" as="select" v-model="this.selectFuelType"
                      @change="checkValues">
                      <option value="" selected disabled hidden>
                        Choose
                      </option>
                      <option value="*">Any</option>
                      <option value="None">None</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Kerosene">Kerosene</option>
                      <option value="Electric">Electric</option>
                      <option value="Petrol-Electric">Petrol-Electric</option>
                      <option value="Diesel-Electric">Diesel-Electric</option>
                      <option value="LPG">LPG</option>
                    </Field>
                    <ErrorMessage name="typeOfFuel" class="error-feedback" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="vehicleType">Class of Vehicle</label>
                    <Field name="vehicleType" class="form-control" as="select" v-model="this.selectClassOfVehicle"
                      @change="checkValues">
                      <option value="" selected disabled hidden> Choose </option>
                      <option value="*">Any</option>
                      <option value="Car">Car</option>
                      <option value="SUV">SUV</option>
                      <option value="Van">Van</option>
                      <option value="DoubleCab">Double Cab</option>
                      <option value="SingleCab">Single Cab</option>
                      <option value="Bus">Bus</option>
                      <option value="Crew Cab">Crew Cab</option>
                      <option value="Motor Coach">Motor Coach</option>
                      <option value="MotorLorry">Motor Lorry</option>
                      <option value="Special purpose vehicle"> Special Purpose Vehicle</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Dual Purpose">Dual Purpose</option>
                      <option value="Three Wheeler">Three Wheeler</option>
                      <option value="Hand Tractor">Hand Tractor</option>
                      <option value="Truck">Truck</option>
                      <option value="Prime Movers">Prime Movers</option>
                      <option value="Land Vehicle">Land Vehicle</option>
                      <option value="Water Bowser">Water Bowser</option>
                      <option value="Fuel Bowser">Fuel Bowser</option>
                      <option value="Ambulance">Ambulance</option>
                      <option value="Ships">Ships</option>
                      <option value="Boats">Boats</option>
                      <option value="Fishing Vessels">Fishing Vessels</option>
                      <option value="Railway Locomotive">Railway Locomotive</option>
                      <option value="Railway Compartment">Railway Compartment </option>
                      <option value="Railway Carriage">Railway Carriage</option>
                      <option value="Rail Bus">Rail Bus</option>
                      <option value="Airplane">Airplane</option>
                      <option value="Glider">Glider</option>
                      <option value="Helicopter">Helicopter</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Motor Tricycle Van">Motor Tricycle Van</option>
                      <option value="Bicycles">Bicycles</option>
                      <option value="Tractor">Tractor</option>
                      <option value="Compactors">Compactors</option>
                      <option value="Tractor Trailer or Bowser">Tractor Trailer/Bowser</option>
                      <option value="Tractor Semitrailer">Tractor Semitrailer </option>
                      <option value="Fire Fighting Vehicle">Fire Fighting Vehicle</option>
                      <option value="Water Cannon Truck">Water Cannon Truck</option>
                      <option value="Other">Other Vehicle</option>
                    </Field>
                    <ErrorMessage name="vehicleType" class="error-feedback" />
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="make">Make </label>
                    <Field name="make" type="text" class="form-control" placeholder="Ex: Toyota / Nissan / Honda / BMW"
                      v-model="this.setMaker" />
                    <ErrorMessage name="make" class="error-feedback" @click="checkValues" />
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="model">Model </label>
                    <Field name="model" type="text" class="form-control" placeholder="Ex: Corolla 141"
                      v-model="this.setModel" @click="checkValues" />
                    <ErrorMessage name="model" class="error-feedback" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="yearRegistered">Registered Year</label>
                    <Field name="yearRegistered" type="text" class="form-control" placeholder="Enter Registration Year"
                      v-model="this.setYearRegistered" @click="checkValues" />
                    <ErrorMessage name="yearRegistered" class="error-feedback" />
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="purpose">Puropse of Use</label>
                    <Field name="purpose" class="form-control" as="select" v-model="this.selectPuropseOfUse"
                      @change="checkValues">
                      <option value="" selected disabled hidden>Choose</option>
                      <option value="*">Any</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Pool">Pool</option>
                      <option value="PublicTransport">Public Transport</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Construction ">Construction</option>
                      <option value="Defence">Defence</option>
                      <option value="Mining">Mining</option>
                    </Field>
                    <ErrorMessage name="purpose" class="error-feedback" />
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="transmission">Transmission</label>
                    <Field name="transmission" class="form-control" as="select" v-model="this.selectTransmission"
                      @change="checkValues">
                      <option value="" selected disabled hidden>
                        Choose
                      </option>
                      <option value="Manual">Manual</option>
                      <option value="Auto">Auto</option>
                      <option value="Tiptronic">Tiptronic</option>
                      <option value="Steptronic">Steptronic</option>
                      <option value="Not Applicable">Not Applicable</option>
                      <option value="*">Any</option>
                    </Field>
                    <ErrorMessage name="transmission" class="error-feedback" />
                  </div>
                </div>
              </div>
              <!-- *********************************************************************************************************** -->

              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="vehicleOwnership">Ownership </label>
                    <Field name="vehicleOwnership" class="form-control" as="select" v-model="this.selectVehicleOwnership"
                      @change="checkValues">
                      <option value="" selected disabled hidden> Choose </option>
                      <option value="Own">Own</option>
                      <option value="Operational Lease">Operational Lease</option>
                      <option value="Financial Lease">Financial Lease</option>
                      <option value="Rent">Rent</option>
                      <option value="Own by Other Public Sector Institute">Own by Other Public Sector Institute
                      </option>
                      <option value="Own by Closed Public Sector Institute">Own by Closed Public Sector Institute
                      </option>
                      <option value="*">Any</option>
                    </Field>
                    <ErrorMessage name="vehicleOwnership" class="error-feedback" />
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="form-group">
                    <label for="currentCondition">Condition </label>
                    <Field name="currentCondition" class="form-control" as="select" v-model="this.selectVehicleCondition"
                      @change="checkValues">
                      <option value="" selected disabled hidden>
                        Choose
                      </option>
                      <option value="Running">Running</option>
                      <option value="Not Running">Not Running</option>
                      <option value="*">Any</option>
                    </Field>
                    <ErrorMessage name="currentCondition" class="error-feedback" />
                  </div>
                </div>
              </div>
              <hr />

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading" @click="findAllFilterdByCustom">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  Search
                </button>
              </div>
              <div style="color: red;">
                Note : Reports will be downloaded to your default download path. It will take sometime. Please be
                patient.
              </div>
            </div>

            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
              {{ message }}
            </div>

          </div>


        </div>
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

.dataTables {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.dataTables td,
.dataTables th {
  padding-top: 10px;
  padding-bottom: 10px;
}

.dataTables tr:nth-child(even) {
  background-color: #f2f2f2;
}

.dataTables tr:hover {
  background-color: #ddd;
}

.dataTables th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

.text-align-left {
  text-align: left;
}

.myDropDown {
  height: 50px;
  overflow: auto;
}
</style>

<script>
import { Field } from "vee-validate";
import * as yup from "yup";
import axios from "axios";

import resources_files from '../../../services/base_resources'; //this file contains base resourses

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "completeProfile",
  components: {
    Field,
    // ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
    });

    return {
      successful: false,
      loading: false,
      message: "",
      picked: "o",
      itemsChild: [],
      valC: "",
      inputEntityId: sessionStorage.getItem("entityId"),
      selectAssetCode: "*",
      rmv_registeredCheck: "*",
      selectClassOfVehicle: "*",
      setMaker: "Any",
      setModel: "Any",
      setYearRegistered: "Any",
      selectPuropseOfUse: "*",
      selectFuelType: "*",
      selectTransmission: "*",
      selectVehicleOwnership: "*",
      selectVehicleCondition: "*",
      schema,
    };
  },
  computed: {
  },
  mounted() {
    //this method run when component load to the floating area
    this.getChildList();
  },
  methods: {
    getSelected() {
      if (this.picked == "o") {
        this.uC = false;
        this.inputEntityId = sessionStorage.getItem("entityId");
      } else if (this.picked == "c") {
        this.uC = true;
        this.inputEntityId = "Not Mentioned";
      }
    },
    changeValC() {
      this.inputEntityId = this.valC;
    },
    getChildList() {
      let entityId = sessionStorage.getItem('entityId');
      return axios
        .get(resources_files.backend_url_system_management() + '/get/api/production/system/management/backend/restapi/get/all/entities/from/parent/relationship/getAssetsReportFromParent/' + entityId + "/1")
        .then(response => {
          this.itemsChild = response.data;
        }).catch(function (error) {
          return error;
        });
    },
    checkValues() {
      if (this.selectAssetCode == "") {
        this.selectAssetCode = '*';
      }

      if (this.rmv_registeredCheck == "") {
        this.rmv_registeredCheck = '*';
      }

      if (this.selectClassOfVehicle == "") {
        this.selectClassOfVehicle = '*';
      }

      if (this.setMaker == "") {
        this.setMaker = 'Any';
      }

      if (this.setModel == "") {
        this.setModel = 'Any';
      }

      if (this.setYearRegistered == "") {
        this.setYearRegistered = 'Any';
      }

      if (this.selectPuropseOfUse == "") {
        this.selectPuropseOfUse = '*';
      }

      if (this.selectFuelType == "") {
        this.selectFuelType = '*';
      }

      if (this.selectTransmission == "") {
        this.selectTransmission = '*';
      }

      if (this.selectVehicleOwnership == "") {
        this.selectVehicleOwnership = '*';
      }

      if (this.selectVehicleCondition == "") {
        this.selectVehicleCondition = '*';
      }
    },
    findAllFilterdByCustom() {
      if (this.setMaker == "Any") {
        this.setMaker = '*';
      }

      if (this.setModel == "Any") {
        this.setModel = '*';
      }

      if (this.setYearRegistered == "Any") {
        this.setYearRegistered = '*';
      }
      window.open(resources_files.backend_url_report_generation() + '/get/api/production/reporting/backend/get/all/vehicles/details/list/vehicle/filter/by/custom/' + this.inputEntityId + "/" + this.selectAssetCode + "/" + this.rmv_registeredCheck + "/" + this.selectClassOfVehicle + "/" + this.setMaker + "/" + this.setModel + "/" + this.setYearRegistered + "/" + this.selectPuropseOfUse + "/" + this.selectFuelType + "/" + this.selectTransmission + "/" + this.selectVehicleOwnership + "/" + this.selectVehicleCondition);

    },
  },
};


</script>