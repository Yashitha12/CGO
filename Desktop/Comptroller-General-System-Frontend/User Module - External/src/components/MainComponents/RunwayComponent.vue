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
        const baseSin = getSessionBaseSin();
        const jwtToken = JWT_TOKEN.jwtToken;

        if (!baseSin) {
          console.log("Base SIN not found in session");
        }

        if (!jwtToken) {
          console.log("JWT token not found");
        }

        // Component code for runway
        const RunwayComponentCode = COMPONENT_CODES.RUNWAY;

        // Generate the componentSinID for runway
        const componentSinID = await generateComponentSinId(
          baseSin,
          RunwayComponentCode,
          jwtToken
        );

        console.log("Generated componentSinID for Runway:", componentSinID);

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

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error Saving Runway",
          text: "Failed to save Runway data. Please try again.",
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
