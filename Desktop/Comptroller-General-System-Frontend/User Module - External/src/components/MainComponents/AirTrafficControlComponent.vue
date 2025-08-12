<template>
  <div class="main-container">
    <h2>Air Traffic Control Tower</h2>

    <form class="form-wrapper" @submit.prevent="goToStatusView">
      <div class="form-group">
        <label for="trafficTowerId">Identification Name or Number:</label>
        <input
          id="trafficTowerId"
          v-model.trim="trafficTower.id"
          maxlength="50"
          required
        />
      </div>

      <div class="form-group">
        <label for="trafficTowerHeight">Height (m):</label>
        <input
          id="trafficTowerHeight"
          v-model.trim="trafficTower.height"
          @input="validateNumber('height')"
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
      trafficTower: {
        id: "",
        height: "",
      },
      showStatusModal: false,
    };
  },
  methods: {
    validateNumber(field) {
      this.trafficTower[field] = this.trafficTower[field].replace(
        /[^0-9]/g,
        ""
      );
    },
    async goToStatusView() {
      if (!this.trafficTower.id.trim()) {
        alert("Identification Name or Number is required.");
        return;
      }
      if (!this.trafficTower.height.trim()) {
        alert("Height is required.");
        return;
      }

      // Save ATC Tower data
      console.log("Start saving ATC tower");
      const saveResult = await this.saveATCTower();

      // Only redirect if save was successful
      if (saveResult) {
        // Show success message and redirect
        Swal.fire({
          icon: "success",
          title: "ATC Tower Saved Successfully!",
          text: `ATC Tower data saved with SIN: ${sessionStorage.getItem("componentSinNumber")}`,
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

    // Component Save function for atc tower
    async saveATCTower() {
      try {
        const baseSin = getSessionBaseSin();
        const jwtToken = JWT_TOKEN.jwtToken;

        if (!baseSin) {
          console.log("Base SIN not found in session");
        }

        if (!jwtToken) {
          console.log("JWT token not found");
        }

        // Component code for atc tower
        const ATCTowerComponentCode = COMPONENT_CODES.ATC_TOWER;

        // Generate component sin id for atc tower
        const componentSinID = await generateComponentSinId(
          baseSin,
          ATCTowerComponentCode,
          jwtToken
        );

        console.log("Generated componentSinID for ATC Tower:", componentSinID);

        // Store the new component SIN number in session with multiple keys for compatibility
        sessionStorage.setItem("componentSinNumber", componentSinID);
        sessionStorage.setItem("componentSinId", componentSinID);
        sessionStorage.setItem("newComponentSin", componentSinID);
        sessionStorage.setItem("latestSinNumber", componentSinID);
        sessionStorage.setItem("constructionSinNumber", componentSinID);
        sessionStorage.setItem("constructionComponentSin", componentSinID);

        console.log("Stored componentSinID in session:", componentSinID);

        // Request preparation for atc tower
        const payload = {
          mainSinID: baseSin,
          componentSinID,
          identificationName: this.trafficTower.id,
          height: parseFloat(this.trafficTower.height),
        };

        console.log("ATC Tower payload:", payload);

        // Final save request for atc tower
        const response = await axios.post(
          "http://192.168.231.62/cgobasicairfield/api/airfield/components/atc-tower",
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
            "ATC Tower saved successfully with componentSinID:",
            componentSinID
          );

          // Reset form after successful save
          this.resetForm();

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error saving ATC Tower:", error);

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error Saving ATC Tower",
          text: "Failed to save ATC Tower data. Please try again.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });

        return false;
      }
    },

    resetForm() {
      this.trafficTower = {
        id: "",
        height: "",
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
