<template>
  <app-header :boards="boards" />
  <router-view />
</template>
<script>
import appHeader from '@/cmps/app.header.vue'
export default {
  components: { appHeader },
  data() {
    return {}
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
    board() {
      return this.$store.getters.currBoard
    },
  },
  async created() {
    await this.$store.dispatch({ type: 'loadBoards' })
  },
}
</script>
