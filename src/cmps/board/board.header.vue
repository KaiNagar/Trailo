<template>
  <section class="board-header full flex space-between">
    <nav>
      <button class="board-btn">
        <span class="bars"
          ><img src="../../assets/icons/icons-bar-chart.png" alt=""
        /></span>
        <span class="txt">Board</span>
        <span class="img"
          ><img src="../../assets/icons/icons-down.png" alt=""
        /></span>
      </button>
      <h1
        v-if="!editBoardTitle"
        class="board-header-title"
        @click="openEditTitle"
      >
        {{ currBoard.title }}
      </h1>
      <input
        ref="editBoardRef"
        @blur="saveBoardTitle"
        v-else
        type="text"
       
        v-model="currBoard.title"
        class="edit-board-title"
      />

      <button @click="toggleStarBoard" class="board-header-star">
        <span :style="isStarred" class="star-icon"></span>
      </button>
      <span class="divider"></span>
      <button class="board-header-privet">
        <span class="privet-icon"></span> Private
      </button>
      <span class="divider"></span>
    </nav>
    <div class="board-header-right-btns">
      <span class="divider"></span>
      <button class="filter-btn">
        <span class="img"
          ><img src="../../assets/icons/icons-bars.png" alt=""
        /></span>
        <span class="txt">Filter</span>
      </button>
      <board-filter v-if="filterMenu" />
      <div>
        <button @click="showMenu" class="show-menu-btn flex align-center">
          <span class="menu-icon"></span>
          <span class="txt">Show menu</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import boardFilter from '@/cmps/board/board.filter.vue'

export default {
  name: 'boardHeader',
  components: { boardFilter },
  data() {
    return {
      // currBoard: {},
      filterMenu: false,
      editBoardTitle: false,
      currBoard: {},
    }
  },
  methods: {
    openEditTitle() {
      this.editBoardTitle = true
      setTimeout(() => {
        this.$refs.editBoardRef.focus()
      }, 0)
    },
    saveBoardTitle() {
      this.editBoardTitle = false
      this.$store.dispatch({ type: 'saveBoard', board: this.currBoard })
    },
    toggleStarBoard() {
      this.currBoard.isStarred = !this.currBoard.isStarred
      const updatedBoard = { ...this.currBoard }
      updatedBoard.isStarred = !updatedBoard.isStarred
      this.$store.dispatch({ type: 'saveBoard', board: updatedBoard })
    },
  },
  computed: {
    isStarred() {
      if (this.currBoard.isStarred) {
        return { color: '#f2d600' }
      }
    },
    stateBoard() {
      return this.$store.getters.currBoard
    },
  },
  created() {
    this.currBoard = JSON.parse(JSON.stringify(this.stateBoard))
  },
}
</script>

<style></style>
