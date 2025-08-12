<template>
    <div class="document-page">
      <div class="page-frame">
        <!-- Header with title and page number -->
        <div class="page-header">
          <h1 class="page-title">Air Field Runway</h1>
          
        </div>
  
        <!-- Main content area -->
        <div class="content-area">
          <div class="image-container">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZBaLQI401fHsJEn-MZ2oRzasftVqwKzrQ1A&s" 
              alt="Airport with aircraft on tarmac" 
              class="main-image"
            />
          </div>
        </div>
  
        <!-- Interactive elements (hidden by default, shown on hover/click) -->
        <div class="interactive-overlay" @click="showActions = !showActions">
          <div class="click-hint" v-if="!showActions">Click to view options</div>
          
          <div class="action-menu" v-if="showActions" @click.stop>
            <button class="action-btn" @click="$router.push('/structure/AirFieldRunwayForm')">
              <i class="bi bi-clipboard-check"></i>
              Start Inspection
            </button>
            <button class="action-btn" @click="viewReports">
              <i class="bi bi-file-text"></i>
              View Reports
            </button>
            <button class="action-btn" @click="maintenance">
              <i class="bi bi-tools"></i>
              Maintenance
            </button>
            <button class="action-btn" @click="schedule">
              <i class="bi bi-calendar"></i>
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AirfieldHomepage",
    data() {
      return {
        showActions: false
      };
    },
    methods: {
      startInspection() {
        this.$router.push('/airfield/inspection');
        this.showActions = false;
      },
      viewReports() {
        this.$router.push('/airfield/reports');
        this.showActions = false;
      },
      maintenance() {
        this.$router.push('/airfield/maintenance');
        this.showActions = false;
      },
      schedule() {
        this.$router.push('/airfield/schedule');
        this.showActions = false;
      }
    },
    mounted() {
      // Hide actions when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) {
          this.showActions = false;
        }
      });
    }
  };
  </script>
  
  <style scoped>
  .document-page {
    min-height: 100vh;
    background: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  .page-frame {
    width: 100%;
    max-width: 1200px;
    height: 750px;
    background: #f5f5f5;
    border: 3px solid #333;
    position: relative;
    cursor: pointer;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 40px 20px 40px;
  }
  
  .page-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c5aa0;
    margin: 0;
    letter-spacing: 2px;
  }
  
  .page-number {
    background: #28a745;
    color: white;
    padding: 8px 16px;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 3px;
  }
  
  .content-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 120px);
    padding: 0 40px;
  }
  
  .image-container {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
  }
  
  .main-image {
    width: 100%;
    height: auto;
    max-height: 500px;
    min-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
  
  .interactive-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0);
    transition: all 0.3s ease;
  }
  
  .interactive-overlay:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  .click-hint {
    background: rgba(44, 90, 160, 0.9);
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .interactive-overlay:hover .click-hint {
    opacity: 1;
  }
  
  .action-menu {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    min-width: 300px;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border: 2px solid #2c5aa0;
    background: white;
    color: #2c5aa0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .action-btn:hover {
    background: #2c5aa0;
    color: white;
    transform: translateY(-2px);
  }
  
  .action-btn i {
    font-size: 1.1rem;
  }
  
  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .document-page {
      padding: 10px;
    }
    
    .page-frame {
      height: 600px;
      max-width: 900px;
    }
    
    .page-header {
      padding: 20px 25px 15px 25px;
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }
    
    .page-title {
      font-size: 1.8rem;
      letter-spacing: 1px;
    }
    
    .content-area {
      padding: 0 25px;
      height: calc(100% - 140px);
    }
    
    .image-container {
      max-width: 600px;
    }
    
    .main-image {
      max-height: 350px;
      min-height: 300px;
    }
    
    .action-menu {
      grid-template-columns: 1fr;
      min-width: 250px;
    }
    
    .click-hint {
      font-size: 0.8rem;
      padding: 8px 16px;
    }
  }
  
  @media (max-width: 480px) {
    .page-title {
      font-size: 1.5rem;
    }
    
    .page-frame {
      height: 550px;
    }
    
    .main-image {
      max-height: 300px;
      min-height: 250px;
    }
  }
  </style>