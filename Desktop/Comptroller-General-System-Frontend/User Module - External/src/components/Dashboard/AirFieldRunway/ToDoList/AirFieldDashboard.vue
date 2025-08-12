<!-- <template>
  <div class="container mt-2">
    <div class="card text-center">
      <div class="card-header d-flex justify-content-between align-items-center header-custom">
        <h4 class="mb-0">STRUCTURES DASH BOARD FOR DATA VERIFICATION OFFICER</h4>
        <router-link to="/todo-list-structures" class="todo-btn">
          TO DO LIST - STRUCTURES
          <img :src="alertsIcon" alt="Alerts" class="bell-icon" />
        </router-link>
      </div>

      <div class="card-body">
        First Row 
        <div class="row text-center">
          <div class="col-md-4 mb-2" @click="openModal('inProgress')">
            <div class="card status-card inprogress">
              <div class="card-body">
                <h5>In-progress Assets</h5>
                <p class="desc">Information Entered but not Verified</p>
                <h3>05</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2" @click="openModal('approved')">
            <div class="card status-card approved">
              <div class="card-body">
                <h5>Approved Assets</h5>
                <p class="desc">Information Verified as "Verify"</p>
                <h3>02</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2" @click="openModal('rejected')">
            <div class="card status-card rejected">
              <div class="card-body">
                <h5>Rejected Assets</h5>
                <p class="desc">Information Verified as "Reject"</p>
                <h3>02</h3>
              </div>
            </div>
          </div>
        </div>

        Second Row
        <div class="row text-center">
          <div class="col-md-4 mb-2">
            <div class="card status-card neutral">
              <div class="card-body">
                <h5>Edit Request Send to CGO</h5>
                <h3>01</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2">
            <div class="card status-card neutral">
              <div class="card-body">
                <h5>Edit Request Approved by CGO</h5>
                <h3>02</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2">
            <div class="card status-card neutral">
              <div class="card-body">
                <h5>Edit Request Rejected by CGO</h5>
                <h3>02</h3>
              </div>
            </div>
          </div>
        </div>

        Third Row
        <div class="row text-center">
          <div class="col-md-4 offset-md-2 mb-2">
            <div class="card status-card deleted">
              <div class="card-body">
                <h5>Delete Requests</h5>
                <h3>01</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2">
            <div class="card status-card transfer">
              <div class="card-body">
                <h5>Transfer Requests</h5>
                <h3>02</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    Modal 
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
      <table class="table table-bordered">
         <thead>
           <tr>
             <th class="text-center">#</th>
             <th class="text-center">Name</th>
             <th class="text-center">Type</th>
             <th class="text-center">SIN</th> 
             <th class="text-center">Action</th>
           </tr>
    </thead>
    <tbody>
    <tr v-for="(asset, index) in currentAssets" :key="asset.id">
      <td>{{ index + 1 }}</td>
      <td>{{ asset.name }}</td>
      <td>{{ asset.type }}</td>
      <td>{{ asset.sin }}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-primary" @click="viewAsset(asset.id)">View</button>
      </td>
    </tr>
  </tbody>
