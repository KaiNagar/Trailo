// import { userStore } from './modules/user.store.js'
import { createStore } from 'vuex'
import { boardService } from '@/services/board.service.js'

const store = createStore({
  strict: true,
  state: {
    boardId: null,
    boards: [],
    currBoard: null,
    currGroup: null,
    currCard: null,
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    // board({ boardId }) {
    //   return boardId
    // },
    currBoard({ currBoard }) {
      return currBoard
    },
    currGroup({ currGroup }) {
      return currGroup
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
      state.currBoard = currBoard
    },
    setCurrGroup(state, { groupId }) {
      state.currGroup = state.currBoard.groups.find(
        (group) => group.id === groupId,
      )
    },
    addGroup(state, { group }) {
      state.currBoard.groups.push(group)
    }
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
    async saveBoard({ commit }, { board }) {
      const newBoard = await boardService.save(board)
      commit({ type: 'setCurrBoard', currBoard: newBoard })
    },
    // async saveCard({ commit }, { location: { card, board, group } }) {
    //   const newBoard = await boardService.saveCard(board, group, card)
    //   console.log(newBoard)
    //   commit({ type: 'setCurrBoard', currBoard: newBoard })
    // },
  },

})

export default store
