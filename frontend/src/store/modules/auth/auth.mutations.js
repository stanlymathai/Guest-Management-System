import * as Mutation from "./auth.mutationTypes";

export default {
  [Mutation.SET_CURRENT_USER]: (state, payload) => Object.assign(state.User, payload),

  [Mutation.SET_CREDENTIALS]: (state, payload) => {
    state.authHeader = {
      Authorization: payload.token,
      refreshToken: payload.refreshToken,
    };
    state.User.role = payload.roleId;
    state.User.clientId = payload.clientId;
  },

  [Mutation.CLEAR_AUTH_STATE]: (state) => {
    state.authHeader = null;
    Object.keys(state.User).forEach((i) => (state.User[i] = null));
  },
};
