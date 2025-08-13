<template>
  <div class="form-container">
    <!-- Display Component SIN Number -->
    <div class="form-row">
      <label>Component SIN Number:</label>
      <input
        type="text"
        v-model="componentSinNumber"
        readonly
        class="sin-display"
        placeholder="Component SIN Number will appear here"
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
        {{ isSaving ? "SAVING..." : "SAVE" }}
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "UsageInfo1",
  data() {
    return {
      componentSinNumber: "", // Store component SIN number
      status: "",
      valuation: "",
      valuationValue: "",
      valuationDate: "",
      remarks: "",
      isSaving: false,
      // Store completed construction data from session
      completedConstructionData: null,
    };
  },
  mounted() {
    // Get data from session storage when component mounts
    this.getDataFromSession();
  },
  methods: {
    getDataFromSession() {
      // Get component SIN number from session storage
      this.componentSinNumber =
        sessionStorage.getItem("componentSinNumber") ||
        sessionStorage.getItem("newComponentSin") ||
        sessionStorage.getItem("latestSinNumber") ||
        sessionStorage.getItem("constructionSinNumber") ||
        sessionStorage.getItem("constructionComponentSin") ||
        "";

      // Get completed construction data from session storage
      const storedConstructionData = sessionStorage.getItem(
        "completedConstructionData"
      );
      if (storedConstructionData) {
        try {
          this.completedConstructionData = JSON.parse(storedConstructionData);
          console.log(
            "Retrieved completed construction data:",
            this.completedConstructionData
          );
        } catch (error) {
          console.error("Error parsing completed construction data:", error);
        }
      }

      console.log("Retrieved Component SIN number:", this.componentSinNumber);

      if (!this.componentSinNumber) {
        console.warn("No component SIN number found in session storage.");
        Swal.fire({
          icon: "warning",
          title: "Component SIN Number Not Found",
          text: "No component SIN number found. Please complete the component form first.",
          confirmButtonText: "Go Back",
          confirmButtonColor: "#4c59b0",
        }).then(() => {
          this.$router.go(-1);
        });
      }

      if (!this.completedConstructionData) {
        console.warn(
          "No completed construction data found in session storage."
        );
        Swal.fire({
          icon: "warning",
          title: "Construction Data Not Found",
          text: "No completed construction data found. Please complete the construction form first.",
          confirmButtonText: "Go to Construction Form",
          confirmButtonColor: "#4c59b0",
        }).then(() => {
          this.$router.go(-1);
        });
      }
    },
    handleValuationChange() {
      if (this.valuation === "No") {
        this.valuationValue = 1;
        const today = new Date().toISOString().split("T")[0];
        this.valuationDate = today;
      } else {
        this.valuationValue = "";
        this.valuationDate = "";
      }
    },
    async saveData() {
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

      if (!this.completedConstructionData) {
        Swal.fire({
          icon: "error",
          title: "Construction Data Required",
          text: "Completed construction data is missing. Please complete the construction form first.",
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
        text: "Do you want to save all the construction and usage information?",
        icon: "question",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#4c59b0",
        cancelButtonColor: "#666",
        confirmButtonText: "Yes, Save All Data!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          this.isSaving = true;

          // Prepare combined data with component SIN number - updated structure
          const combinedData = {
            sinNumber: this.componentSinNumber, // Use sinNumber instead of componentSinNumber
            // Construction data from session
            startedYearStatus:
              this.completedConstructionData.startedYearStatus || "Unknown",
            completedYearStatus:
              this.completedConstructionData.completedYearStatus || "Unknown",
            costStatus: this.completedConstructionData.costStatus || "Unknown",
            startedYear: this.completedConstructionData.startedYear || null,
            completedYear: this.completedConstructionData.completedYear || null,
            constructionCost:
              parseFloat(this.completedConstructionData.constructionCost) || 0,
            contractors: this.completedConstructionData.contractors || "",
            consultants: this.completedConstructionData.consultants || "",
            totalFunding:
              this.completedConstructionData.totalFunding ||
              parseFloat(this.completedConstructionData.totalAmount) ||
              0,
            fundingSources: this.completedConstructionData.fundingSources || [],
            local_Foreign_Funding_Agency:
              this.completedConstructionData.local_Foreign_Funding_Agency || "",
            // Usage data from form
            statusOfUsage: this.status,
            hasValuation: this.valuation === "Yes",
            valuationValue: parseFloat(this.valuationValue) || 0,
            valuationDate: this.valuationDate,
            remarks: this.remarks || "",
          };

          console.log(
            "Sending combined construction and usage data with component SIN:",
            JSON.stringify(combinedData, null, 2)
          );

          // Set up headers with authentication token
          const headers = {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
            "Content-Type": "application/json",
            Accept: "application/json",
          };

          console.log("Request headers:", headers);

          // Call the API to save all data
          const response = await axios.post(
            "http://192.168.231.62/cgoconstructioncomplete/projects/save",
            combinedData,
            {
              headers,
              timeout: 30000,
            }
          );

          console.log("API Response:", response.data);

          // Store the complete saved data for summary page
          const summaryData = {
            ...combinedData,
            savedAt: new Date().toISOString(),
            apiResponse: response.data,
          };

          sessionStorage.setItem("savedComponentData", JSON.stringify(summaryData));

          // Clear construction session data after successful save
          sessionStorage.removeItem("completedConstructionData");
          sessionStorage.removeItem("componentSinNumber");
          sessionStorage.removeItem("newComponentSin");
          sessionStorage.removeItem("latestSinNumber");
          sessionStorage.removeItem("constructionComponentSin");
          sessionStorage.setItem("constructionSubmissionComplete", "true");
          sessionStorage.setItem("submittedComponentSin", this.componentSinNumber);




          // Show success message and redirect to summary page
          Swal.fire({
            icon: "success",
            title: "All Data Saved Successfully!",
            text: `Construction and usage information saved for Component SIN: ${this.componentSinNumber}`,
            confirmButtonText: "View Summary",
            confirmButtonColor: "#4c59b0",
          }).then(() => {
            // Navigate to summary page instead of main
            this.$router.push("/components/summary");
          });



        } catch (error) {
          console.error("Error saving all data:", error);

          // Enhanced error logging
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error message:", error.message);
          }

          let errorTitle = "Error saving data";
          let errorMessage = "Something went wrong. Please try again.";

          if (error.response?.status === 400) {
            errorTitle = "Invalid Data";
            if (
              error.response?.data?.message?.includes(
                "SIN number is not verified"
              )
            ) {
              errorMessage = `The Component SIN number "${this.componentSinNumber}" is not verified in the system. Please ensure the component has been properly saved and verified before proceeding.`;
            } else {
              errorMessage =
                error.response.data?.message ||
                error.response.data?.error ||
                "Please check your form data and try again.";
            }
          } else if (error.response?.status === 409) {
            errorTitle = "Data Conflict";
            errorMessage =
              error.response.data?.message ||
              "This component SIN number already has complete construction data recorded. " +
                "Please check if this form has already been submitted.";
          } else if (error.response?.status === 401) {
            errorTitle = "Authentication Error";
            errorMessage =
              "Your session has expired. Please refresh the page and login again.";
          } else if (error.response?.status === 403) {
            errorTitle = "Access Denied";
            errorMessage = "You don't have permission to perform this action.";
          } else if (error.response?.status >= 500) {
            errorTitle = "Server Error";
            errorMessage =
              "Server error occurred. Please try again later or contact support.";
          } else if (error.code === "ECONNABORTED") {
            errorTitle = "Request Timeout";
            errorMessage =
              "The request took too long. Please check your connection and try again.";
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }

          Swal.fire({
            icon: "error",
            title: errorTitle,
            text: errorMessage,
            confirmButtonText: "Okay",
            confirmButtonColor: "#4c59b0",
            footer:
              error.response?.status === 400 &&
              error.response?.data?.message?.includes(
                "SIN number is not verified"
              )
                ? "<small>Try going back to verify the component SIN number is properly generated and saved.</small>"
                : null,
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
/* Style for Component SIN number display */
.sin-display {
  background-color: #e8f5e8;
  border: 2px solid #28a745 !important;
  font-weight: bold;
  color: #155724;
  cursor: not-allowed;
}
.center {
  display: flex;
  justify-content: center;
}
.info-text1 {
  font-size: 0.9em;
  color: #555;
  background-color: #a8b1ce;
  margin-left: 220px;
  margin-top: -10px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
}
.info-text2 {
  font-size: 0.9em;
  color: #555;
  background-color: #a8b1ce;
  margin-left: 220px;
  margin-top: 10px;
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
/* Responsive design */
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