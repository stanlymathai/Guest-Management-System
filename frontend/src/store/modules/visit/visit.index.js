import visitorMutations from "./mutations/visitor.mutations.js";
import visitMutations from "./mutations/visit.mutations.js";
import visitorActions from "./actions/visitor.actions.js";
import visitActions from "./actions/visit.actions.js";

import getters from "./visit.getters.js";

export default {
  state() {
    return {
      visits: [],
      upcomingVisits: [],
      calendarEvents: [],

      visit: {},
      visitsLastFetch: "",
      upcomingVisitTitle: "",

      eventsLastFetchParams: {},
      upcomingLastFetchParams: {},

      showvisitForm: false,
      showVisitsToday: true,
      showPinCodeCheckIn: false,
      awaitingVisitsOnly: false,
    };
  },
  mutations: { ...visitorMutations, ...visitMutations },
  actions: { ...visitActions, ...visitorActions },
  getters,
};
