<template>
  <section>
    <app-header />
    <router-view />
  </section>
</template>

<script>
import appHeader from '@/cmps/app.header.vue'

export default {
  components: { appHeader },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
}
</script>
