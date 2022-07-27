<template>
    <app-header :boards="boards" />
    <router-view />
</template>

<script>
import appHeader from '@/cmps/app.header.vue'
import {socketService} from './services/socket.service.js'

export default {
  components: { appHeader, },
  data() {
    return {
    
    }
  },
  methods: {
  alertSomethingChanged() {
        alert('Admin has updated the store...')
      },
      },
  computed: {
    boards(){
      return this.$store.getters.boards
    }
  },
  async created() {
    const boards = await this.$store.dispatch({ type: 'loadBoards' })
    socketService.on('something-changed', this.alertSomethingChanged)
    
  },
}
</script>
