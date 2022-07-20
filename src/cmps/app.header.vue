<template>
  <section>
    <h1>app header</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link style="margin: 1rem" to="/about">About</router-link>
      <router-link style="margin: 1rem" to="/board">Board</router-link>
      <router-link to="/login">login</router-link>
    </nav>
  </section>
</template>
<script>
export default {
  name:'appHeader',
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
}
</script>
