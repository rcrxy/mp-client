import Vue from "vue";
import App from "./App";
import store from "./store";

Vue.prototype.$store = store;

Vue.config.productionTip = false;

/* 引入uView */
import uView from "uview-ui";
Vue.use(uView);

import mixin from "@/mixin/mixin";
Vue.use(mixin);

App.mpType = "app";

const app = new Vue({
   ...App,
   store,
});

app.$mount();
