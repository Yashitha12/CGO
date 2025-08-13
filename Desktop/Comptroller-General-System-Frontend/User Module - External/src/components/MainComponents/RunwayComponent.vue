<template>
  <div class="main-container">
    <h2>Runway</h2>

    <form class="form-wrapper" @submit.prevent="goToStatusView">
      <div class="form-group">
        <label for="runwayId">Identification Name or Number:</label>
        <input id="runwayId" v-model.trim="runway.id" maxlength="50" required />
      </div>

      <div class="form-group">
        <label for="runwayLength">Length (m):</label>
        <input
          id="runwayLength"
          v-model.trim="runway.length"
          @input="validateNumber('length')"
          required
        />
      </div>

      <div class="form-group">
        <label for="runwayWidth">Width (m):</label>
        <input
          id="runwayWidth"
          v-model.trim="runway.width"
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

// Importing api.js for common utility function and constants
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
      runway: {
        id: "",
        length: "",
        width: "",
      },
      showStatusModal: false,
    };
  },
  methods: {
    validateNumber(field) {
      this.runway[field] = this.runway[field].replace(/[^0-9]/g, "");
    },
    async goToStatusView() {
      if (!this.runway.id.trim()) {
        alert("Identification Name or Number is required.");
        return;
      }
      if (!this.runway.length.trim()) {
        alert("Length is required.");
        return;
      }
      if (!this.runway.width.trim()) {
        alert("Width is required.");
        return;
      }

      // Save Runway data
      console.log("Start saving runway");
      const saveResult = await this.saveRunway();

      // Only redirect if save was successful
      if (saveResult) {
        // Show success message and redirect
        Swal.fire({
          icon: "success",
          title: "Runway Saved Successfully!",
          text: `Runway data saved with SIN: ${sessionStorage.getItem("componentSinNumber")}`,
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

    // Component Save function for runway
    async saveRunway() {
      try {
        // Get base SIN using the same logic as other components
        const baseSin =
          sessionStorage.getItem("currentSinNumber") ||
          sessionStorage.getItem("activeSinNumber") ||
          sessionStorage.getItem("airfieldSinNumber") ||
          sessionStorage.getItem("sinCode") ||
          sessionStorage.getItem("sinNumber") ||
          sessionStorage.getItem("generatedSinCode") ||
          sessionStorage.getItem("submittedSinNumber") ||
          localStorage.getItem("airfieldSinNumber") ||
          localStorage.getItem("sinCode") ||
          localStorage.getItem("sinNumber") ||
          localStorage.getItem("generatedSinCode") ||
          "";

        console.log("Retrieved base SIN:", baseSin);

        const jwtToken = JWT_TOKEN.jwtToken;

        if (!baseSin) {
          console.error("Base SIN not found in session");
          Swal.fire({
            icon: "warning",
            title: "SIN Number Not Found",
            text: "No SIN number found. Please complete the previous steps first.",
            confirmButtonText: "Go Back",
            confirmButtonColor: "#4c59b0",
          }).then(() => {
            this.$router.push("/components/main");
          });
          return false;
        }

        if (!jwtToken) {
          console.error("JWT token not found");
          Swal.fire({
            icon: "error",
            title: "Authentication Error",
            text: "Authentication token not found. Please login again.",
            confirmButtonText: "Okay",
            confirmButtonColor: "#4c59b0",
          });
          return false;
        }

        // Component code for runway
        const RunwayComponentCode = COMPONENT_CODES.RUNWAY;

        // Generate the componentSinID for runway
        let componentSinID;
        try {
          componentSinID = await generateComponentSinId(
            baseSin,
            RunwayComponentCode,
            jwtToken
          );
          console.log("Generated componentSinID for Runway:", componentSinID);
        } catch (sinError) {
          console.error("Error generating component SIN ID:", sinError);

          if (sinError.response?.status === 409) {
            // SIN already exists - try to continue with existing SIN or handle gracefully
            console.warn(
              "SIN ID already exists, attempting to use existing..."
            );

            // Try to get existing SIN or generate a fallback
            componentSinID = `${baseSin}-${RunwayComponentCode}-${Date.now()}`;
            console.log("Using fallback SIN:", componentSinID);
          } else {
            throw sinError; // Re-throw other errors
          }
        }

        // Store the new component SIN number in session with multiple keys for compatibility
        sessionStorage.setItem("componentSinNumber", componentSinID);
        sessionStorage.setItem("componentSinId", componentSinID);
        sessionStorage.setItem("newComponentSin", componentSinID);
        sessionStorage.setItem("latestSinNumber", componentSinID);
        sessionStorage.setItem("constructionSinNumber", componentSinID);
        sessionStorage.setItem("constructionComponentSin", componentSinID);

        console.log("Stored componentSinID in session:", componentSinID);

        // Request preparation for runway
        const payload = {
          mainSinID: baseSin,
          componentSinID,
          identificationName: this.runway.id,
          length: parseFloat(this.runway.length),
          width: parseFloat(this.runway.width),
        };

        console.log("Runway payload:", payload);

        // Final save request to save the runway
        const response = await axios.post(
          "http://192.168.231.62/cgobasicairfield/api/airfield/components/runway",
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
            "Runway saved successfully with componentSinID:",
            componentSinID
          );

          // Reset form after successful save
          this.resetForm();

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error saving runway:", error);

        let errorMessage = "Failed to save Runway data. Please try again.";

        if (error.response?.status === 409) {
          errorMessage =
            "Runway data already exists for this SIN. Please check if it has already been saved.";
        } else if (error.response?.status === 400) {
          errorMessage =
            "Invalid data provided. Please check all fields and try again.";
        } else if (error.response?.status === 401) {
          errorMessage = "Authentication failed. Please login again.";
        } else if (error.response?.status === 403) {
          errorMessage =
            "Access denied. You do not have permission to save this data.";
        } else if (error.response?.status >= 500) {
          errorMessage = "Server error occurred. Please try again later.";
        } else if (error.code === "ERR_NETWORK") {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error Saving Runway",
          text: errorMessage,
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });

        return false;
      }
    },

    resetForm() {
      this.runway = {
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
