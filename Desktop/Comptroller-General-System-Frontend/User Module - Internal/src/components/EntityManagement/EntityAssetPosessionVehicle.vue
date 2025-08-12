<template>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="a-box align-self-center">
                <div class="text-container" style="padding-top: 20px;">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item active" aria-current="page"><a
                                    onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Posession of the Vehicles</li>
                        </ol>
                    </nav>
                    <hr />
                    <div style="text-align: left; display: block">
                        <h6><b>Current Rule</b></h6>
                        <table style="text-align: left;" class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Condition </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tr v-for="item in items2" :key="item">
                                <td>Whether the Institution has Vehicles : </td>
                                <td> {{ item.availability }}</td>
                            </tr>
                        </table>
                        <div class="alert alert-danger" role="alert" v-if="items2 == []">No Data Found.</div>
                        <div>
                            <!-- This is use to load possesion of vehicles update when no data found -->
                            <hr />
                            <h6><b>Update Rule</b></h6>
                            <div class="row alert alert-success">
                                <Form @submit="handleSave" :validation-schema="schema">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="form-group">
                                                <label>Whether the Institution has Vehicles :</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                            <div class="form-group">
                                                <label for="one">Yes</label>
                                                <Field type="radio" name="availability" value="Yes" v-model="picked" />

                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                            <div class="form-group">
                                                <label for="two">No</label>
                                                <Field type="radio" name="availability" value="No" v-model="picked" />
                                            </div>
                                        </div>
                                        <ErrorMessage name="regNo" class="error-feedback" />
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <button class="btn btn-primary btn-block" :disabled="loading">
                                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="message" class="alert"
                                        :class="successful ? 'alert-success' : 'alert-danger'">
                                        {{ message }}
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="a-box align-self-center">
                <div class="text-container" style="padding-top: 20px;">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item active" aria-current="page"><a
                                    onclick='window.location.href = "/cgo/"' class="btn-sm btn-link">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Registration numbers of the vehicles
                                owned by the institutions</li>
                        </ol>
                    </nav>
                    <hr />

                    <div style="text-align: left; display: block">
                        <table style="text-align: left;" class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Remarks </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <div v-for="item in items1" :key="item">
                                <tr v-if="item.status == '1'">
                                    <td width="30%"> {{ item.registrationNumber }}</td>
                                    <td width="70%"> {{ item.remarks }}</td>
                                </tr>
                            </div>
                        </table>
                        <div class="alert alert-danger" role="alert" v-if="items1 == []">No Data Found.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style>
.displayArea {
    text-align: left;
    color: white;
}

.headerRowD {
    background: linear-gradient(90deg, rgba(19, 0, 36, 1) 28%, rgba(6, 133, 159, 1) 100%);
    color: aliceblue;
    padding: 10px;
}
</style>
  
<script>
import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses
import vehicleService from '../../services/VehicleServices/vehicle_service';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: "upload-files",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            regNo: yup
                .string()
                .required("Registration number is required!")
                .matches(/^([A-Z0-9]{1,3}[-SRI]{1,3}[0-9]{4})*$/, "RMV Registered number should be in below pattern. Ex : CAA-0000, NB-0000, 1-0000, 10-0000, 100-0000, 1SRI0000, 10SRI0000")
                .max(10, "Must be maximum 10 characters!"),
            remark: yup
                .string()
                .required("Remark is required!")
                .matches(/^[a-zA-Z0-9.,-@_/ ]+[^<>;&*^$!`~:[{}#%]+$/, 'Please input valid characters.')
                .max(300, "Must be maximum 300 characters!"),
        });
        return {
            successful: false,
            loading: false,
            message: "",
            schema,
            items1: [],
            items2: [],
            picked: "Yes",
        };
    },
    mounted() {
        this.getVehicleDetailsAvailability();
        this.getVehicleDetailsRemarks();
    },
    methods: {
        handleSave(data) {
            let entityId = this.$route.params.id;
            this.$swal.fire(
                {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, I confirm this!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        //** **//
                        this.message = "";
                        this.successful = false;
                        this.loading = true;

                        vehicleService.saveVehicleAvailability(data, entityId).then(
                            (response) => {
                                this.message = response.message;
                                this.successful = true;
                                this.loading = false;
                                this.getVehicleDetailsAvailability();
                                this.getVehicleDetailsRemarks();
                            },
                            (error) => {
                                this.message =
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                                this.successful = false;
                                this.loading = false;
                            }
                        );
                        //** **//
                    }
                }
                );
        },
        getVehicleDetailsAvailability() {
            let entityId = this.$route.params.id;
            return axios
                .get(resources_files.backend_url_assert_1() + '/get/api/production/asset/vehicle/backend/restapi/get/all/entity/related/common/vehicle/availability/' + entityId)
                .then(response => {
                    this.items2 = response.data;
                }).catch(function (error) {
                    return error;
                });
        },
        getVehicleDetailsRemarks() {
            let entityId = this.$route.params.id;
            return axios
                .get(resources_files.backend_url_assert_1() + '/get/api/production/asset/vehicle/backend/restapi/get/all/entity/related/common/vehicle/remarks/' + entityId)
                .then(response => {
                    this.items1 = response.data;
                }).catch(function (error) {
                    return error;
                });
        },
    },
};
</script>