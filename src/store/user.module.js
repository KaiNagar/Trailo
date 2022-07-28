import { userService } from "../services/user.service";
export const userModule = {
  // STATE
  state: {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
  },
  // MUTATIONS
  mutations: {
    setLoggedUser(state, { user }) {
      state.user = user;
      console.log("user is set", state.user);
    },
    logout(state) {
      state.user = null;
    },
  },
  // ACTIONS
  actions: {
    async setLoggedUser({ commit }, { credentials }) {
      try {
        const user = await userService.login(credentials);
        commit({ type: "setLoggedUser", user });
      } catch (err) {
        console.log(err);
      }
    },
    logout({ commit }, payload) {
      commit(payload);
    },
    async signup({ commit }, { credentials }) {
      try {
        const user = await userService.signup(credentials);
        commit({ type: "setLoggedUser", user });
      } catch (err) {
        console.log(err);
      }
    },
  },
  // GETTERS
  getters: {
    loggedUser(state) {
      return state.user;
    },
  },
};
