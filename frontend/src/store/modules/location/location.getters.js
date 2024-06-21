export default {
  locations: (state, getters) =>
    state.locations.map(({ id, name, primaryFunction }) => ({
      id,
      name,
      primaryFunction,
      visitCount: getters.visitCountByLocation(id),
    })),
  locationDropdowns: (state) =>
    state.locations.map(({ id, name }) => ({ id, name })),

  visitLocations: (state) =>
    state.locations.map(({ id, name, timeFormat, dateFormat }) => ({
      id,
      name,
      timeFormat,
      dateFormat,
    })),

  calendarLocations: (state) =>
    state.locations.map(({ id, name, timeFormat, dateFormat }) => ({
      id,
      timeFormat,
      dateFormat,
      title: name,
    })),

  initialCalendarLocations: (state, getters) =>
    state.locations
      .map(({ id, name, timeFormat, dateFormat }) => ({
        id,
        timeFormat,
        dateFormat,
        title: name,
        visitCount: getters.visitCountByLocation(id),
      }))
      .sort((a, b) => a.visitCount - b.visitCount)
      .slice(-3),

  location: (state) => state.location,
  showLocationForm: (state) => state.showLocationForm,

  locationNameById: (state) => (id) => {
    return state.locations.find((location) => location.id == id)?.name;
  },
};
