<template>
  <app-modal @closeModal="closeMenu">
    <template #title>Create board</template>
    <template #part-1>
      <div
        class="background"
        :style="[
          { backgroundImage: `url(${selectedBgImg})` },
          { backgroundColor: selectedBgColor },
        ]"
      >
        <div>
          <img src="../../styles/svgs/liner.svg" alt="" />
        </div>
      </div>
    </template>

    <template #part-2>
      <header>Background</header>
      <div class="background-gallery">
        <div class="images">
          <img
            v-for="(image, idx) in coverImgsUrls"
            :key="idx"
            :src="image"
            @click="selectBgImg(image)"
          />
        </div>
      </div>
    </template>

    <template #part-3>
      <div class="colors">
        <div
          class="color-container"
          v-for="(color, idx) in colors"
          :key="idx"
          :style="{ backgroundColor: color }"
          @click="selectBgColor(color)"
        >
          <div class="screen"></div>
        </div>
        <div class="more icon">
          <span>...</span>

          <!-- <app-modal> </app-modal> -->
        </div>
      </div>
    </template>

    <template #part-4>
      <div class="title">
        <header>Board title <span>*</span></header>
        <input required type="text" v-model="newBoard.title" />
        <br>
        <span>👋 Board title is required</span>
      </div>
    </template>

    <template #part-5>
      <button @click="createBoard" class="create">Create</button>
    </template>
  </app-modal>
</template>
<script>
import { boardService } from '../../services/board.service'
import appModal from '../app.modal.vue'
export default {
  name: 'ProjectApp',
  components: {
    appModal,
  },
  data() {
    return {
      selectedBgImg:
        'https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      selectedBgColor: '#0079bf',
      newBoard: boardService.getEmptyBoard(),
      colors: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e'],
      coverImgsUrls: [
        'https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        'https://images.unsplash.com/photo-1455218873509-8097305ee378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
    }
  },
  created() {},
  methods: {
    selectBgImg(url) {
      this.selectedBgColor = null
      this.selectedBgImg = url
    },
    selectBgColor(hex) {
      this.selectedBgImg = null
      this.selectedBgColor = hex
    },
    async saveBoard() {
      const newBoard = await this.$store.dispatch({
        type: 'saveBoard',
        board: this.newBoard,
      })
      console.log(newBoard)
      this.$router.push('/board/' + newBoard._id)
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    async createBoard() {
      if(!this.newBoard.title) return
      await this.$store.dispatch({ type: 'loadBoards' })
      this.closeMenu()
      this.newBoard.style.bgImg = this.selectedBgImg
      this.newBoard.style.bgColor = this.selectedBgColor
      this.saveBoard()
      const boards = JSON.parse(JSON.stringify(this.boards))
      boards.push(this.newBoard)
      this.$store.dispatch({ type: 'saveBoards', boards })
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
  created() {
    this.newBoard.labels = [
      { id: 'l101', color: '#61bd4f', title: '' },
      { id: 'l104', color: '#eb5a46', title: '' },
      { id: 'l105', color: '#c377e0', title: '' },
    ]
  },
  unmounted() {},
}
</script>
<style></style>
