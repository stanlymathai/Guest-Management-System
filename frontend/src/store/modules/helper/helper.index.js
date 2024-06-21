import mutations from "./helper.mutations.js";
import actions from "./helper.actions.js";
import getters from "./helper.getters.js";

export default {
  state() {
    return {
      showSideBar: false,
      isLoading: false,
    };
  },
  mutations,
  actions,
  getters,
};
