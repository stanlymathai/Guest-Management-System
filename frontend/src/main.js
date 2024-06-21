import store from "./store/index.js";
import { createApp, h } from "vue";
import router from "./routes";
import App from "./App.vue";

import GridField from "./components/common/GridField.vue";

import swal from "sweetalert";
import "../config/validation";
import "../public/style.css";

const app = createApp({
  render: () => h(App),
});

app.use(store);
app.use(router);
app.component("GridField", GridField);

// mount app
app.mount("#app");
