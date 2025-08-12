<template>
  <div class="summary-page">
    <h2>Component Summary</h2>

    <table>
      <thead>
        <tr>
          <th>Component Name</th>
          <th>Construction Status</th>
          <th>Reason (if Not Completed)</th>
          <th>Physical Progress %</th>
          <th>Financial Progress %</th>
          <th>Estimated Cost (Rs. Million)</th>
          <th>Cost Incurred (Rs. Million)</th>
          <th>Additional Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(component, index) in components" :key="index">
          <td>{{ component.name }}</td>
          <td>{{ component.constructionStatus }}</td>
          <td>{{ component.reason || '-' }}</td>
          <td>{{ component.physicalProgress || '-' }}</td>
          <td>{{ component.financialProgress || '-' }}</td>
          <td>{{ component.estimatedCost || '-' }}</td>
          <td>{{ component.costIncurred || '-' }}</td>
          <td>
            Contractors: {{ component.contractors || '-' }}<br />
            Consultants: {{ component.consultants || '-' }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="actions">
      <button @click="goToChosenComponents">Add Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryPage",
  props: {
    components: {
      type: Array,
      required: true
    }
  },
  methods: {
    goToChosenComponents() {
      this.$router.push({ path: "/components/chosen" });
    }
  }
};
</script>

<style scoped>
.summary-page {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
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
}

th {
  background-color: #f5f5f5;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

button {
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
</style>


