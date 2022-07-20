// import { userStore } from './modules/user.store.js'
import { createStore } from 'vuex'
import { boardService } from '@/services/board.service.js'

const store = createStore({
  strict: true,
  state: {
    boards: [],
    // cardLoc: {
    //   boardId: null,
    //   groupId: null,
    //   cardId: null,
    // },
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    cardLoc({ cardLoc }) {
      return cardLoc
    },
    boardId({ boardId }) {
      return boardId
    },
    groupId({ groupId }) {
      return groupId
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setCardLoc(state, { cardLoc }) {
      state.cardLoc = cardLoc
    },
    setBoardId(state, { boardId }) {
      state.boardId = boardId
    },
    setGroupId(state, { groupId }) {
      state.groupId = groupId
    },
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query()
        commit({ type: 'setBoards', boards })
        return boards
      } catch (err) {
        console.error('cannot get boards:', err)
      }
    },
    async setCardLoc({ commit }, { credentials }) {
      console.log(credentials)
      commit({ type: 'setCardLoc', cardLoc: credentials })
    },
  },
})

export default store
