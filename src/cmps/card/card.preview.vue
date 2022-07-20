<template>
  <section>
    <pre>{{ card }}</pre>
    <router-link :to="'/board/card/' + card.id">Read</router-link>
  </section>
</template>

<script>
export default {
  name: 'cardPreview',
  props: ['card'],
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {
    
  },
}
</script>

<style></style>
