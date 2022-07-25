<template>
  <section class="home-page">
    <!-- <div class="side-menu"></div> -->
    <side-menu></side-menu>

    <div class="galleries">


      <section class="board-list-container" v-if="boards">
        <div class="board-list">
          <div class="star-icon section icon"></div>
          <div class="board-preview">
            <!-- <img src="../assets/icons/icons-clock.png" alt="" /> -->
            <div class="gallery">
              <div class="item" @click="onSelectedBoard(board._id)" v-for="board in starred" :key="board._id">
                <img :src="board.bgCover" alt="">
                <h1>{{ board.title }}</h1>
                <div class="star">
                  <div class="star-icon " @click.stop="star(board._id)" :class="{ starred: board.isStarred }"></div>
                  <!-- <div class="star-icon bottom" :class="{ starred: board.isStarred }"></div> -->
                </div>
              </div>



            </div>
          </div>
        </div>
      </section>



      <section class="board-list-container" v-if="boards">
        <div class="board-list">
          <div class="recently icon section"></div>
          <div class="board-preview">
            <!-- <img src="../assets/icons/icons-clock.png" alt="" /> -->
            <div class="gallery">
              <div class="item" @click="onSelectedBoard(board._id)" v-for="board in recently" :key="board._id">
                <img :src="board.bgCover" alt="">
                <h1>{{ board.title }}</h1>
                <div class="star">
                  <div class="star-icon " @click.stop="star(board._id)" :class="{ starred: board.isStarred }"></div>
                  <!-- <div class="star-icon bottom" :class="{ starred: board.isStarred }"></div> -->
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      <div class="board-list-new-board" @click="openMenu('create')">
        <p>Create new board</p>

      </div>
      <add-board v-if="menu.create" @closeModal="closeMenu"></add-board>
    </div>
  </section>
</template>
<script>
import appModal from '../cmps/app.modal.vue'
import sideMenu from '../cmps/side.menu.vue'
import addBoard from '../cmps/board/add.board.vue'
export default {
  name: 'Home',
  components: {
    appModal,
    sideMenu,
    addBoard,
  },
  data() {
    return {

    }
  },
  methods: {
    onSelectedBoard(boardId) {
      this.$router.push('/board/' + boardId)
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },

    async star(boardId) {
      this.$store.commit({ type: 'starBoard', boardId })
      const board = this.$store.getters.starredBoard

      const boards = JSON.parse(JSON.stringify(this.boards))
      const idx = boards.findIndex((board) => {
        return board._id === boardId;
      });
      boards.splice(idx, 1, board)
      console.log(boards);
      this.$store.dispatch({ type: 'saveBoards', boards })
    }
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
    menu() {
      return this.$store.getters.menu
    },
    starred() {
      return this.boards.filter(board => {
        return board.isStarred
      })
    },
    recently() {
      // this.$store.commit({ type: 'starBoard', boardId })
      return this.boards.slice()
        .reverse()
        .filter((board) => {
          return !board.isStarred
        }).slice(0, 4)
    },

  },
  created() {
    console.log(this.starred);
  },


}
</script>
