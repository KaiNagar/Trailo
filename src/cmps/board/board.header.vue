<template>
  <section class="board-header">
    <h1>this is board header</h1>
    <board-filter />
  </section>
</template>

<script>
import boardFilter from '@/cmps/board/board.filter.vue'

export default {
  name: 'boardHeader',
  components: { boardFilter },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
}
</script>

<style></style>
