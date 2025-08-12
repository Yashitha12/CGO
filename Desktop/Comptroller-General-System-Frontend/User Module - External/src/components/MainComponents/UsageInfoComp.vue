<template>
  <div class="form-container">
    <!-- Display Component SIN Number from session -->
    <div class="form-row" v-if="componentSinNumber">
      <label>Component SIN Number:</label>
      <input
        type="text"
        :value="componentSinNumber"
        readonly
        class="sin-display"
      />
    </div>

    <!-- Display New Generated SIN Number after save -->
    <div class="form-row" v-if="newGeneratedSin">
      <label>New Generated SIN:</label>
      <input
        type="text"
        :value="newGeneratedSin"
        readonly
        class="new-sin-display"
      />
    </div>

    <div class="form-row">
      <label>Status of Usage:</label>
      <select v-model="status" required>
        <option disabled value="">-- Select --</option>
        <option>Utilize / In Operation / Open</option>
        <option>Not in Operation / Unutilized / Closed</option>
        <option>Abandoned</option>
      </select>
    </div>
    <p class="info-text1">
      Not in operation / unutilized / Closed – Not in use for more than one year
    </p>
    <p class="info-text2">Abandoned – Not in use for more than Five Years</p>

    <div class="form-row">
      <label>Valuation:</label>
      <select v-model="valuation" required @change="handleValuationChange">
        <option disabled value="">-- Select --</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </div>

    <div class="form-row">
      <label>Valuation Value (Rs. Million):</label>
      <input
        type="number"
        v-model="valuationValue"
        required
        step="0.001"
        min="0"
        placeholder="Enter valuation value"
      />
    </div>

    <div class="form-row">
      <label>Date of Valuation:</label>
      <input type="date" v-model="valuationDate" required />
    </div>

    <div class="form-row">
      <label>Remarks (if any):</label>
      <input
        type="text"
        v-model="remarks"
        maxlength="60"
        placeholder="Optional remarks"
      />
    </div>

    <div class="form-row center">
      <button @click="saveData" class="next-button" :disabled="isSaving">
        {{ isSaving ? "SAVING..." : "NEXT" }}
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "UsageInfo",
  data() {
    return {
      componentSinNumber: "", // Component SIN from radar tower
      newGeneratedSin: "", // New SIN generated after save
      status: "",
      valuation: "",
      valuationValue: "",
      valuationDate: "",
      remarks: "",
      isSaving: false,
    };
  },
  mounted() {
    this.getComponentSinFromSession();
    this.loadConstructionData();
  },
  methods: {
    getComponentSinFromSession() {
      // Get component SIN number from session (same as other components)
      this.componentSinNumber =
        sessionStorage.getItem("componentSinNumber") ||
        sessionStorage.getItem("newComponentSin") ||
        sessionStorage.getItem("latestSinNumber") ||
        sessionStorage.getItem("constructionSinNumber") ||
        sessionStorage.getItem("constructionComponentSin") ||
        "";

      console.log("Retrieved component SIN number:", this.componentSinNumber);
    },

    loadConstructionData() {
      // Check if construction data exists in session storage
      const constructionData = sessionStorage.getItem(
        "notCompletedConstructionData"
      );
      if (!constructionData) {
        Swal.fire({
          icon: "warning",
          title: "Construction Data Not Found",
          text: "Please complete the construction information first.",
          confirmButtonText: "Go to Construction Form",
          confirmButtonColor: "#4c59b0",
        }).then(() => {
          this.$router.push("/construction/not-completed");
        });
      } else {
        console.log(
          "Construction data found in session:",
          JSON.parse(constructionData)
        );
      }
    },
    handleValuationChange() {
      if (this.valuation === "No") {
        this.valuationValue = 1;
        this.valuationDate = new Date().toISOString().split("T")[0];
      } else {
        this.valuationValue = "";
        this.valuationDate = "";
      }
    },
    async saveData() {
      if (
        !this.status ||
        !this.valuation ||
        !this.valuationValue ||
        !this.valuationDate
      ) {
        Swal.fire({
          icon: "warning",
          title: "Missing Required Fields",
          text: "Please fill all required fields before proceeding.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the complete project information?",
        icon: "question",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#4c59b0",
        cancelButtonColor: "#666",
        confirmButtonText: "Yes, Save!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          this.isSaving = true;

          // Get construction data from session storage
          const constructionDataString = sessionStorage.getItem(
            "notCompletedConstructionData"
          );
          if (!constructionDataString) {
            throw new Error(
              "Construction data not found. Please complete the construction form first."
            );
          }

          const constructionData = JSON.parse(constructionDataString);
          const currentDate = new Date().toISOString();

          // Prepare complete project data with all session data
          const completeProjectData = {
            // Include component SIN from radar tower
            componentSinNumber: this.componentSinNumber,

            // All construction data from NotCompletedConstructionModel session
            reasonForNotCompletion: constructionData.reasonForNotCompletion,
            costKnownStatus: constructionData.costKnownStatus,
            totalEstimatedCost: constructionData.totalEstimatedCost,
            costIncurredKnownStatus: constructionData.costIncurredKnownStatus,
            costIncurred: constructionData.costIncurred,
            costIncurredDate: constructionData.costIncurredDate,
            constructionStartedYear: constructionData.constructionStartedYear,
            constructionStartedKnownStatus:
              constructionData.constructionStartedKnownStatus,
            expectedCompletionYear: constructionData.expectedCompletionYear,
            expectedCompletionKnownStatus:
              constructionData.expectedCompletionKnownStatus,
            physicalProgressPercentage:
              constructionData.physicalProgressPercentage,
            financialProgressPercentage:
              constructionData.financialProgressPercentage,
            totalFunding: constructionData.totalFunding,
            fundingSources: constructionData.fundingSources,
            needAdditionalFunding: constructionData.needAdditionalFunding,
            additionalFundingAmount: constructionData.additionalFundingAmount,
            contractorName: constructionData.contractorName,
            consultantName: constructionData.consultantName,
            createdAt: constructionData.createdAt,

            // Usage information from current form
            statusOfUsage: this.status,
            hasValuation: this.valuation === "Yes",
            valuationValue:
              this.valuation === "Yes" ? parseFloat(this.valuationValue) : null,
            valuationDate: this.valuationDate,
            remarks: this.remarks || "",
            updatedAt: currentDate,
          };

          console.log("All session data retrieved:");
          console.log("- Component SIN:", this.componentSinNumber);
          console.log("- Construction data:", constructionData);
          console.log("- Complete project data to save:", completeProjectData);

          const headers = {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
            "Content-Type": "application/json",
            Accept: "application/json",
          };

          const response = await axios.post(
            "http://192.168.231.62/cgoconstructionnotcomplete/api/projects",
            completeProjectData,
            { headers, timeout: 30000 }
          );

          console.log("API Response:", response.data);

          // Extract new generated SIN from response
          if (response.data && response.data.sinNumber) {
            this.newGeneratedSin = response.data.sinNumber;
            // Store new SIN in session for other components
            sessionStorage.setItem("newGeneratedSin", this.newGeneratedSin);
          } else if (response.data && response.data.id) {
            this.newGeneratedSin = response.data.id;
            sessionStorage.setItem("newGeneratedSin", this.newGeneratedSin);
          }

          // Clear construction session data after successful save
          sessionStorage.removeItem("notCompletedConstructionData");

          Swal.fire({
            icon: "success",
            title: "Project Information Saved Successfully!",
            html: this.newGeneratedSin
              ? `<p>New Generated SIN: <strong style="color: #28a745;">${this.newGeneratedSin}</strong></p>`
              : "",
            confirmButtonText: "Continue",
            confirmButtonColor: "#4c59b0",
          });

          // Don't navigate immediately to show the new SIN number
          // this.$router.push("/components/main");
        } catch (error) {
          console.error("Error saving project information:", error);

          let errorTitle = "Error saving project information";
          let errorMessage = "Something went wrong. Please try again.";

          if (
            error.message &&
            error.message.includes("Construction data not found")
          ) {
            errorTitle = "Construction Data Missing";
            errorMessage =
              "Please complete the construction information first.";
            this.$router.push("/construction/not-completed");
            return;
          }

          if (error.response?.status === 409) {
            errorTitle = "Data Conflict";
            errorMessage =
              error.response.data?.message ||
              "This SIN number already has project information recorded.";
          } else if (error.response?.status === 401) {
            errorTitle = "Authentication Error";
            errorMessage = "Your session has expired. Please login again.";
          } else if (error.response?.status === 400) {
            errorTitle = "Invalid Data";
            errorMessage =
              error.response.data?.message ||
              error.response.data?.error ||
              "Please check your form data and try again.";
          } else if (error.response?.status === 403) {
            errorTitle = "Access Denied";
            errorMessage = "You don't have permission to perform this action.";
          } else if (error.response?.status >= 500) {
            errorTitle = "Server Error";
            errorMessage = "Server error occurred. Please try again later.";
          } else if (error.code === "ECONNABORTED") {
            errorTitle = "Request Timeout";
            errorMessage =
              "The request took too long. Please check your connection.";
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }

          Swal.fire({
            icon: "error",
            title: errorTitle,
            text: errorMessage,
            confirmButtonText: "Okay",
            confirmButtonColor: "#4c59b0",
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
/* (Same styles as you had before) */
.form-container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
}
.form-row {
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.form-row label {
  width: 220px;
  font-weight: bold;
}
.form-row select,
.form-row input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.center {
  display: flex;
  justify-content: center;
}
.info-text1,
.info-text2 {
  font-size: 0.9em;
  color: #555;
  background-color: #a8b1ce;
  margin-left: 220px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
}
.next-button {
  background-color: black;
  color: white;
  padding: 8px 30px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}
.next-button:hover:not(:disabled) {
  background-color: #333;
}
.next-button:disabled {
  background-color: #666;
  cursor: not-allowed;
}
.sin-display {
  background-color: #e8f5e8;
  border: 2px solid #28a745 !important;
  font-weight: bold;
  color: #155724;
}
.new-sin-display {
  background-color: #fff3cd;
  border: 2px solid #ffc107 !important;
  font-weight: bold;
  color: #856404;
}
@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
  .form-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .form-row label {
    width: 100%;
    margin-bottom: 5px;
  }
  .info-text1,
  .info-text2 {
    margin-left: 0;
  }
}
</style>
