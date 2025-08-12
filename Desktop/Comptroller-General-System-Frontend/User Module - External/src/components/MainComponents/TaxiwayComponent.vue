<template>
  <div class="main-container">
    <h2>Taxiway</h2>

    <form class="form-wrapper" @submit.prevent="goToStatusView">
      <div class="form-group">
        <label for="taxiwayId">Identification Name or Number:</label>
        <input
          id="taxiwayId"
          v-model.trim="taxiway.id"
          maxlength="50"
          required
        />
      </div>

      <div class="form-group">
        <label for="taxiwayLength">Length (m):</label>
        <input
          id="taxiwayLength"
          v-model.trim="taxiway.length"
          @input="validateNumber('length')"
          required
        />
      </div>

      <div class="form-group">
        <label for="taxiwayWidth">Width (m):</label>
        <input
          id="taxiwayWidth"
          v-model.trim="taxiway.width"
          @input="validateNumber('width')"
          required
        />
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
} from "@/components/MainComponents/utils/ariFieldComponentsAPI.js";

export default {
  components: {
    ConstructionStatusModal,
  },
  data() {
    return {
      taxiway: {
        id: "",
        length: "",
        width: "",
      },
      showStatusModal: false,
    };
  },
  methods: {
    validateNumber(field) {
      this.taxiway[field] = this.taxiway[field].replace(/[^0-9]/g, "");
    },
    async goToStatusView() {
      if (!this.taxiway.id.trim()) {
        alert("Identification Name or Number is required.");
        return;
      }
      if (!this.taxiway.length.trim()) {
        alert("Length is required.");
        return;
      }
      if (!this.taxiway.width.trim()) {
        alert("Width is required.");
        return;
      }

      // Save Taxiway data
      console.log("Start saving taxiway");
      const saveResult = await this.saveTaxiway();

      // Only redirect if save was successful
      if (saveResult) {
        // Show success message and redirect
        Swal.fire({
          icon: "success",
          title: "Taxiway Saved Successfully!",
          text: `Taxiway data saved with SIN: ${sessionStorage.getItem("componentSinNumber")}`,
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

    // Component Save function for taxiway
    async saveTaxiway() {
      try {
        const baseSin = getSessionBaseSin();
        const jwtToken = JWT_TOKEN.jwtToken;

        if (!baseSin) {
          console.log("Base SIN not found in session");
        }

        if (!jwtToken) {
          console.log("JWT token not found");
        }

        // Component code for taxiway
        const TaxiwayComponentCode = COMPONENT_CODES.TAXIWAY;

        // Generate component sin id for taxiway
        const componentSinID = await generateComponentSinId(
          baseSin,
          TaxiwayComponentCode,
          jwtToken
        );

        console.log("Generated componentSinID for Taxiway:", componentSinID);

        // Store the new component SIN number in session with multiple keys for compatibility
        sessionStorage.setItem("componentSinNumber", componentSinID);
        sessionStorage.setItem("componentSinId", componentSinID);
        sessionStorage.setItem("newComponentSin", componentSinID);
        sessionStorage.setItem("latestSinNumber", componentSinID);
        sessionStorage.setItem("constructionSinNumber", componentSinID);
        sessionStorage.setItem("constructionComponentSin", componentSinID);

        console.log("Stored componentSinID in session:", componentSinID);

        // Request preparation for taxiway
        const payload = {
          mainSinID: baseSin,
          componentSinID,
          identificationName: this.taxiway.id,
          length: parseFloat(this.taxiway.length),
          width: parseFloat(this.taxiway.width),
        };

        console.log("Taxiway payload:", payload);

        // Final save request for taxiway
        const response = await axios.post(
          "http://192.168.231.62/cgobasicairfield/api/airfield/components/taxiway",
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
            "Taxiway saved successfully with componentSinID:",
            componentSinID
          );

          // Reset form after successful save
          this.resetForm();

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error saving Taxiway:", error);

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error Saving Taxiway",
          text: "Failed to save Taxiway data. Please try again.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });

        return false;
      }
    },

    resetForm() {
      this.taxiway = {
        id: "",
        length: "",
        width: "",
      };
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  max-width: 100%;
}

h2 {
  margin-bottom: 30px;
  color: #333;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  width: 200px;
  font-weight: bold;
  text-align: right;
}

input {
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  margin-top: 30px;
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
