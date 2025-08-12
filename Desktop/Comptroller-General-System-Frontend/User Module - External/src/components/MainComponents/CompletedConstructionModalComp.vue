<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content completed-container">
      <span class="close-button" @click="closeModal">&times;</span>

      <!-- Display SIN Number from RadarTower Component -->
      <div class="form-group-row" v-if="componentSinNumber">
        <label>Component SIN Number:</label>
        <input
          type="text"
          :value="componentSinNumber"
          readonly
          class="short-input sin-display"
        />
      </div>

      <div class="form-group-row">
        <label>Started Year</label>
        <select v-model="startedYearStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="startedYearStatus === 'Known'"
          type="text"
          v-model="startedYear"
          maxlength="4"
          @input="validateYear('startedYear')"
          placeholder="e.g., 2020"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Completed Year</label>
        <select v-model="completedYearStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="completedYearStatus === 'Known'"
          type="text"
          v-model="completedYear"
          maxlength="4"
          @input="validateYear('completedYear')"
          placeholder="e.g., 2023"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Construction Cost (Rs. Million)</label>
        <select v-model="costStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="costStatus === 'Known'"
          type="text"
          v-model="constructionCost"
          @input="formatCost"
          placeholder="e.g., 1,000.000"
          class="short-input"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Source of Funding</th>
            <th>Type of Funding</th>
            <th>Amount (Rs. Million)</th>
            <th>
              Foreign Funding – Agency /Country /Local Funding - Institution
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fund, index) in fundingList" :key="index">
            <td></td>
            <td>
              <select
                v-model="fund.type"
                @change="onFundingTypeChange(fund.type, index)"
              >
                <option disabled value="">Select</option>
                <option
                  v-for="fundingType in availableFundingTypes"
                  :key="fundingType"
                  :value="fundingType"
                >
                  {{ fundingType }}
                </option>
                <!-- Keep static options as fallback -->
                <option>Consolidated Fund</option>
                <option>Foreign Funding (Grant)</option>
                <option>Foreign Funding (Loan)</option>
                <option>Local Funding (Self)</option>
                <option>Local Funding (Loan)</option>
                <option>Local Funding (Grant)</option>
                <option>Provincial Council Funding</option>
                <option>Other (Pls. specify)</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                v-model="fund.amount"
                @input="validateDecimal(fund, index)"
              />
            </td>
            <td>
              <input
                v-if="showAgencyField(fund.type)"
                v-model="fund.agency"
                maxlength="50"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2"><strong>Total (Rs. Million)</strong></td>
            <td colspan="3">
              <input type="text" :value="totalAmount" readonly />
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="addFundingRow">Add</button>

      <div class="form-group-row">
        <label>Name of the Contractors</label>
        <input
          type="text"
          v-model="contractors"
          maxlength="100"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Name of the Consultants</label>
        <input
          type="text"
          v-model="consultants"
          maxlength="100"
          class="short-input"
        />
      </div>

      <div class="form-actions">
        <button @click="saveAndRedirect">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import authHeader from "@/services/Auth&UserServices/auth-header";

