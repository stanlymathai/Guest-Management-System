export default {
  User: (state) => state.User,
  userId: (state) => state.User.id,
  userRole: (state) => state.User.role,
  userClient: (state) => state.User.clientId,

  headers: (state) => state.authHeader,
  isAuthenticated: (state) => !!state.authHeader,
  isLocationManager: (state) => state.User.role == 1,
};
