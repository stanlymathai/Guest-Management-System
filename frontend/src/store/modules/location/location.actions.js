import { HTTP } from "../../../../config/axios";
import * as types from "./location.mutationTypes";
import router from "../../../routes";
export default {
  addLocation: (context, payload) =>
    HTTP.post("/api/location/add-location", payload, {
      headers: context.getters.headers,
    })
      .then((response) => {
        if (response.data.error) {
          context.commit(types.SHOW_LOCATION_FORM);
          context.dispatch("handleError", response.data.error);
        } else context.commit(types.ADD_LOCATION, response.data);
      })
      .catch((err) => console.log("addLocation", err)),

  updateLocation: (context, payload) =>
    HTTP.put("/api/location/edit-location", payload, {
      headers: context.getters.headers,
    })
      .then((response) => {
        if (response.data.error) {
          context.commit(types.SHOW_LOCATION_FORM);
          context.dispatch("handleError", response.data.error);
        } else context.commit(types.UPDATE_LOCATION, payload);
      })
      .catch((err) => console.log("updateLocation", err)),

  fetchLocations: (context) =>
    HTTP.get("/api/location/get-locations", {
      headers: context.getters.headers,
    })
      .then((response) => {
        let responseData = response.data;
        if (responseData.error) {
          context.dispatch("handleError", responseData.error);
        } else if (!responseData || !Object.keys(responseData).length) {
          setTimeout(() => router.replace("setup"), 0);
        } else
          context.commit(types.SET_LOCATIONS, {
            locations: responseData,
          });
      })
      .catch((err) => console.log("fetchLocations", err)),

  handleLocationDelete: (context, id) =>
    HTTP.delete(`/api/location/remove-location/${id}`, {
      headers: context.getters.headers,
    }).then((response) => {
      if (response.data.error) {
        context.dispatch("handleError", response.data.error);
      } else {
        context.commit(types.DELETE_LOCATION, response.data.id);
      }
    }),

  purgeLocations: (context) => context.commit(types.CLEAR_LOCATIONS),

  handleLocationSubmit: (context) => {
    let payload = context.getters.location;
    if (payload.id) {
      context.dispatch("updateLocation", payload);
    } else context.dispatch("addLocation", payload);
    context.commit(types.HIDE_LOCATION_FORM);
  },

  handleLocationCancel: (context) => {
    context.commit(types.RESET_LOCATION);
    context.commit(types.HIDE_LOCATION_FORM);
  },

  handleAddLocation: (context) => {
    context.commit(types.SET_LOCATION);
    context.commit(types.SHOW_LOCATION_FORM);
  },

  handleEditLocation: (context, locationId) => {
    context.commit(types.PUT_LOCATION, locationId);
    context.commit(types.SHOW_LOCATION_FORM);
  },
};
