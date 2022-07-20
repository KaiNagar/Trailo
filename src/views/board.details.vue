<template>
  <section>
    <div>
      <board-header />
    </div>
    <group-list :groups="board.groups" @saveGroup="saveGroup" />
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
    async saveGroup(updatedGroup) {
      console.log('made to details');
      const idx = this.board.groups.findIndex((group) => group.id === updatedGroup.id)
      const boardId = this.$store.getters.boardId
      const board = await this.$store.dispatch({ type: 'getBoardById', boardId })
      board.groups.splice(idx, 1, updatedGroup)
      await this.$store.dispatch({ type: 'saveBoard', board })
    }
  },
  computed: {},
  async created() {
    const { boardId } = this.$route.params
    const board = await boardService.getById(boardId)
    this.board = board
    this.$store.commit({ type: 'setBoardId', boardId })
    this.$store.commit({ type: 'setCurrBoard', currBoard: board })
    // this.credentials.boardId = boardId
    // this.$store.dispatch({type:'setCardLoc',credentials:this.credentials})
  },

}
</script>
