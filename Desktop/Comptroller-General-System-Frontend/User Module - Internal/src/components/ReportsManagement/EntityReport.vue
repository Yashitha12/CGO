<template>
  <div class="row align-self-center">
    <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
      <div class="a-box align-self-center">
        <div class="text-container" style="padding-top: 20px;">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">
                <a onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Institution Report
              </li>
            </ol>
          </nav>

          <div class="row">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><br>
                <h1>Institution Report</h1><br>
                <div class="a-box align-self-center">
                  <div class="img-container">
                    <div class="img-inner">
                      <div class="inner-skew">
                        <img src="../../../src/assets/img/external_management.png" />
                      </div>
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
              <div class="row">
                <button class="btn btn-primary btn-block" @click="findAllRelationals">
                  Generate Relational Institutions Report
                </button>
              </div>
              <hr />
              <div class="row">
                <button class="btn btn-primary btn-block" @click="findAll">
                  Generate All Institutions Report
                </button>
              </div>
            </div>

            <h6 style="color: red;">Note : Reports will be downloaded to your default download path. It will
              take some
              time.</h6>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style >
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
import resources_files from '../../services/base_resources'; //this file contains base resourses

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "completeProfile",
  data() {
    const schema = yup.object().shape({
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      searchParameterStatus: "",
    };
  },
  computed: {
  },
  mounted() {
    //this method run when component load to the floating area
  },
  methods: {
    findAll() {
      window.open(resources_files.backend_url_report_generation() + '/get/api/production/reporting/backend/get/all/entity/list');
    },
    findAllRelationals() {
      window.open(resources_files.backend_url_report_generation() + '/get/api/production/reporting/backend/get/parent/child/relationship');
    },
  }
};


</script>