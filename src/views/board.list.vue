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
            <p @click="openMenu('create')">Create new board</p>
            <!-- <button @click="saveBoard">Add board</button> -->
            <app-modal v-if="menu.create" @closeModal="closeMenu">
              <template #title> in preparation </template>
            </app-modal>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import { boardService } from '../services/board.service.js'
import appModal from '../cmps/app.modal.vue'
export default {
  name: 'Home',
  components: {
    appModal,
  },
  data() {
    return {
      boards: [],
      newBoard: boardService.getEmptyBoard(),
    }
  },
  methods: {
    onSelectedBoard(boardId) {
      this.$router.push('/board/' + boardId)
    },
    boardUrl(bgCover) {
      return { backgroundImage: 'url(' + bgCover + ')' }
    },
    saveBoard() {
      console.log('hi')
      this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    },
  },
  created() {
    this.boards = this.$store.getters.boards
  },
}
</script>
