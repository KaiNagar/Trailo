// import { userStore } from './modules/user.store.js'

export const menuModule = {
  strict: true,
  state: {
    menu: {
      attachments: false,
      edit: false,
      cover: false,
      labels: false,
      create: false,
      dates:false,
      headerCreate: false,
      createLabel: false,
      editLabel: false,
      deleteLabel: false,
      previewLabels: false,
      groupMenu: false,
      deleteAttachment: false,
      members:false,
      deleteTodo:false,
      previewMembers:false,
      account:false,
      searchUser:false,
      shareBoard:false,
      removeCard:false,

    },
    
    edit: {},

    isPreviewMenusOpen: false,
  },
  getters: {
    menu({ menu }) {
      return menu;
    },
    edit({ edit }) {
      return edit;
    },
    previewMenuStatus({ isPreviewMenusOpen }) {
      return isPreviewMenusOpen;
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

      if (menuAction === "labels") {
        state.labelsOpen = true;
      }
    },
    openEditMenu(state, { editId }) {
      for (let e in state.menu) {
        state.menu[e] = false;
      }
    },
    closeMenu(state) {
      for (let action in state.menu) {
        state.menu[action] = false;
      }
    },
    closeEditMenu(state) {
      for (let e in state.edit) {
        state.menu[e] = false;
      }
    },
    setEditMenu(state, { attachments }) {
      const edit = state.edit;
    },
    setPreviewMenuStatus(state, { status }) {
      state.isPreviewMenusOpen = status
    },
  },
};
