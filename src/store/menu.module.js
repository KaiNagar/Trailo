// import { userStore } from './modules/user.store.js'

export const menuModule = {
  strict: true,
  state: {
    menu: {
      attachments: false,
      cover:false
    },
  },
  getters: {
    menu({ menu }) {
      return menu;
    },
  },
  mutations: {
    openMenu(state, { menuAction }) {
      for (let action in state.menu) {
        state.menu[action] = false;
        if (action === menuAction) {
          state.menu[action] = true;
        }
      }
    },
    closeMenu(state) {
      for (let action in state.menu) {
        state.menu[action] = false;
      }
    },
  },
  actions: {},
};
