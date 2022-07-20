// import { userStore } from './modules/user.store.js'
import { createStore } from 'vuex'
import { boardService } from '@/services/board.service.js'

const store = createStore({
  strict: true,
  state: {
    board: {},
  },
  getters: {
    board({ board }) {
      return board
    },
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board
    },
  },
  actions: {
    async loadBoard({ commit }) {
      const board = await boardService.query()
      console.log(board)
    },
  },
})

export default store
