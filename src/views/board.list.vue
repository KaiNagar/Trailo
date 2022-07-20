<template>
  <main v-if="boards">
    <h1>Hello trailo</h1>
    <h2>many boards</h2>
    <div @click="openBoard(board._id)" v-for="board in boards" :key="board._id">
      {{board._id}}
      {{board.title}}
      <router-link :to="'/board/' + board._id">Go to board</router-link>
    </div>
    <pre>
      {{boards}}
    </pre>
    
  </main>
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
  methods: {
    openBoard(boardId){
      console.log(boardId);
    }
  },
  computed: {},
  created() {
    this.boards = this.$store.getters.boards
    console.log(this.boards)
  },
}
</script>
