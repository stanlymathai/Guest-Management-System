export default {
  users: (state, getters) =>
    state.users
      .filter((user) => user.role == 1 && user.id != getters.userId)
      .map(({ id, firstName, lastName, userLocations }) => ({
        id,
        name: `${firstName} ${lastName}`.trim(),
        locations: userLocations.map(({ id }) => getters.locationNameById(id)),
      })),

  hosts: (state, getters) =>
    state.users
      .filter((user) => user.role == 3)
      .map(({ id, firstName, lastName, userLocations }) => ({
        id,
        name: `${firstName} ${lastName}`.trim(),
        locations: userLocations.map(({ id }) => getters.locationNameById(id)),
      })),

  hostDropdown: (state, getters) => (locationId) => {
    let hosts = state.users.filter((user) => user.role == 3);

    if (!Object.keys(hosts).length)
      return [
        {
          id: getters.userId,
          name: getters.User.name,
        },
      ];
    if (locationId) {
      let userLocations = hosts
        .filter((h) => h.userLocations.some((item) => item.id == locationId))
        .map(({ id, firstName, lastName }) => ({
          id,
          name: `${firstName} ${lastName}`.trim(),
        }));
      if (!Object.keys(userLocations).length) {
        swal(
          "",
          `No hosts are assigned to the selected location, 
           please choose another location`,
          "warning"
        );
        return [];
      } else return userLocations;
    }

    return hosts.map(({ id, firstName, lastName }) => ({
      id,
      name: `${firstName} ${lastName}`.trim(),
    }));
  },

  locationManagers: (state) =>
    state.users
      .filter((user) => user.role == 1)
      .map(({ firstName, lastName }) => ({
        id: Math.random(),
        name: `${firstName} ${lastName}`.trim(),
      })),

  hostNameById: (state, getters) => (id) => {
    if (getters.userRole != 1) return getters.User.name;
    let user = state.users.filter((u) => u.role == 3).find((u) => u.id == id);
    return user ? `${user.firstName} ${user.lastName}` : "";
  },

  userLocations: (state) => (id) => {
    return state.users.find((user) => user.id == id).userLocations;
  },
  calendar_users: (state) =>
    state.users
      .filter((user) => user.id)
      .map(({ id, name }) => ({ id, title: name })),

  user: (state) => state.user,
  showUserForm: (state) => state.showUserForm,
  showUploadForm: (state) => state.showUploadForm,
  hasOneUser: (state) => (id) => {
    return !!state.users.find((user) => user.id == id);
  },
};
