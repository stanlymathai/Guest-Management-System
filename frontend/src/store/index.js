import { createStore } from "vuex";

import authModule from "./modules/auth/auth.index.js";
import userModule from "./modules/user/user.index.js";
import visitModule from "./modules/visit/visit.index.js";
import helperModule from "./modules/helper/helper.index.js";
import locationModule from "./modules/location/location.index.js";

const store = createStore({
  modules: {
    auth: authModule,
    user: userModule,
    visit: visitModule,
    helper: helperModule,
    location: locationModule,
  },
});

export default store;
