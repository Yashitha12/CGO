<template>
  <div class="summary-page">
    <h2>Component Summary</h2>

    <div v-if="components.length === 0" class="no-data">
      <p>No components have been saved yet.</p>
      <button @click="goToChosenComponents" class="btn-primary">Add Components</button>
    </div>

    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Component Name</th>
            <th>SIN Number</th>
            <th>Construction Status</th>
            <th>Usage Status</th>
            <th>Valuation</th>
            <th>Estimated Cost (Rs. Million)</th>
            <th>Cost Incurred (Rs. Million)</th>
            <th>Additional Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(component, index) in components" :key="index">
            <td>{{ component.name }}</td>
            <td>{{ component.sinNumber || '-' }}</td>
            <td>{{ component.constructionStatus }}</td>
            <td>{{ component.statusOfUsage || '-' }}</td>
            <td>
              {{ component.hasValuation ? 'Yes' : 'No' }}
              <span v-if="component.hasValuation">
                <br>Rs. {{ component.valuationValue }} Million
                <br>{{ component.valuationDate }}
              </span>
            </td>
            <td>{{ component.estimatedCost || '-' }}</td>
            <td>{{ component.costIncurred || '-' }}</td>
            <td>
              <div v-if="component.contractors">
                <strong>Contractors:</strong> {{ component.contractors }}
              </div>
              <div v-if="component.consultants">
                <strong>Consultants:</strong> {{ component.consultants }}
              </div>
              <div v-if="component.remarks">
                <strong>Remarks:</strong> {{ component.remarks }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="actions">
        <button @click="goToChosenComponents" class="btn-secondary">Add More Components</button>
        <button @click="goToMainPage" class="btn-primary">Continue to Main Page</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryPage",
  data() {
    return {
      components: []
    };
  },
  mounted() {
    this.loadComponents();
  },
  methods: {
    loadComponents() {
      // Load components from session storage
      const savedComponents = sessionStorage.getItem("savedComponents");
      if (savedComponents) {
        try {
          this.components = JSON.parse(savedComponents);
        } catch (error) {
          console.error("Error parsing saved components:", error);
          this.components = [];
        }
      }
    },
    goToChosenComponents() {
      this.$router.push({ path: "/components/chosen" });
    },
    goToMainPage() {
      this.$router.push({ path: "/components/main" });
    }
  }
};
</script>

<style scoped>
.summary-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.no-data {
  text-align: center;
  padding: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  vertical-align: top;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-secondary {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #3f51b5;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

/* Responsive design */
@media (max-width: 768px) {
  .summary-page {
    padding: 10px;
  }
  
  table {
    font-size: 12px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>


