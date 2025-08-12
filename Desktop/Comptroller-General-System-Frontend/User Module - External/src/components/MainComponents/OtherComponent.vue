<template>
  <div class="main-container">
    <h2>Other</h2>

    <form class="form-wrapper" @submit.prevent="goToStatusView">
      <div class="form-group">
        <label for="idName">Identification Name or No:</label>
        <input
          id="idName"
          v-model.trim="form.id"
          maxlength="50"
          @input="validateId"
          required
        />
        <span class="error-message" v-if="errors.id">
          {{ errors.id }}
        </span>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <input
          id="description"
          v-model.trim="form.description"
          maxlength="100"
          @input="validateDescription"
          required
        />
        <span class="error-message" v-if="errors.description">
          {{ errors.description }}
        </span>
      </div>

      <div class="dimensional-fields">
        <div
          class="form-inline-group"
          v-for="(label, key) in dimensions"
          :key="key"
        >
          <label :for="key">{{ label }}</label>
          <input :id="key" v-model="form[key]" @input="validateNumber(key)" />
        </div>
      </div>

      <div class="form-group">
        <label for="capacity">Capacity with Unit (e.g., 15kW):</label>
        <input id="capacity" v-model="form.capacity" />
      </div>

      <div class="inline-fields">
        <div class="form-inline-group">
          <label for="unit">Measurement Unit</label>
          <select id="unit" v-model="form.unit" @change="convertArea">
            <option disabled value="">Select Unit</option>
            <option v-for="unit in Object.keys(conversionRates)" :key="unit">
              {{ unit }}
            </option>
          </select>
        </div>

        <div class="form-inline-group">
          <label for="area">Area</label>
          <input id="area" v-model="form.area" @input="onAreaInput" />
        </div>

        <div class="form-inline-group">
          <label for="areaKm">Area (km²)</label>
          <input id="areaKm" :value="form.areaKm" disabled />
        </div>
      </div>

      <div class="button-container">
        <button type="submit">NEXT</button>
      </div>
    </form>

    <ConstructionStatusModal
      v-if="showStatusModal"
      @close="showStatusModal = false"
    />
  </div>
</template>

<script>
import ConstructionStatusModal from "@/components/Construction/ConstructionStatusModal.vue";
import axios from "axios";
import Swal from "sweetalert2";

// Importing api.js for common utility functions and constants
import {
  COMPONENT_CODES,
  JWT_TOKEN,
  getSessionBaseSin,
  generateComponentSinId,
  UNIT_MAPPING,
} from "@/components/MainComponents/utils/ariFieldComponentsAPI.js";

