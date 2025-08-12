<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="form-container">
          <form @submit.prevent="handleSubmit">
            <!-- Responsive Layout -->
            <div class="row g-3">
              <!-- Left Column -->
              <div class="col-12 col-lg-6">
                <div class="form-section">
                  <h5 class="section-title">Basic Information</h5>

                  <!-- Institution Name -->
                  <div class="mb-3">
                    <label for="institutionName" class="form-label"
                      >Institution Name</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.institutionName }"
                      id="institutionName"
                      v-model="form.institutionName"
                      @blur="validateField('institutionName')"
                    />
                    <div v-if="errors.institutionName" class="invalid-feedback">
                      {{ errors.institutionName }}
                    </div>
                  </div>

                  <!-- Institutional Sector -->
                  <div class="mb-3">
                    <label for="institutionalSector" class="form-label"
                      >Institutional Sector</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.institutionalSector }"
                      id="institutionalSector"
                      v-model="form.institutionalSector"
                      @blur="validateField('institutionalSector')"
                    />
                    <div
                      v-if="errors.institutionalSector"
                      class="invalid-feedback"
                    >
                      {{ errors.institutionalSector }}
                    </div>
                  </div>

                  <!-- Notice -->
                  <div class="alert alert-info mb-4">
                    Before proceed, please check whether your Institution Name
                    and the Institutional Sector shown here is Correct.
                  </div>

                  <!-- Assets Code -->
                  <div class="mb-3">
                    <label for="assetsCode" class="form-label"
                      >Assets Code</label
                    >
                    <select
                      class="form-select"
                      :class="{ 'is-invalid': errors.assetsCode }"
                      id="assetsCode"
                      v-model="form.assetsCode"
                      @change="handleAssetCodeChange"
                    >
                      <option value="">Select Assets Code</option>
                      <option
                        v-for="code in assetsCodeOptions"
                        :key="code.value"
                        :value="code.value"
                      >
                        {{ code.label }}
                      </option>
                    </select>
                    <div v-if="errors.assetsCode" class="invalid-feedback">
                      {{ errors.assetsCode }}
                    </div>
                  </div>

                  <!-- Type -->
                  <div class="mb-3">
                    <label for="type" class="form-label">Type</label>
                    <select
                      class="form-select"
                      :class="{ 'is-invalid': errors.type }"
                      id="type"
                      v-model="form.type"
                      @change="handleTypeChange"
                    >
                      <option value="">Select Type</option>
                      <option
                        v-for="type in typeOptions"
                        :key="type.value"
                        :value="type.value"
                      >
                        {{ type.label }}
                      </option>
                    </select>
                    <div v-if="errors.type" class="invalid-feedback">
                      {{ errors.type }}
                    </div>
                  </div>

                  <!-- Name -->
                  <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <select
                      class="form-select"
                      :class="{ 'is-invalid': errors.name }"
                      id="name"
                      v-model="form.name"
                      @change="handleNameChange"
                      :disabled="isLoadingNames || nameOptions.length === 0"
                    >
                      <option value="">
                        {{
                          isLoadingNames
                            ? "Loading names..."
                            : nameOptions.length === 0
                              ? "No names available - API error"
                              : "Select Name"
                        }}
                      </option>
                      <option
                        v-for="name in nameOptions"
                        :key="name.value"
                        :value="name.value"
                      >
                        {{ name.value }} - {{ name.label }}
                      </option>
                      <option
                        value="ADD_NEW"
                        class="text-primary fw-bold"
                        :disabled="nameOptions.length === 0"
                      >
                        ➕ Add New Airport/Airfield
                      </option>
                    </select>
                    <div v-if="errors.name" class="invalid-feedback">
                      {{ errors.name }}
                    </div>

                    <!-- API Error Message -->
                    <div
                      v-if="!isLoadingNames && nameOptions.length === 0"
                      class="mt-2"
                    >
                      <div class="alert alert-warning py-2 mb-0">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <strong>API Connection Issue:</strong> Unable to load
                        airport/airfield names from server. This may be due to
                        authentication or network issues.
                        <div class="mt-2">
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-warning me-2"
                            @click="fetchNameData"
                            :disabled="isLoadingNames"
                          >
                            <span
                              v-if="isLoadingNames"
                              class="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            {{
                              isLoadingNames ? "Loading..." : "Retry Connection"
                            }}
                          </button>
                        </div>
                      </div>
                    </div>

                    <small class="text-muted mt-1">
                      {{
                        nameOptions.length === 0 && !isLoadingNames
                          ? "Please retry loading names or contact support for assistance."
                          : 'If your airport/airfield is not listed, please use "Add New" option.'
                      }}
                    </small>
                  </div>

                  <!-- SIN Code -->
                  <div class="mb-3">
                    <label for="sinCode" class="form-label">SIN Code</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors.sinCode }"
                        id="sinCode"
                        v-model="form.sinCode"
                        placeholder="Click Generate to create SIN code"
                        readonly
                      />
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        @click="generateSinCode"
                        :disabled="isGeneratingSin || !canGenerateSin"
                        title="Generate SIN code based on Asset Code, Type, and Name"
                      >
                        <span
                          v-if="isGeneratingSin"
                          class="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {{ isGeneratingSin ? "Generating..." : "Generate" }}
                      </button>
                    </div>
                    <div v-if="errors.sinCode" class="invalid-feedback">
                      {{ errors.sinCode }}
                    </div>
                    <small class="text-muted">
                      SIN code is auto-generated based on Asset Code, Type, and
                      Name selection.
                      {{
                        !canGenerateSin
                          ? "Please select Asset Code, Type, and Name first."
                          : ""
                      }}
                    </small>
                  </div>

                  <!-- Location -->
                  <div class="mb-3">
                    <label class="form-label">Location</label>
                    <div class="row g-2">
                      <!-- District -->
                      <div class="col-12 col-sm-6">
                        <label for="district" class="form-label"
                          >District</label
                        >
                        <select
                          class="form-select"
                          :class="{ 'is-invalid': errors['location.district'] }"
                          id="district"
                          v-model="form.location.district"
                          @change="validateField('location.district')"
                        >
                          <option value="">Select District</option>
                          <option
                            v-for="district in districtOptions"
                            :key="district.value"
                            :value="district.value"
                          >
                            {{ district.label }}
                          </option>
                        </select>
                        <div
                          v-if="errors['location.district']"
                          class="invalid-feedback"
                        >
                          {{ errors["location.district"] }}
                        </div>
                      </div>

                      <!-- DS Division -->
                      <div class="col-12 col-sm-6">
                        <label for="dsDivision" class="form-label"
                          >DS Division</label
                        >
                        <select
                          class="form-select"
                          :class="{
                            'is-invalid': errors['location.dsDivision'],
                          }"
                          id="dsDivision"
                          v-model="form.location.dsDivision"
                          @change="validateField('location.dsDivision')"
                        >
                          <option value="">Select DS Division</option>
                          <option
                            v-for="ds in dsDivisionOptions"
                            :key="ds.value"
                            :value="ds.value"
                          >
                            {{ ds.label }}
                          </option>
                        </select>
                        <div
                          v-if="errors['location.dsDivision']"
                          class="invalid-feedback"
                        >
                          {{ errors["location.dsDivision"] }}
                        </div>
                      </div>
                    </div>

                    <div class="row g-2 mt-1">
                      <!-- GN Division -->
                      <div class="col-12 col-sm-6">
                        <label for="gnDivision" class="form-label"
                          >GN Division</label
                        >
                        <select
                          class="form-select"
                          :class="{
                            'is-invalid': errors['location.gnDivision'],
                          }"
                          id="gnDivision"
                          v-model="form.location.gnDivision"
                          @change="validateField('location.gnDivision')"
                        >
                          <option value="">Select GN Division</option>
                          <option
                            v-for="gn in gnDivisionOptions"
                            :key="gn.value"
                            :value="gn.value"
                          >
                            {{ gn.label }}
                          </option>
                        </select>
                        <div
                          v-if="errors['location.gnDivision']"
                          class="invalid-feedback"
                        >
                          {{ errors["location.gnDivision"] }}
                        </div>
                      </div>

                      <!-- Coordinates -->
                      <div class="col-12 col-sm-6">
                        <label for="coordinates" class="form-label"
                          >Coordinates</label
                        >
                        <select
                          class="form-select"
                          :class="{
                            'is-invalid': errors['location.coordinates'],
                          }"
                          id="coordinates"
                          v-model="form.location.coordinates"
                          @change="validateField('location.coordinates')"
                        >
                          <option value="">Select Coordinates</option>
                          <option
                            v-for="coord in coordinateOptions"
                            :key="coord.value"
                            :value="coord.value"
                          >
                            {{ coord.label }}
                          </option>
                        </select>
                        <div
                          v-if="errors['location.coordinates']"
                          class="invalid-feedback"
                        >
                          {{ errors["location.coordinates"] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="col-12 col-lg-6">
                <div class="form-section">
                  <h5 class="section-title">Area & Ownership Details</h5>

                  <!-- Land Area -->
                  <div class="mb-3">
                    <label class="form-label">Land Area</label>

                    <!-- Measurement Unit -->
                    <div class="row mb-3">
                      <div class="col-12">
                        <label for="measurementUnit" class="form-label"
                          >Measurement Unit</label
                        >
                        <select
                          class="form-select"
                          :class="{
                            'is-invalid': errors['landArea.measurementUnit'],
                          }"
                          id="measurementUnit"
                          v-model="form.landArea.measurementUnit"
                          @change="handleMeasurementUnitChange"
                        >
                          <option value="">Select Unit</option>
                          <option
                            v-for="unit in measurementUnitOptions"
                            :key="unit.value"
                            :value="unit.value"
                          >
                            {{ unit.label }}
                          </option>
                        </select>
                        <div
                          v-if="errors['landArea.measurementUnit']"
                          class="invalid-feedback"
                        >
                          {{ errors["landArea.measurementUnit"] }}
                        </div>
                      </div>
                    </div>

                    <!-- Area Fields -->
                    <div class="row g-2">
                      <!-- Area -->
                      <div class="col-12 col-sm-6">
                        <label for="area" class="form-label">Area</label>
                        <input
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': errors['landArea.area'] }"
                          id="area"
                          v-model="form.landArea.area"
                          placeholder="0.00"
                          @blur="validateField('landArea.area')"
                          @input="handleAreaInput"
                        />
                        <div
                          v-if="errors['landArea.area']"
                          class="invalid-feedback"
                        >
                          {{ errors["landArea.area"] }}
                        </div>
                      </div>

                      <!-- Area (km2) -->
                      <div class="col-12 col-sm-6">
                        <label for="areaKm2" class="form-label">
                          Area (km²)
                          <small class="text-muted">(Auto-calculated)</small>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': errors['landArea.areaKm2'] }"
                          id="areaKm2"
                          v-model="form.landArea.areaKm2"
                          placeholder="0.00"
                          readonly
                          style="background-color: #f8f9fa; cursor: not-allowed"
                          title="This field is automatically calculated based on the area and measurement unit"
                        />
                        <div
                          v-if="errors['landArea.areaKm2']"
                          class="invalid-feedback"
                        >
                          {{ errors["landArea.areaKm2"] }}
                        </div>
                      </div>
                    </div>

                    <!-- Land Ownership Row -->
                    <div class="row g-2 mt-1">
                      <!-- Land Ownership -->
                      <div class="col-12 col-sm-6">
                        <label for="landOwnership" class="form-label"
                          >Land Ownership</label
                        >
                        <select
                          class="form-select"
                          :class="{
                            'is-invalid': errors['landArea.landOwnership'],
                          }"
                          id="landOwnership"
                          v-model="form.landArea.landOwnership"
                          @change="validateField('landArea.landOwnership')"
                        >
                          <option value="">Select Ownership</option>
                          <option
                            v-for="ownership in landOwnershipOptions"
                            :key="ownership.value"
                            :value="ownership.value"
                          >
                            {{ ownership.label }}
                          </option>
                        </select>
                        <div
                          v-if="errors['landArea.landOwnership']"
                          class="invalid-feedback"
                        >
                          {{ errors["landArea.landOwnership"] }}
                        </div>
                      </div>

                      <!-- Land Owner Name (conditional field) -->
                      <div v-if="showLandOwnerName" class="col-12 col-sm-6">
                        <label for="landOwnerName" class="form-label"
                          >Land Owner Name</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid': errors['landArea.landOwnerName'],
                          }"
                          id="landOwnerName"
                          v-model="form.landArea.landOwnerName"
                          placeholder="Enter owner name"
                          @blur="validateField('landArea.landOwnerName')"
                        />
                        <div
                          v-if="errors['landArea.landOwnerName']"
                          class="invalid-feedback"
                        >
                          {{ errors["landArea.landOwnerName"] }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Ownership -->
                  <div class="mb-3">
                    <label for="ownership" class="form-label">Ownership</label>
                    <select
                      class="form-select"
                      :class="{ 'is-invalid': errors.ownership }"
                      id="ownership"
                      v-model="form.ownership"
                      @change="validateField('ownership')"
                    >
                      <option value="">Select Ownership</option>
                      <option
                        v-for="ownership in ownershipOptions"
                        :key="ownership.value"
                        :value="ownership.value"
                      >
                        {{ ownership.label }}
                      </option>
                    </select>
                    <div v-if="errors.ownership" class="invalid-feedback">
                      {{ errors.ownership }}
                    </div>
                  </div>

                  <!-- Transfer In Information Message -->
                  <div
                    v-if="form.ownership === 'Own(Transfer In)'"
                    class="alert alert-info mb-3"
                  >
                    <strong>Own (Transfer in)</strong> = Structure Constructed
                    by another Institution and Transferred free of charge to
                    your Institution
                  </div>

                  <!-- Transfer Out Information Message -->
                  <div
                    v-if="form.ownership === 'Own(Transfer Out)'"
                    class="alert alert-info mb-3"
                  >
                    <strong>Own (Transfer Out)</strong> = Structure Constructed
                    by your Institution and transferred to another Institution
                    free of charge
                  </div>

                  <!-- Annual Maximum Handling Capacity -->
                  <div v-if="showAnnualMaxHandling" class="mb-3">
                    <label class="form-label"
                      >Annual Maximum Handling Capacity</label
                    >
                    <div class="row g-2">
                      <!-- Air Craft (Nos.) -->
                      <div class="col-12 mb-3">
                        <label for="airCraft" class="form-label"
                          >Air Craft (Nos.)</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          :class="{
                            'is-invalid': errors['annualMaxHandling.airCraft'],
                          }"
                          id="airCraft"
                          v-model="form.annualMaxHandling.airCraft"
                          placeholder="Numbers Only"
                          @blur="validateField('annualMaxHandling.airCraft')"
                        />
                        <div
                          v-if="errors['annualMaxHandling.airCraft']"
                          class="invalid-feedback"
                        >
                          {{ errors["annualMaxHandling.airCraft"] }}
                        </div>
                      </div>

                      <!-- Passenger (Nos.) -->
                      <div class="col-12 col-sm-6">
                        <label for="passenger" class="form-label"
                          >Passenger (Nos.)</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          :class="{
                            'is-invalid': errors['annualMaxHandling.passenger'],
                          }"
                          id="passenger"
                          v-model="form.annualMaxHandling.passenger"
                          placeholder="Numbers Only"
                          @blur="validateField('annualMaxHandling.passenger')"
                        />
                        <div
                          v-if="errors['annualMaxHandling.passenger']"
                          class="invalid-feedback"
                        >
                          {{ errors["annualMaxHandling.passenger"] }}
                        </div>
                      </div>

                      <!-- Freight (MT) -->
                      <div class="col-12 col-sm-6">
                        <label for="freight" class="form-label"
                          >Freight (MT)</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          :class="{
                            'is-invalid': errors['annualMaxHandling.freight'],
                          }"
                          id="freight"
                          v-model="form.annualMaxHandling.freight"
                          placeholder="Numbers Only"
                          @blur="validateField('annualMaxHandling.freight')"
                        />
                        <div
                          v-if="errors['annualMaxHandling.freight']"
                          class="invalid-feedback"
                        >
                          {{ errors["annualMaxHandling.freight"] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Conditional Fields Section - Full Width -->
            <div v-if="showConditionalFields" class="mb-3">
              <div class="alert alert-warning mb-3">
                <strong>Additional Information Required:</strong> Please provide
                the following details for
                {{ form.ownership.toLowerCase() }} property.
              </div>

              <div class="row g-3">
                <!-- From Whom / To Whom -->
                <div class="col-12 col-md-6">
                  <label for="fromWhom" class="form-label">
                    {{
                      form.ownership === "Leased Out" ||
                      form.ownership === "Rented Out" ||
                      form.ownership === "Own(Transfer Out)"
                        ? "To Whom"
                        : "From Whom"
                    }}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.fromWhom }"
                    id="fromWhom"
                    v-model="form.fromWhom"
                    :placeholder="getPlaceholderText()"
                    @blur="validateField('fromWhom')"
                  />
                  <div v-if="errors.fromWhom" class="invalid-feedback">
                    {{ errors.fromWhom }}
                  </div>
                </div>

                <!-- Payment Method (only for lease/rent) -->
                <div v-if="showPaymentFields" class="col-12 col-md-6">
                  <label for="paymentMethod" class="form-label"
                    >Payment Method</label
                  >
                  <select
                    class="form-select"
                    :class="{ 'is-invalid': errors.paymentMethod }"
                    id="paymentMethod"
                    v-model="form.paymentMethod"
                    @change="validateField('paymentMethod')"
                  >
                    <option value="">Select Payment Method</option>
                    <option
                      v-for="method in paymentMethodOptions"
                      :key="method.value"
                      :value="method.value"
                    >
                      {{ method.label }}
                    </option>
                  </select>
                  <div v-if="errors.paymentMethod" class="invalid-feedback">
                    {{ errors.paymentMethod }}
                  </div>
                </div>
              </div>

              <div v-if="showPaymentFields" class="row g-3 mt-1">
                <!-- Period From -->
                <div class="col-12 col-sm-6 col-lg-4">
                  <label for="periodFrom" class="form-label">Period From</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': errors.periodFrom }"
                    id="periodFrom"
                    v-model="form.periodFrom"
                    @blur="validateField('periodFrom')"
                  />
                  <div v-if="errors.periodFrom" class="invalid-feedback">
                    {{ errors.periodFrom }}
                  </div>
                </div>

                <!-- Period To -->
                <div class="col-12 col-sm-6 col-lg-4">
                  <label for="periodTo" class="form-label">Period To</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': errors.periodTo }"
                    id="periodTo"
                    v-model="form.periodTo"
                    @blur="validateField('periodTo')"
                  />
                  <div v-if="errors.periodTo" class="invalid-feedback">
                    {{ errors.periodTo }}
                  </div>
                </div>

                <!-- Payment Amount -->
                <div class="col-12 col-lg-4">
                  <label for="paymentAmount" class="form-label">
                    {{
                      form.ownership === "Leased Out" ||
                      form.ownership === "Rented Out"
                        ? "Income (Rs.Million)"
                        : "Payment (Rs.Million)"
                    }}
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors.paymentAmount }"
                    id="paymentAmount"
                    v-model="form.paymentAmount"
                    placeholder="Enter amount in millions"
                    step="0.01"
                    @blur="validateField('paymentAmount')"
                  />
                  <div v-if="errors.paymentAmount" class="invalid-feedback">
                    {{ errors.paymentAmount }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Summary -->
            <div
              v-if="showErrorSummary && Object.keys(errors).length > 0"
              class="alert alert-danger mb-3"
            >
              <h6>Please fix the following errors:</h6>
              <ul class="mb-0">
                <li v-for="error in Object.values(errors)" :key="error">
                  {{ error }}
                </li>
              </ul>
            </div>

            <!-- Next Button -->
            <div
              class="mb-3 d-flex justify-content-center justify-content-sm-end"
            >
              <button
                type="submit"
                class="btn btn-primary btn-lg w-100 w-sm-auto"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add New Name Modal -->
    <div
      v-if="showModal"
      class="modal fade show"
      id="addNewNameModal"
      tabindex="-1"
      aria-labelledby="addNewNameModalLabel"
      aria-hidden="false"
      style="display: block"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addNewNameModalLabel">
              Add New Airport/Airfield
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveNewName">
              <div class="mb-3">
                <label for="newNameInput" class="form-label">
                  Airport/Airfield Name <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': newNameError }"
                  id="newNameInput"
                  v-model="newNameInput"
                  placeholder="Enter airport/airfield name"
                  maxlength="100"
                />
                <div v-if="newNameError" class="invalid-feedback">
                  {{ newNameError }}
                </div>
                <small class="text-muted">
                  Please enter the complete name of the airport or airfield.
                </small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal"
              :disabled="isSavingNewName"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveNewName"
              :disabled="isSavingNewName || !newNameInput.trim()"
            >
              <span
                v-if="isSavingNewName"
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {{ isSavingNewName ? "Saving..." : "Save" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import authHeader from "../../services/Auth&UserServices/auth-header.js";

// Initialize Vue Router
const router = useRouter();

// Form data
const form = reactive({
  institutionName: "",
  institutionalSector: "",
  assetsCode: "",
  type: "",
  name: "",
  sinCode: "", // SIN code field
  location: {
    district: "",
    dsDivision: "",
    gnDivision: "",
    coordinates: "",
  },
  landArea: {
    measurementUnit: "",
    area: "",
    areaKm2: "",
    landOwnership: "",
    landOwnerName: "", // New field for land owner name
  },
  ownership: "",
  // Conditional fields for leased/rented
  fromWhom: "",
  periodFrom: "",
  periodTo: "",
  paymentMethod: "",
  paymentAmount: "",
  annualMaxHandling: {
    airCraft: "",
    passenger: "",
    freight: "",
  },
});

// Computed property to show/hide conditional fields
const showConditionalFields = computed(() => {
  return (
    form.ownership === "Leased" ||
    form.ownership === "Rented" ||
    form.ownership === "Leased Out" ||
    form.ownership === "Rented Out" ||
    form.ownership === "Own(Transfer In)" ||
    form.ownership === "Own(Transfer Out)"
  );
});

// Computed property to determine if payment fields should be shown
const showPaymentFields = computed(() => {
  return (
    form.ownership === "Leased" ||
    form.ownership === "Rented" ||
    form.ownership === "Leased Out" ||
    form.ownership === "Rented Out"
  );
});

// Computed property to determine if only transfer fields should be shown
const showTransferFields = computed(() => {
  return (
    form.ownership === "Own(Transfer In)" ||
    form.ownership === "Own(Transfer Out)"
  );
});

// Computed property to determine if land owner name field should be shown
const showLandOwnerName = computed(() => {
  return form.landArea.landOwnership === "Own by Other Party";
});

// Computed property to determine if Annual Maximum Handling Capacity fields should be shown
const showAnnualMaxHandling = computed(() => {
  return form.assetsCode === "30501"; // Updated for airport code
});

// Error tracking
const errors = reactive({});
const showErrorSummary = ref(false);

// Loading states
const isLoadingNames = ref(false);
const isGeneratingSin = ref(false);

// Add New Name functionality
const newNameInput = ref("");
const newNameError = ref("");
const isSavingNewName = ref(false);
const showModal = ref(false);

// SIN Code generation - computed property to check if all required fields are filled
const canGenerateSin = computed(() => {
  return form.assetsCode && form.type && form.name;
});

// API data
const districtData = ref([]);
const districtOptions = ref([]);
const dsDivisionOptions = ref([]);
const gnDivisionOptions = ref([]);
const nameOptions = ref([]);

// Watch for ownership changes to clear conditional fields
watch(
  () => form.ownership,
  (newOwnership) => {
    if (
      newOwnership !== "Leased" &&
      newOwnership !== "Rented" &&
      newOwnership !== "Leased Out" &&
      newOwnership !== "Rented Out" &&
      newOwnership !== "Own(Transfer In)" &&
      newOwnership !== "Own(Transfer Out)"
    ) {
      // Clear all conditional fields when ownership doesn't require them
      form.fromWhom = "";
      form.periodFrom = "";
      form.periodTo = "";
      form.paymentMethod = "";
      form.paymentAmount = "";

      // Clear related errors
      delete errors.fromWhom;
      delete errors.periodFrom;
      delete errors.periodTo;
      delete errors.paymentMethod;
      delete errors.paymentAmount;
    } else if (
      newOwnership === "Own(Transfer In)" ||
      newOwnership === "Own(Transfer Out)"
    ) {
      // Clear payment fields for transfer types (keep fromWhom)
      form.periodFrom = "";
      form.periodTo = "";
      form.paymentMethod = "";
      form.paymentAmount = "";

      // Clear payment-related errors
      delete errors.periodFrom;
      delete errors.periodTo;
      delete errors.paymentMethod;
      delete errors.paymentAmount;
    }
  }
);

// Fetch district data from API
const fetchDistrictData = async () => {
  try {
    // Use proxy path instead of direct URL
    const response = await axios.get(
      "/management/get/api/production/system/management/backend/restapi/get/all/contdistrict",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
          "Content-Type": "application/json",
        },
      }
    );
    districtData.value = response.data;

    // Create district options
    districtOptions.value = districtData.value.map((district) => ({
      value: district.id,
      label: district.district,
      data: district.data,
    }));
  } catch (error) {
    console.error("Error fetching district data:", error);
  }
};

// Fetch name data from API
const fetchNameData = async () => {
  try {
    isLoadingNames.value = true;
    console.log("Attempting to fetch name data...");

    // Get auth headers with the specific token
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
      "Content-Type": "application/json",
    };
    console.log("Auth headers:", headers);

    const response = await axios.get(
      "/cgobasicairfield/api/v1/InstitutionName",
      {
        headers,
      }
    );

    console.log("Name API Response:", response);
    console.log("Name API Response Data:", response.data);

    // Process the API response
    if (Array.isArray(response.data)) {
      nameOptions.value = response.data.map((item, index) => {
        // Format ID to 5 digits starting from 00001
        const id = String(item.id || index + 1).padStart(5, "0");
        return {
          value: id,
          label: item.name || item.displayName || item,
        };
      });
    } else if (response.data && response.data.data) {
      nameOptions.value = response.data.data.map((item, index) => {
        // Format ID to 5 digits starting from 00001
        const id = String(item.id || index + 1).padStart(5, "0");
        return {
          value: id,
          label: item.name || item.displayName || item,
        };
      });
    } else {
      console.log("Unexpected API response structure:", response.data);
      nameOptions.value = [];
    }

    console.log("Processed name options:", nameOptions.value);
  } catch (error) {
    console.error("API request failed:", error.message);

    // Clear name options on API failure
    nameOptions.value = [];

    // Show user-friendly error notification
    if (error.response?.status === 401) {
      showNotification(
        "danger",
        "Authentication failed. Please login again to load airport/airfield names."
      );
    } else if (error.response?.status === 404) {
      showNotification(
        "warning",
        "Name service endpoint not found. Please contact support."
      );
    } else if (error.response?.status >= 500) {
      showNotification(
        "danger",
        "Server error while loading airport/airfield names. Please try again later."
      );
    } else if (
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error"
    ) {
      showNotification(
        "danger",
        "Network error while loading airport/airfield names. Please check your connection and try again."
      );
    } else {
      showNotification(
        "danger",
        "Failed to load airport/airfield names from API. Please try again or contact support."
      );
    }
  } finally {
    isLoadingNames.value = false;
  }
};

