<template>
    <div class="container my-5">
      <div class="row mb-4">
        <div class="col-lg-8 mx-auto text-center">
          <h2 class="fw-bold mb-3">Type of Structures</h2>
          <p class="text-danger mb-2">
            The Structures confirmed by the Data Verification Officer are
            highlighted below.
          </p>
          <p class="mb-4">
            Select a structure type to enter relevant information
          </p>
  
          <!-- Search input -->
          <div class="input-group mb-4 search-container">
            <span class="input-group-text bg-light">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Search structure types..."
              v-model="searchTerm"
            />
          </div>
        </div>
      </div>
  
      <div class="row g-4 justify-content-center">
        <div
          class="col-6 col-md-4 col-lg-3"
          v-for="item in filteredStructures"
          :key="item.title"
          @click="navigateToStructure(item)"
        >
          <div class="structure-card card h-100 shadow-sm">
            <div class="card-image-container">
              <img :src="item.image" :alt="item.title" class="card-img-top" />
              <div class="image-overlay">
                <h5 class="card-title text-white fw-bold">{{ item.title }}</h5>
              </div>
            </div>
            <div class="card-body">
              <p class="card-description">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- No results message -->
      <div v-if="filteredStructures.length === 0" class="text-center my-5">
        <p class="text-muted">No matching structure types found</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StructureType",
    data() {
      return {
        searchTerm: "",
        structures: [
          {
            title: "Road",
            desc: "Expressway, Highway, Road, Street, Avenue, Lane...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4YqBtuDLfApKNy8oh1l21t_PkEaI79xZ7dA&s",
            type: "road",
          },
          {
            title: "Bridge",
            desc: "Bridge, Tunnel, Flyover, Overpass...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTtieJAa2zxQV-Pr2tFE8T6vop2wNhIBy9w&s",
            type: "bridge",
          },
          {
            title: "Railway",
            desc: "Railway Line, Railway Station...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT8BNYpDBBEJHTxiqfln8K57zxv9H6Lc0poA&s",
            type: "railway",
          },
          {
            title: "Air Field Runway",
            desc: "Airport, Helipad...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZBaLQI401fHsJEn-MZ2oRzasftVqwKzrQ1A&s",
            type: "airport",
            route: "/structure/AirFieldRunway", 
          },
          {
            title: "Harbour",
            desc: "Port, Anchorage, Harbour...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8b6Jt-z1T9AfETPR596HjUL6l0e0ZhoLrMA&s",
            type: "harbour",
          },
          {
            title: "Treatment Complex",
            desc: "Water, Sewage, Drainage...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQze27YewTvhohFJ--K95ZSxHRUTs3YTGyz7Q&s",
            type: "treatment",
          },
          {
            title: "Water Work",
            desc: "Reservoir, Tank, Canal...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI5upfW6h4wLZDuNFqWUX6xbb0nYWARqhifQ&s",
            type: "water",
          },
          {
            title: "Sports Facility",
            desc: "Stadium, Playground, Gym...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfsOUkHbDz34IhYKzJhuyJETRj7AD2Hw3EnQ&s",
            type: "sports",
          },
          {
            title: "Energy Resource",
            desc: "Electricity, Petroleum, LPG...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Ml0j3sMYR8-_mVjdXnXXcBk06Pj1_tENKQ&s",
            type: "energy",
          },
          {
            title: "Communication",
            desc: "Tower, Transmitter...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREBlxLmPjq6npi2P7DaG6iXKyNRPe455HDNA&s",
            type: "communication",
          },
          {
            title: "Others",
            desc: "Furnace, Wall, Arches, Cloud Tower...",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTur2KC91gM93ZkvhirJafp7MKfRigL639xRQ&s",
            type: "others",
          },
        ],
      };
    },
    computed: {
      filteredStructures() {
        if (!this.searchTerm) return this.structures;
  
        const term = this.searchTerm.toLowerCase();
        return this.structures.filter(
          (item) =>
            item.title.toLowerCase().includes(term) ||
            item.desc.toLowerCase().includes(term)
        );
      },
    },
    methods: {
      navigateToStructure(item) {
        // Check if the item has a specific route defined
        if (item.route) {
          // Navigate to the specific route
          this.$router.push(item.route);
        } else {
          // Default navigation to structure detail page
          this.$router.push(`/structure/${item.type}`);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .structure-card {
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 100%;
    border-radius: 15px;
    overflow: hidden;
  }
  
  .structure-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
  }
  
  .card-image-container {
    position: relative;
    height: 120px;
    overflow: hidden;
  }
  
  .card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .structure-card:hover .card-img-top {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    padding: 15px;
    display: flex;
    align-items: flex-end;
  }
  
  .card-title {
    margin: 0;
    font-size: 1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .card-body {
    padding: 20px 15px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
  }
  
  .card-description {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #555;
    text-align: center;
    font-weight: 500;
  }
  
  .search-container {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .search-container .form-control {
    border-radius: 25px;
    border-left: none;
  }
  
  .search-container .input-group-text {
    border-radius: 25px 0 0 25px;
    border-right: none;
  }
  
  @media (max-width: 576px) {
    .col-6 {
      width: 100%;
    }
    
    .card-image-container {
      height: 100px;
    }
    
    .card-title {
      font-size: 0.9rem;
    }
    
    .card-description {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 768px) {
    .structure-card {
      margin-bottom: 1rem;
    }
  }
  </style>