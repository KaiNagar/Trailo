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
    boardId({ boardId }) {
      return boardId
    },
    currBoard({ currBoard }) {
      return currBoard
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
    async saveBoard({commit}, {board}){
      const newBoard = await boardService.save(board)
      console.log('newBoard', newBoard)
      commit({type:'setCurrBoard',currBoard:newBoard})
      
    },
  },
})

export default store