// Generate SIN Code using API
const generateSinCode = async () => {
  if (!canGenerateSin.value) {
    showNotification(
      "warning",
      "Please select Asset Code, Type, and Name before generating SIN code."
    );
    return;
  }

  try {
    isGeneratingSin.value = true;
    console.log("Generating SIN code...", {
      assetCode: form.assetsCode,
      type: form.type,
      name: form.name,
    });

    // Get auth headers with the specific token
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
      "Content-Type": "application/json",
    };

    // Prepare request data
    const requestData = {
      assetCode: form.assetsCode,
      type: form.type,
      name: form.name,
    };

    console.log("SIN Code API Request:", requestData);

    const response = await axios.post(
      "http://192.168.231.62/cgosincode/api/BaseSinCode/generate",
      requestData,
      {
        headers,
      }
    );

    console.log("SIN Code API Response:", response.data);
    console.log("Response data type:", typeof response.data);
    console.log(
      "Response data keys:",
      response.data ? Object.keys(response.data) : "No data"
    );

    // Set the generated SIN code
    if (response.data && response.data.sinCode) {
      form.sinCode = response.data.sinCode;
      // Store in session storage for other components to use
      sessionStorage.setItem("airfieldSinNumber", response.data.sinCode);
      showNotification(
        "success",
        `SIN Code generated successfully: ${response.data.sinCode}`
      );
    } else if (response.data && response.data.basicSinCode) {
      // Handle basicSinCode field
      const sinCode =
        typeof response.data.basicSinCode === "object"
          ? response.data.basicSinCode.code ||
            response.data.basicSinCode.value ||
            JSON.stringify(response.data.basicSinCode)
          : response.data.basicSinCode;
      form.sinCode = sinCode;
      // Store in session storage for other components to use
      sessionStorage.setItem("airfieldSinNumber", sinCode);
      showNotification(
        "success",
        `SIN Code generated successfully: ${sinCode}`
      );
    } else if (response.data && typeof response.data === "string") {
      form.sinCode = response.data;
      // Store in session storage for other components to use
      sessionStorage.setItem("airfieldSinNumber", response.data);
      showNotification(
        "success",
        `SIN Code generated successfully: ${response.data}`
      );
    } else {
      console.warn("Unexpected SIN code response format:", response.data);
      // Try to extract any string value from the response
      let extractedCode = "Generated";
      if (response.data) {
        if (typeof response.data === "object") {
          // Look for common SIN code field names
          extractedCode =
            response.data.code ||
            response.data.sinCode ||
            response.data.basicSinCode ||
            response.data.value ||
            response.data.id ||
            JSON.stringify(response.data);
        } else {
          extractedCode = response.data.toString();
        }
      }
      form.sinCode = extractedCode;
      // Store in session storage for other components to use
      sessionStorage.setItem("airfieldSinNumber", extractedCode);
      showNotification("success", "SIN Code generated successfully!");
    }

    // Clear any existing SIN code errors
    delete errors.sinCode;
  } catch (error) {
    console.error("Error generating SIN code:", error);

    // Show user-friendly error notification
    if (error.response?.status === 401) {
      showNotification(
        "danger",
        "Authentication failed. Please login again to generate SIN code."
      );
    } else if (error.response?.status === 400) {
      showNotification(
        "warning",
        "Invalid data provided. Please check Asset Code, Type, and Name selections."
      );
    } else if (error.response?.status === 404) {
      showNotification(
        "warning",
        "SIN Code generation service not found. Please contact support."
      );
    } else if (error.response?.status === 409) {
      showNotification(
        "warning",
        "SIN code already exists or conflicts with existing data. Please try with different selections."
      );
    } else if (error.response?.status >= 500) {
      showNotification(
        "danger",
        "Server error while generating SIN code. Please try again later."
      );
    } else if (
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error"
    ) {
      showNotification(
        "danger",
        "Network error while generating SIN code. Please check your connection and try again."
      );
    } else {
      showNotification(
        "danger",
        "Failed to generate SIN code. Please try again or contact support."
      );
    }
  } finally {
    isGeneratingSin.value = false;
  }
};

