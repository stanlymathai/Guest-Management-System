import { HTTP } from "../../../../config/axios";
import * as types from "./auth.mutationTypes";

export default {
  signup: async (_, payload) =>
    new Promise((resolve, reject) =>
      HTTP.post("/api/sign-up", payload).then((response) => {
        if (response.data.errors) {
          reject(response.data.errors);
        } else {
          resolve(response.data);
        }
      })
    ),

  login: async (context, payload) =>
    new Promise((resolve, reject) =>
      HTTP.post("/api/login", payload).then((response) => {
        const responseData = response.data;
        if (responseData.error) {
          reject(responseData.error);
        } else {
          resolve(responseData);
          localStorage.setItem("token", responseData.token);
          localStorage.setItem("roleId", responseData.roleId);
          localStorage.setItem("clientId", responseData.clientId);
          localStorage.setItem("refreshToken", responseData.refreshToken);

          context.commit(types.SET_CREDENTIALS, {
            token: responseData.token,
            refreshToken: responseData.refreshToken,
            roleId: responseData.roleId,
          });
          context.dispatch("refreshAppState");
        }
      })
    ),

  fetchcurrentUser: async (context) =>
    new Promise((resolve, _) =>
      HTTP.get("/api/user/current-user/", {
        headers: context.getters.headers,
      })
        .then((response) => {
          context.commit(types.SET_CURRENT_USER, response.data);
          resolve(response.data);
        })
        .catch((err) => console.log(err, "current-user/"))
    ),

  refreshAppState: (context) => {
    setTimeout(() => context.dispatch("fetchVisitsToday"), 0);
    context
      .dispatch("fetchcurrentUser")
      .then((currentUser) => {
        setTimeout(() => context.dispatch("fetchLocations"), 0);
        if (currentUser.role == 1)
          setTimeout(() => context.dispatch("fetchUsers"), 0);
      })
      .catch((err) => console.log("fetchcurrentUser", err));
  },

  checkPassword: async (_, payload) =>
    new Promise((resolve, reject) =>
      HTTP.post("/api/login", payload).then((response) => {
        const responseData = response.data;
        if (responseData.message) {
          reject(responseData.message);
        } else {
          resolve(responseData);
        }
      })
    ),

  tryAutoLogin: (context) => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    const clientId = localStorage.getItem("clientId");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token && refreshToken) {
      context.commit(types.SET_CREDENTIALS, {
        token,
        refreshToken,
        roleId,
        clientId,
      });
      context.dispatch("refreshAppState");
    }
  },

  logout: (context) => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    localStorage.removeItem("clientId");
    localStorage.removeItem("refreshToken");

    context.dispatch("purgeLocations");
    context.dispatch("purgeVisits");
    context.dispatch("purgeUsers");

    context.commit(types.CLEAR_AUTH_STATE);
  },
};
