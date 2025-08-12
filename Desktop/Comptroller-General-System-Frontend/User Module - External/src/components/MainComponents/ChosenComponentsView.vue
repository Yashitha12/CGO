<template>
  <div class="main-container">
    <h2>Main Components</h2>

    <div class="instructions">
      <p><strong>Instructions:</strong></p>
      <p>
        If you have more than one item in a component (e.g., 2 Runways), fill in
        all info for the first item and click <strong>SAVE</strong>. Then click
        <strong>Add Next</strong> and select the same component again to add the
        second one.
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading">
      <p>Loading saved components...</p>
    </div>

    <!-- Error state -->
    <div v-if="apiError" class="error-message">
      <p>{{ apiError }}</p>
      <button @click="fetchSavedComponents" class="retry-btn">Retry</button>
    </div>

    <label for="component-select">Select a Component:</label>
    <select
      v-model="selectedComponent"
      @change="goToComponentPage"
      id="component-select"
    >
      <option disabled value="">-- Please select a component --</option>

      <!-- Saved components section -->
      <optgroup
        v-if="savedComponents.length > 0"
        label="✅ Saved Components (Click to Edit)"
      >
        <option
          v-for="component in savedComponents"
          :key="`saved-${component.componentType}`"
          :value="component.componentType"
        >
          ✅ {{ getComponentDisplayName(component.componentType) }} (Saved)
        </option>
      </optgroup>

      <!-- Available to add section -->
      <optgroup v-if="availableToAdd.length > 0" label="➕ Add New Components">
        <option
          v-for="component in availableToAdd"
          :key="`add-${component.key}`"
          :value="component.key"
        >
          ➕ {{ component.label }}
        </option>
      </optgroup>

      <!-- Show message if no components available -->
      <option
        v-if="availableToAdd.length === 0 && savedComponents.length === 0"
        disabled
      >
        No components available
      </option>
    </select>

    <div v-if="selectedComponent" class="placeholder-message">
      <p>
        You selected: <strong>{{ getSelectedComponentLabel() }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      componentMap: {
        runway: "Runway",
        taxiway: "Taxiway",
        apron: "Apron",
        airtrafficcontroltower: "Air Traffic Control Tower",
        radartower: "Radar Tower",
        hanger: "Hanger",
        other: "Other",
      },
      availableComponents: [],
      savedComponents: [],
      selectedComponent: "",
      sinNumber: "",
      isLoading: false,
      apiError: "",
    };
  },
  computed: {
    availableToAdd() {
      const savedComponentTypes = this.savedComponents.map(
        (comp) => comp.componentType
      );
      return this.availableComponents.filter(
        (comp) => !savedComponentTypes.includes(comp.key)
      );
    },
  },
  async mounted() {
    // Get components from route query
    const rawQuery = this.$route.query.components || "";
    const keys = rawQuery
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    this.availableComponents = keys.map((key) => ({
      key,
      label: this.componentMap[key] || key,
    }));

    // Get SIN number from route query or session storage
    this.sinNumber =
      this.$route.query.sin ||
      sessionStorage.getItem("airfieldSinNumber") ||
      sessionStorage.getItem("sinCode") ||
      sessionStorage.getItem("currentSinNumber") ||
      "";

    console.log("SIN Number:", this.sinNumber);
    console.log("Available Components:", this.availableComponents);

    // Fetch saved components if SIN number exists
    if (this.sinNumber) {
      await this.fetchSavedComponents();
    } else {
      this.apiError =
        "SIN number not found. Please complete the airfield form first.";
    }
  },
  methods: {
    async fetchSavedComponents() {
      this.isLoading = true;
      this.apiError = "";

      try {
        const response = await axios.get(
          `http://192.168.231.62/cgobasicairfield/api/infrastructure/${this.sinNumber}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDk2ODEyMywiZXhwIjoxNzU1MDU0NTIzfQ.18bwnDxBISf3T02JXhucE_BGHDRkFDouyyVSoNeyP4qrwbHvYd9Sp8t7GiGkv8ha8oc42TD91T6G220_lvRuBA",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response.data);
        this.savedComponents = this.processSavedComponents(response.data);
      } catch (error) {
        console.error("Error fetching saved components:", error);

        if (error.response?.status === 404) {
          this.apiError = "No saved components found for this SIN number.";
        } else if (error.response?.status === 401) {
          this.apiError = "Authentication failed. Please login again.";
        } else if (error.response?.status >= 500) {
          this.apiError = "Server error occurred. Please try again later.";
        } else {
          this.apiError = "Failed to load saved components. Please try again.";
        }
      } finally {
        this.isLoading = false;
      }
    },

    processSavedComponents(data) {
      const components = [];

      // Process different component types based on API response structure
      if (data.runway) components.push({ componentType: "runway" });
      if (data.taxiway) components.push({ componentType: "taxiway" });
      if (data.apron) components.push({ componentType: "apron" });
      if (data.airTrafficControlTower)
        components.push({ componentType: "airtrafficcontroltower" });
      if (data.radarTower) components.push({ componentType: "radartower" });
      if (data.hanger) components.push({ componentType: "hanger" });
      if (data.other) components.push({ componentType: "other" });

      return components;
    },

    getComponentDisplayName(componentType) {
      const nameMap = {
        runway: "Runway",
        taxiway: "Taxiway",
        apron: "Apron",
        airtrafficcontroltower: "Air Traffic Control Tower",
        radartower: "Radar Tower",
        hanger: "Hanger",
        other: "Other",
      };
      return nameMap[componentType] || componentType;
    },

    editComponent(componentType) {
      const routeMap = {
        runway: "RunwayComponent",
        taxiway: "TaxiwayComponent",
        apron: "ApronComponent",
        airtrafficcontroltower: "AirTrafficControlComponent",
        radartower: "RadarTowerComponent",
        hanger: "HangerComponent",
        other: "OtherComponent",
      };

      if (routeMap[componentType]) {
        this.$router.push({ name: routeMap[componentType] });
      }
    },

    normalize(text) {
      return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
    },
    getSelectedComponentLabel() {
      // Check if it's a saved component
      const savedComponent = this.savedComponents.find(
        (comp) => comp.componentType === this.selectedComponent
      );
      if (savedComponent) {
        return `${this.getComponentDisplayName(savedComponent.componentType)} (Saved - Edit Mode)`;
      }

      // Otherwise it's a new component to add
      return `${this.getLabel(this.selectedComponent)} (Add New)`;
    },
    goToComponentPage() {
      const routeMap = {
        runway: "RunwayComponent",
        taxiway: "TaxiwayComponent",
        apron: "ApronComponent",
        airtrafficcontroltower: "AirTrafficControlComponent",
        radartower: "RadarTowerComponent",
        hanger: "HangerComponent",
        other: "OtherComponent",
      };

      // Use the selected component directly (works for both saved and new components)
      if (routeMap[this.selectedComponent]) {
        this.$router.push({ name: routeMap[this.selectedComponent] });
      } else {
        alert("Unknown component selected.");
      }
    },
    getLabel(key) {
      return this.componentMap[key] || key;
    },
  },
};
</script>

<style scoped>
.main-container {
  padding: 30px;
  font-family: Arial, sans-serif;
}

.instructions {
  background: #f9f9f9;
  padding: 15px;
  border-left: 4px solid #007bff;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 10px;
}

select {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 6px;
}

select:focus {
  border-color: #007bff;
  outline: none;
}

.placeholder-message {
  margin-top: 20px;
  background: #eef6ff;
  padding: 15px;
  border-left: 4px solid #0b5ed7;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.retry-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.retry-btn:hover {
  background: #c82333;
}

optgroup {
  font-weight: bold;
  color: #495057;
  padding: 8px;
}

option {
  padding: 8px;
}
</style>
