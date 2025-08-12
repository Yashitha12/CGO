<template>
  <!-- <div class="todo-wrapper">
    <div class="sidebar">
      <h4 class="title">Navigation</h4>
      <ul class="menu">
        <li>Dashboard</li>
        <li>Institution Details</li>
        <li>Add Asset Information</li>
        <li>View Assets Information</li>
        <li>Report Generation</li>
      </ul>
    </div> -->

    <div class="content">
      <div class="header">
        <h3>Structures – Sub Fields</h3>
      </div>

      <div class="grid">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="icon-card"
        >
          <img :src="icon" alt="icon" class="icon" />
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import icon from '@/assets/img/todolist.png';

export default {
  name: 'ToDoList',
  data() {
    return {
      icon,
      items: [
        'Show Revaluations to be Verified List',
        'Show Details of Ongoing Constructions to be Verified List',
        'Show Maintenance to be Verified List',
        'Show Expansion / Extensions / Upgrading / Improvements to be Verified List',
        'Show Abandoned to be Verified List',
        'Show Leased out / Rented out to be Verified List',
        'Show Transfer to be Verified List',
        'Show Disposal to be Verified List'
      ]
    };
  }
};
</script>

<style scoped>
.todo-wrapper {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.sidebar {
  width: 240px;
  background-color: #2c3e50;
  color: white;
  padding: 24px 16px;
}

.sidebar .title {
  font-size: 1.2rem;
  margin-bottom: 16px;
}

.sidebar .menu {
  list-style: none;
  padding: 0;
}

.sidebar .menu li {
  padding: 10px 0;
  cursor: pointer;
}

.sidebar .menu li:hover {
  text-decoration: underline;
}

.content {
  flex: 1;
  background-color: #f7f7fb;
  padding: 24px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.header h3 {
  margin: 0;
  font-weight: bold;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.icon-card {
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-card:hover {
  transform: scale(1.03);
}

.icon {
  width: 68px;     
  height: 68px;    
  margin-bottom: 10px;
}
</style>

