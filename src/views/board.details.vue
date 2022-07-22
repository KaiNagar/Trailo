<template>
  <section v-if="currBoard">
    <div class="group-page-container" :style="onBoardBgColor">
    <!-- <div class="group-page-container" > -->
      <board-header />
      <group-list :groups="currBoard.groups" @addCard="addCard" @addGroup="addGroup" />
    </div>
    <!-- <router-view /> -->
  </section>
</template>
<script>
import boardHeader from '@/cmps/board/board.header.vue'
import groupList from '@/cmps/group.list.vue'
import { boardService } from '../services/board.service'

export default {
  name: 'boardApp',
  components: { boardHeader, groupList },
  data() {
    return {
      board: {},
      credentials: {},
    }
  },
  methods: {
    saveGroups(groups) {
      const newBoard = JSON.parse(JSON.stringify(this.board))
      newBoard.groups = groups
      this.$store.dispatch({ type: 'saveBoard', board: newBoard })
    },
    addGroup(group){
      this.$store.commit({type:'addGroup',group})
    },

    // async saveGroup(updatedGroup) {
    //   const idx = this.board.groups.findIndex((group) => group.id === updatedGroup.id)
    //   const board = JSON.parse(JSON.stringify(this.board))
    //   board.groups.splice(idx, 1, updatedGroup)
    //   console.log(board.groups[idx].cards);
    //   await this.$store.dispatch({ type: 'saveBoard', board })
    // },

    addCard(card) {
      this.$store.commit({ type: 'addCard', card })
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    onBoardBgColor() {
      return { backgroundImage: 'url(' + this.currBoard.bgCover + ')' }
    },
  },
  async created() {
    const { boardId } = this.$route.params
    const board = await boardService.getById(boardId)
    this.$store.commit({ type: 'setCurrBoard', currBoard: board })
    this.board = board
  },

}
</script>
