<template>
  <section>
    <div>
      <board-header />
    </div>
    <group-list :groups="board.groups" />
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
  methods: {},
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
