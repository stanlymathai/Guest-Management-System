import * as Mutation from "./helper.mutationTypes";

export default {
  [Mutation.SET_LISTENER_ID]: (state, listenerId) =>
    (state.listenerId = listenerId),
  [Mutation.TOGGLE_SIDEBAR]: (state) =>
    (state.showSideBar = !state.showSideBar),

  [Mutation.SHOW_LOADER]: (state) => (state.isLoading = true),
  [Mutation.HIDE_LOADER]: (state) => (state.isLoading = false),
};