export default {
  name: "CompletedConstructionModal",
  props: {
    componentRoute: String,
  },
  data() {
    return {
      showModal: true,
      startedYearStatus: "",
      completedYearStatus: "",
      costStatus: "",
      startedYear: "",
      completedYear: "",
      constructionCost: "",
      contractors: "",
      consultants: "",
      fundingList: [{ source: "", type: "", amount: "", agency: "" }],
      availableFundingTypes: [],
      loadingFundingTypes: false,
      componentSinNumber: "", // Store component SIN from RadarTower
    };
  },
  mounted() {
    // Get SIN number from RadarTower component session storage
    this.getComponentSinFromSession();
    // Load funding types from database
    this.loadFundingTypes();
  },
  computed: {
    totalAmount() {
      return this.fundingList
        .reduce((sum, fund) => {
          const amount = parseFloat(fund.amount);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0)
        .toFixed(3);
    },
    totalFunding() {
      return parseFloat(this.totalAmount);
    },
    localForeignFundingAgency() {
      // Combine all funding agencies into a single string
      return this.fundingList
        .filter((fund) => fund.agency && fund.agency.trim() !== "")
        .map((fund) => `${fund.type}: ${fund.agency}`)
        .join("; ");
    },
  },
  methods: {
    getComponentSinFromSession() {
      // Get component SIN number from RadarTower (or other components)
      this.componentSinNumber =
        sessionStorage.getItem("componentSinNumber") ||
        sessionStorage.getItem("newComponentSin") ||
        sessionStorage.getItem("latestSinNumber") ||
        sessionStorage.getItem("constructionSinNumber") ||
        "";

      console.log(
        "Retrieved component SIN number from RadarTower:",
        this.componentSinNumber
      );

      if (!this.componentSinNumber) {
        console.warn("No component SIN number found in session storage.");
      } else {
        // Store it for construction flow
        sessionStorage.setItem(
          "constructionComponentSin",
          this.componentSinNumber
        );
        console.log(
          "Component SIN number stored for construction:",
          this.componentSinNumber
        );
      }
    },
    async loadFundingTypes() {
      try {
        this.loadingFundingTypes = true;

        // Set up headers with authentication token
        const headers = {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha3RoYXIiLCJpYXQiOjE3NTM4NTA1OTIsImV4cCI6MTc1MzkzNjk5Mn0.9aViyYZZO1HsB1sYDSkzBIyqTWdK2daRc4bEBl3qB87-OJBwXDDEVLteMa4-GLuJDYgAdAmd7cnoun0HcIQpCA",
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        // Get all unique funding types by making requests for common types
        const commonFundingTypes = [
          "Consolidated Fund",
          "Foreign Funding (Grant)",
          "Foreign Funding (Loan)",
          "Local Funding (Self)",
          "Local Funding (Loan)",
          "Local Funding (Grant)",
          "Provincial Council Funding",
          "Other",
        ];

        const fundingTypePromises = commonFundingTypes.map(async (type) => {
          try {
            const response = await axios.get(
              `http://192.168.231.62/cgoconstructioncomplete/projects/fundingType/${encodeURIComponent(type)}`,
              { headers, timeout: 10000 }
            );
            return response.data.length > 0 ? type : null;
          } catch (error) {
            console.warn(
              `Failed to fetch projects for funding type: ${type}`,
              error
            );
            return null;
          }
        });

        const results = await Promise.allSettled(fundingTypePromises);

        // Extract successful funding types
        const dbFundingTypes = results
          .filter((result) => result.status === "fulfilled" && result.value)
          .map((result) => result.value);

        // Combine with default types and remove duplicates
        const allFundingTypes = [
          ...new Set([...dbFundingTypes, ...commonFundingTypes]),
        ];

        this.availableFundingTypes = allFundingTypes;

        console.log("Loaded funding types:", this.availableFundingTypes);
      } catch (error) {
        console.error("Error loading funding types:", error);

        // Use default funding types as fallback
        this.availableFundingTypes = [
          "Consolidated Fund",
          "Foreign Funding (Grant)",
          "Foreign Funding (Loan)",
          "Local Funding (Self)",
          "Local Funding (Loan)",
          "Local Funding (Grant)",
          "Provincial Council Funding",
          "Other (Pls. specify)",
        ];

        // Show warning but don't block the form
        Swal.fire({
          icon: "warning",
          title: "Funding Types Load Warning",
          text: "Could not load funding types from database. Using default options.",
          timer: 3000,
          showConfirmButton: false,
        });
      } finally {
        this.loadingFundingTypes = false;
      }
    },
    async onFundingTypeChange(selectedType, index) {
      if (selectedType && selectedType !== "") {
        try {
          // Fetch projects with this funding type to validate
          const headers = {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha3RoYXIiLCJpYXQiOjE3NTM4NTA1OTIsImV4cCI6MTc1MzkzNjk5Mn0.9aViyYZZO1HsB1sYDSkzBIyqTWdK2daRc4bEBl3qB87-OJBwXDDEVLteMa4-GLuJDYgAdAmd7cnoun0HcIQpCA",
            "Content-Type": "application/json",
            Accept: "application/json",
          };

          const response = await axios.get(
            `http://192.168.231.62/cgoconstructioncomplete/projects/fundingType/${encodeURIComponent(selectedType)}`,
            { headers, timeout: 10000 }
          );

          console.log(
            `Projects with funding type "${selectedType}":`,
            response.data
          );

          // You can use this data to show related information or validation
          if (response.data.length > 0) {
            console.log(
              `Found ${response.data.length} projects with funding type: ${selectedType}`
            );
          }
        } catch (error) {
          console.warn(
            `Could not fetch projects for funding type: ${selectedType}`,
            error
          );
          // Don't show error to user, just log it
        }
      }
    },
    closeModal() {
      this.showModal = false;
    },
    validateYear(field) {
      this[field] = this[field].replace(/[^0-9]/g, "").slice(0, 4);
    },
    formatCost() {
      let val = this.constructionCost.replace(/[^0-9.]/g, "");
      const parts = val.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
      }
      this.constructionCost = parts.join(".");
    },
    validateDecimal(fund, index) {
      fund.amount = fund.amount
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1");
      const parts = fund.amount.split(".");
      if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 3);
        fund.amount = parts[0] + "." + parts[1];
      }
    },
    addFundingRow() {
      this.fundingList.push({ source: "", type: "", amount: "", agency: "" });
    },
    showAgencyField(type) {
      return [
        "Foreign Funding (Grant)",
        "Foreign Funding (Loan)",
        "Local Funding (Loan)",
        "Local Funding (Grant)",
        "Other (Pls. specify)",
        "Other",
      ].includes(type);
    },
    async saveAndRedirect() {
      // Validate required fields first
      const isValid =
        this.startedYearStatus &&
        (this.startedYearStatus === "Unknown" ||
          this.startedYear.length === 4) &&
        this.completedYearStatus &&
        (this.completedYearStatus === "Unknown" ||
          this.completedYear.length === 4) &&
        this.costStatus &&
        (this.costStatus === "Unknown" || this.constructionCost) &&
        this.fundingList.every((fund) => {
          return (
            fund.type &&
            fund.amount &&
            (this.showAgencyField(fund.type) ? fund.agency : true)
          );
        });

      if (!isValid) {
        Swal.fire({
          icon: "warning",
          title: "Please fill all required fields",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });
        return;
      }

      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to proceed to usage information?",
        icon: "question",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#4c59b0",
        cancelButtonColor: "#666",
        confirmButtonText: "Yes, Continue!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          // Clean and prepare the construction cost
          const cleanConstructionCost = this.constructionCost
            ? parseFloat(this.constructionCost.replace(/,/g, ""))
            : null;

          // Prepare construction data with component SIN number
          const constructionData = {
            componentSinNumber: this.componentSinNumber, // Include component SIN from RadarTower
            startedYearStatus: this.startedYearStatus,
            completedYearStatus: this.completedYearStatus,
            costStatus: this.costStatus,
            startedYear:
              this.startedYearStatus === "Known"
                ? parseInt(this.startedYear)
                : null,
            completedYear:
              this.completedYearStatus === "Known"
                ? parseInt(this.completedYear)
                : null,
            constructionCost:
              this.costStatus === "Known" ? cleanConstructionCost : null,
            contractors: this.contractors || "",
            consultants: this.consultants || "",
            totalFunding: this.totalFunding,
            local_Foreign_Funding_Agency: this.localForeignFundingAgency,
            fundingSources: this.fundingList.map((fund) => {
              const isForeignFunding =
                fund.type && fund.type.toLowerCase().includes("foreign");
              const isLocalFunding =
                fund.type &&
                (fund.type.toLowerCase().includes("local") ||
                  fund.type.toLowerCase().includes("self"));

              return {
                type: fund.type || "",
                amount: fund.amount ? parseFloat(fund.amount) : 0,
                local_Foreign_Funding_Agency: fund.agency || "",
                foreignAgency: isForeignFunding ? fund.agency || "" : "",
                localInstitution:
                  isLocalFunding ||
                  fund.type === "Other" ||
                  fund.type === "Other (Pls. specify)"
                    ? fund.agency || ""
                    : "",
              };
            }),
            totalAmount: parseFloat(this.totalAmount),
          };

          // Store construction data in session storage for UsageInfo1
          sessionStorage.setItem(
            "completedConstructionData",
            JSON.stringify(constructionData)
          );

          console.log(
            "Stored construction data for UsageInfo1:",
            constructionData
          );

          // Show success message
          Swal.fire({
            icon: "success",
            title: "Construction Data Saved!",
            text: "Please complete the usage information.",
            confirmButtonText: "Continue",
            confirmButtonColor: "#4c59b0",
            timer: 2000,
            timerProgressBar: true,
          });

          // Navigate to UsageInfocomp1 instead of usage-info1
          this.$router.push("/components/UsageInfocomp1");
        } catch (error) {
          console.error("Error preparing construction data:", error);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to prepare construction data. Please try again.",
            confirmButtonText: "Okay",
            confirmButtonColor: "#4c59b0",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 1200px;
  overflow-y: auto;
  max-height: 90vh;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 26px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
}

.completed-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group-row label {
  font-weight: bold;
  min-width: 200px;
}

.short-select,
.short-input {
  max-width: 400px;
  flex: none;
}

.sin-display {
  background-color: #e8f5e8;
  border: 2px solid #28a745 !important;
  font-weight: bold;
  color: #155724;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #aaa;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #e0e0e0;
}

button {
  width: fit-content;
  padding: 8px 16px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3f51b5;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
