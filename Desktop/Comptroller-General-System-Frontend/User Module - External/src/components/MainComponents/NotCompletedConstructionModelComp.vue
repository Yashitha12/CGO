<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>

      <div class="modal-body">
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

        <div class="form-row">
          <label>Reason for Not Completion:</label>
          <input type="text" v-model="reason" :maxlength="100" required />
        </div>

        <div class="form-row">
          <label>Total Estimated Construction Cost (Rs. Million):</label>
          <select v-model="estimatedCostKnown" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <input
            v-if="estimatedCostKnown === 'Known'"
            type="text"
            v-model="estimatedCost"
            @input="validateDecimalInput($event, 'estimatedCost')"
            @keydown="restrictToDecimal"
            placeholder="Cost"
          />
        </div>

        <div class="form-row">
          <label>Cost Incurred:</label>
          <select v-model="costKnownStatus" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <template v-if="costKnownStatus === 'Known'">
            <input
              type="text"
              v-model="costIncurred"
              @input="validateDecimalInput($event, 'costIncurred')"
              @keydown="restrictToDecimal"
              placeholder="Cost (Rs. Million)"
            />
            <input type="date" v-model="costDate" />
          </template>
        </div>

        <div class="form-row">
          <label>Construction Started Year:</label>
          <select v-model="startedYearKnown" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <input
            v-if="startedYearKnown === 'Known'"
            type="text"
            v-model="startedYear"
            @input="validateYearInput($event, 'startedYear')"
            maxlength="4"
            placeholder="YYYY"
          />
        </div>

        <div class="form-row">
          <label>Expected Year of Completion:</label>
          <select v-model="completionYearKnown" required>
            <option>Known</option>
            <option>Unknown</option>
          </select>
          <input
            v-if="completionYearKnown === 'Known'"
            type="text"
            v-model="completionYear"
            @input="validateYearInput($event, 'completionYear')"
            maxlength="4"
            placeholder="YYYY"
          />
        </div>

        <div class="form-row">
          <label>Physical Progress %:</label>
          <input
            type="text"
            v-model="physicalProgress"
            @input="validatePercentageInput($event, 'physicalProgress')"
            @keydown="restrictToNumeric"
          />
        </div>

        <div class="form-row">
          <label>Financial Progress %:</label>
          <input
            type="text"
            v-model="financialProgress"
            @input="validatePercentageInput($event, 'financialProgress')"
            @keydown="restrictToNumeric"
            required
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Source of Funding</th>
              <th>Type of Funding</th>
              <th>Amount (Rs. Million)</th>
              <th>Foreign/Local Funding Agency</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fund, index) in fundingList" :key="index">
              <td></td>
              <td>
                <select v-model="fund.type">
                  <option disabled value="">Select</option>
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
                  @input="validateDecimalFunding(fund, index)"
                  @keydown="restrictToDecimal"
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
              <td colspan="2">
                <input type="text" :value="totalAmount" readonly />
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="addFundingRow">Add</button>

        <div class="form-row">
          <label>Need any Additional Funding:</label>
          <select v-model="AdditionalFundingNeeded" required>
            <option>Yes</option>
            <option>No</option>
          </select>
          <input
            v-if="AdditionalFundingNeeded === 'Yes'"
            type="text"
            v-model="AdditionalFundingAmount"
            @input="validateDecimalAdditionalFunding"
            @keydown="restrictToDecimal"
            placeholder="Estimated Amount (Rs. Million)"
          />
        </div>

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
      </div>

      <div class="modal-footer">
        <button @click="saveAndRedirect" class="save-btn">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "NotCompletedConstructionModel",
  props: {
    componentRoute: String,
  },
  data() {
    return {
      showModal: true,
      reason: "",
      estimatedCostKnown: "",
      estimatedCost: "",
      costKnownStatus: "",
      costIncurred: "",
      costDate: "",
      startedYearKnown: "",
      startedYear: "",
      completionYearKnown: "",
      completionYear: "",
      physicalProgress: "",
      financialProgress: "",
      fundingList: [{ type: "", amount: "", agency: "" }],
      AdditionalFundingNeeded: "",
      AdditionalFundingAmount: "",
      contractors: "",
      consultants: "",
      componentSinNumber: "", // Store component SIN from RadarTower
    };
  },
  mounted() {
    // Get SIN number from RadarTower component session storage
    this.getComponentSinFromSession();
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
  },
  methods: {
    restrictToDecimal(e) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
      ];
      const isNumber = /[0-9]/.test(e.key);
      const isDot = e.key === "." && !e.target.value.includes(".");
      if (!isNumber && !allowedKeys.includes(e.key) && !isDot) {
        e.preventDefault();
      }
    },
    restrictToNumeric(e) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
      ];
      const isNumber = /[0-9]/.test(e.key);
      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    },
    validateDecimalInput(event, field) {
      let value = event.target.value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts[1];
      if (parts[1] && parts[1].length > 3) parts[1] = parts[1].slice(0, 3);
      this[field] = parts.join(".");
    },
    validateDecimalFunding(fund, index) {
      let val = fund.amount.replace(/[^0-9.]/g, "");
      const parts = val.split(".");
      if (parts.length > 2) val = parts[0] + "." + parts[1];
      if (parts[1] && parts[1].length > 3) parts[1] = parts[1].slice(0, 3);
      this.$set(this.fundingList, index, { ...fund, amount: parts.join(".") });
    },
    validateDecimalAdditionalFunding(event) {
      let value = event.target.value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) value = parts[0] + "." + parts[1];
      if (parts[1] && parts[1].length > 3) parts[1] = parts[1].slice(0, 3);
      this.AdditionalFundingAmount = parts.join(".");
    },
    validateYearInput(event, field) {
      this[field] = event.target.value.replace(/\D/g, "").slice(0, 4);
    },
    validatePercentageInput(event, field) {
      let value = event.target.value.replace(/\D/g, "");
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        this[field] = value;
      } else if (num > 100) {
        this[field] = "100";
      }
    },
    addFundingRow() {
      this.fundingList.push({ type: "", amount: "", agency: "" });
    },
    showAgencyField(type) {
      return [
        "Foreign Funding (Grant)",
        "Foreign Funding (Loan)",
        "Local Funding (Loan)",
        "Local Funding (Grant)",
        "Other (Pls. specify)",
      ].includes(type);
    },
    closeModal() {
      this.showModal = false;
    },
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
    saveAndRedirect() {
      const isValid =
        this.reason &&
        this.estimatedCostKnown &&
        (this.estimatedCostKnown === "Unknown" || this.estimatedCost) &&
        this.costKnownStatus &&
        (this.costKnownStatus === "Unknown" ||
          (this.costIncurred && this.costDate)) &&
        this.startedYearKnown &&
        (this.startedYearKnown === "Unknown" ||
          this.startedYear.length === 4) &&
        this.completionYearKnown &&
        (this.completionYearKnown === "Unknown" ||
          this.completionYear.length === 4) &&
        this.financialProgress &&
        this.fundingList.every((fund) => {
          return (
            fund.type &&
            fund.amount &&
            (this.showAgencyField(fund.type) ? fund.agency : true)
          );
        }) &&
        this.AdditionalFundingNeeded &&
        (this.AdditionalFundingNeeded === "No" ||
          (this.AdditionalFundingNeeded === "Yes" &&
            this.AdditionalFundingAmount));

      if (!isValid) {
        Swal.fire({
          icon: "warning",
          title: "Please fill all required fields",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });
        return;
      }

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the construction information and proceed?",
        icon: "question",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#4c59b0",
        cancelButtonColor: "#666",
        confirmButtonText: "Yes, Continue!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const currentDate = new Date().toISOString();

            // Prepare construction data using the required structure
            const constructionData = {
              componentSinNumber: this.componentSinNumber, // Include component SIN from RadarTower
              reasonForNotCompletion: this.reason,
              costKnownStatus: this.estimatedCostKnown,
              totalEstimatedCost:
                this.estimatedCostKnown === "Known" && this.estimatedCost
                  ? parseFloat(this.estimatedCost.replace(/,/g, ""))
                  : null,
              costIncurredKnownStatus: this.costKnownStatus,
              costIncurred:
                this.costKnownStatus === "Known" && this.costIncurred
                  ? parseFloat(this.costIncurred.replace(/,/g, ""))
                  : null,
              costIncurredDate:
                this.costKnownStatus === "Known" ? this.costDate : "",
              constructionStartedYear:
                this.startedYearKnown === "Known" && this.startedYear
                  ? parseInt(this.startedYear)
                  : null,
              constructionStartedKnownStatus: this.startedYearKnown,
              expectedCompletionYear:
                this.completionYearKnown === "Known" && this.completionYear
                  ? parseInt(this.completionYear)
                  : null,
              expectedCompletionKnownStatus: this.completionYearKnown,
              physicalProgressPercentage: this.physicalProgress
                ? parseInt(this.physicalProgress)
                : null,
              financialProgressPercentage: parseInt(this.financialProgress),
              totalFunding: this.totalFunding,
              fundingSources: this.fundingList.map((fund) => ({
                fundingType: fund.type || "",
                amount: fund.amount ? parseFloat(fund.amount) : null,
                agencyOrInstitution: fund.agency || "",
              })),
              needAdditionalFunding: this.AdditionalFundingNeeded === "Yes",
              additionalFundingAmount:
                this.AdditionalFundingNeeded === "Yes" &&
                this.AdditionalFundingAmount
                  ? parseFloat(this.AdditionalFundingAmount.replace(/,/g, ""))
                  : null,
              contractorName: this.contractors || "",
              consultantName: this.consultants || "",
              statusOfUsage: "", // Will be filled in UsageInfo component
              hasValuation: null, // Will be filled in UsageInfo component
              valuationValue: null, // Will be filled in UsageInfo component
              valuationDate: "", // Will be filled in UsageInfo component
              remarks: "", // Will be filled in UsageInfo component
              createdAt: currentDate,
              updatedAt: currentDate,
            };

            // Store construction data in session storage
            sessionStorage.setItem(
              "notCompletedConstructionData",
              JSON.stringify(constructionData)
            );

            console.log(
              "Construction data stored in session:",
              constructionData
            );

            // Show success message
            Swal.fire({
              icon: "success",
              title: "Construction Information Saved!",
              text: "Please complete the usage information in the next step.",
              confirmButtonText: "Continue",
              confirmButtonColor: "#4c59b0",
            }).then(() => {
              // Navigate to usage info page
              this.$emit("saved", constructionData);
              this.$router.push("/components/UsageInfoComp");
            });
          } catch (error) {
            console.error("Error saving construction data to session:", error);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to save construction data. Please try again.",
              confirmButtonText: "Okay",
              confirmButtonColor: "#4c59b0",
            });
          }
        }
      });
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-height: 90vh;
  width: 90%;
  max-width: 950px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-body {
  padding: 30px;
  overflow-y: auto;
  flex-grow: 1;
  max-height: calc(90vh - 80px);
}

.modal-footer {
  padding: 15px 30px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
}

.save-btn {
  width: auto;
  padding: 10px 20px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.save-btn:hover {
  background-color: #3f51b5;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 26px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  z-index: 1000;
}

.form-row,
.form-group-row {
  display: flex;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
  gap: 10px;
}

.form-row label,
.form-group-row label {
  width: 300px;
  font-weight: bold;
}

.form-row select,
.form-row input[type="text"],
.form-row input[type="date"],
.short-input {
  padding: 6px 10px;
  flex: 1;
  min-width: 150px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

.sin-display {
  background-color: #e8f5e8;
  border: 2px solid #28a745 !important;
  font-weight: bold;
  color: #155724;
}
</style>
