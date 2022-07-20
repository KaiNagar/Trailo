<template>
  <section>
    <app-header />
    <router-view />
  </section>
</template>

<script>
import appHeader from '@/cmps/app.header.vue'
import homePage from '@/views/home.page.vue'

export default {
  components: { appHeader, homePage },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {
    this.$store.dispatch({type:'loadBoard'})
  },
}
</script>
