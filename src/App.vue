<template>
    <app-header :boards="boards" />
    <router-view />
</template>

<script>
import appHeader from '@/cmps/app.header.vue'

export default {
  components: { appHeader },
  data() {
    return {
    
    }
  },
  methods: {},
  computed: {
    boards(){
      return this.$store.getters.boards
    }
  },
  async created() {
    const boards = await this.$store.dispatch({ type: 'loadBoards' })
  },
}
</script>
