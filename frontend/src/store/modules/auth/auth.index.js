import mutations from "./auth.mutations.js";
import actions from "./auth.actions.js";
import getters from "./auth.getters.js";

export default {
  state() {
    return {
      User: {
        id: null,
        role: null,
        name: null,
        email: null,
        phone: null,
        clientId: null,
        organization: null,
        hasEntryInInvitations: null,
        hasEntryInNotifications: null,
      },
      authHeader: null,
    };
  },
  mutations,
  actions,
  getters,
};
