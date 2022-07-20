<template>
  <section class="board-list-container" v-if="boards">
    <div class="board-list">
      <div class="board-preview">
        <h1>Recently viewed</h1>
        <ul>
          <li
            @click="onSelectedBoard(board._id)"
            v-for="board in boards"
            :style="boardUrl(board.bgCover)"
            :key="board._id"
          >
            <h1>{{ board.title }}</h1>
          </li>
          <li class="board-list-new-board">
            <p>Create new board</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      boards: [],
    }
  },
  methods: {
    onSelectedBoard(boardId) {
      this.$router.push('/board/' + boardId)
    },
    boardUrl(bgCover) {
      return { backgroundImage: 'url(' + bgCover + ')' }
    },
  },
  computed: {},
  created() {
    this.boards = this.$store.getters.boards
  },
}
</script>
