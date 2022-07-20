// import { userStore } from './modules/user.store.js'
import { createStore } from 'vuex'
import { boardService } from '@/services/board.service.js'

const store = createStore({
  strict: true,
  state: {
    boards: [],
    currBoard:null,
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    currBoard({ currBoard }) {
      return currBoard
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
    saveBoard({commit},{board}){
      
    }
  },
})

export default store
