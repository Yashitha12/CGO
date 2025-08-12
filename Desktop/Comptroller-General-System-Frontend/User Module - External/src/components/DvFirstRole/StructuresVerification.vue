<template>
    <div class="structure-container">
      <h4 class="structure-heading">Please Confirm whether the Institution has following Structures</h4>
  
      <div class="structure-list">
        <div v-for="(structure, index) in structures" :key="index" class="structure-row">
          <div class="structure-top">
            <img :src="structure.image" :alt="'Structure ' + index" class="structure-img" />
            <div class="radio-group">
              <label><input type="radio" :name="`structure-${index}`" value="Yes" v-model="structure.selected" /> Yes</label>
              <label><input type="radio" :name="`structure-${index}`" value="No" v-model="structure.selected" /> No</label>
            </div>
          </div>
          <p class="description">{{ structure.description }}</p>
        </div>
      </div>
  
      <div class="save-btn-container">
        <button class="save-btn" @click="handleSave">SAVE</button>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  import roadImg from '../../assets/img/road.png';
  import bridgeImg from '../../assets/img/bridge.png';
  import railwayImg from '../../assets/img/railway.png';
  import airfieldImg from '../../assets/img/airfield.png';
  import harbourImg from '../../assets/img/harbour.png';
  import treatmentComplexImg from '../../assets/img/treatment_complex.png';
  import waterWorkImg from '../../assets/img/water_work.png';
  import sportsRecreationalImg from '../../assets/img/sports_recreational.png';
  import energyResourceImg from '../../assets/img/energy_resource.png';
  import communicationImg from '../../assets/img/communication.png';
  import notListedImg from '../../assets/img/not_listed.png';
  
  export default {
    data() {
      return {
        structures: [
          { description: 'Expressway, Highway, Road, Street, Avenue, Passage, Lane', image: roadImg, selected: 'No' },
          { description: 'Bridge, Tunnel, Flyover, Overpass, Underpass, Culvert', image: bridgeImg, selected: 'No' },
          { description: 'Railway Line, Railway (Subway/ Mono Rail), Railway Signal', image: railwayImg, selected: 'No' },
          { description: 'Airport, Helipad, Waterdrome', image: airfieldImg, selected: 'No' },
          { description: 'Port, Harbour, Fishing Harbour, Anchorage, Landing Site', image: harbourImg, selected: 'No' },
          { description: 'Water, Sewerage, Drainage', image: treatmentComplexImg, selected: 'No' },
          { description: 'Reservoir, Tank, Canal, Tunnel, Canal & Tunnel (Mixed), Anicut (Weir), Tank (Aqua Culture), Ponds, Hatchery, Pump House, Tube Well, Flood Protection/ Flood Control, Lift Irrigation', image: waterWorkImg, selected: 'No' },
          { description: 'Indoor Stadium, Outdoor Stadium, Play Ground, Swimming Pool, Jogging Path, Linear Path, Gymnasium/Strength Hall, Fitness Hall, Park', image: sportsRecreationalImg, selected: 'No' },
          { description: 'Electricity, Petroleum, LPG', image: energyResourceImg, selected: 'No' },
          { description: 'Tower, Antenna, Transmitter', image: communicationImg, selected: 'No' },
          { description: 'Fence, Wall, Cages, Ancient statue, Clock Tower, Name Board, Light Tower, Den, Trench, Cemetery, etc.', image: notListedImg, selected: 'No' }
        ]
      };
    },
    methods: {
      handleSave() {
        const hasYes = this.structures.some(s => s.selected === 'Yes');
        Swal.fire({
          title: hasYes ? 'Are you sure?' : 'Please Reconfirm',
          text: hasYes
            ? ''
            : 'Please reconfirm that your Institution does not have any Structure. Accordingly “NIL” report will be generated and your Data Entry Officer cannot enter information of any Structure under the NFAMS',
          icon: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Yes, I Confirm This!',
          cancelButtonText: 'No, Cancel!',
          customClass: {
            confirmButton: 'swal2-confirm-blue',
            cancelButton: 'swal2-cancel-black'
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .structure-heading {
    font-size: 20px;
    color: #921007;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .structure-container {
    padding: 30px;
    font-family: Arial, sans-serif;
    text-align: center;
  }
  
  .structure-list {
    margin: 30px auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: flex-start;
  }
  
  .structure-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }
  
  .structure-top {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  
  .structure-img {
    width: 110px;
    height: auto;
    flex-shrink: 0;
  }
  
  .radio-group {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .description {
    font-size: 14px;
    color: #555;
    margin-top: 10px;
    max-width: none;
    word-break: break-word;
    text-align: left;
  }
  
  .save-btn-container {
    margin-top: 40px;
    text-align: right;
    width: 100%;
  }
  
  .save-btn {
    background-color: #021438;
    color: white;
    padding: 10px 30px;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .save-btn:hover {
    background-color: #25478a;
  }
  
  .swal2-confirm-blue {
    background-color: #4c59b0 !important;
    color: white !important;
    font-weight: bold;
    border-radius: 8px;
  }
  
  .swal2-cancel-black {
    background-color: black !important;
    color: white !important;
    font-weight: bold;
    border-radius: 8px;
  }
  </style>
  
  
  