<template>
  <section v-if="currBoard">
    <div>
      <board-header />
    </div>
    <group-list :groups="currBoard.groups" @saveGroups="saveGroups" />
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
    // async saveGroup(updatedGroup) {
    //   const idx = this.board.groups.findIndex((group) => group.id === updatedGroup.id)
    //   const board = JSON.parse(JSON.stringify(this.board))
    //   board.groups.splice(idx, 1, updatedGroup)
    //   await this.$store.dispatch({ type: 'saveBoard', board })
    // },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
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
