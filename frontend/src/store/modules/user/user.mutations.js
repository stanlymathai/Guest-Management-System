import * as Mutation from "./user.mutationTypes";
export default {
  [Mutation.SET_USERS]: (state, payload) => (state.users = payload.users),

  [Mutation.CLEAR_USERS]: (state) => (state.users = []),

  [Mutation.ADD_USER]: (state, payload) =>
    (state.users = [payload, ...state.users]),

  [Mutation.UPDATE_USER]: (state, payload) =>
    (state.users[state.users.findIndex((i) => i.id == payload.id)] = payload),

  [Mutation.DELETE_USER]: (state, id) =>
    state.users.splice(
      state.users.findIndex((i) => i.id == id),
      1
    ),

  [Mutation.SET_USER_ROLE]: (state, roleId) => (state.user.role = roleId),

  [Mutation.SET_USER]: (state, payload) =>
    (state.user = (({ id, firstName, lastName, email, role, phone }) => ({
      id,
      role,
      firstName,
      lastName,
      email,
      phone,
      userLocations: payload.userLocations,
    }))(state.users.find((user) => user.id == payload.userId))),

  [Mutation.RESET_USER]: (state) =>
    Object.keys(state.user).forEach((i) => (state.user[i] = "")),

  [Mutation.SHOW_USER_FORM]: (state) => (state.showUserForm = true),
  [Mutation.HIDE_USER_FORM]: (state) => (state.showUserForm = false),
  [Mutation.SHOW_UPLOAD_FORM]: (state) => (state.showUploadForm = true),
  [Mutation.HIDE_UPLOAD_FORM]: (state) => (state.showUploadForm = false),
};
