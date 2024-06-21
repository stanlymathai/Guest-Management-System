import mutations from "./user.mutations.js";
import actions from "./user.actions.js";
import getters from "./user.getters.js";

export default {
  state() {
    return {
      user: {
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: "",
        userLocations: "",
      },
      users: [],
      showUserForm: false,
      showUploadForm: false,
    };
  },
  mutations,
  actions,
  getters,
};
