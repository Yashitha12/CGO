<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <form class="form-wrapper">
        <div class="form-inline-group">
          <label for="status">Construction Status</label>
          <select
            id="status"
            v-model="construction.status"
            @change="statusView"
            required
          >
            <option disabled value="">Construction Status</option>
            <option>Completed</option>
            <option>Under Construction / Not Completed / Ongoing</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConstructionStatusModal",
  data() {
    return {
      construction: {
        status: "",
      },
    };
  },
  methods: {
    statusView() {
      if (this.construction.status === "Completed") {
        this.$router.push({ name: "CompletedConstructionModalComp" });
      } else if (
        this.construction.status ===
        "Under Construction / Not Completed / Ongoing"
      ) {
        this.$router.push({ name: "NotCompletedConstructionModelComp" });
      }
    },
    close() {
      this.$emit("close");
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
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 600px;
  max-width: 90%;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-inline-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-inline-group label {
  white-space: nowrap;
  min-width: 150px;
  text-align: right;
}

.form-inline-group select {
  width: auto;
  min-width: 320px;
  padding: 6px;
  box-sizing: border-box;
}
</style>
