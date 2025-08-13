<template>
  <div class="main-container">
    <h2>Radar Tower</h2>

    <form class="form-wrapper" @submit.prevent="goToStatusView">
      <div class="form-group">
        <label for="radarTowerId">Identification Name or Number:</label>
        <input
          id="radarTowerId"
          v-model.trim="radarTower.id"
          maxlength="50"
          required
        />
      </div>

      <div class="form-group">
        <label for="radarTowerHeight">Height (m):</label>
        <input
          id="radarTowerHeight"
          v-model.trim="radarTower.height"
          @input="validateNumber('height')"
          required
        />
      </div>

      <div class="button-container">
        <button type="submit">NEXT</button>
      </div>
    </form>
  </div>
</template>

<script>
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
  data() {
    return {
      radarTower: {
        id: "",
        height: "",
      },
      showStatusModal: false,
    };
  },
  methods: {
    validateNumber(field) {
      this.radarTower[field] = this.radarTower[field].replace(/[^0-9]/g, "");
    },
    async goToStatusView() {
      if (!this.radarTower.id.trim()) {
        alert("Identification Name or Number is required.");
        return;
      }
      if (!this.radarTower.height.trim()) {
        alert("Height is required.");
        return;
      }

      // Save Radar Tower data
      console.log("Start saving radar tower");
      const saveResult = await this.saveRadarTower();

      // Only redirect if save was successful
      if (saveResult) {
        // Show success message and redirect
        Swal.fire({
          icon: "success",
          title: "Radar Tower Saved Successfully!",
          text: `Radar Tower data saved with SIN: ${sessionStorage.getItem("componentSinNumber")}`,
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

    // Component Save function for radar tower
    async saveRadarTower() {
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

        // Component code for radar tower
        const RadarTowerComponentCode = COMPONENT_CODES.RADAR_TOWER;

        // Generate component sin id for radar tower
        let componentSinID;
        try {
          componentSinID = await generateComponentSinId(
            baseSin,
            RadarTowerComponentCode,
            jwtToken
          );
          console.log(
            "Generated componentSinID for Radar Tower:",
            componentSinID
          );
        } catch (sinError) {
          console.error("Error generating component SIN ID:", sinError);

          if (sinError.response?.status === 409) {
            // SIN already exists - try to continue with existing SIN or handle gracefully
            console.warn(
              "SIN ID already exists, attempting to use existing..."
            );

            // Try to get existing SIN or generate a fallback
            componentSinID = `${baseSin}-${RadarTowerComponentCode}-${Date.now()}`;
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

        // Request Preparation for radar tower
        const payload = {
          mainSinID: baseSin,
          componentSinID,
          identificationName: this.radarTower.id,
          height: parseFloat(this.radarTower.height),
        };

        console.log("Radar Tower payload with componentSinID:", payload);

        // Final Save request for radar tower
        const response = await axios.post(
          "http://192.168.231.62/cgobasicairfield/api/airfield/components/radar-tower",
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
            "Radar Tower saved successfully with componentSinID:",
            componentSinID
          );

          // Reset form after successful save
          this.resetForm();

          // Return success
          return true;
        }

        return false;
      } catch (error) {
        console.error("Error saving Radar Tower:", error);

        let errorMessage = "Failed to save radar tower data. Please try again.";

        if (error.response?.status === 409) {
          errorMessage =
            "Radar Tower data already exists for this SIN. Please check if it has already been saved.";
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
          title: "Error Saving Radar Tower",
          text: errorMessage,
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });

        return false;
      }
    },

    resetForm() {
      this.radarTower = {
        id: "",
        height: "",
      };
    },
  },
};
</script>

<style scoped>
.main-container {
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
