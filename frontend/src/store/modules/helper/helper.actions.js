import * as types from "./helper.mutationTypes";

export default {
  handleError: (_, error = "Oops! Something went wrong.") =>
    swal("", `${error}`, "error"),

  toggleSideBar: (context) => {
    context.commit(types.TOGGLE_SIDEBAR);
    window.document.body.style.paddingLeft = context.getters.showSideBar
      ? "200px"
      : "80px";
  },

  showLoader: (context) => context.commit(types.SHOW_LOADER),
};
