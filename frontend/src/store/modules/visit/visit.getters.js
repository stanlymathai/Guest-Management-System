import moment from "moment";
let timeFormated = (time) =>
  time ? moment(time).utc().format("h:mm a") : moment().format("h:mm a");

export default {
  visitorsCheckedIn: (state, getters) =>
    state.visits
      .filter((visit) => {
        if (state.awaitingVisitsOnly) {
          return (
            visit.boloStatus &&
            visit.notifyHost &&
            visit.boloStatus != 0 &&
            visit.notifyHost != 0 &&
            visit.visitStatus == 3
          );
        } else return visit.visitStatus == 3;
      })
      .map((visit) => ({
        ...visit,
        appointmentTime:
          timeFormated(visit.scheduleTimeFrom) +
          " ⇔ " +
          timeFormated(visit.scheduleTimeTo),
        hostName: getters.hostNameById(visit.hostId),
        checkedIn: timeFormated(visit.checkInDateTime),
      })),

  visitorsWithHost: (state, getters) =>
    state.visits
      .filter((visit) => visit.visitStatus == 4)
      .map((visit) => ({
        ...visit,
        appointmentTime:
          timeFormated(visit.scheduleTimeFrom) +
          " ⇔ " +
          timeFormated(visit.scheduleTimeTo),
        checkedIn: timeFormated(visit.checkInDateTime),
        hostName: getters.hostNameById(visit.hostId),
        collectedAt: timeFormated(visit.hostCollectedAt),
      })),

  visitsToday: (state, getters) =>
    state.visits
      .filter((v) => v.visitStatus < 3)
      .map((visit) => ({
        ...visit,
        appointmentTime:
          timeFormated(visit.scheduleTimeFrom) +
          " ⇔ " +
          timeFormated(visit.scheduleTimeTo),
        hostName: getters.hostNameById(visit.hostId),
      })),

  upcomingVisits: (state) =>
    state.upcomingVisits.map((visit) => ({
      appointmentTime: `${timeFormated(visit.scheduleTimeFrom)} ⇔ 
        ${timeFormated(visit.scheduleTimeTo)} ${
        visit.scheduleTimeFrom
          ? moment(visit.scheduleTimeFrom).utc().format(" DD/MM")
          : moment().format(" DD/MM")
      }`,
      ...visit,
    })),

  calendarEvents: (state) => state.calendarEvents,

  visitCountByLocation: (state) => (locationId) => {
    return (
      state.visits.filter(
        (visit) => visit.locationId == locationId && visit.visitStatus != 5
      ).length ?? "0"
    );
  },

  upcomingVisitById: (state) => (visitId) => {
    return state.upcomingVisits.find((visit) => visit.id == visitId);
  },

  shouldFetchVisits: (state) =>
    !state.visitsLastFetch || Date.now() - state.visitsLastFetch > 8421,

  belongsToVisitsToday: (state) =>
    moment(state.visit.dateFrom).isSame(Date.now(), "day"),

  upcomingLastFetchParams: (state) => state.upcomingLastFetchParams,
  eventsLastFetchParams: (state) => state.eventsLastFetchParams,

  visit: (state) => state.visit,
  showVisitForm: (state) => state.showVisitForm,
  visitsTodayVisible: (state) => !!state.showVisitsToday,
  showAwaitingOnly: (state) => state.awaitingVisitsOnly,
  showPinCodeCheckIn: (state) => state.showPinCodeCheckIn,
  upcomingVisitTitle: (state) => state.upcomingVisitTitle,
};
