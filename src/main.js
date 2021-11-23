import Vue from "vue";
import App from "./App";
import store from "./store";

Vue.prototype.$store = store;

Vue.config.productionTip = false;

/* 引入uView */
import uView from "uview-ui";
Vue.use(uView);

// /**引入vant */
// import Vant from "vant";
// Vue.use(Vant);

App.mpType = "app";

const app = new Vue({
   ...App,
   store,
});

app.$mount();
