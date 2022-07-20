// import { userStore } from './modules/user.store.js'
import { createStore } from 'vuex'
import { boardService } from '@/services/board.service.js'

const store = createStore({
  strict: true,
  state: {
    boardId:null,
    boards: [],
    currBoard:null,
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    board({ board }) { },

    boardId({ boardId }) {
      return boardId
    },
    groupId({ groupId }) {
      return groupId
    },
    empetyCard() {
      return boardService.getEmpetyCard()
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setBoardId(state, { boardId }) {
      state.boardId = boardId
    },
    setCurrBoard(state, { currBoard }) {
      console.log('SETTING BOARD',currBoard);
      state.currBoard = currBoard
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
    async getBoardById(context, {boardId}){
      const board = await boardService.getById(boardId)
      return board
    },
    async saveBoard(context, {board}){
      const newBoard = await boardService.save(board)
    },
  },
})

export default store
