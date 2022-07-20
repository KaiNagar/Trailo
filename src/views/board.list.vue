<template>
  <section class="board-list-container" v-if="boards">
    <h1>Most popular templates</h1>
    <div class="board-list">
      <div class="board-preview" v-for="board in boards" :key="board._id">
        <ul>
          <li>
            {{ board.title }}
            <router-link :to="'/board/' + board._id">Go to board</router-link>
          </li>
        </ul>
      </div>
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
