<template>
  <section class="board-list-container" v-if="boards">
    <h1>Most popular templates</h1>
    <div class="board-list" v-for="board in boards" :key="board._id">
      {{ board._id }}
      {{ board.title }}
      <router-link :to="'/board/' + board._id">Go to board</router-link>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      boards: [],
    }
  },
  methods: {},
  computed: {},
  created() {
    this.boards = this.$store.getters.boards
  },
}
</script>