</table>

        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="container mt-2">
    <div class="card text-center">
      <div
        class="card-header d-flex justify-content-between align-items-center header-custom"
      >
        <h4 class="mb-0">
          STRUCTURES DASH BOARD FOR DATA VERIFICATION OFFICER
        </h4>
        <router-link to="/todo-list-structures" class="todo-btn">
          TO DO LIST - STRUCTURES
          <img :src="alertsIcon" alt="Alerts" class="bell-icon" />
        </router-link>
      </div>

      <div class="card-body">
        <!-- First Row -->
        <div class="row text-center">
          <div class="col-md-4 mb-2" @click="openModal('inProgress')">
            <div class="card status-card inprogress">
              <div class="card-body">
                <h5>In-progress Assets</h5>
                <p class="desc">Information Entered but not Verified</p>
                <h3>{{ dashboardCounts.inProgress }}</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2" @click="openModal('approved')">
            <div class="card status-card approved">
              <div class="card-body">
                <h5>Approved Assets</h5>
                <p class="desc">Information Verified as "Verify"</p>
                <h3>{{ dashboardCounts.approved }}</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2" @click="openModal('rejected')">
            <div class="card status-card rejected">
              <div class="card-body">
                <h5>To-Do Assets</h5>
                <p class="desc">Information Verified as "To-Do"</p>
                <h3>{{ dashboardCounts.rejected }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Second Row -->
        <div class="row text-center">
          <div class="col-md-4 mb-2">
            <div class="card status-card neutral">
              <div class="card-body">
                <h5>Edit Request Send to CGO</h5>
                <h3>01</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2">
            <div class="card status-card neutral">
              <div class="card-body">
                <h5>Edit Request Approved by CGO</h5>
                <h3>02</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2">
            <div class="card status-card neutral">
              <div class="card-body">
                <h5>Edit Request Rejected by CGO</h5>
                <h3>02</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Third Row -->
        <div class="row text-center">
          <div class="col-md-4 offset-md-2 mb-2">
            <div class="card status-card deleted">
              <div class="card-body">
                <h5>Delete Requests</h5>
                <h3>01</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-2">
            <div class="card status-card transfer">
              <div class="card-body">
                <h5>Transfer Requests</h5>
                <h3>02</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center">#</th>
                <th class="text-center">Name</th>
                <th class="text-center">Type</th>
                <th class="text-center">SIN</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(asset, index) in currentAssets" :key="asset.id">
                <td>{{ index + 1 }}</td>
                <td>{{ asset.name }}</td>
                <td>{{ asset.type }}</td>
                <td>{{ asset.sin }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-primary"
                    @click="viewAsset(asset.id)"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import alertsIcon from "@/assets/img/alerts.png";

export default {
  name: "Dashboard",
  data() {
    return {
      showModal: false,
      modalTitle: "",
      currentAssets: [],
      alertsIcon,
      assets: {
        inProgress: [
          {
            id: 1,
            name: "Bandaranaike International Airport",
            type: "International",
            sin: "SIN001",
          },
          {
            id: 2,
            name: "Mattala International Airport",
            type: "International",
            sin: "SIN002",
          },
          { id: 3, name: "XXXXX Airport", type: "Domestic", sin: "SIN003" },
        ],
        approved: [
          {
            id: 4,
            name: "Bandaranaike International Airport",
            type: "International",
            sin: "SIN001",
          },
          {
            id: 5,
            name: "Mattala International Airport",
            type: "International",
            sin: "SIN002",
          },
        ],
        rejected: [
          { id: 6, name: "XXXXX Airport", type: "Domestic", sin: "SIN003" },
          { id: 7, name: "Old Airport", type: "International", sin: "SIN004" },
        ],
      },
      dashboardCounts: {
        inProgress: 0,
        approved: 0,
        rejected: 0,
      },
    };
  },
  mounted() {
    this.fetchDashboardSummary();
  },
  methods: {
    openModal(type) {
      this.currentAssets = this.assets[type];
      this.modalTitle =
        type.charAt(0).toUpperCase() + type.slice(1) + " Assets";
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    viewAsset(id) {
      this.$router.push({ name: "AirFieldRunwayView", params: { id } });
    },
    async fetchDashboardSummary() {
      // 🔐 Hardcoded token for testing
      const jwtToken =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3VydSIsImlhdCI6MTc1NDQ1MTY0MywiZXhwIjoxNzU0NTM4MDQzfQ.K-ASulz0296jAf6u682aFK_doOge_5w7RVro-gnn0px9B8eJRPVQ99Z72ZGApg711lcwwO4eSge_1MfOCwnLuQ";
      const role = "DVO"; // For now hardcoded; update later when login flow is implemented

      try {
        const response = await axios.get(
          `http://localhost:8088/api/dashboard/summary?role=${role}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const summaryData = response.data;

        // Reset all counts
        this.dashboardCounts = {
          inProgress: 0,
          approved: 0,
          rejected: 0,
        };

        summaryData.forEach((item) => {
          const label = item.label.toLowerCase().trim();

          if (label.includes("in-progress")) {
            this.dashboardCounts.inProgress = Number(item.value);
          } else if (label.includes("approved")) {
            this.dashboardCounts.approved = Number(item.value);
          } else if (label.includes("to-do")) {
            this.dashboardCounts.rejected = Number(item.value); // mapped to "To-Do"
          }
        });
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    },
  },
};
</script>

<!-- <script>
import alertsIcon from '@/assets/img/alerts.png';

export default {
  name: "Dashboard",
  data() {
    return {
      showModal: false,
      modalTitle: '',
      currentAssets: [],
      alertsIcon,
assets: {
  inProgress: [
    { id: 1, name: 'Bandaranaike International Airport', type: 'International', sin: 'SIN001' },
    { id: 2, name: 'Mattala International Airport', type: 'International', sin: 'SIN002' },
    { id: 3, name: 'XXXXX Airport', type: 'Domestic', sin: 'SIN003' }
  ],
  approved: [
    { id: 4, name: 'Bandaranaike International Airport', type: 'International', sin: 'SIN001' },
    { id: 5, name: 'Mattala International Airport', type: 'International', sin: 'SIN002' }
  ],
  rejected: [
    { id: 6, name: 'XXXXX Airport', type: 'Domestic', sin: 'SIN003' },
    { id: 7, name: 'Old Airport', type: 'International', sin: 'SIN004' }
  ]
}

    };
  },
  methods: {
    openModal(type) {
      this.currentAssets = this.assets[type];
      this.modalTitle = type.charAt(0).toUpperCase() + type.slice(1) + ' Assets';
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    viewAsset(id) {
      this.$router.push({ name: 'AirFieldRunwayView', params: { id } });
   }

  }
};
</script> -->

<style scoped>
.header-custom {
  background-color: #ffffff;
  font-weight: bold;
  font-size: 1.3rem;
}

.todo-btn {
  background-color: rgba(40, 58, 90, 0.9);
  color: white;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
}

.todo-btn:hover {
  background-color: rgba(72, 105, 163, 0.9);
  text-decoration: none;
}

.bell-icon {
  width: 60px;
  height: 60px;
  margin-left: 8px;
  vertical-align: middle;
}

.status-card {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 8px;
  max-height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.status-card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.status-card:hover {
  transform: scale(1.02);
}

.status-card h5 {
  font-weight: bold;
  font-size: 1.1rem;
}

.status-card h3 {
  font-size: 1.8rem;
  margin-top: 6px;
  font-weight: bold;
}

.status-card .desc {
  font-size: 0.9rem;
  color: #444;
  margin-top: 4px;
}

.status-card.inprogress,
.status-card.approved,
.status-card.rejected,
.status-card.neutral {
  background-color: #dbe9f4;
}

.status-card.deleted,
.status-card.transfer {
  background-color: #ccc3db;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  width: 90%;
  max-width: 800px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
}

.modal-body {
  padding: 16px;
}

table th.text-center {
  text-align: center;
  vertical-align: middle;
}

table td.text-center {
  text-align: center;
  vertical-align: middle;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
