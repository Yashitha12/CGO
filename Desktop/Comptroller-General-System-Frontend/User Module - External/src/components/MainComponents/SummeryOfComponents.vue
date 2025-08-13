<template>
  <div class="summary-page">
    <h2>Component Summary</h2>
    
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading component data...</p>
    </div>

    <!-- Error state -->
    <div v-if="error" class="alert alert-danger">
      <h5>Error Loading Data</h5>
      <p>{{ error }}</p>
      <button @click="loadData" class="btn btn-primary">Retry</button>
    </div>

    <!-- Data display -->
    <div v-if="!loading && !error && components.length > 0">
      <div class="summary-info mb-4">
        <div class="row">
          <div class="col-md-6">
            <h5>Component Information</h5>
            <p><strong>SIN Number:</strong> {{ componentData.sinNumber || 'N/A' }}</p>
            <p><strong>Component SIN:</strong> {{ componentData.componentSinNumber || 'N/A' }}</p>
            <p><strong>Saved At:</strong> {{ formatDate(componentData.savedAt) }}</p>
          </div>
          <div class="col-md-6">
            <h5>Construction Status</h5>
            <p><strong>Started Year:</strong> {{ getStartedYear() }}</p>
            <p><strong>Completed Year:</strong> {{ getCompletedYear() }}</p>
            <p><strong>Total Funding:</strong> Rs. {{ componentData.totalFunding || 0 }} Million</p>
          </div>
        </div>
      </div>

      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>Component Name</th>
            <th>Construction Status</th>
            <th>Started Year</th>
            <th>Completed Year</th>
            <th>Cost (Rs. Million)</th>
            <th>Usage Status</th>
            <th>Valuation (Rs. Million)</th>
            <th>Additional Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(component, index) in components" :key="index">
            <td>{{ component.name }}</td>
            <td>{{ component.constructionStatus }}</td>
            <td>{{ component.startedYear || '-' }}</td>
            <td>{{ component.completedYear || '-' }}</td>
            <td>{{ component.cost || '-' }}</td>
            <td>{{ component.usageStatus || '-' }}</td>
            <td>{{ component.valuation || '-' }}</td>
            <td>
              <small>
                <strong>Contractors:</strong> {{ component.contractors || '-' }}<br />
                <strong>Consultants:</strong> {{ component.consultants || '-' }}<br />
                <strong>Funding Agency:</strong> {{ component.fundingAgency || '-' }}
              </small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No data state -->
    <div v-if="!loading && !error && components.length === 0" class="alert alert-info">
      <h5>No Component Data Found</h5>
      <p>No saved component data was found. Please complete the component forms first.</p>
      <button @click="goToComponents" class="btn btn-primary">Go to Components</button>
    </div>

    <div class="actions mt-4">
      <button @click="goToChosenComponents" class="btn btn-secondary me-2">Add More Components</button>
      <button @click="downloadSummary" class="btn btn-success me-2">Download Summary</button>
      <button @click="goToDashboard" class="btn btn-primary">Go to Dashboard</button>




























    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "SummaryPage",
  data() {
    return {
      components: [],
      componentData: {},
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      this.error = null;

      try {
        // First try to get data from session storage (recently saved)
        const sessionData = sessionStorage.getItem("savedComponentData");
        
        if (sessionData) {
          console.log("Loading data from session storage...");
          this.loadFromSession(JSON.parse(sessionData));
        } else {
          // If no session data, try to load from database
          console.log("No session data found, loading from database...");
          await this.loadFromDatabase();
        }
      } catch (error) {
        console.error("Error loading component data:", error);
        this.error = "Failed to load component data. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    loadFromSession(data) {
      this.componentData = data;
      
      // Transform the data into component format for table display
      this.components = [{
        name: this.getComponentName(data.componentSinNumber),
        constructionStatus: "Completed",
        startedYear: this.getStartedYear(),
        completedYear: this.getCompletedYear(),
        cost: data.constructionCost || data.totalFunding || 0,
        usageStatus: data.statusOfUsage || 'N/A',
        valuation: data.hasValuation ? data.valuationValue : 'No Valuation',
        contractors: data.contractors || '-',
        consultants: data.consultants || '-',
        fundingAgency: data.local_Foreign_Funding_Agency || '-'
      }];

      console.log("Loaded component data from session:", this.components);
    },

    async loadFromDatabase() {
      try {
        // Get component SIN from session storage
        const componentSinNumber = 
          sessionStorage.getItem("submittedComponentSin") ||
          sessionStorage.getItem("componentSinNumber") ||
          sessionStorage.getItem("newComponentSin") ||
          sessionStorage.getItem("latestSinNumber");

        if (!componentSinNumber) {
          throw new Error("No component SIN number found. Please complete the component forms first.");
        }

        console.log("Loading data for component SIN:", componentSinNumber);

        // Set up headers with authentication token
        const headers = {
          Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        // Try to get data from the completed construction API
        const response = await axios.get(
          `http://192.168.231.62/cgoconstructioncomplete/projects/sin/${componentSinNumber}`,
          { headers, timeout: 30000 }
        );

        if (response.data) {
          this.componentData = response.data;
          this.loadFromSession(response.data);
        } else {
          throw new Error("No data found for this component SIN number.");
        }

      } catch (error) {
        console.error("Database load error:", error);
        
        if (error.response?.status === 404) {
          this.error = "Component data not found in database. It may not have been saved yet.";
        } else if (error.response?.status === 401) {
          this.error = "Authentication failed. Please login again.";
        } else {
          this.error = error.message || "Failed to load data from database.";
        }
      }
    },

    getComponentName(componentSinNumber) {
      // Try to determine component name from SIN number or session data
      const mainComponentsData = sessionStorage.getItem("mainComponentsData");
      if (mainComponentsData) {
        try {
          const data = JSON.parse(mainComponentsData);
          const selectedComponents = data.selectedComponents || [];
          
          // Return the first selected component as the primary one
          if (selectedComponents.length > 0) {
            return selectedComponents[0].charAt(0).toUpperCase() + selectedComponents[0].slice(1);
          }
        } catch (error) {
          console.error("Error parsing main components data:", error);
        }
      }
      
      return `Component (${componentSinNumber || 'Unknown'})`;
    },

    getStartedYear() {
      if (this.componentData.startedYearStatus === "Known" && this.componentData.startedYear) {
        return this.componentData.startedYear;
      }
      return this.componentData.startedYearStatus || 'Unknown';
    },

    getCompletedYear() {
      if (this.componentData.completedYearStatus === "Known" && this.componentData.completedYear) {
        return this.componentData.completedYear;
      }
      return this.componentData.completedYearStatus || 'Unknown';
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        return new Date(dateString).toLocaleString();
      } catch (error) {
        return dateString;
      }
    },

    goToChosenComponents() {
      this.$router.push({ path: "/components/chosen" });
    },

    goToComponents() {
      this.$router.push({ path: "/components/main" });
    },

    goToDashboard() {
      this.$router.push({ path: "/dashboard" });
    },

    async downloadSummary() {
      try {
        // Create downloadable content
        const content = this.generateSummaryContent();
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `component-summary-${this.componentData.componentSinNumber || 'unknown'}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        Swal.fire({
          icon: "success",
          title: "Summary Downloaded",
          text: "The component summary has been downloaded successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error downloading summary:", error);
        Swal.fire({
          icon: "error",
          title: "Download Failed",
          text: "Failed to download the summary. Please try again.",
          confirmButtonColor: "#4c59b0",
        });
      }
    },

    generateSummaryContent() {
      const data = this.componentData;
      return `
COMPONENT SUMMARY REPORT
========================

Component Information:
- SIN Number: ${data.sinNumber || 'N/A'}
- Component SIN: ${data.componentSinNumber || 'N/A'}
- Generated On: ${this.formatDate(data.savedAt)}

Construction Details:
- Started Year: ${this.getStartedYear()}
- Completed Year: ${this.getCompletedYear()}
- Construction Cost: Rs. ${data.constructionCost || data.totalFunding || 0} Million
- Contractors: ${data.contractors || 'Not specified'}
- Consultants: ${data.consultants || 'Not specified'}

Usage Information:
- Status of Usage: ${data.statusOfUsage || 'Not specified'}
- Has Valuation: ${data.hasValuation ? 'Yes' : 'No'}
- Valuation Value: ${data.hasValuation ? `Rs. ${data.valuationValue} Million` : 'N/A'}
- Valuation Date: ${data.valuationDate || 'N/A'}
- Remarks: ${data.remarks || 'None'}

Funding Information:
- Total Funding: Rs. ${data.totalFunding || 0} Million
- Funding Agency: ${data.local_Foreign_Funding_Agency || 'Not specified'}

---
Report generated by Comptroller General's Office System
${new Date().toLocaleString()}
      `.trim();
    },
  },
};
</script>

<style scoped>
.summary-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.summary-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.table {
  margin-top: 20px;
}

.table th {
  background-color: #343a40;
  color: white;
  font-weight: 600;
  border: none;
}

.table td {
  vertical-align: middle;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {

  background-color: #5c6bc0;
  color: white;



}

.btn-primary:hover {
  background-color: #3f51b5;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

@media (max-width: 768px) {
  .summary-page {
    padding: 10px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .table-responsive {
    font-size: 14px;
  }
}
</style>