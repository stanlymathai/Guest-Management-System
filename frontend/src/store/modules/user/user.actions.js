import { HTTP } from "../../../../config/axios";
import * as types from "./user.mutationTypes";

export default {
  addUser: (context, payload) =>
    HTTP.post("/api/user/add-user", payload, {
      headers: context.getters.headers,
    })
      .then((response) => {
        if (response.data.errors || response.data.error) {
          context.dispatch(
            "handleError",
            response.data.error
              ? response.data.error
              : response.data.errors[0].message
          );
          context.commit(types.SHOW_USER_FORM);
        } else context.dispatch("commitToUsers", response.data.id);
      })
      .catch((err) => console.log("addUser", err)),

  updateUser: (context, payload) =>
    HTTP.put("/api/user/edit-user", payload, {
      headers: context.getters.headers,
    })
      .then((response) => {
        if (response.data.errors || response.data.error) {
          context.dispatch(
            "handleError",
            response.data.error
              ? response.data.error
              : response.data.errors[0].message
          );
          context.commit(types.SHOW_USER_FORM);
        } else context.dispatch("commitToUsers", response.data.id);
      })
      .catch((err) => console.log("updateUser", err)),

  commitToUsers: (context, userId) => {
    let userData = (({
      firstName,
      lastName,
      email,
      role,
      phone,
      userLocations,
    }) => ({
      id: userId,
      firstName,
      lastName,
      role,
      email,
      phone,
      userLocations: userLocations.map(({ id }) => ({ id })),
    }))(context.getters.user);

    if (context.getters.hasOneUser(userData.id)) {
      context.commit(types.UPDATE_USER, userData);
    } else context.commit(types.ADD_USER, userData);

    context.commit(types.RESET_USER);
  },

  fetchUsers: (context) =>
    HTTP.get("/api/user/get-users", {
      headers: context.getters.headers,
    }).then((response) => {
      if (response.data.error) {
        context.dispatch("handleError", response.data.error);
      } else {
        context.commit(types.SET_USERS, { users: response.data });
      }
    }),

  purgeUsers: (context) => context.commit(types.CLEAR_USERS),

  handleDeleteUser: async (context, userId) =>
    HTTP.delete(`/api/user/remove-user/${userId}`, {
      headers: context.getters.headers,
    }).then((response) => {
      if (response.data.error) {
        context.dispatch("handleError", response.data.error);
      } else {
        context.commit(types.DELETE_USER, response.data.id);
      }
    }),

  handleUserSubmit: (context) => {
    context.commit(types.HIDE_USER_FORM);

    let user = context.getters.user;
    let payload = (({ firstName, lastName, email, phone, role }) => ({
      ...(!!user.id && { id: user.id }),
      firstName,
      lastName,
      email,
      phone,
      role,
      countryId: 1,
      organization: context.getters.User.organization,
      ...(!!user.password && { password: user.password }),
      locations: Array.from(user.userLocations, (loc) => loc.id),
    }))(user);

    context.dispatch(payload.id ? "updateUser" : "addUser", payload);
  },

  handleUserCancel: (context) => {
    context.commit(types.RESET_USER);
    context.commit(types.HIDE_USER_FORM);
  },

  handleAddUser: (context, roleId) => {
    context.commit(types.SET_USER_ROLE, roleId);
    context.commit(types.SHOW_USER_FORM);
  },

  handleEditUser: (context, userId) => {
    context.commit(types.SET_USER, {
      userId,
      userLocations: context.getters
        .userLocations(userId)
        .map(({ id }) => ({ id, name: context.getters.locationNameById(id) })),
    });
    context.commit(types.SHOW_USER_FORM);
  },

  handleHostUpload: (context) => context.commit(types.SHOW_UPLOAD_FORM),
  handleUploadCancel: (context) => context.commit(types.HIDE_UPLOAD_FORM),
};
