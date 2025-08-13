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
      <button @click="goBack" class="back-button">BACK</button>
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
      // Validate required fields
      if (!this.componentSinNumber) {
        Swal.fire({
          icon: "error",
          title: "Component SIN Number Required",
          text: "Component SIN number is missing. Please complete the component form first.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });
        return;
      }

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
          console.log("Construction data from session:", constructionData);

          // Prepare API-compliant data structure
          const completeProjectData = {
            // Component identification
            sinNumber: this.componentSinNumber, // Changed from componentSinNumber to sinNumber

            // Construction data - ensure all numeric values are properly converted
            reasonForNotCompletion:
              constructionData.reasonForNotCompletion || "",
            costKnownStatus: constructionData.costKnownStatus || "Unknown",
            totalEstimatedCost: constructionData.totalEstimatedCost
              ? parseFloat(constructionData.totalEstimatedCost)
              : 0,
            costIncurredKnownStatus:
              constructionData.costIncurredKnownStatus || "Unknown",
            costIncurred: constructionData.costIncurred
              ? parseFloat(constructionData.costIncurred)
              : 0,
            costIncurredDate: constructionData.costIncurredDate || null,
            constructionStartedYear: constructionData.constructionStartedYear
              ? parseInt(constructionData.constructionStartedYear)
              : null,
            constructionStartedKnownStatus:
              constructionData.constructionStartedKnownStatus || "Unknown",
            expectedCompletionYear: constructionData.expectedCompletionYear
              ? parseInt(constructionData.expectedCompletionYear)
              : null,
            expectedCompletionKnownStatus:
              constructionData.expectedCompletionKnownStatus || "Unknown",
            physicalProgressPercentage:
              constructionData.physicalProgressPercentage
                ? parseFloat(constructionData.physicalProgressPercentage)
                : 0,
            financialProgressPercentage:
              constructionData.financialProgressPercentage
                ? parseFloat(constructionData.financialProgressPercentage)
                : 0,
            totalFunding: constructionData.totalFunding
              ? parseFloat(constructionData.totalFunding)
              : 0,
            fundingSources: Array.isArray(constructionData.fundingSources)
              ? constructionData.fundingSources
              : [],
            needAdditionalFunding:
              constructionData.needAdditionalFunding === "Yes" ||
              constructionData.needAdditionalFunding === true,
            additionalFundingAmount: constructionData.additionalFundingAmount
              ? parseFloat(constructionData.additionalFundingAmount)
              : 0,
            contractorName: constructionData.contractorName || "",
            consultantName: constructionData.consultantName || "",

            // Usage information from current form
            statusOfUsage: this.status,
            hasValuation: this.valuation === "Yes",
            valuationValue: parseFloat(this.valuationValue) || 0,
            valuationDate: this.valuationDate,
            remarks: this.remarks || "",

            // Add local/foreign funding agency if it exists
            local_Foreign_Funding_Agency:
              constructionData.local_Foreign_Funding_Agency || "",
          };

          console.log(
            "Complete project data to save:",
            JSON.stringify(completeProjectData, null, 2)
          );

          const headers = {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NTA1NjI0NSwiZXhwIjoxNzU1MTQyNjQ1fQ.XaG5VRb41E8lqzuwAmQMA0DKmpdQlsJ5iWqBp_WFgsj2-I8ub-pftUsjSKHI84t-m_GFzksUIP1u_8v4LBXbfQ",
            "Content-Type": "application/json",
            Accept: "application/json",
          };

          const response = await axios.post(
            "http://192.168.231.62/cgoconstructionnotcomplete/api/projects",
            completeProjectData,
            { headers, timeout: 30000 }
          );

          console.log("API Response:", response.data);

          // Clear construction session data after successful save
          sessionStorage.removeItem("notCompletedConstructionData");

          Swal.fire({
            icon: "success",
            title: "Project Information Saved Successfully!",
            confirmButtonText: "Continue",
            confirmButtonColor: "#4c59b0",
          });
        } catch (error) {
          console.error("Error saving project information:", error);
          console.error("Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config,
          });

          let errorTitle = "Error saving project information";
          let errorMessage = "Something went wrong. Please try again.";

          if (error.response?.status === 400) {
            errorTitle = "Invalid Data";
            if (
              error.response.data?.message?.includes(
                "SIN number is not verified"
              )
            ) {
              errorMessage = `The Component SIN number "${this.componentSinNumber}" is not verified in the system. Please ensure the component has been properly saved and verified before proceeding.`;
            } else {
              errorMessage =
                error.response.data?.message ||
                error.response.data?.error ||
                "Please check your form data and try again.";
              // Log detailed validation errors
              if (error.response.data?.details) {
                console.error(
                  "Validation errors:",
                  error.response.data.details
                );
              }
            }
          } else if (error.response?.status === 409) {
            errorTitle = "Data Conflict";
            errorMessage =
              error.response.data?.message ||
              "This SIN number already has project information recorded.";
          } else if (error.response?.status === 401) {
            errorTitle = "Authentication Error";
            errorMessage = "Your session has expired. Please login again.";
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
    goBack() {
      this.$router.push("/components/chosen");
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
  gap: 15px;
}
.back-button {
  background-color: #6c757d;
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
.back-button:hover {
  background-color: #5a6268;
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
