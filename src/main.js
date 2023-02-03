/*
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-01-31 17:15:58
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './assets/css/index.scss'
import DemoBlock from "@/components/.components/DemoBlock.vue";
import global from "~/libs/global";
import rdComponents from './components/rd'

Vue.use(ElementUI);
Vue.use(global)
Vue.use(rdComponents);
Vue.component("demo-block", DemoBlock);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
