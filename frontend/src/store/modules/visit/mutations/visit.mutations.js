import * as Mutation from "../mutationTypes/visit.mutationTypes";

export default {
  [Mutation.SET_VISITS_TODAY]: (state, payload) =>
    (state.visits = payload.visits),

  [Mutation.UPDATE_ACTIVE_VISITS]: (state, visit) =>
    (state.visits[state.visits.findIndex((i) => i.id == visit.id)] = visit),

  [Mutation.SET_UPCOMING_VISITS]: (state, payload) =>
    (state.upcomingVisits = payload.visits),

  [Mutation.SET_CALENDAR_EVENTS]: (state, calendarEvents) =>
    (state.calendarEvents = calendarEvents),

  [Mutation.UPDATE_UPCOMING_VISIT]: (state, visit) =>
    (state.upcomingVisits[
      state.upcomingVisits.findIndex((i) => i.id == visit.id)
    ] = visit),

  [Mutation.REMOVE_FROM_UPCOMING]: (state, id) =>
    state.upcomingVisits.splice(
      state.upcomingVisits.findIndex((i) => i.id == id),
      1
    ),

  [Mutation.SET_UPCOMING_VISIT_TITLE]: (state, title) =>
    (state.upcomingVisitTitle = title),

  [Mutation.SET_VISITS_LAST_FETCHED]: (state) =>
    (state.visitsLastFetch = Date.now()),

  [Mutation.SET_UPCOMING_LAST_FETCH]: (state, visitRange) =>
    (state.upcomingLastFetchParams = visitRange),

  [Mutation.SET_EVENTS_LAST_FETCH]: (state, visitRange) =>
    (state.eventsLastFetchParams = visitRange),

  [Mutation.CLEAR_VISITS]: (state) => (state.visits = []),

  [Mutation.SET_VISIT]: (state, visit) => (state.visit = visit),

  [Mutation.SHOW_VISIT_FORM]: (state) => (state.showVisitForm = true),
  [Mutation.HIDE_VISIT_FORM]: (state) => (state.showVisitForm = false),

  [Mutation.SHOW_PINCODE_CHECKIN]: (state) => (state.showPinCodeCheckIn = true),
  [Mutation.HIDE_PINCODE_CHECKIN]: (state) =>
    (state.showPinCodeCheckIn = false),

  [Mutation.TOGGLE_AWAITING]: (state) =>
    (state.awaitingVisitsOnly = !state.awaitingVisitsOnly),

  [Mutation.HIDE_VISITS_TODAY]: (state) => (state.showVisitsToday = false),
  [Mutation.SHOW_VISITS_TODAY]: (state) => (state.showVisitsToday = true),
};