// Watch for district selection changes
watch(
  () => form.location.district,
  (newDistrictId) => {
    // Reset dependent fields
    form.location.dsDivision = "";
    form.location.gnDivision = "";
    dsDivisionOptions.value = [];
    gnDivisionOptions.value = [];

    if (newDistrictId) {
      const selectedDistrict = districtData.value.find(
        (d) => d.id === newDistrictId
      );
      if (selectedDistrict && selectedDistrict.data) {
        dsDivisionOptions.value = selectedDistrict.data.map((ds) => ({
          value: ds.id_pk,
          label: ds.ds,
          data: ds.data || [],
        }));
      }
    }
  }
);

// Watch for DS division selection changes
watch(
  () => form.location.dsDivision,
  (newDsId) => {
    // Reset GN division
    form.location.gnDivision = "";
    gnDivisionOptions.value = [];

    if (newDsId) {
      const selectedDs = dsDivisionOptions.value.find(
        (ds) => ds.value === newDsId
      );
      if (selectedDs && selectedDs.data) {
        gnDivisionOptions.value = selectedDs.data.map((gn) => ({
          value: gn.id_pk || gn.id,
          label: gn.gn || gn.name,
        }));
      }
    }
  }
);

// Watch for land ownership changes to clear land owner name
watch(
  () => form.landArea.landOwnership,
  (newLandOwnership) => {
    if (newLandOwnership !== "Own by Other Party") {
      // Clear land owner name when land ownership is not "Own by Other Party"
      form.landArea.landOwnerName = "";
      // Clear related error
      delete errors["landArea.landOwnerName"];
    }
  }
);

