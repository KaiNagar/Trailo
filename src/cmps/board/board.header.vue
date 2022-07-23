<template>
  <section class="board-header">
    <button>Board</button>
    <h1 class="board-header-title">{{ currBoard.title }}</h1>

    <span class="board-header-star">
      <img src="../../assets/icons/icon-star.png" alt="" />
    </span>

    <div class="board-header-span">
      <span>{{ currBoard.title }}</span>
    </div>
    <span class="board-header-span"
      ><span><img src="../../assets/icons/icons-lock.png" alt="" /></span> Private</span
    >

    <div class="board-header-right-btn">
      <board-filter />
      <button class="board-header-menu-btn">
        <span><img src="../../assets/icons/icons-more.png" alt="" /></span> Show menu
      </button>
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
