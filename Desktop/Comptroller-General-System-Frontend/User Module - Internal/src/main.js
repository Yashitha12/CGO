import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/style.css";
import "../src/assets/css/forms.css";
import "../src/assets/css/navigationstyle.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import { FontAwesomeIcon } from './plugins/font-awesome'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import homeFile from "../src/components/Framework/Home.vue";
import headerFile from "../src/components/Framework/HeaderArea.vue";
import footterFile from "./components/Framework/FooterArea.vue";
import navigationBar from "./components/Framework/NavigationArea.vue";
import news from "./components/NewsManagement/NewsViewBar.vue";
import dashboardUser from "./components/Dashboard/UsersDashboard.vue";
import dashboardEntity from "./components/Dashboard/EntityDashboard.vue";
import dashboardVehicle from "./components/Dashboard/VehicleDashboard.vue";

createApp(App)
  .use(router)
  .use(store)
  .use(VueAwesomePaginate)
  .use(VueSweetalert2)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("homeFile", homeFile)
  .component("headerFile", headerFile)
  .component("footterFile", footterFile)
  .component("newsFile", news)
  .component("navigationBar", navigationBar)
  .component("dashboardUser", dashboardUser)
  .component("dashboardEntity", dashboardEntity)
  .component("dashboardVehicle", dashboardVehicle)
  .mount("#app");