// Watch for asset code changes to clear Annual Maximum Handling Capacity fields
watch(
  () => form.assetsCode,
  (newAssetsCode) => {
    if (newAssetsCode !== "30501") {
      // Updated for airport code
      // Clear Annual Maximum Handling Capacity fields when asset code is not Airport
      form.annualMaxHandling.airCraft = "";
      form.annualMaxHandling.passenger = "";
      form.annualMaxHandling.freight = "";
      // Clear related errors
      delete errors["annualMaxHandling.airCraft"];
      delete errors["annualMaxHandling.passenger"];
      delete errors["annualMaxHandling.freight"];
    }
  }
);

// Watch for changes in Asset Code, Type, or Name to clear SIN code
watch(
  [() => form.assetsCode, () => form.type, () => form.name],
  ([newAssetCode, newType, newName], [oldAssetCode, oldType, oldName]) => {
    // Clear SIN code if any of the key fields change (but not on initial load)
    if (
      (oldAssetCode !== undefined && newAssetCode !== oldAssetCode) ||
      (oldType !== undefined && newType !== oldType) ||
      (oldName !== undefined && newName !== oldName)
    ) {
      form.sinCode = "";
      delete errors.sinCode;

      if (form.sinCode !== "") {
        showNotification(
          "info",
          "SIN code cleared due to changes. Please regenerate the SIN code."
        );
      }
    }
  }
);

