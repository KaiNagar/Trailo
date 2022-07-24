<template>
  <section class="board-list-container" v-if="boards">
    <div class="board-list">
      <div class="board-preview">
        <span
          ><span><img src="../assets/icons/icons-clock.png" alt="" /></span> Recently viewed</span
        >
        <ul>
          <li
            @click="onSelectedBoard(board._id)"
            v-for="board in boards"
            :style="boardUrl(board.bgCover)"
            :key="board._id"
          >
            <h1>{{ board.title }}</h1>
          </li>
          <li class="board-list-new-board" @click="openMenu('create')">
            <p>Create new board</p>
            <app-modal v-if="menu.create" @closeModal="closeMenu">
              <template #title>Create new board</template>
              <template #part-3>
                <p>Board title</p>
                <input id="title" type="text" v-model="newBoard.title" />
                <p>Board title if required</p>
              </template>
              <template #part-6>
                <button @click="saveBoard">Create</button>
              </template>
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
      this.$router.push('/board/' + this.newBoard._id)
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
