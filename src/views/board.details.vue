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
  </section>
</template>
<script>
import boardHeader from '@/cmps/board/board.header.vue'
import groupList from '@/cmps/group.list.vue'
import { boardService } from '../services/board.service'
import {socketService} from '../services/socket.service'

export default {
  name: 'boardApp',
  components: { boardHeader, groupList },
  data() {
    return {
      credentials: {},
    }
  },
  methods: {
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
    removeCard(cardId) {
      console.log(cardId)
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const idx = board.groups.cards.findIndex((card) => card.id === cardId)
      board.groups.cards.splice(idx, 1)
      this.$store.dispatch({ type: 'saveBoard', board })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    onBoardBgColor() {
      return { backgroundImage: 'url(' + this.currBoard.bgCover + ')' }
    },
  },
  watch: {
    '$route.params.boardId': {
      async handler() {
        const { boardId } = this.$route.params
        const board = await boardService.getById(boardId)
        this.$store.commit({ type: 'setCurrBoard', currBoard: board })
    socketService.emit('connectin-board',boardId)


      },
    immediate:true
    },
  },
  mounted() {
    console.log(this.currBoard);
    //  socketService.emit('chat topic', this.currBoard)
  //   const { boardId } = this.$route.params
  //   const board = await boardService.getById(boardId)
  //   console.log(board);
  //   this.$store.commit({ type: 'setCurrBoard', currBoard: board })
  },
  }
</script>