// Updated validation rules to include conditional fields
const validationRules = {
  institutionName: { required: true, message: "Institution Name is required" },
  institutionalSector: {
    required: true,
    message: "Institutional Sector is required",
  },
  assetsCode: { required: true, message: "Assets Code is required" },
  type: { required: true, message: "Type is required" },
  name: { required: true, message: "Name is required" },
  sinCode: {
    required: true,
    message: "SIN Code is required. Please generate it first.",
  },
  "location.district": { required: true, message: "District is required" },
  "location.dsDivision": { required: true, message: "DS Division is required" },
  "landArea.measurementUnit": {
    required: true,
    message: "Measurement Unit is required",
  },
  "landArea.area": { required: true, message: "Area is required" },
  "landArea.landOwnership": {
    required: true,
    message: "Land Ownership is required",
  },
  "landArea.landOwnerName": {
    required: true,
    message: "Name of the Land Owner is required",
    conditional: true,
  },
  ownership: { required: true, message: "Ownership is required" },
  // Conditional validation rules
  fromWhom: {
    required: true,
    message: "From Whom/To Whom is required",
    conditional: true,
  },
  periodFrom: {
    required: true,
    message: "Period From is required",
    conditional: true,
  },
  periodTo: {
    required: true,
    message: "Period To is required",
    conditional: true,
  },
  paymentMethod: {
    required: true,
    message: "Payment Method is required",
    conditional: true,
  },
  paymentAmount: {
    required: true,
    message: () =>
      form.ownership === "Leased Out" || form.ownership === "Rented Out"
        ? "Income (Rs.Million) is required"
        : "Payment (Rs.Million) is required",
    conditional: true,
  },
  "annualMaxHandling.airCraft": {
    required: true,
    message: "Air Craft capacity is required",
    conditional: true,
  },
};

