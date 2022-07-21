<template>
  <section>
    <app-header :boards="boards" />
    <router-view />
  </section>
</template>

<script>
import appHeader from '@/cmps/app.header.vue'

export default {
  components: { appHeader },
  data() {
    return {
      boards: null
    }
  },
  methods: {},
  computed: {},
  async created() {
    this.boards = await this.$store.dispatch({ type: 'loadBoards' })
  },
}
</script>
