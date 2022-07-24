<template>
  <section class="home-page">
    <!-- <div class="side-menu"></div> -->
    <side-menu></side-menu>
    <section class="board-list-container" v-if="boards">

      <div class="board-list">
        <div class="board-preview">
          <!-- <img src="../assets/icons/icons-clock.png" alt="" /> -->
          <ul>
            <li @click="onSelectedBoard(board._id)" v-for="board in boards" :style="boardUrl(board.bgCover)"
              :key="board._id">
              <h1>{{ board.title }}</h1>
            </li>
            <li class="board-list-new-board" @click="openMenu('create')">
              <p>Create new board</p>

            </li>
            <app-modal v-if="menu.create" @closeModal="closeMenu">
              <template #title>Create board</template>
              <template #part-1>
                <div class="background"
                  :style="[{ backgroundImage: `url(${selectedBgImg})` }, { backgroundColor: selectedBgColor }]">
                  <div>

                    <img src="../styles/svgs/liner.svg" alt="">
                  </div>
                </div>
              </template>

              <template #part-2>
                <header>Background</header>
                <div class="background-gallery">
                  <div class="images">

                    <img v-for="(image, idx) in coverImgsUrls" :key="idx" :src="image" @click="selectBgImg(image)">
                  </div>
                </div>
              </template>

              <template #part-3>
                <div class="colors">
                  <div class="color-container" v-for="(color, idx) in colors" :key="idx"
                    :style="{ backgroundColor: color }" @click="selectBgColor(color)">
                    <div class="screen"></div>
                  </div>
                  <div class="more icon"> <span>...</span>

                    <!-- <app-modal> </app-modal> -->

                  </div>
                </div>
              </template>

              <template #part-4>
                <div class="title">
                  <header>Board title <span>*</span></header>
                  <input type="text" v-model="newBoard.title">
                  <span>👋 Board title is required</span>
                </div>
              </template>

              <template #part-5>
                <button @click="createBoard" class="create">Create</button>
              </template>
            </app-modal>


          </ul>
        </div>
      </div>


    </section>
  </section>
</template>
<script>
import { boardService } from '../services/board.service.js'
import appModal from '../cmps/app.modal.vue'
import sideMenu from '../cmps/side.menu.vue'
export default {
  name: 'Home',
  components: {
    appModal,
    sideMenu,
  },
  data() {
    return {
      selectedBgImg: 'https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      selectedBgColor: '#0079bf',
      newBoard: boardService.getEmptyBoard(),
      colors: [
        '#0079bf',
        '#d29034',
        '#519839',
        '#b04632',
        '#89609e',
      ],
      coverImgsUrls: [
        'https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        'https://images.unsplash.com/photo-1455218873509-8097305ee378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
    }
  },
  methods: {
    selectBgImg(url) {
      this.selectedBgColor = null
      this.selectedBgImg = url
    },
    selectBgColor(hex) {
      this.selectedBgImg = null
      this.selectedBgColor = hex
    },
    onSelectedBoard(boardId) {
      this.$router.push('/board/' + boardId)
    },
    boardUrl(bgCover) {
      return { backgroundImage: 'url(' + bgCover + ')' }
    },
    async saveBoard() {
      const newBoard = await this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
      console.log(newBoard);
      this.$router.push('/board/' + newBoard._id)
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    async createBoard() {
      await this.$store.dispatch({ type: 'loadBoards' })
      // console.log(this.newBoard);
      this.closeMenu()
      this.newBoard.bgCover = this.selectedBgImg
      this.saveBoard()
      this.newBoard = boardService.getEmptyBoard()
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },

    menu() {
      return this.$store.getters.menu
    },
  },

}
</script>