// Get nested property value
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current && current[key], obj);
};

// Get placeholder text based on ownership type
const getPlaceholderText = () => {
  switch (form.ownership) {
    case "Leased":
    case "Rented":
      return "Enter the name of lessor/landlord";
    case "Leased Out":
    case "Rented Out":
      return "Enter the name of lessee/tenant";
    case "Own(Transfer In)":
      return "Enter the name of transferor";
    case "Own(Transfer Out)":
      return "Enter the name of transferee";
    default:
      return "Enter name";
  }
};

// Area conversion function
const convertToKm2 = (area, unit) => {
  if (!area || !unit || isNaN(parseFloat(area))) {
    return "";
  }

  const numericArea = parseFloat(area);
  let km2Value;

  switch (unit) {
    case "SQUARE_METERS":
      km2Value = numericArea / 1000000; // 1 km² = 1,000,000 m²
      break;
    case "SQUARE_KILOMETERS":
      km2Value = numericArea; // Already in km²
      break;
    case "SQUARE_MILES":
      km2Value = numericArea * 2.58999; // 1 square mile = 2.58999 km²
      break;
    case "SQUARE_YARDS":
      km2Value = numericArea / 1195990; // 1 km² = 1,195,990 yd²
      break;
    case "SQUARE_FEET":
      km2Value = numericArea / 10763910; // 1 km² = 10,763,910 ft²
      break;
    case "HECTARES":
      km2Value = numericArea / 100; // 1 km² = 100 hectares
      break;
    case "PERCHES":
      km2Value = numericArea / 39536.9; // 1 km² = 39,536.9 perches (approximate)
      break;
    default:
      km2Value = 0;
  }

  return km2Value.toFixed(6); // Return with 6 decimal places for precision
};

// Watch for area or measurement unit changes to auto-calculate km²
watch(
  [() => form.landArea.area, () => form.landArea.measurementUnit],
  ([newArea, newUnit]) => {
    if (newArea && newUnit) {
      form.landArea.areaKm2 = convertToKm2(newArea, newUnit);
    } else {
      form.landArea.areaKm2 = "";
    }
  },
  { immediate: true }
);

// Validate individual field
const validateField = (fieldName) => {
  const rule = validationRules[fieldName];
  if (!rule) return true;

  // Skip validation for conditional fields if ownership doesn't require them
  if (rule.conditional && !showConditionalFields.value) {
    delete errors[fieldName];
    return true;
  }

  // Skip payment fields validation for transfer ownership types
  if (
    rule.conditional &&
    showTransferFields.value &&
    (fieldName === "periodFrom" ||
      fieldName === "periodTo" ||
      fieldName === "paymentMethod" ||
      fieldName === "paymentAmount")
  ) {
    delete errors[fieldName];
    return true;
  }

  // Skip land owner name validation if land ownership is not "Own"
  if (fieldName === "landArea.landOwnerName" && !showLandOwnerName.value) {
    delete errors[fieldName];
    return true;
  }

  // Skip Annual Maximum Handling Capacity validation if asset code is not Airport
  if (
    fieldName === "annualMaxHandling.airCraft" &&
    !showAnnualMaxHandling.value
  ) {
    delete errors[fieldName];
    return true;
  }

  const value = getNestedValue(form, fieldName);

  if (rule.required && (!value || value.toString().trim() === "")) {
    errors[fieldName] =
      typeof rule.message === "function" ? rule.message() : rule.message;
    return false;
  } else {
    delete errors[fieldName];
    return true;
  }
};

// Validate all fields
const validateAllFields = () => {
  let isValid = true;

  Object.keys(validationRules).forEach((fieldName) => {
    if (!validateField(fieldName)) {
      isValid = false;
    }
  });

  return isValid;
};

