<template>
  <div class="main-container">
    <h2>Hanger</h2>

    <form class="form-wrapper" @submit.prevent="saveHanger">
      <div class="form-group">
        <label for="idName">Identification Name or No:</label>
        <input
          type="text"
          id="idName"
          v-model="hanger.id"
          maxlength="50"
          required
        />
      </div>

      <div class="form-group">
        <label for="hangerType">Type of Hanger:</label>
        <input
          type="text"
          id="hangerType"
          v-model="hanger.hangerType"
          maxlength="50"
          required
        />
      </div>

      <div class="inline-fields">
        <div class="form-inline-group">
          <label for="unit">Measurement Unit</label>
          <select
            id="unit"
            v-model="hanger.unit"
            @change="convertToKm2"
            required
          >
            <option disabled value="">Select Unit</option>
            <option>Square Meters (m²)</option>
            <option>Square Kilometers (km²)</option>
            <option>Square Miles (mi²)</option>
            <option>Square Yards (yd²)</option>
            <option>Square Feet (ft²)</option>
            <option>Hectares (Ha)</option>
            <option>Acres (ac)</option>
            <option>Perches</option>
          </select>
        </div>

        <div class="form-inline-group">
          <label for="area">Area</label>
          <input
            type="text"
            id="area"
            v-model="hanger.area"
            @input="onAreaInput"
            required
          />
        </div>

        <div class="form-inline-group">
          <label for="areaKm">Area (km²)</label>
          <input
            type="text"
            id="areaKm"
            :value="hanger.areaKm"
            readonly
            disabled
          />
        </div>

        <div class="form-inline-group">
          <label for="ownership">Ownership</label>
          <select id="ownership" v-model="hanger.ownership" required>
            <option disabled value="">Select Ownership</option>
            <option>Own</option>
            <option>Own by Other Party</option>
          </select>
        </div>

        <div
          class="form-inline-group"
          :class="{ hidden: hanger.ownership !== 'Own by Other Party' }"
        >
          <label for="landOwner">Land Owner</label>
          <input
            type="text"
            id="landOwner        if (response.status === 200) {
          console.log('Apron saved successfully');
        }
"
            v-model="hanger.landOwner"
            :required="hanger.ownership === 'Own by Other Party'"
          />
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

class Hanger {
  constructor() {
    this.id = "";
    this.hangerType = "";
    this.unit = "";
    this.area = "";
    this.areaKm = "";
    this.ownership = "";
    this.landOwner = "";
  }
}

export default {
  components: {
    ConstructionStatusModal,
  },
  data() {
    return {
      hanger: new Hanger(),
      showStatusModal: false,
    };
  },
  methods: {
    onAreaInput() {
      this.hanger.area = this.hanger.area.replace(/[^0-9.]/g, "");
      this.convertToKm2();
    },
    convertToKm2() {
      const area = parseFloat(this.hanger.area);
      if (isNaN(area)) {
        this.hanger.areaKm = "";
        return;
      }

      const unit = this.hanger.unit;
      const conversionRates = {
        "Square Meters (m²)": 1e-6,
        "Square Kilometers (km²)": 1,
        "Square Miles (mi²)": 2.58999,
        "Square Yards (yd²)": 0.000000836127,
        "Square Feet (ft²)": 0.000000092903,
        "Hectares (Ha)": 0.01,
        "Acres (ac)": 0.00404686,
        Perches: 0.0000636,
      };

      this.hanger.areaKm = (area * (conversionRates[unit] || 0)).toFixed(6);
    },

    // Component Save function for hanger
    async saveHanger() {
      try {
        const baseSin = getSessionBaseSin();
        const jwtToken = JWT_TOKEN.jwtToken;

        if (!baseSin) {
          console.log("Base SIN not found in session");
        }

        if (!jwtToken) {
          console.log("JWT token not found");
        }

        const HangerComponentCode = COMPONENT_CODES.HANGER;
        const componentSinID = await generateComponentSinId(
          baseSin,
          HangerComponentCode,
          jwtToken
        );

        console.log("Generated componentSinID for Hanger:", componentSinID);

        // Store the new component SIN number in session with multiple keys for compatibility
        sessionStorage.setItem("componentSinNumber", componentSinID);
        sessionStorage.setItem("componentSinId", componentSinID);
        sessionStorage.setItem("newComponentSin", componentSinID);
        sessionStorage.setItem("latestSinNumber", componentSinID);
        sessionStorage.setItem("constructionSinNumber", componentSinID);
        sessionStorage.setItem("constructionComponentSin", componentSinID);

        console.log("Stored componentSinID in session:", componentSinID);

        const payload = {
          mainSinId: baseSin,
          componentSinId: componentSinID,
          identificationName: this.hanger.id,
          typeOfHanger: this.hanger.hangerType,
          measurementUnit: UNIT_MAPPING[this.hanger.unit] || this.hanger.unit,
          area: parseFloat(this.hanger.area),
          areaInKm2: parseFloat(this.hanger.areaKm),
          ownership: this.hanger.ownership,
          landOwner:
            this.hanger.ownership === "Own by Other Party"
              ? this.hanger.landOwner
              : null,
        };

        console.log("Hanger payload:", payload);

        const response = await axios.post(
          "http://192.168.231.62/cgobasicairfield/api/airfield/components/hangar",
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
            "Hanger saved successfully with componentSinID:",
            componentSinID
          );

          // Reset form after successful save
          this.resetForm();

          // Show success message and redirect
          Swal.fire({
            icon: "success",
            title: "Hanger Saved Successfully!",
            text: `Hanger data saved with SIN: ${componentSinID}`,
            confirmButtonText: "Continue",
            confirmButtonColor: "#4c59b0",
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            // Redirect to ConstructionStatusModalComp
            this.$router.push("/components/ConstructionStatusModalComp");
          });

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error saving Hanger:", error);

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error Saving Hanger",
          text: "Failed to save Hanger data. Please try again.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });

        return false;
      }
    },

    resetForm() {
      this.hanger = new Hanger();
    },

    async goToStatusView() {
      // Save hanger data before proceeding
      console.log("Start saving hanger");
      const saveResult = await this.saveHanger();

      // Only redirect if save was successful (already handled in saveHanger method)
      if (!saveResult) {
        console.log("Save failed, staying on current page");
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  max-width: 1000px;
  margin: auto;
  padding: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 25px;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.form-group label {
  width: 250px;
  text-align: right;
  margin-right: 10px;
}

.form-group input,
.form-group select {
  width: 250px;
  padding: 6px;
}

.inline-fields {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 25px;
  overflow-x: auto;
  padding: 0 10px;
}

.form-inline-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
  flex: 1;
}

.form-inline-group label {
  margin-bottom: 5px;
  text-align: center;
  white-space: nowrap;
}

.form-inline-group input,
.form-inline-group select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

/* Hidden field */
.hidden {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
}

.button-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

button {
  background-color: black;
  color: white;
  padding: 10px 30px;
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