export default {
  components: {
    ConstructionStatusModal,
  },
  data() {
    return {
      form: {
        id: "",
        description: "",
        length: "",
        height: "",
        depth: "",
        width: "",
        weight: "",
        capacity: "",
        unit: "",
        area: "",
        areaKm: "",
      },
      dimensions: {
        length: "Length (m)",
        height: "Height (m)",
        depth: "Depth (m)",
        width: "Width (m)",
        weight: "Weight (kg)",
      },
      conversionRates: {
        "Square Meters (m²)": 1e-6,
        "Square Kilometers (km²)": 1,
        "Square Miles (mi²)": 2.58999,
        "Square Yards (yd²)": 0.000000836127,
        "Square Feet (ft²)": 0.000000092903,
        "Hectares (Ha)": 0.01,
        "Acres (ac)": 0.00404686,
        Perches: 0.0000636,
      },
      showStatusModal: false,
      errors: {
        id: "",
        description: "",
      },
    };
  },
  methods: {
    validateId() {
      if (!this.form.id.trim()) {
        this.errors.id = "Identification is required";
      } else {
        this.errors.id = "";
      }
    },
    validateDescription() {
      if (!this.form.description.trim()) {
        this.errors.description = "Description is required";
      } else {
        this.errors.description = "";
      }
    },
    validateNumber(field) {
      this.form[field] = this.form[field].replace(/[^0-9.]/g, "");
    },
    onAreaInput() {
      this.form.area = this.form.area.replace(/[^0-9.]/g, "");
      this.convertArea();
    },
    convertArea() {
      const area = parseFloat(this.form.area);
      const rate = this.conversionRates[this.form.unit];

      if (isNaN(area) || !rate) {
        this.form.areaKm = "";
        return;
      }

      this.form.areaKm = (area * rate).toFixed(6);
    },
    async goToStatusView() {
      if (!this.form.id.trim()) {
        alert("Identification Name or Number is required.");
        return;
      }
      if (!this.form.description.trim()) {
        alert("Description is required.");
        return;
      }

      // Save Other Component data
      console.log("Start saving other component");
      const saveResult = await this.saveOtherComponent();

      // Only redirect if save was successful
      if (saveResult) {
        // Show success message and redirect
        Swal.fire({
          icon: "success",
          title: "Other Component Saved Successfully!",
          text: `Other component data saved with SIN: ${sessionStorage.getItem("componentSinNumber")}`,
          confirmButtonText: "Continue",
          confirmButtonColor: "#4c59b0",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          // Redirect to ConstructionStatusModalComp
          this.$router.push("/components/ConstructionStatusModalComp");
        });
      }
    },

    // Component Save function for other components
    async saveOtherComponent() {
      try {
        const baseSin = getSessionBaseSin();
        const jwtToken = JWT_TOKEN.jwtToken;

        if (!baseSin) {
          console.log("Base SIN not found in session");
        }

        if (!jwtToken) {
          console.log("JWT token not found");
        }

        // Component code for other component
        const OtherComponentCode = COMPONENT_CODES.OTHER;

        // Generate the componentSinID for Other component
        const componentSinID = await generateComponentSinId(
          baseSin,
          OtherComponentCode,
          jwtToken
        );

        console.log(
          "Generated componentSinID for Other Component:",
          componentSinID
        );

        // Store the new component SIN number in session with multiple keys for compatibility
        sessionStorage.setItem("componentSinNumber", componentSinID);
        sessionStorage.setItem("componentSinId", componentSinID);
        sessionStorage.setItem("newComponentSin", componentSinID);
        sessionStorage.setItem("latestSinNumber", componentSinID);
        sessionStorage.setItem("constructionSinNumber", componentSinID);
        sessionStorage.setItem("constructionComponentSin", componentSinID);

        console.log("Stored componentSinID in session:", componentSinID);

        // Prepare the final payload for other components
        const payload = {
          mainSinID: baseSin,
          componentSinId: componentSinID,
          identificationName: this.form.id,
          description: this.form.description,
          length: this.form.length ? parseFloat(this.form.length) : null,
          height: this.form.height ? parseFloat(this.form.height) : null,
          depth: this.form.depth ? parseFloat(this.form.depth) : null,
          width: this.form.width ? parseFloat(this.form.width) : null,
          weight: this.form.weight ? parseFloat(this.form.weight) : null,
          capacity: this.form.capacity || null,
          area: this.form.area ? parseFloat(this.form.area) : null,
          measurementUnit:
            UNIT_MAPPING[this.form.unit] || this.form.unit || null,
          areaInKm2: this.form.areaKm ? parseFloat(this.form.areaKm) : null,
        };

        console.log("Other Component payload:", payload);

        // Final save request for other components
        const response = await axios.post(
          "http://192.168.231.62/cgobasicairfield/api/airfield/components/other",
          payload,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log(
            "Other component saved successfully with componentSinID:",
            componentSinID
          );

          // Reset form after successful save
          this.resetForm();

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error saving Other component:", error);

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error Saving Other Component",
          text: "Failed to save Other Component data. Please try again.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });

        return false;
      }
    },

    resetForm() {
      this.form = {
        id: "",
        description: "",
        length: "",
        height: "",
        depth: "",
        width: "",
        weight: "",
        capacity: "",
        unit: "",
        area: "",
        areaKm: "",
      };
      this.errors = {
        id: "",
        description: "",
      };
    },
  },
};
</script>

<style scoped>
.main-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.form-group,
.dimensional-fields .form-inline-group {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 520px;
  flex-wrap: wrap;
}

.form-group label,
.dimensional-fields .form-inline-group label {
  width: 250px;
  text-align: right;
  margin-right: 10px;
  white-space: nowrap;
}

.form-group input,
.form-group select,
.dimensional-fields .form-inline-group input {
  width: 250px;
  padding: 6px;
  box-sizing: border-box;
}

.error-message {
  color: #d93333;
  font-size: 0.9em;
  margin-top: 4px;
  display: block;
  text-align: center;
  width: 100%;
}

.dimensional-fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.inline-fields {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 0 10px;
}

.button-container {
  margin-top: 30px;
}

button {
  padding: 10px 30px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333;
}
</style>