// Handle form submission
const handleSubmit = async () => {
  showErrorSummary.value = true;

  // Check if name data is available from API
  if (nameOptions.value.length === 0 && !isLoadingNames.value) {
    showNotification(
      "danger",
      "Cannot submit form: Airport/Airfield names are not available. Please retry loading names or contact support."
    );
    return;
  }

  if (validateAllFields()) {
    // Debug: Log current form state
    console.log(
      "Current form state before preparing data:",
      JSON.stringify(form, null, 2)
    );

    // Prepare data in the expected API format with nested DTOs
    const completeConstructionData = {
      airFieldDataDto: {
        sinNumber: form.sinCode?.trim() || "",
        institutionName: form.institutionName?.trim() || "",
        institutionSector: form.institutionalSector?.trim() || "",
        assetCode: form.assetsCode?.trim() || "",
        type: form.type?.trim() || "",
        name: form.name?.trim() || "",
        locationDistrict: form.location.district?.trim() || "",
        locationDsDivision: form.location.dsDivision?.trim() || "",
        locationGnDivision: form.location.gnDivision?.trim() || "",
        locationCoordinates: form.location.coordinates?.trim() || "",
        landArea: form.landArea.area ? parseFloat(form.landArea.area) : 0,
        squareKm: form.landArea.areaKm2 ? parseFloat(form.landArea.areaKm2) : 0,
        measurementUnit: form.landArea.measurementUnit || "",
        ownership: form.ownership?.trim() || "",
        landOwnership: form.landArea.landOwnership?.trim() || "",
        aircraftCount:
          showAnnualMaxHandling.value && form.annualMaxHandling.airCraft
            ? parseInt(form.annualMaxHandling.airCraft)
            : 0,
        passengerCount:
          showAnnualMaxHandling.value && form.annualMaxHandling.passenger
            ? parseInt(form.annualMaxHandling.passenger)
            : 0,
        freightMT:
          showAnnualMaxHandling.value && form.annualMaxHandling.freight
            ? parseFloat(form.annualMaxHandling.freight)
            : 0,
      },
      fromToWhomDto: showConditionalFields.value
        ? {
            ownership: form.ownership?.trim() || "",
            fromWhom:
              form.ownership === "Leased" ||
              form.ownership === "Rented" ||
              form.ownership === "Own(Transfer In)"
                ? form.fromWhom?.trim() || ""
                : "",
            toWhom:
              form.ownership === "Leased Out" ||
              form.ownership === "Rented Out" ||
              form.ownership === "Own(Transfer Out)"
                ? form.fromWhom?.trim() || ""
                : "",
            startPeriod: showPaymentFields.value
              ? form.periodFrom?.trim() || ""
              : "",
            endPeriod: showPaymentFields.value
              ? form.periodTo?.trim() || ""
              : "",
            paymentMethod: showPaymentFields.value
              ? form.paymentMethod?.trim() || ""
              : "",
            incomeOrPayment:
              form.ownership === "Leased Out" || form.ownership === "Rented Out"
                ? "Income"
                : "Payment",
            amount:
              showPaymentFields.value && form.paymentAmount
                ? parseFloat(form.paymentAmount)
                : 0,
          }
        : null,
    };

    try {
      const submitButton = document.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Saving...";
      submitButton.disabled = true;

      // Log the data being sent for debugging
      console.log(
        "Prepared data for submission:",
        JSON.stringify(completeConstructionData, null, 2)
      );

      // Keep the original name ID instead of converting to name string
      console.log(
        `Keeping original name ID: ${completeConstructionData.airFieldDataDto.name}`
      );

      // Additional validation for required fields
      const requiredFields = [
        "institutionName",
        "institutionSector",
        "assetCode",
        "type",
        "name",
        "sinNumber",
      ];
      const missingFields = requiredFields.filter(
        (field) => !completeConstructionData.airFieldDataDto[field]
      );

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Additional validation for specific field lengths and formats
      if (completeConstructionData.airFieldDataDto.institutionName.length < 2) {
        throw new Error("Institution Name must be at least 2 characters long");
      }

      if (
        completeConstructionData.airFieldDataDto.institutionSector.length < 2
      ) {
        throw new Error(
          "Institutional Sector must be at least 2 characters long"
        );
      }

      if (!completeConstructionData.airFieldDataDto.locationDistrict) {
        throw new Error("District is required in location");
      }

      if (!completeConstructionData.airFieldDataDto.locationDsDivision) {
        throw new Error("DS Division is required in location");
      }

      if (!form.landArea.measurementUnit) {
        throw new Error("Measurement Unit is required for land area");
      }

      if (!completeConstructionData.airFieldDataDto.ownership) {
        throw new Error("Ownership is required");
      }

      // Validate numeric fields
      if (
        isNaN(completeConstructionData.airFieldDataDto.landArea) ||
        completeConstructionData.airFieldDataDto.landArea < 0
      ) {
        throw new Error("Invalid area value");
      }

      console.log(
        "Final data being sent to API:",
        JSON.stringify(completeConstructionData, null, 2)
      );

      // Validate the final payload structure
      const payloadValidation = {
        hasBasicInfo: !!(
          completeConstructionData.airFieldDataDto.institutionName &&
          completeConstructionData.airFieldDataDto.institutionSector
        ),
        hasAssetInfo: !!(
          completeConstructionData.airFieldDataDto.assetCode &&
          completeConstructionData.airFieldDataDto.type &&
          completeConstructionData.airFieldDataDto.name
        ),
        hasSinCode: !!completeConstructionData.airFieldDataDto.sinNumber,
        hasLocationInfo: !!(
          completeConstructionData.airFieldDataDto.locationDistrict &&
          completeConstructionData.airFieldDataDto.locationDsDivision
        ),
        hasLandAreaInfo: !!(
          form.landArea.measurementUnit &&
          completeConstructionData.airFieldDataDto.landArea
        ),
        hasOwnershipInfo: !!completeConstructionData.airFieldDataDto.ownership,
      };

      console.log("Payload validation check:", payloadValidation);

      // Call backend API to save airfield data
      await axios.post(
        "http://192.168.231.62/cgobasicairfield/api/airfield/save",
        completeConstructionData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
            "Content-Type": "application/json",
          },
        }
      );

      // Show success message
      const successAlert = document.createElement("div");
      successAlert.className =
        "alert alert-success alert-dismissible fade show position-fixed";
      successAlert.style.cssText =
        "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
      successAlert.innerHTML = `
        <strong>Success!</strong> Complete construction data saved successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(successAlert);

      // Store SIN number in session storage for use in other components
      if (form.sinCode) {
        sessionStorage.setItem("airfieldSinNumber", form.sinCode);
        console.log("SIN number stored in session:", form.sinCode);
      }

      // Auto-remove success message after 3 seconds
      setTimeout(() => {
        if (successAlert.parentNode) {
          successAlert.remove();
        }
      }, 3000);

      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Navigate to construction status page after showing success message
      setTimeout(() => {
        router.push("/construction/status");
      }, 1500);
    } catch (error) {
      console.error("Error saving complete construction data:", error);
      console.error("Full error object:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      console.error(
        "Complete request data being sent:",
        JSON.stringify(completeConstructionData, null, 2)
      );

      // Show detailed error message based on status code
      let errorMessage = "Failed to save data. Please try again.";

      if (error.response?.status === 400) {
        // Bad Request - detailed error handling
        const serverError = error.response?.data;
        if (typeof serverError === "string") {
          // Check for specific JPA transaction error
          if (serverError.includes("Could not commit JPA transaction")) {
            errorMessage =
              "Database transaction failed. This may be due to duplicate data or database constraints. Please check your data and try again.";
          } else {
            errorMessage = `Invalid data: ${serverError}`;
          }
        } else if (serverError?.message) {
          if (
            serverError.message.includes("Could not commit JPA transaction")
          ) {
            errorMessage =
              "Database save failed. This may be due to duplicate SIN code or conflicting data. Please verify your information and try again.";
          } else {
            errorMessage = `Invalid data: ${serverError.message}`;
          }
        } else if (serverError?.errors) {
          // Handle validation errors
          const validationErrors = Array.isArray(serverError.errors)
            ? serverError.errors.join(", ")
            : JSON.stringify(serverError.errors);
          errorMessage = `Validation errors: ${validationErrors}`;
        } else {
          errorMessage =
            "Invalid data format. Please check all required fields and try again.";
        }
      } else if (error.response?.status === 409) {
        errorMessage =
          "Data conflict. This SIN code may already exist or there's a duplicate entry. Please try with different values.";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
      } else if (error.response?.status === 403) {
        errorMessage =
          "Access denied. You don't have permission to save this data.";
      } else if (error.response?.status >= 500) {
        errorMessage =
          "Server error. Please try again later or contact support.";
      } else if (
        error.code === "ERR_NETWORK" ||
        error.message === "Network Error"
      ) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      // Show error message
      const errorAlert = document.createElement("div");
      errorAlert.className =
        "alert alert-danger alert-dismissible fade show position-fixed";
      errorAlert.style.cssText =
        "top: 20px; right: 20px; z-index: 9999; min-width: 350px; max-width: 500px;";
      errorAlert.innerHTML = `
        <strong>Error!</strong> ${errorMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.body.appendChild(errorAlert);

      // Auto-remove error message after 8 seconds (longer for detailed messages)
      setTimeout(() => {
        if (errorAlert.parentNode) {
          errorAlert.remove();
        }
      }, 8000);

      // Reset button state
      const submitButton = document.querySelector('button[type="submit"]');
      submitButton.textContent = "Next";
      submitButton.disabled = false;
    }
  } else {
    // Scroll to first error
    const firstErrorField = document.querySelector(".is-invalid");
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorField.focus();
    }
  }
};

// Initialize component
onMounted(() => {
  // Debug session storage
  console.log("Session storage user:", sessionStorage.getItem("user"));
  console.log("Local storage user:", localStorage.getItem("user"));

  fetchDistrictData();
  fetchNameData();
});

// Sample data for dropdowns
const assetsCodeOptions = [
  { value: "30501", label: "30501 - Air Port" },
  { value: "30502", label: "30502 - Helipad" },
  { value: "30503", label: "30503 - Waterdrome" },
];

const typeOptions = [
  { value: "01", label: "01 - International" },
  { value: "02", label: "02 - Domestic" },
  { value: "03", label: "03 - Military" },
  { value: "04", label: "04 - Domestic & Military" },
  { value: "05", label: "05 - Other" },
];

