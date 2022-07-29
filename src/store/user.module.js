import { userService } from "../services/user.service";
export const userModule = {
  // STATE
  state: {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    users: [],
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
    setUsers(state, {users}){
      state.users = users
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
    async logout({ commit }, payload) {
      userService.logout();
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
    async setUsers({commit}) {
      try {
        const users = await userService.getUsers()
        console.log('users is store:',users);
        if(users){
          commit({type:'setUsers', users})
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
  // GETTERS
  getters: {
    loggedUser(state) {
      return state.user
    },
    users({ users }) {
      return users
    },
  },
};
