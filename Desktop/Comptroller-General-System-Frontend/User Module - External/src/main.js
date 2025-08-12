import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/style.css";
import "../src/assets/css/forms.css";
import "../src/assets/css/navigationstyle.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import homeFile from "../src/components/Framework/Home.vue";
import headerFile from "../src/components/Framework/Header.vue";
import footterFile from "../src/components/Framework/Footer.vue";
import navigationBar from "../src/components/Framework/Navigation.vue";
import news from "./components/NewsManagement/News.vue";

createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("homeFile", homeFile)
  .component("headerFile", headerFile)
  .component("footterFile", footterFile)
  .component("newsFile", news)
  .component("navigationBar", navigationBar)
  .mount("#app");
