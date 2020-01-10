import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret,faPlusCircle,faEdit,faTrash,faEye,faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUserSecret,faPlusCircle,faEdit,faTrash,faEye,faArrowUp,faArrowDown);
Vue.component('font-awesome-icon',FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
new Vue({
  router,
  store,

  render: h => h(App)
}).$mount("#app");
