z
<template>
  <section v-if="currBoard">
    <div class="group-page-container" :style="onBoardBgColor">
      <board-header />

      <group-list
        :groups="currBoard.groups"
        @updateGroup="updateGroup"
        @addGroup="addGroup"
        @removeGroup="removeGroup"
        @removeCard="removeCard"
      />
    </div>
    <router-view></router-view>
  </section>
</template>
<script>
import boardHeader from '@/cmps/board/board.header.vue'
import groupList from '@/cmps/group.list.vue'
import { boardService } from '../services/board.service'
import { socketService } from '../services/socket.service'

export default {
  name: 'boardApp',
  components: { boardHeader, groupList },
  data() {
    return {
      credentials: {},
    }
  },
  methods: {
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    addGroup(newGroup) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      board.groups.push(newGroup)
      this.$store.dispatch({ type: 'saveBoard', board })
    },
    updateGroup(newGroup) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      this.$store.dispatch({
        type: 'updateGroup',
        board,
        group: { ...newGroup },
      })
    },
    removeGroup(groupId) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const idx = board.groups.findIndex((group) => group.id === groupId)
      board.groups.splice(idx, 1)
      this.$store.dispatch({ type: 'saveBoard', board })
    },
    pushedBoard(board) {
      this.$store.dispatch({ type: 'pushedBoard', board })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    onBoardBgColor() {
      if (this.currBoard.style.bgColor) {
        return { backgroundColor: this.currBoard.style.bgColor }
      } else return { backgroundImage: 'url(' + this.currBoard.style.bgImg + ')' }
    },
  },
  watch: {
    '$route.params.boardId': {
      async handler() {
        const { boardId } = this.$route.params
        const board = await boardService.getById(boardId)
        socketService.emit('board new-enter', boardId)
        this.$store.commit({ type: 'setCurrBoard', currBoard: board })
      },
      immediate: true,
    },
  },
  created() {
    socketService.on('board pushed', this.pushedBoard)
    this.closeMenu()
    this.$store.dispatch({ type: 'setUsers' })
  },
  async mounted() {
    const { boardId } = this.$route.params
    const boards = await this.$store.dispatch({ type: 'loadBoards' })
    const board = boards.find((board) => board._id === boardId)
    const loggedUser = this.$store.getters.loggedUser
    board.members.push(loggedUser)
    this.$store.commit({ type: 'setBoardMembersIds', board })
  },
}
</script>
