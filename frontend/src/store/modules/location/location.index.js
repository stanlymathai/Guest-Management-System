import mutations from "./location.mutations.js";
import actions from "./location.actions.js";
import getters from "./location.getters.js";

export default {
  state() {
    return {
      location: "",
      locations: [],
      showLocationForm: false,
    };
  },
  mutations,
  actions,
  getters,
};
