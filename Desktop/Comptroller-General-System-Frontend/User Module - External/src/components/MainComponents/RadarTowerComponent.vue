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
        const baseSin = getSessionBaseSin();
        const jwtToken = JWT_TOKEN.jwtToken;

        if (!baseSin) {
          console.log("Base SIN not found in session");
        }

        if (!jwtToken) {
          console.log("JWT token not found");
        }

        // Component code for radar tower
        const RadarTowerComponentCode = COMPONENT_CODES.RADAR_TOWER;

        // Generate component sin id for radar tower
        const componentSinID = await generateComponentSinId(
          baseSin,
          RadarTowerComponentCode,
          jwtToken
        );

        console.log(
          "Generated componentSinID for Radar Tower:",
          componentSinID
        );

        // Store the new component SIN number in session
        sessionStorage.setItem("componentSinNumber", componentSinID);
        sessionStorage.setItem("newComponentSin", componentSinID);
        sessionStorage.setItem("latestSinNumber", componentSinID);
        sessionStorage.setItem("constructionSinNumber", componentSinID); // Add this for CompletedConstructionModalComp
        console.log("Stored componentSinID in session:", componentSinID);
        console.log(
          "Session storage 'componentSinNumber' set to:",
          sessionStorage.getItem("componentSinNumber")
        );
        console.log(
          "Session storage 'constructionSinNumber' set to:",
          sessionStorage.getItem("constructionSinNumber")
        );

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

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error Saving Radar Tower",
          text: "Failed to save radar tower data. Please try again.",
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
