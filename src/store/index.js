// import { userStore } from './modules/user.store.js'
import { createStore } from 'vuex'
import { boardService } from '@/services/board.service.js'
import { menuModule } from './menu.module'


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
    currBoard({ currBoard }) {
      return currBoard
    },
    currGroup({ currGroup }) {
      return currGroup
    },
    emptyTodo() {
      return boardService.getEmptyTodo()
    },
    emptyCard(){
      return boardService.getEmptyCard()
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
      state.currBoard = currBoard
    },
    setCurrGroup(state, { groupId }) {
      state.currGroup = state.currBoard.groups.find(
        (group) => group.id === groupId,
      )
    },
    addGroup(state, { group }) {
      state.currBoard.groups.push(group)
      boardService.save(state.currBoard)
    },
    addCard(state, { card }) {
      const group = state.currBoard.groups.find((group) => {
        return group.id === card.groupId
      })
      group.cards.push(card)
      boardService.save(state.currBoard)
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
    async saveBoard({ commit }, { board }) {
      const newBoard = await boardService.save(board)
      commit({ type: 'setCurrBoard', currBoard: newBoard })
    },
  },
  modules: {
    menuModule,
}
})

export default store
