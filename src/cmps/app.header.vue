<template>
  <section class="main-header ">

    <button class="header-menu">---</button>
    <router-link to="/">
      <div class="logo">
        <!-- <div class="loader">[]</div> -->
        <!-- Trailo -->
        <img src="../../src/styles/cenzored-header-gif.gif" alt="">
        <span>ai</span>
      </div>
    </router-link>
    <div class="actions">

      <button>Recent <span class="arrow"></span></button>
      <button>Starred <span class="arrow"></span></button>
      <button>Templates <span class="arrow"></span></button>
      <button class="create-btn"></button>
    </div>



    <!-- <div class="search">
      <span></span>
    </div> -->
    <input class="search-board-input" type="text" placeholder="Search" />
    <div class="right-header flex">
      <button>🔔</button>
      <router-link to="/about"><button>About</button></router-link>

      <div class="profile">
        <button>KN</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'appHeader',
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    boards() {
      this.$store.getters.boards
    },
  },
  created() { },
}
</script>
