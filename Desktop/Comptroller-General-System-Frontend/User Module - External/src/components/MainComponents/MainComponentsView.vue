<template>
  <div class="container">
    <div class="navigation-section">
      <div class="nav-menu">
        <div class="nav-item">Dashboard</div>
        <div class="nav-item">Institution Details</div>
        <div class="nav-item">Add Asset Information</div>
        <div class="nav-item">View Assets Information</div>
        <div class="nav-item">Report Generation</div>
      </div>
    </div>

    <div class="main-content">
      <h2 class="centered-title">Main Components</h2>
      <p class="centered-text">
        Please Confirm the availability of the Main Components in the Structure
      </p>

      <div class="components-grid">
        <div
          class="component-row"
          v-for="(pair, index) in componentPairs"
          :key="index"
        >
          <div
            class="component-item"
            v-for="component in pair"
            :key="component.key"
          >
            <span class="label-ellipse">{{ component.label }}</span>
            <div class="radio-group">
              <label
                ><input
                  type="radio"
                  :name="component.key"
                  value="yes"
                  v-model="components[component.key]"
                />
                Yes</label
              >
              <label
                ><input
                  type="radio"
                  :name="component.key"
                  value="no"
                  v-model="components[component.key]"
                />
                No</label
              >
            </div>
          </div>
        </div>
      </div>

      <div class="next-button">
        <button @click="saveAndProceed">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      sinNumber: "",
      components: {
        runway: "no",
        taxiway: "no",
        apron: "no",
        airtrafficcontroltower: "no",
        radartower: "no",
        hanger: "no",
        other: "no",
      },
      componentList: [
        { key: "runway", label: "Runway" },
        { key: "taxiway", label: "Taxiway" },
        { key: "apron", label: "Apron" },
        { key: "airtrafficcontroltower", label: "Air Traffic Control Tower" },
        { key: "radartower", label: "Radar Tower" },
        { key: "hanger", label: "Hanger" },
        { key: "other", label: "Other" },
      ],
      isSaving: false,
    };
  },
  mounted() {
    this.getSinFromSession();
  },
  computed: {
    componentPairs() {
      const rows = [];
      for (let i = 0; i < this.componentList.length; i += 2) {
        rows.push(this.componentList.slice(i, i + 2));
      }
      return rows;
    },
  },
  methods: {
    getSinFromSession() {
      // Get SIN number from different possible session storage keys
      this.sinNumber =
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

      console.log("Retrieved SIN number:", this.sinNumber);

      if (!this.sinNumber) {
        console.warn("No SIN number found in session storage.");
        Swal.fire({
          icon: "warning",
          title: "SIN Number Not Found",
          text: "No SIN number found. Please complete the airfield runway form first.",
          confirmButtonText: "Go to Airfield Form",
          confirmButtonColor: "#4c59b0",
        }).then(() => {
          this.$router.push("/structure/airfield-runway");
        });
      } else {
        // Store the SIN number in session storage for components selection
        sessionStorage.setItem("currentSinNumber", this.sinNumber);
        console.log("SIN number stored for components:", this.sinNumber);
      }
    },
    async saveAndProceed() {
      const selected = Object.entries(this.components)
        .filter(([_, value]) => value === "yes")
        .map(([key]) => key);

      if (selected.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "To proceed",
          text: 'At least one component should be selected as "Yes".',
          confirmButtonText: "Okay",
        });
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I Confirm This!",
        cancelButtonText: "No, Cancel!",
        reverseButtons: true,
        customClass: {
          confirmButton: "swal2-confirm-blue",
          cancelButton: "swal2-cancel-black",
        },
      });

      if (result.isConfirmed) {
        try {
          this.isSaving = true;

          // Prepare components data for API - simplified structure
          const componentsData = {
            sinCode: this.sinNumber, // Backend expects 'sinCode', not 'sinNumber'
            runway: this.components.runway === "yes",
            taxiway: this.components.taxiway === "yes",
            apron: this.components.apron === "yes",
            airTrafficControlTower:
              this.components.airtrafficcontroltower === "yes",
            radarTower: this.components.radartower === "yes",
            hanger: this.components.hanger === "yes",
            other: this.components.other === "yes",
          };

          console.log("Sending components data to API:", componentsData);

          // Set up headers with authentication token
          const headers = {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
            "Content-Type": "application/json",
            Accept: "application/json",
          };

          // Save to backend API
          const response = await axios.post(
            "http://192.168.231.62/cgobasicairfield/api/infrastructure/save",
            componentsData,
            { headers, timeout: 30000 }
          );

          console.log("API Response:", response.data);

          // Store components data in session storage for local use
          const sessionData = {
            ...componentsData,
            selectedComponents: selected,
            timestamp: new Date().toISOString(),
          };

          sessionStorage.setItem(
            "mainComponentsData",
            JSON.stringify(sessionData)
          );
          console.log("Components data saved:", sessionData);

          Swal.fire({
            icon: "success",
            title: "Successfully Saved",
            text: `Components saved for SIN: ${this.sinNumber}`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            const query = selected.join(",");
            this.$router.push({
              path: "/components/chosen",
              query: { components: query, sin: this.sinNumber },
            });
          });
        } catch (error) {
          console.error("Error saving components data:", error);
          console.error("Full error details:", {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: error.config,
          });

          let errorTitle = "Error saving components";
          let errorMessage = "Something went wrong. Please try again.";

          if (error.response?.status === 500) {
            errorTitle = "Server Error";
            errorMessage =
              "Internal server error occurred. The data format might be incorrect or there's a server issue. Please try again or contact support.";
          } else if (error.response?.status === 409) {
            errorTitle = "Data Conflict";
            errorMessage =
              error.response.data?.message ||
              "Components data for this SIN number already exists.";
          } else if (error.response?.status === 401) {
            errorTitle = "Authentication Error";
            errorMessage = "Your session has expired. Please login again.";
          } else if (error.response?.status === 400) {
            errorTitle = "Invalid Data";
            errorMessage =
              error.response.data?.message ||
              error.response.data?.error ||
              "Please check your component selections and try again.";
          } else if (error.response?.status === 403) {
            errorTitle = "Access Denied";
            errorMessage = "You don't have permission to perform this action.";
          } else if (error.code === "ECONNABORTED") {
            errorTitle = "Request Timeout";
            errorMessage =
              "The request took too long. Please check your connection.";
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.code === "ERR_NETWORK") {
            errorTitle = "Network Error";
            errorMessage =
              "Unable to connect to the server. Please check your internet connection.";
          }

          // For now, continue with local storage and navigation even if API fails
          console.warn("API save failed, continuing with local storage...");

          const sessionData = {
            sinCode: this.sinNumber, // Update session data to use sinCode as well
            runway: this.components.runway === "yes",
            taxiway: this.components.taxiway === "yes",
            apron: this.components.apron === "yes",
            airTrafficControlTower:
              this.components.airtrafficcontroltower === "yes",
            radarTower: this.components.radartower === "yes",
            hanger: this.components.hanger === "yes",
            other: this.components.other === "yes",
            selectedComponents: selected,
            timestamp: new Date().toISOString(),
            apiSaveFailed: true,
          };

          sessionStorage.setItem(
            "mainComponentsData",
            JSON.stringify(sessionData)
          );

          Swal.fire({
            icon: "warning",
            title: errorTitle,
            text:
              errorMessage +
              " Your selections have been saved locally and you can continue.",
            confirmButtonText: "Continue Anyway",
            confirmButtonColor: "#4c59b0",
            showCancelButton: true,
            cancelButtonText: "Try Again",
            cancelButtonColor: "#666",
          }).then((result) => {
            if (result.isConfirmed) {
              const query = selected.join(",");
              this.$router.push({
                path: "/components/chosen",
                query: { components: query, sin: this.sinNumber },
              });
            }
          });
        } finally {
          this.isSaving = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.navigation-section {
  width: 200px;
  background-color: #1a1a4a;
  color: white;
  padding: 20px;
}

.nav-item {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

.centered-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}

.centered-text {
  text-align: center;
  margin-bottom: 20px;
}

.components-grid {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.component-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.component-item {
  width: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
}

.radio-group {
  display: flex;
  gap: 15px;
}

.label-ellipse {
  background-color: #1a1a4a;
  color: white;
  padding: 6px 18px;
  border-radius: 999px;
  font-size: 14px;
  white-space: nowrap;
}

.next-button {
  text-align: right;
  margin-top: 20px;
}

.next-button button {
  background-color: black;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
}

.swal2-confirm-blue {
  background-color: #4c59b0 !important;
  color: white !important;
  font-weight: bold;
  border-radius: 8px;
}

.swal2-cancel-black {
  background-color: #666 !important;
  color: white !important;
  font-weight: bold;
  border-radius: 8px;
}
</style>
