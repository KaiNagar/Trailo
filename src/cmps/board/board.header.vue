<template>
  <section class="board-header">
    <h1>{{ currBoard.title }}</h1>
    <!-- <board-filter /> -->
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

<style></style>
