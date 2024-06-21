import * as types from "../mutationTypes/visit.mutationTypes";
import { HTTP } from "../../../../../config/axios";
import router from "../../../../routes";
import moment from "moment";

export default {
  fetchVisitsToday: (context) => {
    if (!context.getters.shouldFetchVisits) return;

    HTTP.get(`/api/visit/visits-today?from=${new Date()}&to=${new Date()}`, {
      headers: context.getters.headers,
    }).then((response) => {
      if (!response.data || response.data.error) {
        context.dispatch("handleError", response.data.error);
      } else {
        context.commit(types.SET_VISITS_TODAY, { visits: response.data });
        context.commit(types.SET_VISITS_LAST_FETCHED);
      }
    });
  },

  fetchUpcomingVisits: (context, range) =>
    HTTP.get(`/api/visit/upcoming-visits/?from=${range.from}&to=${range.to}`, {
      headers: context.getters.headers,
    }).then((response) => {
      if (!response.data || response.data.error) {
        context.dispatch("handleError", response.data.error);
      } else {
        context.commit(types.SET_UPCOMING_VISITS, { visits: response.data });
        context.commit(types.SET_UPCOMING_LAST_FETCH, range);
      }
    }),

  fetchCalendarEvents: (context, range) =>
    HTTP.get(
      `/api/visit/calendar-events/?start_of=${range.from}&end_of=${range.to}`,
      {
        headers: context.getters.headers,
      }
    ).then((response) => {
      if (!response.data || response.data.error) {
        context.dispatch("handleError", response.data.error);
      } else {
        context.commit(types.SET_CALENDAR_EVENTS, response.data);
        context.commit(types.SET_EVENTS_LAST_FETCH, range);
      }
    }),

  fetchVisitById: (context, visitId) =>
    HTTP.get(`/api/visit/visit-by-id/${visitId}`, {
      headers: context.getters.headers,
    }).then((response) => {
      if (!response.data || response.data.error) {
        context.dispatch("handleError", response.data.error);
      } else return response.data;
    }),

  addVisit: (context, payload) =>
    HTTP.post("/api/visit/add-visit", payload, {
      headers: context.getters.headers,
    })
      .then((response) => {
        if (response.data.errors || response.data.error || !response.data.id) {
          context.dispatch(
            "handleError",
            response.data.error
              ? response.data.error
              : response.data.errors[0].message
          );
          context.commit(types.SHOW_VISIT_FORM);
        }
        context.dispatch("refreshVisits");
      })
      .catch((err) => console.log("addVisit", err)),

  updateVisit: (context, payload) =>
    HTTP.post("/api/visit/edit-visit", payload, {
      headers: context.getters.headers,
    })
      .then((response) => {
        if (
          response.data.error ||
          response.data.errors ||
          response.data.id != payload.id
        ) {
          context.dispatch(
            "handleError",
            response.data.error
              ? response.data.error
              : response.data.errors[0].message
          );
          context.commit(types.SHOW_VISIT_FORM);
        }

        context.dispatch("refreshVisits");
      })
      .catch((err) => console.log("updateVisit", err)),

  refreshVisits: (context) => {
    if (window.location.pathname == "/calendar") {
      return context.dispatch(
        "fetchCalendarEvents",
        context.getters.eventsLastFetchParams
      );
    } else if (window.location.pathname != "/upcoming-visits") {
      router.push("upcoming-visits");
    }
    if (context.getters.belongsToVisitsToday) {
      context.dispatch("fetchVisitsToday");
    } else
      context.dispatch(
        "fetchUpcomingVisits",
        context.getters.upcomingLastFetchParams
      );
  },

  handleVisitSubmit: (context) => {
    context.commit(types.HIDE_VISIT_FORM);

    let visit = context.getters.visit;
    let toTittleCase = (name) =>
      name.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

    let payload = (({ host, visitor, location, recurring, reason }) => ({
      ...(!!visit.id && { id: visit.id }),

      schedule_time_from: moment(visit.dateFrom).format("YYYY-MM-DD HH:mm:00"),
      schedule_time_to: moment(visit.dateTo).format("YYYY-MM-DD HH:mm:00"),
      organization: `${visitor.company}`.toUpperCase(),
      first_name: toTittleCase(visitor.firstName),
      last_name: toTittleCase(visitor.lastName),
      email: `${visitor.email}`.toLowerCase(),
      host_name: toTittleCase(host.name),
      location: location.id,
      host_id: host.id,
      recurring,
      reason,
    }))(visit);

    context.dispatch(payload.id ? "updateVisit" : "addVisit", payload);
  },

  handleEditVisit: async (context, visitId) => {
    let visit = {};

    if (context.getters.upcomingVisitById(visitId)) {
      visit = context.getters.upcomingVisitById(visitId);
    } else
      await context
        .dispatch("fetchVisitById", visitId)
        .then((response) => (visit = response));

    let visitData = (({
      id,
      email,
      reason,
      firstName,
      lastName,
      organization,
      scheduleTimeFrom,
      scheduleTimeTo,
      visitStatus,
      locationId,
      hostName,
      hostId,
    }) => ({
      dateFrom: moment(scheduleTimeFrom).utc().format("YYYY-MM-DD HH:mm:00"),
      dateTo: moment(scheduleTimeTo).utc().format("YYYY-MM-DD HH:mm:00"),
      recurring: 1,
      visitStatus,
      reason,
      id,
      visitor: {
        firstName,
        lastName,
        email,
        company: organization,
      },
      host: { id: hostId, name: hostName },
      location: {
        id: locationId,
        name: context.getters.locationNameById(locationId),
      },
    }))(visit);

    context.commit(types.SET_VISIT, { ...visitData });
    context.commit(types.SHOW_VISIT_FORM);
  },

  handleVisitFormAdd: (context) => {
    let visit = {
      recurring: 1,
      visitStatus: 1,
      location: "",
      host: "",
      reason: "",
      visitor: {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
      },
      dateFrom: moment().format("YYYY-MM-DD HH:mm:00"),
      dateTo: moment().add(30, "minutes").format("YYYY-MM-DD HH:mm:00"),
    };

    context.commit(types.SET_VISIT, { ...visit });
    context.commit(types.SHOW_VISIT_FORM);
  },

  handleAddEvent: (context, payload) => {
    let event = {
      recurring: 1,
      visitStatus: 1,
      host: "",
      reason: "",
      visitor: {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
      },
      location: payload.location,
      dateFrom: payload.date.from,
      dateTo: payload.date.to,
    };

    context.commit(types.SET_VISIT, { ...event });
    context.commit(types.SHOW_VISIT_FORM);
  },

  purgeVisits: (context) => context.commit(types.CLEAR_VISITS),
  toggleAwaiting: (context) => context.commit(types.TOGGLE_AWAITING),
  visitFormCancel: (context) => context.commit(types.HIDE_VISIT_FORM),
  showPincodeModal: (context) => context.commit(types.SHOW_PINCODE_CHECKIN),
  pinCodeCheckCancel: (context) => context.commit(types.HIDE_PINCODE_CHECKIN),

  showVisitsToday: (context) => context.commit(types.SHOW_VISITS_TODAY),
  hideVisitsToday: (context) => context.commit(types.HIDE_VISITS_TODAY),

  setUpComingTitle: (context, title) =>
    context.commit(types.SET_UPCOMING_VISIT_TITLE, title),
};
