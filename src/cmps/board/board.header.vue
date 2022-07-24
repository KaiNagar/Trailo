<template>
  <section class="board-header">
    <nav>
      <button>
        <span><img src="../../assets/icons/icons-bar-chart.png" alt="" /></span> Board
        <span><img src="../../assets/icons/icons-down.png" alt="" /></span>
      </button>
      <h1 class="board-header-title">{{ currBoard.title }}</h1>

      <button class="board-header-star">
        <span class="star-icon"></span>
      </button>

      <button class="board-header-span"><span class="privet-icon"></span> Private</button>

      <!-- <div class="board-header-right-btns"> -->
      <board-filter />
      <button class="board-header-menu-btn board-header-right-btns">
        <span class="menu-icon"></span> Show menu
      </button>
      <!-- </div> -->
    </nav>
  </section>
</template>

<script>
import boardFilter from '@/cmps/board/board.filter.vue'

export default {
  name: 'boardHeader',
  components: { boardFilter },
  data() {
    return {
      currBoard: [],
    }
  },
  methods: {},
  computed: {},
  created() {
    this.currBoard = this.$store.getters.currBoard
  },
}
</script>

<style>
</style>
