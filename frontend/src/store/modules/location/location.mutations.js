import * as Mutation from "./location.mutationTypes";
export default {
  [Mutation.SET_LOCATIONS]: (state, payload) =>
    (state.locations = payload.locations),

  [Mutation.CLEAR_LOCATIONS]: (state) => (state.locations = []),

  [Mutation.ADD_LOCATION]: (state, payload) =>
    (state.locations = [payload, ...state.locations]),

  [Mutation.UPDATE_LOCATION]: (state, payload) =>
    (state.locations[state.locations.findIndex((i) => i.id == payload.id)] =
      payload),
  [Mutation.DELETE_LOCATION]: (state, id) =>
    state.locations.splice(
      state.locations.findIndex((i) => i.id == id),
      1
    ),

  [Mutation.PUT_LOCATION]: (state, locationId) =>
    (state.location = {
      ...state.locations.find((location) => location.id == locationId),
    }),

  [Mutation.SET_LOCATION]: (state) =>
    (state.location = {
      name: "",
      phone: "",
      postCode: "",
      timeZone: "",
      dateFormat: "",
      timeFormat: "",
      primaryFunction: "",
      physicalAddress: "",
      boloCheck: true,
    }),
  [Mutation.RESET_LOCATION]: (state) => (state.location = ""),

  [Mutation.SHOW_LOCATION_FORM]: (state) => (state.showLocationForm = true),
  [Mutation.HIDE_LOCATION_FORM]: (state) => (state.showLocationForm = false),
};
