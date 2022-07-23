<template>
  <section v-if="currBoard">
    <div class="group-page-container" :style="onBoardBgColor">
      <board-header />
      <group-list
        :groups="currBoard.groups"
        @updateGroup="updateGroup"
        @addGroup="addGroup"
      />
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
  },
}
</script>