const coordinateOptions = [
  { value: "6.9271,79.8612", label: "6.9271°N, 79.8612°E" },
  { value: "6.8484,79.9209", label: "6.8484°N, 79.9209°E" },
  { value: "6.7903,79.8803", label: "6.7903°N, 79.8803°E" },
  { value: "6.9319,79.8478", label: "6.9319°N, 79.8478°E" },
  { value: "6.8649,79.8734", label: "6.8649°N, 79.8734°E" },
];

const measurementUnitOptions = [
  { value: "SQUARE_METERS", label: "Square Meters (m²)" },
  { value: "SQUARE_KILOMETERS", label: "Square Kilometers (km²)" },
  { value: "SQUARE_MILES", label: "Square Miles (mi²)" },
  { value: "SQUARE_YARDS", label: "Square Yards (yd²)" },
  { value: "SQUARE_FEET", label: "Square Feet (ft²)" },
  { value: "HECTARES", label: "Hectares (Ha)" },
  { value: "PERCHES", label: "Perches" },
];

const landOwnershipOptions = [
  { value: "Own", label: "Own" },
  { value: "Own by Other Party", label: "Own by Other Party" },
];

const ownershipOptions = [
  { value: "Own", label: "Own" },
  { value: "Own(Transfer In)", label: "Own(Transfer In)" },
  { value: "Own(Transfer Out)", label: "Own(Transfer Out)" },
  { value: "Leased", label: "Leased" },
  { value: "Leased Out", label: "Leased Out" },
  { value: "Rented", label: "Rented" },
  { value: "Rented Out", label: "Rented Out" },
];

// New options for conditional fields
const paymentMethodOptions = [
  { value: "One Time Payment", label: "One Time Payment" },
  { value: "Yearly Payment", label: "Yearly Payment" },
  { value: "Monthly Payment", label: "Monthly Payment" },
];

// Handle area input changes
const handleAreaInput = () => {
  // Trigger conversion when area changes
  if (form.landArea.area && form.landArea.measurementUnit) {
    form.landArea.areaKm2 = convertToKm2(
      form.landArea.area,
      form.landArea.measurementUnit
    );
  }
};

// Handle measurement unit changes
const handleMeasurementUnitChange = () => {
  // Validate the field
  validateField("landArea.measurementUnit");

  // Trigger conversion when unit changes
  if (form.landArea.area && form.landArea.measurementUnit) {
    form.landArea.areaKm2 = convertToKm2(
      form.landArea.area,
      form.landArea.measurementUnit
    );
  }
};

// Handle asset code changes
const handleAssetCodeChange = () => {
  validateField("assetsCode");
};

// Handle type changes
const handleTypeChange = () => {
  validateField("type");
};

// Helper function to show notifications
const showNotification = (type, message) => {
  const alertClass =
    type === "info"
      ? "alert-info"
      : type === "warning"
        ? "alert-warning"
        : type === "success"
          ? "alert-success"
          : "alert-danger";

  const notification = document.createElement("div");
  notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
    <strong>${type === "success" ? "Success:" : "Notice:"}</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(notification);

  // Auto-remove notification after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 4000);
};

// Handle name dropdown change
const handleNameChange = (event) => {
  const selectedValue = event.target.value;

  if (selectedValue === "ADD_NEW") {
    // Check if API data is available
    if (nameOptions.value.length === 0) {
      showNotification(
        "warning",
        "Cannot add new names while API is unavailable. Please retry loading names first."
      );
      return;
    }

    // Reset form name field
    form.name = "";
    // Open modal
    openAddNewNameModal();
  } else {
    // Validate normally
    validateField("name");
  }
};

// Open Add New Name Modal
const openAddNewNameModal = () => {
  // Clear previous input and errors
  newNameInput.value = "";
  newNameError.value = "";

  // Show modal using Vue reactive state
  showModal.value = true;
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Save new name via API
const saveNewName = async () => {
  // Clear previous error
  newNameError.value = "";

  // Validate input
  if (!newNameInput.value.trim()) {
    newNameError.value = "Airport/Airfield name is required";
    return;
  }

  if (newNameInput.value.trim().length < 2) {
    newNameError.value = "Airport/Airfield name must be at least 2 characters";
    return;
  }

  try {
    isSavingNewName.value = true;

    // Get auth headers with the specific token
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
      "Content-Type": "application/json",
    };
    console.log("Auth headers for save:", headers);

    // Call the API to save the new name
    const response = await axios.post(
      "http://192.168.231.62/cgobasicairfield/api/v1/InstitutionName/save",
      {
        name: newNameInput.value.trim(),
      },
      {
        headers,
      }
    );

    console.log("API Response:", response.data);

    // Generate next available ID for the new name (5-digit format starting from 00001)
    const existingIds = nameOptions.value
      .map((opt) => parseInt(opt.value))
      .filter((id) => !isNaN(id));
    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    const formattedId = String(nextId).padStart(5, "0");

    // Add the new name to the options list
    const newOption = {
      value: formattedId,
      label: newNameInput.value.trim(),
    };
    nameOptions.value.unshift(newOption); // Add to beginning of list

    // Set the form value to the new name ID
    form.name = formattedId;

    // Clear the input
    newNameInput.value = "";

    // Close modal
    closeModal();

    // Show success notification
    showNotification(
      "success",
      `"${newOption.label}" has been added successfully!`
    );

    // Validate the field
    validateField("name");
  } catch (error) {
    console.error("Error saving new name:", error);

    // Handle different error scenarios
    if (error.response?.status === 401) {
      newNameError.value = "Authentication failed. Please login again.";
    } else if (error.response?.status === 400) {
      newNameError.value = "Invalid data. Please check the name and try again.";
    } else if (error.response?.status >= 500) {
      newNameError.value = "Server error. Please try again later.";
    } else {
      newNameError.value =
        "Failed to save airport/airfield name. Please try again.";
    }
  } finally {
    isSavingNewName.value = false;
  }
};
</script>

<style scoped>
.form-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.form-section {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  height: fit-content;
}

.section-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #007bff;
}

.alert {
  font-size: 0.9rem;
}

.form-label {
  font-weight: 700;
  color: #495057;
  font-size: 1.1rem;
}

.form-control,
.form-select {
  border: 1px solid #ced4da;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  min-height: 48px;
}

.form-control:focus,
.form-select:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.is-invalid {
  border-color: #dc3545;
}

.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.text-danger {
  color: #dc3545 !important;
}

.btn {
  font-weight: 600;
  font-size: 1.05rem;
}

.alert-warning {
  border-left: 4px solid #ffc107;
}

.alert-warning .btn-outline-warning {
  border-color: #ffc107;
  color: #856404;
}

.alert-warning .btn-outline-warning:hover {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #fff;
}

/* Loading spinner improvements */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Two-column responsive design */
@media (max-width: 768px) {
  .form-section {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.2rem;
  }
}

/* Modal styling when shown via Vue */
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal.show .modal-dialog {
  transform: none;
}

/* Animation for conditional fields */
.conditional-fields-enter-active,
.conditional-fields-leave-active {
  transition: all 0.3s ease;
}

.conditional-fields-enter-from,
.conditional-fields-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Spacing between form sections */
.col-md-6:first-child .form-section {
  margin-right: 0.5rem;
}

.col-md-6:last-child .form-section {
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .col-md-6:first-child .form-section,
  .col-md-6:last-child .form-section {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
