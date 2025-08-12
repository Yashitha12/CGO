<template>
  <div class="container mt-4">
    <h2 class="text-center">Air Field Runway</h2>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card mt-3 p-4 shadow-sm">
          <p><strong>Runway ID:</strong> {{ id }}</p>
          <p><strong>Identification Name or No:</strong></p>
          <p><strong>Length:</strong></p>
          <p><strong>Width:</strong></p>
          <p><strong>Construction Status:</strong></p>
          <p><strong>Started Year:</strong></p>
          <p><strong>Completed Year:</strong></p>
          <p><strong>Cost (Rs Million):</strong></p>
          <p><strong>Source of Funding:</strong></p>
          <p><strong>Contractor:</strong></p>
          <p><strong>Consultant:</strong></p>
          <p><strong>Usage:</strong></p>
          <p><strong>Valuation:</strong></p>
          <p><strong>Date:</strong></p>
          <p><strong>Remarks:</strong></p>

          <div class="mt-4">
            <h5 class="text-center">UPDATE VERIFICATION STATUS</h5>
            <div class="d-flex justify-content-center gap-2 mt-2">
              <button class="btn-custom btn-sm" @click="confirmVerify">VERIFY</button>
              <button class="btn-custom btn-sm" @click="showReject = true">REJECT</button>
            </div>

            <div v-if="showReject" class="row align-items-center mt-3">
              <div class="col-md-9">
                <label for="reason" class="form-label mb-1">Reason for Reject</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="reason"
                  v-model="reason"
                  placeholder="Enter reason"
                />
              </div>
              <div class="col-md-3 mt-4">
                <button class="btn-custom btn-sm w-100" @click="confirmSaveReason">SAVE</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "AirFieldRunwayViewDetails",
  data() {
    return {
      id: null,
      showReject: false,
      reason: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    // fetch asset details here
  },
  methods: {
    confirmVerify() {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to verify this asset?",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#4c59b0',
        cancelButtonColor: '#333',
        confirmButtonText: 'Yes, I confirm this!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.verifyAsset();
        }
      });
    },
    verifyAsset() {
      Swal.fire("Verified!", "Asset has been verified.", "success");
    },
    confirmSaveReason() {
      if (!this.reason.trim()) {
        Swal.fire("Error", "Please enter a reason before saving.", "warning");
        return;
      }

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this asset?",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: '#4c59b0',
        cancelButtonColor: '#333',
        confirmButtonText: 'Yes, I confirm this!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.saveReason();
        }
      });
    },
    saveReason() {
      Swal.fire("Saved!", `Reason saved: ${this.reason}`, "success");
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #f9f9f9;
  border-radius: 10px;
}

.btn-custom {
  background-color: #21293e;
  color: white;
  border: none;
  padding: 5px 12px;
  font-size: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-custom:hover {
  background-color: #2e426b;
  cursor: pointer;
}
</style>







