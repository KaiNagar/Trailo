// import { userStore } from './modules/user.store.js'
import { createStore } from 'vuex'
import { boardService } from '@/services/board.service.js'
import { menuModule } from './menu.module'
import { userModule } from './user.module'
import { socketService } from '../services/socket.service.js'

const store = createStore({
  strict: true,
  starredBoard: {},
  isCover: false,
  state: {
    boardId: null,
    boards: [],
    currBoard: null,
    currGroup: null,
    currCard: null,
    isLabelsOpen: null,
    cardMembersIds: [],
    boardMembersIds:[],
  },
  getters: {
    isCover({ isCover }) {
      return isCover
    },
    starredBoard({ starredBoard }) {
      return starredBoard
    },
    boardsToDisplay({ boards }) {
      return boards
        .slice()
        .reverse()
        .filter((board) => {
          return !board.isStarred
        })
    },
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
    emptyCard() {
      return boardService.getEmptyCard()
    },
    isLabelsOpen({ currBoard }) {
      return currBoard.labelsOpen
    },
    cardMemberIds({ cardMembersIds }) {
      return cardMembersIds
    },
    boardMemberIds({ boardMembersIds }) {
      return boardMembersIds
    },
  },
  mutations: {
    setCardMembersIds(state, { card }) {
      console.log(card);
      state.cardMembersIds = []
      card.members = card.members|| []
      if(!card.members.length) return
      console.log(card.members);
      card.members.forEach((member) => {
        state.cardMembersIds.push(member._id)
      })
    },
    setBoardMembersIds(state, { board, user }) {
      state.boardMembersIds = []
      board.members = board.members || []
      board.members.forEach((member) => {
        state.boardMembersIds.push(member._id)
      })
      const loggedUser = JSON.parse(sessionStorage.getItem("user"))
      if(!state.boardMembersIds.includes(loggedUser._id)){
        state.boardMembersIds.push(loggedUser._id)
      }
      console.log(state.boardMembersIds);
    },
    toggleMember(state, { memberId }) {
      const idx = state.card.findIndex((member) => {
        member.id === memberId
      })
    },
    setIsCover(state, { status }) {
      state.isCover = status
    },
    editLabel(state, { editedLabel }) {
      const idx = state.currBoard.labels.findIndex((label) => {
        return label.id === editedLabel.id
      })
      state.currBoard.labels.splice(idx, 1, editedLabel)
    },
    removeLabel(state, { labelId }) {
      const idx = state.currBoard.labels.findIndex((label) => {
        return label.id === labelId
      })
      state.currBoard.labels.splice(idx, 1)
    },
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setBoardId(state, { boardId }) {
      state.boardId = boardId
    },
    setCurrBoard(state, { currBoard }) {
      // console.log('store mutation:',currBoard )
      const idx = state.boards.findIndex((board) => board._id === currBoard._id)
      state.boards[idx] = currBoard
      state.currBoard = currBoard
    },
    setCurrGroup(state, { groupId }) {
      state.currGroup = state.currBoard.groups.find(
        (group) => group.id === groupId,
      )
    },
    // addGroup(state, { group }) {
    //   state.currBoard.groups.push(group)
    // },
    // addCard(state, { card }) {
    //   const group = state.currBoard.groups.find((group) => {
    //     return group.id === card.groupId
    //   })
    //   group.cards.push(card)
    //   // boardService.save(state.currBoard)
    // },
    setIsLabelsOpen(state, { isLabelsOpen }) {
      // state.isLabelsOpen = isLabelsOpen
      state.currBoard.labelsOpen = isLabelsOpen
    },
    starBoard(state, { boardId }) {
      const idx = state.boards.findIndex((board) => {
        return board._id === boardId
      })
      const board = state.boards[idx]
      if (board.isStarred) {
        board.isStarred = false
      } else {
        board.isStarred = true
        state.boards.splice(idx, 1, board)
      }
      state.starredBoard = board
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
      commit({ type: 'setCurrBoard', currBoard: board })
      console.log('created by', board.loggedUser)
      const newBoard = await boardService.save(board)

      return newBoard
    },
    pushedBoard({ commit }, { board }) {
      console.log('pushedBoard', board)
      commit({ type: 'setCurrBoard', currBoard: board })
    },

    async updateGroup({ commit }, { board, group }) {
      const idx = board.groups.findIndex(
        (currGroup) => currGroup.id === group.id,
      )
      board.groups.splice(idx, 1, group)
      const newBoard = await boardService.save(board)
      commit({ type: 'setCurrBoard', currBoard: newBoard })
    },
  },
  modules: {
    menuModule,
    userModule,
  },
})

export default store
